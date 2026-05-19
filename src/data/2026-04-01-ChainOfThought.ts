import { BlogPost } from './blogPosts';

export const ChainOfThought: BlogPost = {
  id: '4',
  title: 'Reasoning Traces: How Chain-of-Thought Changed What LLMs Can Do',
  excerpt:
    'An investigation into why making language models think out loud before answering unlocks capabilities that scale, generalize, and surprise — and what it tells us about the nature of machine reasoning.',
  date: '2026-04-01',
  readTime: '9 min read',
  category: 'AI',
  slug: 'reasoning-traces-chain-of-thought',
  content: [
    {
      type: 'html',
      html: `
<div class="toc">
  <div class="toc-title">Contents</div>
  <ol>
    <li><a href="#the-gap">The Reasoning Gap</a></li>
    <li><a href="#what-is-cot">What Is Chain-of-Thought?</a></li>
    <li><a href="#why-it-works">Why It Works — Three Hypotheses</a></li>
    <li><a href="#benchmarks">Benchmark Results</a></li>
    <li><a href="#from-prompting-to-training">From Prompting to Training</a></li>
    <li><a href="#emergent">Emergence and Scale</a></li>
    <li><a href="#implications">What This Means in Practice</a></li>
    <li><a href="#open-questions">Open Questions</a></li>
  </ol>
</div>
`,
    },

    {
      type: 'html',
      html: `<h2 id="the-gap" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:2.5rem;margin-bottom:1rem;letter-spacing:0.01em;">The Reasoning Gap</h2>`,
    },
    {
      type: 'paragraph',
      text: `Ask a 100-billion-parameter language model what 17 × 24 is and it will often confidently give you the wrong answer. Ask it to narrate each step of the multiplication and suddenly the correct answer appears. This gap — between what a model <em>knows</em> and what it can reliably <em>compute</em> — was one of the sharpest puzzles in early LLM research.`,
    },
    {
      type: 'paragraph',
      text: `The core problem is autoregressive generation: each token is produced by attending to everything that came before it, then predicting what comes next. A model answering a multi-step arithmetic problem in a single token has to compress all intermediate work into one forward pass. Humans do not think this way. We write things down. We hold partial results in working memory. We check sub-goals before committing to a conclusion.`,
    },
    {
      type: 'html',
      html: `
<div class="pullquote">
  <p>"The model doesn't think then speak. It speaks in order to think."</p>
</div>
`,
    },

    {
      type: 'html',
      html: `<h2 id="what-is-cot" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">What Is Chain-of-Thought?</h2>`,
    },
    {
      type: 'paragraph',
      text: `Chain-of-thought (CoT) prompting, introduced by Wei et al. (2022), is conceptually simple: instead of asking a model to jump directly to an answer, you include exemplars in the prompt where the reasoning is spelled out step by step. The model learns — in context — to mimic that intermediate structure before committing to a final answer.`,
    },
    {
      type: 'html',
      html: `
<figure>
  <div class="figure-placeholder">
    <span class="figure-label">Figure 1</span>
    <span class="figure-desc">Standard prompting vs. chain-of-thought prompting on a GSM8K arithmetic problem. Standard produces a single token answer; CoT generates an intermediate scratchpad before the boxed answer.</span>
  </div>
  <figcaption><strong>Figure 1.</strong> Standard vs. chain-of-thought prompting. The scratchpad tokens are discarded at inference time but are critical to accuracy during generation.</figcaption>
</figure>
`,
    },
    {
      type: 'paragraph',
      text: `Zero-shot CoT goes further: simply appending <em>"Let's think step by step."</em> to a question — with no worked examples — yields large accuracy gains. This suggests the model already has latent reasoning ability; the prompt just unlocks a different generation mode.`,
    },

    {
      type: 'html',
      html: `<h2 id="why-it-works" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">Why It Works — Three Hypotheses</h2>`,
    },
    {
      type: 'paragraph',
      text: `There is no settled consensus on the mechanism. Three competing explanations are each partially supported by evidence:`,
    },
    {
      type: 'html',
      html: `
<h3>1. Computation Allocation</h3>
`,
    },
    {
      type: 'paragraph',
      text: `Generating intermediate tokens allocates more compute to the problem. Each token in the scratchpad is a full forward pass, so a 50-token reasoning chain is 50 forward passes rather than one. On tasks that require more computation than a single pass can provide, this alone may explain the gains.`,
    },
    {
      type: 'html',
      html: `<h3>2. Implicit Sub-goal Decomposition</h3>`,
    },
    {
      type: 'paragraph',
      text: `Writing down a partial result — <em>"the speed is 60 km/h"</em> — makes that fact available in the context window for subsequent attention. The model is effectively externalizing working memory. Sub-goals that would require long-range attention to recall are now encoded as recent tokens, where attention cost is low.`,
    },
    {
      type: 'html',
      html: `<h3>3. Training Distribution Alignment</h3>`,
    },
    {
      type: 'paragraph',
      text: `Human-written text is full of reasoning traces: worked examples in textbooks, Stack Overflow answers that explain before concluding, proofs that show their work. Prompting for step-by-step reasoning may shift the model's generation distribution toward these higher-quality training examples.`,
    },
    {
      type: 'html',
      html: `
<div class="callout">
  <strong>Note on separability:</strong> These hypotheses are not mutually exclusive. Controlled ablations (Lanham et al., 2023) found that corrupting intermediate steps still improved accuracy over no-CoT on some tasks, suggesting training distribution effects are real — but corrupting final steps hurt badly, suggesting the scratchpad is not purely decorative.
</div>
`,
    },

    {
      type: 'html',
      html: `<h2 id="benchmarks" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">Benchmark Results</h2>`,
    },
    {
      type: 'paragraph',
      text: `The gains are substantial and consistent across reasoning-heavy benchmarks. On GSM8K (grade-school math word problems), accuracy with CoT prompting on PaLM 540B jumped from 17.9% to 56.9% — a factor-of-three improvement with no weight updates. On MATH (competition-level problems), the gains are smaller but still meaningful, suggesting that CoT helps most where problems are decomposable into clean sub-steps.`,
    },
    {
      type: 'html',
      html: `
<figure>
  <div class="bar-chart" style="margin-bottom:0.5rem;">
    <div style="font-size:0.7rem;font-weight:400;letter-spacing:0.08em;text-transform:uppercase;color:#a8a29e;margin-bottom:0.5rem;">GSM8K accuracy (%) — PaLM 540B</div>
    <div class="bar-row">
      <span class="bar-name">Standard</span>
      <div class="bar-track">
        <div class="bar-fill" style="width:31.8%"><span class="bar-value">17.9%</span></div>
      </div>
    </div>
    <div class="bar-row">
      <span class="bar-name">CoT (8-shot)</span>
      <div class="bar-track">
        <div class="bar-fill accent" style="width:100%"><span class="bar-value">56.9%</span></div>
      </div>
    </div>
  </div>
  <div class="bar-chart" style="margin-top:1rem;">
    <div style="font-size:0.7rem;font-weight:400;letter-spacing:0.08em;text-transform:uppercase;color:#a8a29e;margin-bottom:0.5rem;">MATH accuracy (%) — GPT-4</div>
    <div class="bar-row">
      <span class="bar-name">Standard</span>
      <div class="bar-track">
        <div class="bar-fill" style="width:64%"><span class="bar-value">42.5%</span></div>
      </div>
    </div>
    <div class="bar-row">
      <span class="bar-name">CoT</span>
      <div class="bar-track">
        <div class="bar-fill accent" style="width:96%"><span class="bar-value">63.0%</span></div>
      </div>
    </div>
  </div>
  <figcaption><strong>Figure 2.</strong> Chain-of-thought gains on two standard reasoning benchmarks. GSM8K measures elementary math reasoning; MATH measures competition-level problem-solving. Figures from Wei et al. (2022) and OpenAI (2023).</figcaption>
</figure>
`,
    },
    {
      type: 'html',
      html: `
<div class="results-grid">
  <div class="result-card">
    <div class="value">3×</div>
    <div class="label">GSM8K accuracy gain on PaLM 540B</div>
  </div>
  <div class="result-card">
    <div class="value">~0</div>
    <div class="label">Gain on small models (&lt;10B params)</div>
  </div>
  <div class="result-card">
    <div class="value">100B+</div>
    <div class="label">Parameter threshold for emergent CoT benefit</div>
  </div>
</div>
`,
    },

    {
      type: 'html',
      html: `<h2 id="from-prompting-to-training" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">From Prompting to Training</h2>`,
    },
    {
      type: 'paragraph',
      text: `CoT-as-prompting is powerful but fragile: it depends on hand-crafted exemplars and can fail when the problem distribution shifts. The natural next step was to bake reasoning traces into training itself.`,
    },
    {
      type: 'html',
      html: `<h3>Supervised Fine-tuning on Rationales</h3>`,
    },
    {
      type: 'paragraph',
      text: `Models like Flan-T5 were fine-tuned on datasets where human annotators or stronger models provided rationales alongside answers. This produced smaller models that could reason step-by-step without depending on few-shot exemplars in the prompt.`,
    },
    {
      type: 'html',
      html: `<h3>Process Reward Models</h3>`,
    },
    {
      type: 'paragraph',
      text: `Outcome-based reinforcement — reward the model only when it gets the final answer right — suffers from reward hacking: the model learns to produce plausible-looking but incorrect intermediate steps. Process reward models (PRMs) instead score each reasoning step independently, trained on human judgments of step correctness. Lightman et al. (2023) showed that verifying steps rather than outcomes substantially improved performance on MATH, and that models trained with PRMs made qualitatively different (more careful) errors.`,
    },
    {
      type: 'html',
      html: `
<figure>
  <div class="figure-placeholder">
    <span class="figure-label">Figure 3</span>
    <span class="figure-desc">Outcome reward model (ORM) vs. process reward model (PRM) training dynamics. ORM rewards only the terminal answer token. PRM rewards each step, making the training signal denser and reducing reward hacking on intermediate steps.</span>
  </div>
  <figcaption><strong>Figure 3.</strong> Outcome vs. process reward model comparison. PRM training reduces the mode of failure where a model reaches a correct answer via incorrect intermediate reasoning — a failure mode that is invisible to outcome-only supervision. (Lightman et al., 2023)</figcaption>
</figure>
`,
    },
    {
      type: 'html',
      html: `<h3>Reinforcement Learning from Reasoning Traces</h3>`,
    },
    {
      type: 'paragraph',
      text: `DeepSeek-R1 and OpenAI's o1/o3 family represent the current frontier: models that are trained end-to-end to produce long, exploratory reasoning traces using RL-based methods. These models learn to backtrack, verify sub-results, and explore alternative approaches — behaviors that emerge from the training objective rather than from explicit supervision.`,
    },

    {
      type: 'html',
      html: `<h2 id="emergent" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">Emergence and Scale</h2>`,
    },
    {
      type: 'paragraph',
      text: `One of the most striking findings in the CoT literature is that the gains are almost entirely absent below ~100 billion parameters. Smaller models given the same CoT prompts often produce reasoning-shaped outputs — grammatically coherent, logically structured — but arrive at wrong answers at similar rates to direct prompting. The reasoning trace is confabulated rather than functional.`,
    },
    {
      type: 'html',
      html: `
<div class="pullquote">
  <p>"Below the threshold, the model can produce the shape of reasoning without its substance. The words are there; the computation is not."</p>
</div>
`,
    },
    {
      type: 'paragraph',
      text: `This is evidence of an emergent capability in the strict sense: a property that appears discontinuously as scale increases, not as a smooth extrapolation of smaller-scale behavior. Whether emergence is genuine or an artifact of the metrics used to measure it remains actively debated (Schaeffer et al., 2023), but the practical implication is clear: CoT is not a free lunch. It requires a model large enough (or trained specifically enough) that intermediate tokens carry genuine semantic weight.`,
    },

    {
      type: 'html',
      html: `<h2 id="implications" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">What This Means in Practice</h2>`,
    },
    {
      type: 'paragraph',
      text: `For practitioners building on top of foundation models, the CoT literature suggests several concrete choices:`,
    },
    {
      type: 'table',
      headers: ['Scenario', 'Recommendation'],
      rows: [
        ['Multi-step reasoning (math, logic, planning)', 'Always prompt for step-by-step output, even zero-shot. Budget for 3–10× more output tokens.'],
        ['Latency-sensitive applications', 'Use a smaller reasoning-tuned model (e.g., distilled from a larger CoT-trained model) rather than prompting a large model.'],
        ['High-stakes decisions', 'Use process verification: have a second model check each step, or surface the trace to a human reviewer.'],
        ['Simple retrieval or classification', 'CoT adds cost without benefit. Use direct prompting or fine-tuning.'],
        ['Domain-specific tasks', 'Few-shot CoT with domain-relevant exemplars outperforms zero-shot CoT by 5–15 points on most tasks.'],
      ],
    },

    {
      type: 'html',
      html: `<h2 id="open-questions" style="font-size:1.6rem;font-weight:300;color:#1c1917;margin-top:3rem;margin-bottom:1rem;letter-spacing:0.01em;">Open Questions</h2>`,
    },
    {
      type: 'paragraph',
      text: `Despite rapid progress, some of the most important questions remain open:`,
    },
    {
      type: 'html',
      html: `
<h3>Does the model "really" reason, or does it pattern-match on reasoning-shaped text?</h3>
`,
    },
    {
      type: 'paragraph',
      text: `Controlled experiments show that models can be misled by irrelevant context inserted into CoT traces, suggesting they are not purely symbolic reasoners. But they also detect and correct errors in their own chains, suggesting genuine computation is happening. The truth is probably both, in varying proportions depending on the task.`,
    },
    {
      type: 'html',
      html: `<h3>What is the right unit of verification?</h3>`,
    },
    {
      type: 'paragraph',
      text: `Process reward models require step-level annotations, which are expensive to produce. Automatic verification is possible for tasks with ground truth (math, code), but most real-world reasoning tasks lack this structure. Developing cheap, reliable step-level verifiers is one of the central open problems in alignment research.`,
    },
    {
      type: 'html',
      html: `<h3>Can reasoning traces be made shorter without losing their benefits?</h3>`,
    },
    {
      type: 'paragraph',
      text: `Current reasoning models (o1, o3, DeepSeek-R1) produce very long traces — sometimes thousands of tokens for a single query. The compute cost is significant. Techniques like chain-of-thought distillation and adaptive computation (generating long chains only for hard problems) are active areas of research.`,
    },

    {
      type: 'html',
      html: `
<div style="margin-top:3rem;padding-top:2rem;border-top:1px solid #e7e5e4;">
  <div class="pre-label">Citation</div>
  <pre><code>@article{wei2022chain,
  title   = {Chain-of-Thought Prompting Elicits Reasoning in Large Language Models},
  author  = {Wei, Jason and Wang, Xuezhi and Schuurmans, Dale and
             Bosma, Maarten and Ichter, Brian and Xia, Fei and
             Chi, Ed H. and Le, Quoc V. and Zhou, Denny},
  journal = {NeurIPS},
  year    = {2022}
}

@article{lightman2023let,
  title   = {Let's Verify Step by Step},
  author  = {Lightman, Hunter and Kosaraju, Vineet and Burda, Yura and
             Edwards, Harrison and Baker, Bowen and Lee, Teddy and
             Leike, Jan and Schulman, John and Sutskever, Ilya and
             Cobbe, Karl},
  journal = {arXiv:2305.20050},
  year    = {2023}
}</code></pre>
</div>
`,
    },
  ],
};
