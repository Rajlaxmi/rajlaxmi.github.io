---
title: Attention Is All You Need
slug: attention-is-all-you-need
date: 2026-08-26
category: Machine Learning
excerpt: A section-by-section walkthrough of the Transformer paper — architecture, code, and a couple of real visualizations, not just prose.
tags: [transformers, attention, nlp]
draft: false
authorship: ai-coauthored
---

Paper: [Attention Is All You Need](https://arxiv.org/pdf/1706.03762) (Vaswani et al., 2017)

### Overview

Before this paper, the best sequence models — translation, summarization, anything mapping one sequence to another — were built on recurrent layers (LSTMs, GRUs), often wrapped with an attention mechanism on top. Recurrence processes a sequence one token at a time, position by position, which creates two problems: it can't be parallelized across the sequence during training, and information from early tokens has to survive a long chain of sequential updates to influence later ones.

The Transformer's claim is in the title: drop the recurrence and convolution entirely, and rely only on attention to model how tokens relate to each other. Every position can attend to every other position in a single step, which means the whole sequence is processed in parallel, and any two tokens — no matter how far apart — are one attention computation apart, not `n` recurrent steps apart.

### Architecture at a Glance

The model is an encoder-decoder stack. The encoder reads the input sequence and builds a contextual representation of it; the decoder generates the output sequence one token at a time, attending both to what it has generated so far and to the encoder's output.

![Transformer architecture: an encoder stack on the left feeding a decoder stack on the right, each built from N identical layers of multi-head attention, add-and-norm, and a feed-forward block](/transformer-architecture.svg)

Each encoder layer has two sub-layers: multi-head self-attention, then a position-wise feed-forward network. Each decoder layer has three: masked self-attention (so a position can't look ahead), attention over the encoder's output, then the same feed-forward network. Every sub-layer is wrapped in a residual connection followed by layer normalization — `LayerNorm(x + Sublayer(x))` — which is what makes stacking N of these layers trainable at all.

### Input Embeddings

Tokens are mapped to `d_model`-dimensional vectors with a learned embedding table, same as any sequence model. The one detail worth calling out: the embeddings are scaled by `sqrt(d_model)` before anything else happens to them. This keeps the embedding values on a comparable scale to the positional encodings added next — without it, the sinusoidal signal (bounded in `[-1, 1]`) would be swamped by or would swamp the embeddings, depending on how the embedding table was initialized.

```python
import torch
import torch.nn as nn
import math

class InputEmbeddings(nn.Module):
    def __init__(self, vocab_size: int, d_model: int):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.d_model = d_model

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x: (batch, seq_len) of token ids -> (batch, seq_len, d_model)
        return self.embedding(x) * math.sqrt(self.d_model)
```

### Positional Encoding

Self-attention has no built-in sense of order — it computes a weighted sum over all positions, and that sum is the same regardless of how the positions were arranged. Recurrent models get ordering for free because they process tokens sequentially; the Transformer has to inject it explicitly.

The paper's choice is a fixed (non-learned) sinusoid, one per dimension, with wavelengths forming a geometric progression from `2π` to `10000·2π`:

```
PE(pos, 2i)   = sin(pos / 10000^(2i / d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i / d_model))
```

Two properties make this a good fit. First, it's bounded and periodic, so it composes cleanly with the embedding via simple addition. Second — the reason sin/cos specifically, rather than any other periodic function — for any fixed offset `k`, `PE(pos+k)` is a linear function of `PE(pos)`. That means the model can, in principle, learn to attend by relative position using a fixed linear transformation, even though the encoding for each absolute position is fixed.

```python
class PositionalEncoding(nn.Module):
    def __init__(self, d_model: int, max_len: int = 5000, dropout: float = 0.1):
        super().__init__()
        self.dropout = nn.Dropout(dropout)

        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1)
        div_term = torch.exp(
            torch.arange(0, d_model, 2) * -(math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer("pe", pe.unsqueeze(0))  # (1, max_len, d_model)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x: (batch, seq_len, d_model)
        x = x + self.pe[:, : x.size(1)]
        return self.dropout(x)
```

Plotting the encoding matrix makes the geometric-progression-of-wavelengths idea concrete: low dimensions oscillate fast (short wavelength, changes every position), high dimensions oscillate slowly (long wavelength, nearly constant over short spans).

![Heatmap of the sinusoidal positional encoding matrix for d_model = 128 and 100 positions — low dimensions oscillate rapidly, high dimensions vary smoothly](/positional-encoding-heatmap.png)

### Scaled Dot-Product Attention

This is the core operation. Given a query, a set of keys, and a set of values (all vectors), attention computes a weighted average of the values, where the weight on each value comes from how well its key matches the query:

```
Attention(Q, K, V) = softmax(QKᵀ / √d_k) V
```

- `Q`, `K`, `V` are matrices — one query/key/value vector per sequence position, stacked as rows.
- `QKᵀ` gives a similarity score between every query and every key: an `(n × n)` matrix.
- Dividing by `√d_k` keeps those scores from growing too large as `d_k` increases. Without it, the dot products grow with the dimension, softmax saturates, and gradients vanish — the paper found this scaling necessary specifically because they'd observed the unscaled version underperforming for larger `d_k`.
- `softmax` turns each row of scores into a probability distribution over positions to attend to.
- Multiplying by `V` produces the output: for each query, a weighted blend of all the value vectors.

![Diagram of scaled dot-product attention (Q, K, V feed a MatMul, then Scale, an optional Mask, SoftMax, and a final MatMul with V) alongside multi-head attention (Q, K, V linearly projected, run through h parallel scaled dot-product attention blocks, concatenated, and linearly projected once more)](/attention-mechanism.svg)

```python
import torch.nn.functional as F

def scaled_dot_product_attention(q, k, v, mask=None, dropout=None):
    # q, k, v: (batch, ..., seq_len, d_k)
    d_k = q.size(-1)
    scores = q @ k.transpose(-2, -1) / math.sqrt(d_k)

    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))

    weights = F.softmax(scores, dim=-1)
    if dropout is not None:
        weights = dropout(weights)

    return weights @ v, weights
```

To make this concrete rather than purely symbolic: here's `softmax(QKᵀ / √d_k)` computed for a toy six-word sentence, with the resulting attention weights plotted as a heatmap. Each row sums to 1 — it's the distribution one query token puts over all the keys.

![Heatmap of toy attention weights for the sentence "The cat sat on the mat" — each row is a query token's softmax distribution over the other tokens as keys](/toy-attention-heatmap.png)

### Multi-Head Attention

Running one attention function over the full `d_model`-dimensional Q/K/V averages over a single representation subspace. Multi-head attention instead linearly projects Q, K, and V into `h` smaller subspaces (`d_k = d_model / h` each), runs scaled dot-product attention independently in each, and concatenates the results back to `d_model` before one final linear projection:

```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W_O
head_i             = Attention(Q W_i^Q, K W_i^K, V W_i^V)
```

The payoff is that different heads are free to specialize — one might learn to track subject-verb agreement, another might learn positional-adjacency patterns — and because each head operates on a smaller dimension, the total computational cost is similar to single-head attention at full dimensionality.

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int, dropout: float = 0.1):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_k = d_model // num_heads
        self.num_heads = num_heads

        self.w_q = nn.Linear(d_model, d_model)
        self.w_k = nn.Linear(d_model, d_model)
        self.w_v = nn.Linear(d_model, d_model)
        self.w_o = nn.Linear(d_model, d_model)
        self.dropout = nn.Dropout(dropout)

    def _split_heads(self, x: torch.Tensor) -> torch.Tensor:
        batch, seq_len, _ = x.shape
        # (batch, seq_len, d_model) -> (batch, num_heads, seq_len, d_k)
        return x.view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)

    def forward(self, query, key, value, mask=None):
        q = self._split_heads(self.w_q(query))
        k = self._split_heads(self.w_k(key))
        v = self._split_heads(self.w_v(value))

        if mask is not None:
            mask = mask.unsqueeze(1)  # broadcast over heads

        out, _ = scaled_dot_product_attention(q, k, v, mask, self.dropout)

        batch, _, seq_len, _ = out.shape
        out = out.transpose(1, 2).contiguous().view(batch, seq_len, -1)
        return self.w_o(out)
```

### Position-wise Feed-Forward Networks

Every position, independently and identically, passes through a small two-layer MLP with a ReLU in between:

```
FFN(x) = max(0, x W_1 + b_1) W_2 + b_2
```

`d_model = 512` and the inner layer `d_ff = 2048` in the base model — a 4x expansion and back down. This is where most of the model's parameters live, and it's what gives each position's representation a chance to be transformed nonlinearly after attention has mixed information across positions.

```python
class PositionwiseFeedForward(nn.Module):
    def __init__(self, d_model: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.linear2(self.dropout(F.relu(self.linear1(x))))
```

### Residual Connections and Layer Normalization

Every sub-layer — attention or feed-forward — is wrapped the same way:

```
x = LayerNorm(x + Sublayer(x))
```

The residual connection (`x +`) is what makes it feasible to stack many layers: gradients have a direct path back through the addition, instead of having to flow through every nonlinearity in every layer. Layer normalization keeps the scale of activations stable across layers regardless of that accumulation. The paper applies norm *after* the residual add (post-norm); a lot of later Transformer variants apply it *before* the sub-layer instead (pre-norm), which tends to train more stably at larger depth — worth knowing as a deviation you'll see in most modern implementations.

```python
class SublayerConnection(nn.Module):
    """Residual connection followed by layer norm, applied around any sublayer."""

    def __init__(self, d_model: int, dropout: float = 0.1):
        super().__init__()
        self.norm = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor, sublayer) -> torch.Tensor:
        return self.norm(x + self.dropout(sublayer(x)))
```

### Encoder Stack

Each encoder layer is self-attention followed by the feed-forward network, each wrapped in a `SublayerConnection`. The full encoder is `N` of these stacked (`N = 6` in the base model), with the final output layer-normalized once more.

```python
import copy

class EncoderLayer(nn.Module):
    def __init__(self, d_model: int, num_heads: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, num_heads, dropout)
        self.feed_forward = PositionwiseFeedForward(d_model, d_ff, dropout)
        self.sublayer1 = SublayerConnection(d_model, dropout)
        self.sublayer2 = SublayerConnection(d_model, dropout)

    def forward(self, x: torch.Tensor, mask=None) -> torch.Tensor:
        x = self.sublayer1(x, lambda x: self.self_attn(x, x, x, mask))
        return self.sublayer2(x, self.feed_forward)


class Encoder(nn.Module):
    def __init__(self, layer: EncoderLayer, num_layers: int, d_model: int):
        super().__init__()
        self.layers = nn.ModuleList(
            [copy.deepcopy(layer) for _ in range(num_layers)]
        )
        self.norm = nn.LayerNorm(d_model)

    def forward(self, x: torch.Tensor, mask=None) -> torch.Tensor:
        for layer in self.layers:
            x = layer(x, mask)
        return self.norm(x)
```

### Decoder Stack and Masked Attention

The decoder adds a third sub-layer — attention over the encoder's output — and its self-attention has to be *masked* so that predicting position `i` can only depend on positions `< i`. Without this, the model could trivially "cheat" during training by looking at the token it's supposed to predict, since the whole target sequence is fed in at once for parallel training (teacher forcing).

The mask is a lower-triangular matrix: position `i` is allowed to attend to positions `0..i`, everything after is set to `-∞` before the softmax, so it receives zero weight.

```python
import copy

def causal_mask(seq_len: int) -> torch.Tensor:
    # (1, seq_len, seq_len) lower-triangular mask; 1 = attend, 0 = block
    return torch.tril(torch.ones(seq_len, seq_len)).unsqueeze(0)


class DecoderLayer(nn.Module):
    def __init__(self, d_model: int, num_heads: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, num_heads, dropout)
        self.cross_attn = MultiHeadAttention(d_model, num_heads, dropout)
        self.feed_forward = PositionwiseFeedForward(d_model, d_ff, dropout)
        self.sublayer1 = SublayerConnection(d_model, dropout)
        self.sublayer2 = SublayerConnection(d_model, dropout)
        self.sublayer3 = SublayerConnection(d_model, dropout)

    def forward(self, x, memory, src_mask=None, tgt_mask=None):
        x = self.sublayer1(x, lambda x: self.self_attn(x, x, x, tgt_mask))
        x = self.sublayer2(x, lambda x: self.cross_attn(x, memory, memory, src_mask))
        return self.sublayer3(x, self.feed_forward)


class Decoder(nn.Module):
    def __init__(self, layer: DecoderLayer, num_layers: int, d_model: int):
        super().__init__()
        self.layers = nn.ModuleList(
            [copy.deepcopy(layer) for _ in range(num_layers)]
        )
        self.norm = nn.LayerNorm(d_model)

    def forward(self, x, memory, src_mask=None, tgt_mask=None):
        for layer in self.layers:
            x = layer(x, memory, src_mask, tgt_mask)
        return self.norm(x)
```

Note the `cross_attn` call: queries come from the decoder (`x`), keys and values come from the encoder's output (`memory`). That's the arrow crossing from encoder to decoder in the architecture diagram above — it's how the decoder gets to look back at the whole input sequence while generating.

### Why Self-Attention

The paper motivates the design with a direct complexity comparison against the alternatives it's replacing, for a sequence of length `n` and representation dimension `d` (Table 1 in the paper):

| Layer type | Complexity per layer | Sequential operations | Max path length |
| --- | --- | --- | --- |
| Self-attention | `O(n² · d)` | `O(1)` | `O(1)` |
| Recurrent | `O(n · d²)` | `O(n)` | `O(n)` |
| Convolutional | `O(k · n · d²)` | `O(1)` | `O(log_k(n))` |

Two things stand out. **Sequential operations**: self-attention is `O(1)` — every position is computed in parallel — while a recurrent layer needs `O(n)` sequential steps, which is what makes RNN training slow to parallelize across the sequence dimension (parallel across batch, not across time). **Maximum path length**: how many layers a signal has to cross to connect two arbitrary positions. Self-attention connects any two positions directly in one layer; a recurrent network needs a path proportional to the distance between them, which is exactly the long-range-dependency problem attention was already being bolted onto RNNs to solve.

The tradeoff is the `n²` term: self-attention's per-layer cost grows quadratically with sequence length, which is fine when `n` is smaller than `d` (typical for sentence-level translation) and becomes the well-known bottleneck for very long sequences.

### Training Details

A few choices from the paper that aren't part of the architecture but matter for reproducing the numbers:

- **Optimizer**: Adam, with `β1 = 0.9`, `β2 = 0.98`, `ε = 1e-9`.
- **Learning rate schedule**: increases linearly for `warmup_steps` (4000), then decays proportionally to the inverse square root of the step number:

  ```
  lrate = d_model^(-0.5) · min(step^(-0.5), step · warmup_steps^(-1.5))
  ```

- **Regularization**: dropout (`P_drop = 0.1`) applied to the output of every sub-layer before it's added back in the residual connection, and to the embedding + positional-encoding sums.
- **Label smoothing**: `ε_ls = 0.1`. The model is trained against a softened target distribution rather than a one-hot vector, which hurts perplexity (the model is deliberately less confident) but improves accuracy and BLEU — it stops the model from becoming overconfident on the training set's exact token choices.

### Results

On WMT 2014 English-to-German, the "big" Transformer (`d_model=1024`, `h=16`, `N=6`) reached **28.4 BLEU**, over 2 points above the best previously reported result, including ensembles. On English-to-French it reached **41.8 BLEU**, a new single-model state of the art at the time — at a fraction of the training cost of the previous best models, since training is parallelizable across the sequence and the paper's largest model trained in 3.5 days on 8 GPUs.

The base model (smaller, `N=6`, `d_model=512`, `h=8`) was competitive with prior state-of-the-art at a much lower training cost, which is arguably the more important result: it showed the architecture wasn't just powerful, it was *efficient* to train relative to what it replaced.

### My Takeaways

