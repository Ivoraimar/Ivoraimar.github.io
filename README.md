# Ivo Raimondi — Portfolio

Ivo Raimondi's bilingual single-page software engineering portfolio, built with Angular 22 and SCSS. The site uses a hand-authored Fileteado Porteño visual system to present work in edge computing, distributed systems, IoT, and full-stack development.

The design uses deep petrol, warm gold, and bold white typography, with hand-drawn fileteado corner ornaments and a subtle Andes-and-sun engraving. The header and favicon share the IR monogram. Illustrations use SVG, and the typography uses system fonts without external font requests.

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

The production build prerenders the root route as static HTML. Pushes to `main` deploy the contents of `dist/ivo-portfolio/browser` to GitHub Pages through GitHub Actions.

## Content and contact updates

English and Spanish copy and project links live in `src/app/core/portfolio.data.ts`. Keep both languages in sync when dates or roles change. The master's degree is described as starting in November 2026; update that wording once it begins.

Contact options are configured in `src/app/core/contact.config.ts`:

- `email` stays `null` until an address is explicitly approved for publication.
- `cvUrl` stays `null` until the final CV is ready. To activate the download, add the approved PDF at `public/documents/ivo-raimondi-cv.pdf` and set `cvUrl` to `documents/ivo-raimondi-cv.pdf`. The bilingual download button then appears automatically. Do not commit an outdated CV.

Unset options render no buttons or placeholders. GitHub and LinkedIn remain available.

## Search and social previews

`src/index.html` contains the canonical URL, Open Graph and Twitter metadata, and minimal `ProfilePage`/`Person` structured data. These are included in the prerendered HTML so crawlers do not need to execute JavaScript. English is the default prerendered language; Spanish is available through the existing language switcher at the same URL.

The approved `Thumbnail.png` is copied unchanged to `public/images/social-preview.png` (1734 × 907). If replacing it, update the dimensions and alt text in `src/index.html`. `public/robots.txt` and `public/sitemap.xml` reference the canonical site.

To check the deployable artifact, run `npm run build` and inspect `dist/ivo-portfolio/browser/index.html` and its `images/social-preview.png`. The absolute preview URL becomes public after deployment; sharing platforms may cache earlier previews.
