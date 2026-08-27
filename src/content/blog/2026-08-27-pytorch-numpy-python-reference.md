---
title: PyTorch, NumPy and Python Reference Sheet
slug: pytorch-numpy-python-reference
date: 2026-08-27
category: Reference
excerpt: A quick lookup cheatsheet for ML coding.
tags: [pytorch, numpy, python, reference, cheatsheet]
draft: false
authorship: ai-coauthored
---

This is a lookup sheet of frequent Pytorch/Numpy/Python functionalities used in ML scripts.

[Open the runnable version in Google Colab](https://colab.research.google.com/github/Rajlaxmi/rajlaxmi.github.io/blob/master/notebooks/pytorch-numpy-python-reference.ipynb) to try any of the snippets below live, no local setup required.

Official references: [PyTorch Cheat Sheet](https://docs.pytorch.org/tutorials/beginner/ptcheat.html) · [PyTorch documentation](https://docs.pytorch.org/docs/stable/index.html) · [NumPy quickstart](https://numpy.org/doc/stable/user/quickstart.html)

### Creating Arrays / Tensors

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| From a list | `np.array([1, 2, 3])` | `torch.tensor([1, 2, 3])` |
| Zeros / ones | `np.zeros((2, 3))` / `np.ones((2, 3))` | `torch.zeros(2, 3)` / `torch.ones(2, 3)` |
| Identity matrix | `np.eye(3)` | `torch.eye(3)` |
| Range | `np.arange(0, 10, 2)` | `torch.arange(0, 10, 2)` |
| Evenly spaced | `np.linspace(0, 1, 5)` | `torch.linspace(0, 1, 5)` |
| Same shape as another | `np.zeros_like(a)` | `torch.zeros_like(t)` |
| Uninitialized | `np.empty((2, 3))` | `torch.empty(2, 3)` |
| Copy | `a.copy()` | `t.clone()` |

Note the shape argument convention differs: NumPy wants a single tuple (`np.zeros((2, 3))`), PyTorch accepts either unpacked ints (`torch.zeros(2, 3)`) or a tuple.

### Shape, Indexing, and Slicing

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| Shape | `a.shape` | `t.shape` (or `t.size()`) |
| Number of dims | `a.ndim` | `t.dim()` |
| Total elements | `a.size` | `t.numel()` |
| Basic slice | `a[1:3, :2]` | `t[1:3, :2]` |
| Boolean mask | `a[a > 0]` | `t[t > 0]` |
| Fancy indexing | `a[[0, 2], [1, 3]]` | `t[[0, 2], [1, 3]]` |
| Where / select | `np.where(a > 0, a, 0)` | `torch.where(t > 0, t, torch.zeros_like(t))` |
| Add a new axis | `a[:, None]` or `np.expand_dims(a, 1)` | `t[:, None]` or `t.unsqueeze(1)` |
| Drop size-1 axes | `np.squeeze(a)` | `t.squeeze()` |

### Broadcasting

Both follow the same rule, aligned from the trailing dimension: two axes are compatible if they're equal, or one of them is `1`. A `(3, 1)` array/tensor and a `(1, 4)` one combine into `(3, 4)` without either being copied until the operation actually runs.

```python
a = np.arange(3).reshape(3, 1)   # shape (3, 1)
b = np.arange(4).reshape(1, 4)   # shape (1, 4)
a + b                             # shape (3, 4)

t1 = torch.arange(3).reshape(3, 1)
t2 = torch.arange(4).reshape(1, 4)
t1 + t2                           # shape (3, 4), identical rule
```

### Math and Reductions

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| Elementwise add/mul | `a + b`, `a * b` | `t1 + t2`, `t1 * t2` |
| Matrix multiply | `a @ b` or `np.matmul(a, b)` | `t1 @ t2` or `torch.matmul(t1, t2)` |
| Sum / mean / std | `a.sum()`, `a.mean()`, `a.std()` | `t.sum()`, `t.mean()`, `t.std()` |
| Sum along an axis | `a.sum(axis=0)` | `t.sum(dim=0)` |
| Max / argmax | `a.max()`, `a.argmax()` | `t.max()`, `t.argmax()` |
| Max along an axis | `a.max(axis=1)` | `t.max(dim=1)` → `(values, indices)` |
| Clip | `np.clip(a, 0, 1)` | `torch.clamp(t, 0, 1)` |
| Cumulative sum | `np.cumsum(a)` | `torch.cumsum(t, dim=0)` |
| Sort | `np.sort(a)` | `torch.sort(t)` → `(values, indices)` |
| Unique | `np.unique(a)` | `torch.unique(t)` |
| Exp / log / sqrt | `np.exp(a)`, `np.log(a)`, `np.sqrt(a)` | `torch.exp(t)`, `torch.log(t)`, `torch.sqrt(t)` |
| Softmax | — (write it by hand) | `torch.softmax(t, dim=-1)` |
| Einstein summation | `np.einsum('ij,jk->ik', a, b)` | `torch.einsum('ij,jk->ik', t1, t2)` |

`t.max(dim=1)` returning a named tuple `(values, indices)` instead of just the max — same for `.min()`, `.sort()`, `.topk()` — is the single most common source of "why is this a tuple" confusion coming from NumPy, where `.max(axis=...)` returns just the values.

### Reshaping and Combining

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| Reshape | `a.reshape(2, 6)` | `t.reshape(2, 6)` or `t.view(2, 6)` |
| Transpose (2D) | `a.T` | `t.T` or `t.transpose(0, 1)` |
| Permute (N-D) | `np.transpose(a, (2, 0, 1))` | `t.permute(2, 0, 1)` |
| Concatenate | `np.concatenate([a, b], axis=0)` | `torch.cat([t1, t2], dim=0)` |
| Stack (new axis) | `np.stack([a, b], axis=0)` | `torch.stack([t1, t2], dim=0)` |
| Split | `np.split(a, 3, axis=0)` | `torch.split(t, split_size, dim=0)` |
| Repeat elements | `np.repeat(a, 2, axis=0)` | `t.repeat_interleave(2, dim=0)` |
| Tile | `np.tile(a, (2, 1))` | `t.repeat(2, 1)` |

`view` requires contiguous memory and shares storage with the original tensor; `reshape` works either way, copying only when it has to. Default to `reshape` unless you specifically need the no-copy guarantee.

### Linear Algebra

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| Dot product | `np.dot(a, b)` | `torch.dot(t1, t2)` (1D only) |
| Matrix inverse | `np.linalg.inv(a)` | `torch.linalg.inv(t)` |
| Determinant | `np.linalg.det(a)` | `torch.linalg.det(t)` |
| Eigenvalues | `np.linalg.eig(a)` | `torch.linalg.eig(t)` |
| SVD | `np.linalg.svd(a)` | `torch.linalg.svd(t)` |
| Norm | `np.linalg.norm(a)` | `torch.linalg.norm(t)` |
| Solve `Ax = b` | `np.linalg.solve(A, b)` | `torch.linalg.solve(A, b)` |

### Random Numbers

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| Seed | `np.random.seed(0)` | `torch.manual_seed(0)` |
| Uniform `[0, 1)` | `np.random.rand(2, 3)` | `torch.rand(2, 3)` |
| Standard normal | `np.random.randn(2, 3)` | `torch.randn(2, 3)` |
| Random ints | `np.random.randint(0, 10, (2, 3))` | `torch.randint(0, 10, (2, 3))` |
| Shuffle | `np.random.permutation(a)` | `t[torch.randperm(len(t))]` |
| Recommended generator | `rng = np.random.default_rng(0)`, then `rng.normal(...)` | `torch.Generator().manual_seed(0)`, passed to sampling calls |

Prefer `np.random.default_rng()` over the legacy `np.random.seed()` global-state API in any new code — it's the same reasoning that favors an explicit `torch.Generator` over relying on the single global RNG state when reproducibility across multiple independent streams matters.

### Dtypes and Devices

| Operation | NumPy | PyTorch |
| --- | --- | --- |
| Check dtype | `a.dtype` | `t.dtype` |
| Cast | `a.astype(np.float32)` | `t.to(torch.float32)` or `t.float()` |
| Default float | `float64` | `float32` |
| Move to GPU | — | `t.to("cuda")` or `t.cuda()` |
| Check device | — | `t.device` |
| Move + cast together | — | `t.to(device="cuda", dtype=torch.float16)` |

The default-dtype mismatch trips people up constantly: `np.array([1.0, 2.0])` is `float64`, but `torch.tensor([1.0, 2.0])` is `float32`. Converting a NumPy `float64` array straight into a model expecting `float32` weights is a very common source of a silent dtype-promotion slowdown or an explicit dtype-mismatch error.

### NumPy ⇄ PyTorch Interop

```python
# NumPy -> PyTorch (shares memory on CPU — mutating one mutates the other)
t = torch.from_numpy(a)

# PyTorch -> NumPy (also shares memory; tensor must be on CPU, no grad)
a = t.numpy()
a = t.detach().cpu().numpy()  # safe general-purpose version
```

`t.detach().cpu().numpy()` is the version to reach for by default: `.detach()` drops it from the autograd graph (skip if the tensor doesn't require grad), `.cpu()` is a no-op if it's already on CPU and otherwise necessary since NumPy has no concept of a GPU tensor, and only then can `.numpy()` succeed.

### Autograd (PyTorch-only)

```python
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x

y.backward()      # populates x.grad
print(x.grad)      # dy/dx = 2x + 3 = 7.0

with torch.no_grad():
    x -= 0.1 * x.grad   # a manual gradient step, untracked

x.grad.zero_()      # gradients accumulate by default — zero before the next backward()
```

Three things that catch people every time: gradients **accumulate** into `.grad` across multiple `backward()` calls unless you zero them; `backward()` only works on a scalar output (call `.sum()` or `.mean()` first, or pass a `gradient=` tensor matching the output's shape); and any in-place op on a tensor that's part of the graph you still need for backward raises a `RuntimeError` rather than silently corrupting gradients.

### Building a Model: `nn.Module`

```python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_dim: int, hidden: int, out_dim: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden),
            nn.ReLU(),
            nn.Linear(hidden, out_dim),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

model = MLP(784, 128, 10)
```

Every submodule assigned as an attribute (`self.net = ...`) is auto-registered — `model.parameters()` walks the whole tree and finds them, no manual bookkeeping needed. `model(x)` is the call to make (not `model.forward(x)` directly) — the `__call__` path is what runs registered hooks.

### Training Loop Skeleton

```python
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

model.train()
for x, y in dataloader:
    optimizer.zero_grad()
    logits = model(x)
    loss = loss_fn(logits, y)
    loss.backward()
    optimizer.step()
```

`optimizer.zero_grad()` before the forward pass (not just before `backward()`) is the convention to default to. At eval time, wrap the forward pass in `with torch.no_grad():` and call `model.eval()` first — the latter matters specifically for layers that behave differently in train vs. eval (`Dropout`, `BatchNorm`), and is easy to forget since nothing errors if you don't.

### Python Idioms Worth Knowing Cold

Not PyTorch or NumPy specific, but the plain-Python patterns that show up in nearly every data/ML script:

```python
# Comprehensions over map/filter
squares = [x**2 for x in range(10) if x % 2 == 0]
lookup = {name: i for i, name in enumerate(labels)}

# enumerate / zip instead of manual indexing
for i, (x, y) in enumerate(zip(xs, ys)):
    ...

# collections.Counter / defaultdict for tallying and grouping
from collections import Counter, defaultdict
counts = Counter(labels)
groups = defaultdict(list)
for row in data:
    groups[row["category"]].append(row)

# dataclasses instead of ad hoc dicts for config/records
from dataclasses import dataclass

@dataclass
class Config:
    lr: float = 1e-3
    batch_size: int = 32

# pathlib instead of os.path string joining
from pathlib import Path
ckpt_dir = Path("runs") / "exp1" / "checkpoints"
ckpt_dir.mkdir(parents=True, exist_ok=True)

# context managers for anything with setup/teardown
with open("results.jsonl") as f:
    rows = [json.loads(line) for line in f]

# f-strings with inline formatting
print(f"loss={loss.item():.4f}  lr={lr:.1e}")
```

`.item()` on a scalar tensor (like `loss` above) pulls out a plain Python float — printing or logging the tensor directly works too, but `.item()` avoids dragging autograd machinery into a log line and is the right habit for anything that gets called every training step.
