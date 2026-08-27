---
title: Post-Training LLMs, and Building a Verifier With Prime Intellect
slug: post-training-with-prime-intellect
date: 2026-08-26
category: Machine Learning
excerpt: What SFT, RLHF, DPO, and RLVR each actually do to a model — then a hands-on walkthrough building a dataset, a verifier, and an eval with Prime Intellect's Verifiers framework.
tags: [post-training, rlhf, rlvr, prime-intellect, verifiers]
draft: false
authorship: ai-coauthored
---

### Overview

A pretrained base model is a next-token predictor over internet-scale text. It is not, by default, an assistant: it will happily continue a question with more questions, ramble past the point where a good answer ended, or complete a harmful prompt because that's a statistically plausible continuation. Post-training is the set of techniques that turn that raw completion engine into something that follows instructions, stays on-task, and — increasingly — actually gets verifiable problems *right*.

There isn't one post-training technique; there's a pipeline, and different stages solve different problems:

![Post-training pipeline: a pretrained base model goes through supervised fine-tuning, then preference or RL tuning, to become a deployed assistant model](/post-training-pipeline.svg)

The rest of this post covers each stage, then goes hands-on: building an actual verifiable task — dataset, reward function, and eval — using Prime Intellect's `verifiers` framework and `prime` CLI, and connecting that verifier back to the RL theory.

### Supervised Fine-Tuning (SFT)

SFT is imitation learning. You curate a set of `(prompt, response)` pairs — written by humans, or distilled from a stronger model — and train with the same next-token cross-entropy loss as pretraining, just restricted to the response tokens:

```
L_SFT = -Σ_t log P(y_t | x, y_<t))
```

This is what gets a base model to *look* like an assistant: it learns the format of instruction-following, turn-taking, and stopping when it's done. But it's fundamentally bounded by the demonstration data — the model can't learn to be better than its demonstrations, and collecting enough high-quality demonstrations for every task you care about doesn't scale. That's the gap the next two families of techniques are for.

### Learning From Preferences: RLHF and DPO

Preference data is cheaper to collect than demonstrations — it's much easier for a human to look at two responses and say which is better than to write a great response from scratch. Two techniques use this signal very differently.

**RLHF** does it in three stages:

1. Sample a few completions per prompt from the SFT model, and collect human preferences over pairs (`y_w` preferred over `y_l`).
2. Train a separate reward model `r_φ(x, y)` on those pairs with a Bradley-Terry pairwise loss:

   ```
   L_RM = -E[log σ(r_φ(x, y_w) - r_φ(x, y_l))]
   ```

3. Optimize the policy with PPO to maximize the learned reward, subject to a KL penalty against a frozen reference policy (usually the SFT model):

   ```
   maximize  E[r_φ(x, y)]  -  β · KL(π_θ(·|x) ‖ π_ref(·|x))
   ```

The KL term matters more than it looks: without it, the policy will happily find inputs that fool the reward model into giving a high score for a low-quality response — Goodhart's law applied to a learned reward. It's a real bottleneck in practice: you're now running RL against a *proxy* for what you actually want, and the whole three-stage pipeline (reward model + PPO rollouts + a reference model, all resident at once) is expensive and finicky to get stable.

**DPO** sidesteps the reward model and the RL loop entirely. The key observation is that the optimal policy for the RLHF objective above has a closed-form relationship to the reward model — so you can substitute that relationship back into the Bradley-Terry loss and optimize the policy *directly* on preference pairs:

```
L_DPO = -E[log σ( β log(π_θ(y_w|x)/π_ref(y_w|x)) - β log(π_θ(y_l|x)/π_ref(y_l|x)) )]
```

This is just a binary classification loss over "which response was preferred," computed from log-probability ratios the policy already gives you for free. No reward model, no sampled rollouts, no PPO instability — which is a large part of why DPO displaced RLHF-via-PPO as the default for preference tuning once it was published.

Both of these are still bottlenecked on human (or human-like) preference judgments, though — which is expensive, noisy, and doesn't scale cleanly to domains like math or code where "better" is often just *correct*.

### RL From Verifiable Rewards (RLVR)

When a task has a programmatically checkable answer — a math problem with a final numeric answer, code that either passes its tests or doesn't, output that either matches a required format or doesn't — you don't need a learned reward model or a human in the loop at all. Write a function that checks the answer, and use *that* as the reward signal directly. This is RLVR, and it's the paradigm the "reasoning model" wave (o1-style extended chain-of-thought, trained with RL) is built on.

The dominant recipe for this — **GRPO** and its relatives — also removes the value network PPO normally needs to estimate a baseline. Instead: sample `G` completions per prompt (a *group*), score each one with the verifier, then normalize each reward against the group's own mean and standard deviation to get an advantage:

```
A_i = (r_i - mean(r_1..r_G)) / (std(r_1..r_G) + ε)
```

No separate critic model, no reward model — the group itself supplies the baseline. This is exactly the mechanic Prime Intellect's tooling is built around, as the practical section below shows directly.

![Rollout and reward loop: a dataset row is sent to the policy model, scored by the reward function, and N rollouts of the same prompt feed a group-relative advantage that drives the policy update](/rollout-reward-loop.svg)

### Where Prime Intellect Fits: Environments *Are* Verifiers

Prime Intellect's [Environments Hub](https://app.primeintellect.ai) and its `verifiers` library are built directly around the RLVR loop above. In this framework, an **environment** is three things bundled together:

- a **dataset** of tasks (prompts, plus enough info to check an answer)
- **rollout logic** — how the model interacts with the task (a single response, multiple turns, tool calls)
- a **rubric** — one or more reward functions that score a completion

The rubric *is* the verifier. And because the same environment definition drives both `prime eval run` (measure how a model does) and RL training (optimize a model against it), building a good verifier once gets you both an eval and a training signal for free.

### Setting Up a Lab Workspace

Everything below assumes a Prime Lab workspace, which gives you a standard `environments/` + `configs/` layout and the managed CLI:

```bash
prime lab setup
```

This scaffolds the workspace and prompts for a coding agent to wire skills into. From here, the whole environment lifecycle goes through the `prime` CLI — never hand-rolled scripts:

```bash
prime env init      # scaffold a new environment
prime env install   # install it locally, editable
prime eval run       # the canonical eval path
prime env push       # publish to the Hub
```

### Building an Environment: Dataset + Verifier

The simplest environment needs just a dataset and a reward function. Here's a small, complete one: given a list of full names, sort them alphabetically by last name, in a specific tagged output format — a task with an unambiguous, programmatically checkable answer.

```bash
prime env init last-name-sort
```

That generates `environments/last_name_sort/{last_name_sort.py, pyproject.toml, README.md}`. The implementation:

```python
import re
import verifiers as vf
from datasets import Dataset

NAME_LISTS = [
    ["Ada Lovelace", "Alan Turing", "Grace Hopper"],
    ["Yann LeCun", "Fei-Fei Li", "Geoffrey Hinton", "Andrew Ng"],
    ["Barbara Liskov", "Katherine Johnson", "Margaret Hamilton"],
    # ... more rows in practice; a handful is enough to demonstrate the shape
]

TAG_RE = re.compile(r"<sorted>\s*(.*?)\s*</sorted>", re.DOTALL)


def _prompt(names: list[str]) -> str:
    listed = "\n".join(names)
    return (
        f"Sort these names in alphabetical order by LAST name:\n{listed}\n\n"
        "Use exactly this format:\n<sorted>\nName One\nName Two\n</sorted>"
    )


def _build_dataset() -> Dataset:
    rows = []
    for names in NAME_LISTS:
        answer = "\n".join(sorted(names, key=lambda n: n.split()[-1]))
        rows.append({"question": _prompt(names), "answer": answer})
    return Dataset.from_list(rows)


async def exact_match(completion, answer) -> float:
    response = completion[-1]["content"]
    match = TAG_RE.search(response)
    if not match:
        return 0.0
    got = [line.strip() for line in match.group(1).splitlines() if line.strip()]
    return 1.0 if got == answer.splitlines() else 0.0


async def ordering_credit(completion, answer) -> float:
    """Partial credit: fraction of name-pairs in the right relative order.
    Logged as a metric (weight=0 below), not part of the scored reward —
    useful for telling 'close but for one swap' apart from 'ignored the format'."""
    response = completion[-1]["content"]
    match = TAG_RE.search(response)
    if not match:
        return 0.0
    got = [line.strip() for line in match.group(1).splitlines() if line.strip()]
    want = answer.splitlines()
    if sorted(got) != sorted(want):
        return 0.0
    position = {name: i for i, name in enumerate(want)}
    pairs = [(a, b) for i, a in enumerate(got) for b in got[i + 1 :]]
    correct = sum(1 for a, b in pairs if position[a] < position[b])
    return correct / len(pairs) if pairs else 1.0


def load_environment() -> vf.Environment:
    rubric = vf.Rubric(funcs=[exact_match, ordering_credit], weights=[1.0, 0.0])
    return vf.SingleTurnEnv(dataset=_build_dataset(), rubric=rubric)
```

A few things worth calling out, straight from the Verifiers docs:

- `load_environment()` is the required entrypoint — this is what `prime env install` and `prime eval run` look for.
- Reward functions request whatever they need from the rollout by argument name (`completion`, `answer`, `prompt`, `info`, `state`) — no boilerplate wiring.
- `weights=[1.0, 0.0]` means only `exact_match` counts toward the scored reward; `ordering_credit` still runs and appears in every rollout's metrics (`weight=0` is shorthand for "track this, don't optimize it").

`pyproject.toml` carries the package metadata and the eval defaults `prime eval run` falls back to when you don't pass flags:

```toml
[project]
name = "last-name-sort"
description = "Sort a list of names alphabetically by last name, in a tagged output format."
tags = ["single-turn", "formatting", "eval"]
version = "0.1.0"
requires-python = ">=3.10"
dependencies = ["verifiers>=0.1.14"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build]
include = ["last_name_sort.py", "pyproject.toml"]

[tool.verifiers.eval]
num_examples = 20
rollouts_per_example = 3
```

### Installing and Smoke-Testing

```bash
prime env install last-name-sort
prime eval run last-name-sort -m openai/gpt-4.1-mini -n 5
```

`prime eval run` is the canonical path deliberately — it saves results automatically (locally, and to a private Evaluations tab), rather than being a throwaway script output. A smoke test at `-n 5` is cheap and catches format/parsing bugs before spending a real budget on a full run.

### Reading a Real Eval Result

Every `prime eval run` writes a `metadata.json` alongside the per-example `results.jsonl`. Here's an actual one, from evaluating an existing Hub environment in the same family (sorting names by last name into a tagged format) against `Qwen/Qwen3.5-4B`:

```json
{
  "env_id": "alphabet-sort",
  "model": "Qwen/Qwen3.5-4B",
  "num_examples": 20,
  "rollouts_per_example": 1,
  "avg_reward": 0.95,
  "avg_metrics": { "weighted_reward": 0.95, "num_turns": 1.3 },
  "avg_error": 0.0,
  "pass_at_k": {},
  "usage": { "input_tokens": 111.55, "output_tokens": 3984.05 },
  "version_info": { "vf_version": "0.1.14", "env_version": "0.1.12" }
}
```

Reading it: 20 examples, one rollout each, `avg_reward` of `0.95` — the verifier scored 19-and-a-fraction out of 20 correct on average. `pass_at_k` is empty because it needs multiple rollouts per example to be meaningful (`rollouts_per_example: 1` here); running with `-r 4` or higher would populate it. `output_tokens` averaging ~3984 versus `input_tokens` of ~112 is a strong signal this model reasons at length before answering — worth knowing before assuming a low `avg_reward` on some other run means the *verifier* is wrong rather than the model just running out of its token budget mid-thought.

### Scaling With Config-Driven Evals

Past a quick smoke test, flags stop being the right interface — a TOML config keeps runs reproducible and lets one command sweep several environments or models:

```toml
# configs/eval/last-name-sort.toml
model = "Qwen/Qwen3.5-4B"
num_examples = 50
rollouts_per_example = 4

[[eval]]
env_id = "last-name-sort"
```

```bash
prime eval run configs/eval/last-name-sort.toml
```

Ablation sweeps go a step further — a `[[ablation]]` block with a `sweep` table expands into the cartesian product of every listed value automatically, so a temperature × difficulty sweep is one config, not a shell loop:

```toml
[[ablation]]
env_id = "last-name-sort"

[ablation.sweep]
temperature = [0.0, 0.5, 1.0]
```

### From Eval to RL Training

The same environment that produced the eval above is the training signal for RLVR — no separate reward-model training step, because the verifier already *is* the reward function. Hosted training reads a config shaped almost identically to the eval one:

```toml
# configs/rl/last-name-sort.toml
model = "Qwen/Qwen3.5-4B"

max_steps = 100
batch_size = 128
rollouts_per_example = 8

[sampling]
max_tokens = 1024

[[env]]
id = "last-name-sort"
```

`rollouts_per_example = 8` is exactly `G` from the GRPO formula earlier in this post — 8 rollouts sampled per prompt, each scored by `exact_match`, normalized against each other's mean and standard deviation to produce the advantage that drives the policy update. This is the direct, literal implementation of the "Rollout and reward loop" diagram above: `batch_size = 128` prompts per step, `rollouts_per_example = 8` completions each, one call to the verifier per completion, one group-relative advantage per prompt.

### Publishing to the Hub

Once local evals look stable, push the environment so it's reusable — by you in hosted training, or by anyone else browsing the Hub:

```bash
prime env push last-name-sort --visibility PUBLIC
```

(or `--visibility PRIVATE` to keep it to yourself). After publishing, large runs use the Hub slug directly:

```bash
prime eval run <owner>/last-name-sort -m openai/gpt-4.1-mini -n 200 -r 3 -s
```

### My Takeaways
