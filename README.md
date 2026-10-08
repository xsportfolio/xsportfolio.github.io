# NXSON portfolio

Static portfolio served by GitHub Pages at **https://nxson.me**. Node.js builds the site;
visitors receive ordinary HTML, CSS, and JavaScript with no additional framework runtime.

## Work locally

Use Node.js 22 or later (`nvm use`), then:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. Source changes rebuild automatically; refresh the browser
to see them. `npm run preview` builds once and starts the same local server.

## Source organization

- `src/pages/`: page templates. Names map exactly to the existing `.html` URLs,
  including spaces, punctuation, and capitalization.
- `src/partials/`: shared navigation, footers, loader/cursor markup, and script tags.
  Existing variants are intentional: project and writing pages retain their original markup.
- `src/scripts/`: animation engine grouped by responsibility: settings, loader, cursor,
  navigation, pages, showcases, components, scroll animations, lifecycle, and transitions.
- `src/styles/`: styles grouped into foundation, header, widgets, footer, components,
  and responsive rules.
- `src/assets.json`: explicit script execution and CSS cascade order.
- `tools/`: build, preview server, and preservation baseline tools.
- `tests/`: content preservation checks and desktop/mobile browser comparisons.

Edit files in `src/`, then run `npm run build`. Root HTML, `style.css`, and
`js/scripts.js` are generated publishing artifacts; commit them alongside source changes.
The builder only writes changed outputs and does not copy or transform images or embedded projects.

Nunjucks resolves shared templates at build time. The animation source files are
assembled inside the original shared closure: their variables, initialization order,
Barba navigation hooks, jQuery plugins, and GSAP behavior stay intact. These are
ordered legacy script sections, not independently importable ES modules. Avoid moving
initialization code across sections without reviewing its shared dependencies.

Esbuild compacts whitespace in the two shared assets without renaming identifiers,
rewriting expressions, or optimizing CSS rules. Vendor files in `js/` and `css/` stay
untouched. Embedded demos under `project/` retain their own stacks and URLs.

## Verify changes

```sh
npm test
npm run check
npx playwright install chromium
npm run test:browser
```

Preservation tests verify that templates and assembled asset sources reconstruct the
original 39 HTML pages and animation/CSS sources byte for byte. Browser tests compare
the original uncompressed assets against production assets at desktop and mobile
sizes, exercise menu navigation, and check embedded project routes.

For an intentional change to content or behavior, run `npm run baseline:update` and
review `tests/preservation.json` alongside that change. Do not update the baseline to
silence an unexplained regression. `npm run check` rejects stale generated files.

CI runs the same checks on pull requests and pushes to `main`. GitHub Pages continues
publishing from `main` at the repository root; no hosting migration or Pages admin
permission is required. `.nojekyll` prevents Jekyll from modifying the prebuilt site.
`CNAME` retains `nxson.me`; Cloudflare provides HTTPS and HTTP-to-HTTPS redirects.

## Domain recovery

The former company deployment remains on Vercel. Its previous Cloudflare apex target
was `f0fd844b04993fd9.vercel-dns-017.com` (DNS only). Restore that target and its proxy
setting if intentionally reverting the domain to the company website.
