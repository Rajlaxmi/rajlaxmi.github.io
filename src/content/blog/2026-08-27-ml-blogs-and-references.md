---
title: Machine Learning Blogs and References Worth Bookmarking
slug: ml-blogs-and-references
date: 2026-08-27
category: Reference
excerpt: A categorized reading list — systems deep-dives, visual explanations of the Transformer, interpretability research, post-training, and applied ML engineering.
tags: [blogs, references, reading-list, machine-learning]
draft: false
authorship: ai-coauthored
---

Not a ranked "best of" list — a categorized set of blogs and long-form references that keep coming up as genuinely worth the time, grouped by what they're actually useful for.

### Systems, Performance, and Efficiency

- **[Making Deep Learning Go Brrrr From First Principles](https://horace.io/brrr_intro.html)** — Horace He (PyTorch core team; `torch.compile`, FlexAttention). The reference for actually reasoning about GPU performance: every model is bottlenecked by compute, memory bandwidth, or overhead, and this post teaches you to tell which one you're looking at instead of cargo-culting optimizations.
- **[Tim Dettmers' blog](https://timdettmers.com/)** — the person behind `bitsandbytes` and LLM.int8(). Deep, first-principles posts on quantization and making large models run on hardware you actually have.

### Foundations and Visual Explanations

- **[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)** — Jay Alammar. The diagram-first walkthrough of "Attention Is All You Need" that's ended up in Transformer courses at Stanford, Harvard, MIT, and beyond — a good companion to a from-scratch code read.
- **[The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html)** — Sasha Rush / Harvard NLP. The paper re-presented as a line-by-line, runnable PyTorch implementation — every equation immediately followed by the code that implements it.
- **[Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)** — Chris Olah. Older (pre-Transformer) but still the clearest explanation of gating and recurrence anywhere, and a good look at how the field's best explainer thinks.
- **[Distill](https://distill.pub/)** — an interactive, visual journal for ML research (now on indefinite hiatus), but the back catalog — attention, feature visualization, t-SNE — is still some of the best explanatory work the field has produced.

### Research Deep Dives and Interpretability

- **[Lil'Log](https://lilianweng.github.io/)** — Lilian Weng (co-founder, Thinking Machines Lab; formerly OpenAI). Long, thorough survey posts — diffusion models, RLHF, agents, test-time compute — that read like a literature review someone already did the hard work of organizing for you.
- **[Transformer Circuits Thread](https://transformer-circuits.pub/)** — Anthropic's mechanistic interpretability research, presented as a running thread rather than isolated papers: induction heads, superposition, dictionary learning, and circuit tracing each building on the last.

### Post-Training, Alignment, and RLHF

- **[Interconnects](https://www.interconnects.ai/)** — Nathan Lambert. Consistently the best ongoing commentary on post-training specifically — RLHF, preference tuning, reasoning-model training, and close reads of how frontier labs' released recipes actually work.
- **[RLHF Book](https://rlhfbook.com/)** — also Nathan Lambert. A free, continuously-updated online textbook on reinforcement learning from human feedback and post-training — the more structured counterpart to Interconnects' running commentary.

### Applied ML Engineering

- **[Chip Huyen](https://huyenchip.com/)** — author of *Designing Machine Learning Systems*; her site doubles as a self-paced MLOps curriculum, from fundamentals through production ML systems design.
- **[Eugene Yan](https://eugeneyan.com/)** — applied ML and recommendation systems, with a strong bias toward "what actually works in production" over novelty.
- **[Simon Willison's Weblog](https://simonwillison.net/)** — prolific, practical writing on LLM tooling, prompt engineering, and the practice of building software with (and evaluating) language models.

### Training Practice and Newsletters

- **[A Recipe for Training Neural Networks](http://karpathy.github.io/2019/04/25/recipe/)** — Andrej Karpathy. Not a specific architecture or paper — a disciplined process for debugging and training neural nets that holds up regardless of what you're training.
- **[Ahead of AI](https://magazine.sebastianraschka.com/)** — Sebastian Raschka (author of *Build a Large Language Model From Scratch*). A steady cadence of clear, well-sourced explainers on new papers and techniques as they land.
