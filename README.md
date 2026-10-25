# RmaN — Creative technologist résumé

A static React / Vite résumé for Arman Jangmiri. Dark editorial screen design, interactive software-rendered 3D particle sculpture, experience filters, accessible motion controls, and a dedicated two-page A4 print layout.

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production output is `dist/`. There is no backend, account, API key, or runtime service. Assets use relative paths, including on GitHub Pages repository subpaths. Fonts are local system fonts; no third-party font requests.

## Content and design

- `src/data.js`: shared experience and discipline content; screen and print use the same records.
- `src/App.jsx`: page, interactions, and complete print résumé.
- `src/Sculpture.jsx`: Canvas 2D projection of an extruded 3D point cloud sampled from the original logo PNG, with three depth/color styles and pointer interaction. No WebGL requirement.
- `src/index.css`: responsive visual system and A4 print styling.
- `public/profile.jpg`: original profile photograph.
- `public/rman-logo.png`: supplied transparent RmaN logo, shared by the web, print, favicon, and 3D sculpture. Print uses a CSS black-ink treatment.
- `src/brand.js`: shared logo URL and GitHub / Instagram profile links.

Experience filters only change the screen. Printing always includes all eight roles and full descriptions. Use **Print résumé** or the browser print command, choose A4, scale 100%, and disable browser headers/footers. Background graphics are optional. Print remains legible without them.

Motion respects the system reduced-motion setting. The sculpture can be paused manually; it stops rendering while outside the viewport or while the tab is hidden. All essential controls are keyboard accessible. Artwork is decorative and contains no résumé information.

## Static hosting

### GitHub Pages

The included `.github/workflows/deploy.yml` builds and publishes `dist/` on pushes to `main`, or through a manual workflow run. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source. If the default branch differs, update the workflow branch. Push/merge this redesign when ready to publish.

### Vercel or Cloudflare Pages

Import the repository as a Vite project, choose Node.js 22, build with `npm run build`, and publish the `dist` directory. No environment variables or server functions are needed. Use the hosting provider's assigned domain or connect your own domain.

Deployment is prepared but no remote deployment is performed by local development commands. Provider account settings and free-tier eligibility are controlled by the hosting provider.

Hosting references: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).
