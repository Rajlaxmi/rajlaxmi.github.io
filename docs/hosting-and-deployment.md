# Hosting and deployment

The site is a static build served by GitHub Pages, published by a GitHub Actions
workflow. There is no server, no database, and nothing to provision.

**Live at <https://rajlaxmi.github.io/>**

## The short version

Merge to `master` on `Rajlaxmi/rajlaxmi.github.io` → a workflow builds the site →
GitHub Pages serves it. Takes about 45 seconds.

Nothing else deploys. Pushing to any other branch does nothing to the live site.

---

## Where things live

| | |
| --- | --- |
| Upstream repo | `Rajlaxmi/rajlaxmi.github.io` (git remote `origin`) |
| Fork | `chinchang/rajlaxmi.github.io` (git remote `fork`) |
| Deploying branch | `master` |
| Live URL | `https://rajlaxmi.github.io/` |
| Custom domain | none — HTTPS is enforced on the default domain |

This is a GitHub **user site**: the repository is named after its owner
(`rajlaxmi.github.io`), which is why it is served from the domain root rather
than a `/repo-name/` subpath.

## The deploy workflow

`.github/workflows/deploy.yml`. It runs on every push to `master` and nothing
else — no schedule, no manual trigger, no other branch.

Two jobs:

1. **build** — checkout, Node 20, `npm ci`, `npm run build`, then upload `dist/`
   as a Pages artifact
2. **deploy** — publish that artifact with `actions/deploy-pages@v4`

GitHub Pages for this repo is configured with its source set to **GitHub
Actions** (not "deploy from a branch"). That matters for a couple of things
further down.

### Watching a deploy

```
gh run list  --repo Rajlaxmi/rajlaxmi.github.io --limit 5
gh run watch --repo Rajlaxmi/rajlaxmi.github.io
```

Or the Actions tab. A red run means the site was *not* updated — the previous
version stays live, so a failed build never takes the site down.

## Getting a change published

The usual account working on this repo (`chinchang`) has **read-only** access to
the upstream, so changes go through the fork:

```
git push fork my-branch
gh pr create --repo Rajlaxmi/rajlaxmi.github.io --base master --head chinchang:my-branch
```

Once someone with write access merges that PR into `master`, the workflow fires
and the site updates. Pushing to `fork` alone changes nothing that is live —
the fork does not publish anywhere.

If you do have write access, a direct push to `master` deploys immediately.

## Two settings that are load-bearing

### `base: '/'` in `vite.config.ts`

Correct for a user site served from the domain root. Asset URLs are written as
`/assets/…`.

If this repo were ever served as a *project* site — for example from the fork,
at `https://chinchang.github.io/rajlaxmi.github.io/` — every asset would 404,
because the real paths would need the `/rajlaxmi.github.io/` prefix. Publishing
from the fork means changing `base` to match.

### `HashRouter` in `src/main.tsx`

URLs look like `/#/blog/entelechy` rather than `/blog/entelechy`. That is
deliberate.

GitHub Pages serves static files and has no rewrite rules, so a request for
`/blog/entelechy` would look for a file at that path and return a 404 — which
breaks refreshing an article, opening one in a new tab, or sharing the link.
Everything after `#` is never sent to the server, so a hash route always
resolves to `index.html` and the app takes over from there.

The alternative is a `404.html` redirect shim, which works but flashes and
confuses crawlers. If you ever want clean URLs, that is the change to make —
`BrowserRouter` alone would break the site.

## Local checks before pushing

```
npm run build     # what CI runs; fails here means it fails there
npm run preview   # serve the built site exactly as Pages will
```

`npm run preview` is worth using before a release, because it catches
base-path and asset problems that `npm run dev` hides.

## Two stale things worth knowing

Neither breaks anything today, but both mislead.

### `npm run deploy` no longer deploys

`package.json` still has:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

That publishes `dist/` to a `gh-pages` branch — the *old* way this site was
hosted. Pages is now sourced from the Actions workflow, so it ignores that
branch entirely. The `gh-pages` branch still exists on the remote and was last
updated in June 2025; the live site has been coming from the workflow since.

Running `npm run deploy` today would push a stale branch and change nothing.
Safe to delete both scripts, the `gh-pages` dependency, and the branch.

### The committed `dist/` is redundant

`dist/` is checked into the repo (25 files), but the workflow builds from source
on every run and never reads it. It only mattered under the old `gh-pages`
flow. It survives mainly as commit noise and merge conflicts.

Deleting it and adding `dist` to `.gitignore` would be safe — but it is a
separate change to make deliberately, not a side effect of something else.

## A `.gitignore` trap

`.gitignore` lists `package-lock.json`, but the file **is tracked** — it was
committed before the ignore rule, and `.gitignore` does not apply to files
already in the index.

That is load-bearing: the workflow runs `npm ci`, which fails outright without a
lockfile. If anyone ever "tidies up" by running `git rm --cached
package-lock.json`, every deploy breaks. Leave it tracked.

## Rolling back

There is no deploy history to roll back to — the workflow publishes whatever
`master` builds. To revert the live site, revert the commit:

```
git revert <bad-commit>
git push origin master        # or open a PR from the fork
```

The next workflow run republishes the earlier state.

## Adding a custom domain later

1. Add a `CNAME` file containing the domain to `public/` so it lands in `dist/`
2. Point DNS at GitHub Pages (an `ALIAS`/`A` record for an apex domain, or a
   `CNAME` record for a subdomain)
3. Set the domain in the repo's Pages settings and let the certificate issue

`base: '/'` stays correct, since a custom domain also serves from its root.
