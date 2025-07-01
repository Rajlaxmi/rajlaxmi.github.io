rajlaxmi.github.io


# Read LICENSE
Copyright (c) 2025 Rajlaxmi

## Deployment to GitHub Pages

This project uses Vite and `gh-pages` to deploy to GitHub Pages.

### 1. Build the project

```
npm run build
```

### 2. Deploy to GitHub Pages

```
npm run deploy
```

This will publish the contents of the `dist/` folder to the `gh-pages` branch, making your site available at:

```
https://rajlaxmi.github.io/
```

### Notes
- Ensure `base: '/'` is set in `vite.config.ts` for user/organization sites.
- The deployment scripts are defined in `package.json`:
  - `predeploy`: Runs the build
  - `deploy`: Publishes `dist/` to GitHub Pages using `gh-pages`

## Recent Projects Added

- Attention-Gated-Networks
- Immersive Negotiator
- Generative Tutor
