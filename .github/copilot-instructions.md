This repository is a small static website for River Valley Wound Care (HTML/CSS/JS). The guidance below exposes project structure, important conventions, and precise examples an AI coding agent should follow when making changes.

Project overview
- Purpose: a static marketing site with a small component partials pattern and image-driven case pages.
- Key folders: `components/` (HTML partials), `css/` (global styles), `js/` (vanilla JS), `data/` (structured JSON), `images/` (assets).

How pages are composed
- Most pages are static HTML files at the repo root (e.g. `index.html`, `BeforeAfter.html`, `Contact.html`).
- Navigation is kept in a single partial: `components/navigation.html` and injected at runtime by `js/navigation.js`. The script fetches `components/navigation.html` and inserts it into the placeholder `<div id="site-header"></div>`.
  - Do not hard-code a header into every page — update `components/navigation.html` for global nav changes.
  - `js/navigation.js` expects the inserted markup to contain: a `header` element, a `.menu-toggle` button, and a `nav` element. Those selectors and the `nav-open` class are relied upon for accessibility and mobile toggle behavior.

Data & images
- Structured wound case data is stored under `data/wounds.json`. The current pages render content statically, but `wounds.json` is the canonical dataset for case metadata and images.
  - Adding a new case: add images to `images/wounds/` (avoid spaces and mixed case in filenames), add the case object to `data/wounds.json`, and either update the relevant HTML page (`BeforeAfter.html`) or add a small client-side renderer that consumes the JSON.
- Image conventions: images live under `images/` with subfolders (`team/`, `wounds/`, `branding/`). Prefer lowercase filenames with hyphens and no spaces (e.g. `diabetic-foot-before.jpg`).

CSS & layout
- Global styles live in `css/styles.css`. Pages share common class names (e.g. `.page`, `.section`, `.ba-frame`, `.ba-photo`) — change selectors cautiously as many HTML files reference the same classes.

Typical edit patterns (examples)
- Update nav link text or add a link: edit `components/navigation.html` and don't forget to test the mobile menu (toggle uses `.menu-toggle` and sets `aria-expanded`).
- Change header markup: keep the `id="site-header"` placeholder in pages, and preserve the `header`/`nav` structure used by `js/navigation.js`.
- Add a new wound case (recommended steps):
  1. Upload images into `images/wounds/` and normalize filenames.
  2. Add an entry to `data/wounds.json` replicating the existing `woundCases` structure.
  3. Either update `BeforeAfter.html` with a new card referencing the images, or create a small renderer script that reads `data/wounds.json` and injects cards dynamically.

Local dev & debugging
- There is no build step — files are static. To preview locally run a static file server from the repo root:
  - Python 3 built-in server: `python3 -m http.server 8000` then open `http://localhost:8000`.
  - Node `http-server` (if installed): `npx http-server -p 8000`.
  - `live-server` is handy for auto-reload but not required.
- When testing navigation changes, load any page that includes `<div id="site-header"></div>` and check browser console for `Unable to load navigation.` which indicates a fetch problem (wrong path or missing file).

Patterns and gotchas discovered
- `js/navigation.js` injects `components/navigation.html` by fetching a relative path; any change of folder layout must preserve that relative path or update the script.
- Several image filenames contain spaces or mixed case (`Venous ulcer after.JPEG`); normalize filenames and update all references to avoid cross-platform issues.
- Pages largely duplicate sections (e.g. repeated footer content). Prefer editing the canonical file for shared parts (`components/navigation.html`). There is no current footer partial.
- There is no automated test suite or CI configured in the repo — treat changes as frontend, verify visually in a browser and check console logs.

When editing, be conservative and explicit
- Keep diffs minimal: modify the smallest set of files to achieve the change (edit partials, update CSS selectors, or add a targeted JS renderer). Avoid sweeping refactors without user approval.
- If adding JS that consumes `data/wounds.json`, add graceful fallbacks: if JSON fails to load, the page should show a helpful message or fall back to the existing static markup.

Files to inspect for examples
- `components/navigation.html` — canonical header markup
- `js/navigation.js` — injection and mobile toggle logic
- `data/wounds.json` — wound-case schema and image references
- `BeforeAfter.html` — example of a case gallery layout and image usage
- `index.html` — global layout and common class usage

If uncertain, ask for clarification
- Ask which pages should be updated, whether images can be renamed, and whether the team prefers client-side JSON rendering or manual HTML updates for new wound cases.

— End of file —