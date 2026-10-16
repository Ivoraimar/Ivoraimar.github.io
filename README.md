# Ivo Raimondi — Portfolio

Ivo Raimondi's bilingual single-page software engineering portfolio, built with Angular 22 and SCSS. The site uses a hand-authored Fileteado Porteño visual system to present work in edge computing, distributed systems, IoT, and full-stack development.

The design uses deep petrol, warm gold, and bold white typography, with hand-drawn fileteado corner ornaments and a subtle Andes-and-sun engraving. The opening keeps the name central without a monogram or flag. Illustrations use SVG, and the typography uses system fonts without external font requests.

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
