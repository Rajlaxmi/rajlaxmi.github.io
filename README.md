# rajlaxmi.github.io

Personal site — React + Vite + Tailwind, deployed to GitHub Pages.

Copyright (c) 2025 Rajlaxmi. See LICENSE.

## Local development

```
npm install
npm run dev
```

## Writing a blog post

Posts are plain markdown files in `src/content/blog/`. Drop a new `.md` file in
that folder and it is published — there is no generation step and nothing else
to edit.

Name files `YYYY-MM-DD-some-slug.md`. The date and slug in the filename are used
as defaults when the frontmatter omits them.

```markdown
---
title: The Power of a Personal Garage
slug: power-of-personal-garage       # optional — defaults to the filename
date: 2025-05-01                     # optional — defaults to the filename prefix
category: Productivity               # shown next to the post title
readTime: 4 min read                 # optional — estimated from word count if absent
excerpt: One or two sentences. Used as the standfirst and in the writing list.
tags: [making, spaces]               # optional
draft: true                          # optional — drafts never appear on the site
---

Body text in ordinary markdown.

## Headings, **bold**, *italic*, links and lists all work

GitHub-flavoured tables are supported:

| Element | Guiding Question           |
| ------- | -------------------------- |
| Purpose | Why am I doing this?       |

Images live in `public/` and are referenced from the site root:

![Aristotle and an acorn](/aristotle-corn.png)
```

The alt text doubles as the image caption. Posts are sorted newest-first
automatically, and each article page links to the neighbouring posts.

### How it works

`src/lib/posts.ts` picks the files up with Vite's `import.meta.glob`, so the
markdown is inlined into the bundle at build time — no runtime fetching.
Frontmatter is parsed by `src/lib/frontmatter.ts`; rendering happens in
`src/components/Prose.tsx` via `react-markdown` + `remark-gfm`.

Raw HTML in markdown is intentionally **not** rendered — use markdown syntax
(`**bold**` rather than `<b>bold</b>`).

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

Pushing to `master` triggers `.github/workflows/` to build and publish to GitHub
Pages. To deploy by hand:

```
npm run deploy   # runs the build, then publishes dist/ via gh-pages
```

Notes:
- `base: '/'` in `vite.config.ts` is required for user/organization sites.
- Routing uses `HashRouter`, so GitHub Pages needs no rewrite rules and URLs
  look like `/#/blog/entelechy`.
