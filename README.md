# Ivo Raimondi — Portfolio

Ivo Raimondi's bilingual single-page software engineering portfolio, built with Angular 22 and SCSS. The site uses a hand-authored Fileteado Porteño visual system to present work in edge computing, distributed systems, IoT, and full-stack development.

## Local development

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Quality checks

```bash
npm run build
npm test -- --watch=false
```

The production build prerenders the root route as static HTML for eventual GitHub Pages deployment. Publication is intentionally not configured in this repository yet.

## Content still awaiting approval

The UI intentionally omits links or actions for information that has not been supplied or approved:

- Public CV PDF
- Contact email

The approved thesis PDF, thesis repository, project links, and LinkedIn profile are included. English and Spanish copy is kept together in the typed content data.

Portfolio content and public URLs live in `src/app/core/portfolio.data.ts` so approved details can be added without scattering them through templates.

## Approved visual and document assets

- `public/images/oakestra-logo.png` is the official Oakestra mark served by `oakestra.io`.
- `public/images/live-migration-thesis-cover.jpg` is rendered from the approved thesis PDF.
- `public/documents/live-migration-thesis.pdf` is the approved public thesis by Ivo Raimondi.
