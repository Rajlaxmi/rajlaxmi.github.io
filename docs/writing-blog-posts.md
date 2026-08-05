# Writing blog posts

Posts are plain markdown files in `src/content/blog/`. Adding a file publishes a
post. There is no build step to run, no index to update, no component to touch.

## Quick start

1. Create `src/content/blog/2026-08-05-my-new-post.md`
2. Paste the template below and write
3. Run `npm run dev` and open the writing section — it is already there

```markdown
---
title: My New Post
category: Philosophy
excerpt: One or two sentences. Shown under the title on the article page, and in the writing list.
tags: [reasoning, notes]
---

Your first paragraph. Ordinary markdown from here on.

## A section heading

More writing.
```

That is the whole workflow. Everything below is reference.

---

## File naming

```
YYYY-MM-DD-some-slug.md
```

The filename is a fallback, not a requirement — but it is the convention worth
keeping, because:

- the `YYYY-MM-DD` prefix becomes the post's date when frontmatter has no `date`
- the rest becomes the URL slug when frontmatter has no `slug`

So `2026-08-05-my-new-post.md` publishes at `/#/blog/my-new-post`, dated
5 August 2026, with no `date:` or `slug:` line needed.

Only `.md` files directly inside `src/content/blog/` are picked up.
Subdirectories are ignored.

## Frontmatter

The block between the opening and closing `---` lines.

| Field | Required | Default if omitted |
| --- | --- | --- |
| `title` | yes | the filename |
| `excerpt` | recommended | empty — the standfirst is skipped |
| `category` | no | `Notes` |
| `date` | no | the `YYYY-MM-DD` filename prefix |
| `slug` | no | the filename minus its date prefix |
| `readTime` | no | estimated from word count at 210 wpm |
| `tags` | no | none |
| `draft` | no | `false` |

### Frontmatter syntax rules

The parser handles a deliberately small subset of YAML. Within that subset it is
predictable; outside it, things fail quietly.

**Everything must fit on one line.** There is no support for multi-line values,
folded blocks (`>`), or nested keys. A long `excerpt` goes on one long line.

**Colons inside a value are fine.** Only the first colon separates key from
value, so this works unquoted:

```yaml
title: Entelechy: a note on potential
```

**Quote a value that starts with `[`**, otherwise it is read as a list:

```yaml
title: "[Draft] Something"
```

**Lists use inline bracket syntax** — not YAML's `-` item form:

```yaml
tags: [aristotle, potential, metaphysics]     # correct
```

```yaml
tags:                                          # WRONG — parsed as empty
  - aristotle
```

**`draft: true` is the only value that hides a post.** Anything else — `yes`,
`True`, `1` — publishes it.

**A line starting with `#` is a comment** and is skipped.

## Markdown that works

All of the following are verified against the actual renderer
(`react-markdown` + `remark-gfm`).

### Text

```markdown
**bold**, *italic*, ~~strikethrough~~, `inline code`
```

### Headings

`##` and `###` are the useful levels. A `#` in the body is demoted to `##`,
because the post title is already the page's only `<h1>`.

Every heading gets an anchor id derived from its text, so `## The Three Layers`
can be linked as `[jump](#the-three-layers)`. In-page anchors scroll smoothly
and will not break the router.

### Links

```markdown
[labelled link](https://example.com)
```

External links open in a new tab and get a small `↗` marker automatically. Bare
URLs autolink the same way — `https://example.com` on its own becomes a link.

### Lists

```markdown
- a bulleted item
- another

1. a numbered item
2. another

- [ ] an unchecked task
- [x] a completed task
```

### Blockquotes

```markdown
> Set larger and in italic, with an accent rule down the left.
```

### Tables

GitHub-flavoured pipe tables. The column widths do not need to line up in the
source.

```markdown
| Element | Guiding Question     |
| ------- | -------------------- |
| Purpose | Why am I doing this? |
```

Wide tables scroll horizontally inside their own container, so they never make
the page itself scroll sideways.

### Images

Put the file in `public/`, then reference it from the site root:

```markdown
![Aristotle and an acorn](/aristotle-corn.png)
```

**The alt text doubles as the visible caption**, so write it as a caption. An
image on its own line becomes a `<figure>` with the caption centred beneath it.
Use `![](/path.png)` with empty alt for a caption-free, purely decorative image.

### Code

````markdown
```python
def entelechy(acorn):
    return acorn.grow()
```
````

Syntax highlighting is not wired up — code blocks are monospaced and boxed, but
not coloured.

### Footnotes

```markdown
Some claim.[^1]

[^1]: The supporting note.
```

These collect into a "Footnotes" section at the end of the article, with links
back to the reference.

### Horizontal rule

```markdown
---
```

Note: `---` as the *first* thing in the file starts the frontmatter block, so
only use it as a rule further down.

## What does not work

**Raw HTML.** Tags are escaped and appear literally on the page — `<b>bold</b>`
renders as the visible text `<b>bold</b>`, not as bold text. This is deliberate:
it keeps `dangerouslySetInnerHTML` out of the renderer. Use markdown syntax
instead (`**bold**`).

If you need something markdown genuinely cannot express, it needs a component in
`src/components/Prose.tsx` rather than HTML in the post.

## Drafts

```yaml
draft: true
```

A draft is excluded from the writing list, has no URL, and is not in the built
bundle's post list. It stays in the repo as a work in progress.
`2026-03-30-physical-optimality.md` is currently a draft.

## Where a post shows up

- **Writing section** on the home page — title, excerpt, category, date, read
  time, newest first
- **Article page** at `/#/blog/<slug>` — standfirst, tags, reading-progress
  hairline, and automatic links to the neighbouring posts
- Both the browser tab title and the page's meta description are set per post

Ordering is by `date`, newest first, compared as plain text — which is exactly
why the `YYYY-MM-DD` format matters. `2026-3-30` would sort wrongly.

Two posts sharing a `slug` is not an error; the first one found wins and the
other becomes unreachable. Keep slugs unique.

## Previewing

```
npm run dev
```

Editing a `.md` file hot-reloads the page immediately — no restart.

If port 5173 is taken by another project, pick your own:

```
npm run dev -- --port 5180 --strictPort
```

Before pushing:

```
npm run build
```

## Under the hood

| File | Role |
| --- | --- |
| `src/content/blog/*.md` | the posts |
| `src/lib/posts.ts` | collects, sorts, filters drafts, estimates read time |
| `src/lib/frontmatter.ts` | the small YAML-subset parser |
| `src/components/Prose.tsx` | markdown → React, plus the element overrides |
| `src/index.css` (`.prose`) | all article typography |

Posts are gathered with Vite's `import.meta.glob`, so every markdown file is
inlined into the bundle at build time. Nothing is fetched at runtime, and a post
that fails to parse fails at build rather than in front of a reader.
