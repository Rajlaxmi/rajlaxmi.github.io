# rajlaxmi.github.io

Personal site — React + Vite + Tailwind, deployed to GitHub Pages.

Copyright (c) 2025 Rajlaxmi. See LICENSE.

## Docs

- [Writing blog posts](docs/writing-blog-posts.md) — frontmatter, supported
  markdown, drafts
- [Hosting and deployment](docs/hosting-and-deployment.md) — how the site gets
  published, and what to watch out for

## Local development

```
npm install
npm run dev
```

## Writing a blog post

Posts are plain markdown files in `src/content/blog/`. Drop a new
`YYYY-MM-DD-some-slug.md` file in that folder and it is published — no
generation step, nothing else to edit.

```markdown
---
title: The Power of a Personal Garage
category: Productivity
excerpt: One or two sentences, used as the standfirst and in the writing list.
tags: [making, spaces]
---

Body text in ordinary markdown.
```

**See [docs/writing-blog-posts.md](docs/writing-blog-posts.md)** for the full
frontmatter reference, the markdown features that are supported, drafts, and the
gotchas worth knowing.

## Adding a project

Featured work lives in `src/content/projects.ts`. Add an entry to the array and
the section lays itself out — no markup to touch.

```ts
{
  title: 'Attention-Gated-Networks',
  description: 'One or two sentences.',
  tags: ['PyTorch', 'Computer Vision'],
  video: '/neuralnet.mp4',        // optional; served from public/
  image: 'https://…',             // optional; used only when there is no video
  liveUrl: 'https://…',           // optional
  githubUrl: 'https://…',         // optional
}
```

`liveUrl` and `githubUrl` are hidden when absent or still set to the `"#"`
placeholder, so a project never renders a dead link. Entries with neither
`video` nor `image` run full width instead of leaving an empty column, and the
media side alternates left/right down the list automatically.

## Design system

Tokens live as CSS custom properties in `src/index.css` and are exposed to
Tailwind in `tailwind.config.js` as `paper`, `surface`, `ink`, `muted`, `faint`,
`rule` and `accent`. Light and dark are the same tokens with different values,
switched by a `dark` class on `<html>` (see `src/hooks/useTheme.ts`).

Type is EB Garamond, self-hosted via `@fontsource-variable/eb-garamond`, with a
monospace stack for the small tracked-out labels (`.eyebrow`).

Sections on the home page use `src/components/Section.tsx`, which provides the
sticky numbered rail and the content column.

## Deployment

Merging to `master` on `Rajlaxmi/rajlaxmi.github.io` triggers
`.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub
Pages at <https://rajlaxmi.github.io/>. It takes about 45 seconds. Nothing else
deploys.

> Note: `npm run deploy` is left over from the old `gh-pages` branch setup and
> no longer publishes anything — Pages is sourced from the workflow now.

**See [docs/hosting-and-deployment.md](docs/hosting-and-deployment.md)** for the
fork/PR flow, why `base: '/'` and `HashRouter` matter, rolling back, and adding a
custom domain.
