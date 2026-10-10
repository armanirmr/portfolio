# Project Memory: Armani Romero Portfolio

This file is a working handoff for future edits to the portfolio. It records the product intent, current implementation, settled design choices, important interaction behavior, and lessons from earlier iterations. Check the source for current behavior if this note and the implementation ever differ.

## Project at a glance

- **Product:** Interactive personal portfolio for Armani Romero, software engineer in Colima, Mexico.
- **Audience:** Hiring teams, recruiters, potential clients, and collaborators.
- **Goal:** Let visitors quickly understand Armani's work and approach, then contact him about a job, project, or collaboration.
- **Project directory:** `C:\Users\PC\code\portfolio`
- **Current repository:** Local Git repository on branch `master`. Initial commit: `e8a43f8` (`Initialize interactive portfolio project`). There is no configured GitHub remote.
- **App type:** Vite single-page application using React and Three.js. It is not a Next.js app and has no backend.
- **Product brief:** `PRODUCT.md`
- **General setup and user-facing project overview:** `README.md`

## Product content

### Selected projects

1. **Changeweft** — AI software delivery workflow. Site: <https://changeweft.armanirmr.workers.dev/>. Current project notes mention repository-grounded plans, code changes, isolated verification, and traceable diffs.
2. **Baja Coordinator Services** — bilingual customer-facing application. Site: <https://www.bajacoordinatorservices.com/>. Current notes mention English and Spanish user experience, validated forms, and more accurate data capture.
3. **Fulikuli / FLKL** — music site / Fulikuli OS. Site: <https://flkl.vercel.app/>. Presented as a playful retro desktop experience for the band and its latest release.

**Salesloft is not Armani's project and must not appear as one.** Don't invent testimonials, metrics, outcomes, client claims, or technologies. Keep copy grounded in the project and resume details actually supplied.

### Contact

- Email: <mailto:armanirmr@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/armani-romero/>
- Location copy may say Colima, Mexico / Colima, MX. Do not expose latitude, altitude, or precise location data.
- Position the site to invite job offers, interviews, client work, and collaboration.

## Stack and runtime

- Vite, React, JavaScript/JSX, and Three.js.
- `GLTFLoader` loads GLB assets. Three.js scene rendering, raycasting, camera transitions, animation mixers, toon materials, and post-processing are implemented in `src/main.jsx`.
- `src/three-runtime.js` is a narrow set of exports used by the scene code.
- `src/style.css` owns global styles, responsive layouts, typography, panels, and CSS motion.
- `index.html` has document metadata and Google Fonts links.
- `lucide-react` supplies interface icons.
- The source uses standard Three.js, not React Three Fiber.
- No server-side rendering, database, API service, or environment configuration is required for the current app.

### Commands

```sh
npm install
npm run dev       # Vite dev server, bound to 0.0.0.0; usually port 5173
npm run build     # Production output in dist/
npm run preview   # Preview dist/ locally
```

There is no test script configured. Do not claim tests were run unless a test suite is added and actually executed. The production build has succeeded during recent work. Vite may print non-fatal `use client` directive notices from `lucide-react`.

## Visual direction

- Primary reference: *Persona 4 Golden* menus, colors, and energetic graphic language. This is an aesthetic reference only; the portfolio is not affiliated with Atlus or Persona.
- Palette is warm gold/yellow, cream, dark ink, red/orange, and cyan. CSS custom properties live at the top of `src/style.css` (`--ink`, `--red`, `--paper`, `--yellow`, `--gold`, `--orange`, `--cyan`, `--cyan-ink`, and others).
- The 3D scene is a stylized cel-shaded small-town diorama with ink-like outlines and interactive physical objects.
- UI direction combines game-menu framing, large display type, short mono labels, readable content cards, and strong explicit calls to action.
- Minerva Modern files are stored in `public/fonts/` and loaded locally. DM Sans, DM Mono, and Barlow Condensed are referenced from Google Fonts in `index.html` (some Canvas lettering also references M PLUS families; check browser availability and actual font loading before revising).
- The “Building Useful Things” hero block has a specific typography/layout treatment. A prior explicit preference was to keep its font treatment unchanged when applying Minerva Modern elsewhere.
- Avoid tiny text, cramped cards, edge-to-edge cards on ultrawide screens, clipped objects, and decorative glow that strains the eyes.

## Scene and section behavior

Four scene objects correspond to four destinations. The scene labels are buttons projected over the world and are hoverable, focusable, and clickable on supported desktop layouts.

| Section | Object | Current behavior |
| --- | --- | --- |
| `work` / 01 | Laptop | Camera moves in; project list and details render directly onto the laptop display canvas. The project links are explicit screen actions so incidental clicks don't leave the portfolio. Keyboard-accessible project controls are also present. |
| `engineer` / 02 | Morrillo character | Camera moves toward the character; an on-page personnel-file card presents Armani's bio, strengths, bilingual ability, and experience. The card scrolls independently and shows a “MORE BELOW” hint when relevant. |
| `toolkit` / 03 | Toolbox | Toolbox opening animation plays; six logo-bearing cards spread into floating positions above/around the toolbox. Cards have pointer hover and tap/click pin behavior. A responsive layout positions them for phone screens. |
| `contact` / 04 | Envelope | Envelope opens; the contact card includes email, copy-email, and LinkedIn actions. On mobile the packet geometry is hidden and the contact card appears from the envelope origin after camera/envelope timing checks. |

The laptop's screen noise/static is a **Work screen content transition**, not the removed model reveal. Keep those concepts separate: the user's latest instruction removed initial model appearance transitions only.

### Navigation and accessibility

- Desktop mouse wheel steps between landing and sections in both directions. Wheel input inside a scrollable content card scrolls that card when it can.
- The footer has section buttons; the header menu can select destinations; the world objects and scene labels can open destinations.
- Keyboard `1`–`4` navigates to sections; `Escape` returns to the world.
- On touch devices, vertical swipes navigate and taps activate objects or controls.
- Mobile keeps the full Three.js scene. Camera positions and toolkit tablet layout are separately tuned for compact screens.
- Section labels are hidden on narrow mobile viewports to avoid overlapping each other.
- Motion can be toggled and the app respects `prefers-reduced-motion`.
- WebGL initialization/context failure displays a non-3D fallback for project links and contact.
- Preserve keyboard focus indicators, meaningful control labels, accessible alternatives to canvas interactions, and independent scrolling for cards.

## GLB assets and animation mapping

Active scene assets are served from `public/models/`. Match filenames exactly when changing files or their load paths.

| Asset | Role |
| --- | --- |
| `laptop.glb` | Work object |
| `morrillo_idle.glb` | Engineer base rig and looping idle animation |
| `morrillo_waving.glb` | Plays for Engineer section; one-shot and holds final pose while section stays active |
| `morrillo_looking.glb` | Plays in Work section; one-shot and holds final pose until leaving |
| `morrillo_pointing.glb` | Plays in Toolkit section; one-shot and holds final pose until leaving |
| `toolbox_idle.glb` | Base toolbox mesh |
| `toolbox_open.glb` | Toolbox open animation |
| `toolbox_close.glb` | Toolbox close animation when leaving Toolkit |
| `envelope.glb` | Envelope mesh and open animation |
| `envelope_close.glb` | Envelope close animation when leaving Contact |

The three toolbox GLBs also have original copies in `assets/model-sources/`. Other scene models are supplied in `public/models/` as currently used.

### Model loading is a settled issue

- **Current behavior:** Models are added to their scene parent at full source opacity as soon as `GLTFLoader` finishes loading each GLB. There is no model fade, white-to-color reveal, sequential reveal queue, or hidden-until-animation-completes state.
- Keep it this way unless Armani explicitly asks for a different model appearance. Previous reveal iterations left the models missing on screen; do not reintroduce `opacity = 0`, `model.visible = false`, reveal queues, or dependencies between model load order.
- Other motion remains intentional: camera travel, section-specific character/toolbox/envelope animations, tool-card movement, laptop screen static, and the mobile contact card animation.
- If models fail to appear again, inspect the actual GLTF requests in the browser network panel and console, verify `/models/<filename>.glb` resolves, then check the `Diorama` mount size, renderer, camera framing, and scene error state. Do not add another visual reveal to mask a loading problem.

### Toolkit logo cards

The six cards are canvas textures on simple 3D tablets; they are not 3D logo models. Current logo image URLs come from Wikimedia and require network access:

- React
- TypeScript
- Claude
- Ruby on Rails
- PostgreSQL
- OpenAI

Keep tablet geometry and their hover/float behavior unless the request calls for a redesign. Desktop uses an intentionally loose floating arrangement. Mobile uses a two-column by three-row arrangement so all six cards remain in the viewport. Their logo images have initials as an image-load fallback.

## Important interaction notes and history

- The project's core concept settled on entering the object itself: laptop contents in the screen, toolkit cards emerging around the open toolbox, character/profile pairing, and envelope/contact pairing. Avoid replacing these with generic sidebars or unrelated modal flows.
- The Engineer profile content is wanted; past critique was about card spacing/appearance and position relative to the character, not removing the copy. Maintain readable text and prevent ultrawide cards from touching viewport edges.
- Contact should feel like an invitation to hiring and collaboration. Preserve email and LinkedIn. Keep the contact envelope and packet visually related and avoid obvious mesh/card clipping.
- Contact animation has been tuned repeatedly for its relationship to camera zoom and envelope opening. Preserve the current camera/envelope timing unless the user asks to change it. On mobile, the simplified card animation is intentionally one smooth scale transition from the envelope, after the opening/zoom timing gate; don't bring back multiple choppy stages.
- Work's three projects should share a consistent presentation. Use clear, prominent website actions within the laptop UI.
- Toolkit logo cards have been revised from crude 3D icon shapes to actual image logos on existing tablets. Do not replace logos with extruded 3D symbols.
- Mobile should retain the 3D experience, with mobile-specific framing and content layout rather than dropping the world.
- Keep the visible copy and typography comfortably readable. The user has repeatedly called out text that is too small, crowded, clipped, or overlapping.

## Main files

```text
PRODUCT.md                 Product goals, audience, and constraints
README.md                  Setup and user-facing project overview
PROJECT_MEMORY.md          Long-form project handoff (this file)
index.html                 App entry document and font links
src/main.jsx               React app, scene, content, controls, and animation state
src/style.css              Visual system, layouts, responsive rules, CSS animations
src/three-runtime.js       Explicit Three.js runtime exports
public/models/             Runtime GLB models
public/fonts/              Local Minerva Modern font files
assets/model-sources/      Original toolbox model source copies
```

## Repository hygiene and deployment

- `.gitignore` excludes generated `node_modules/`, `dist/`, `output/`, environment files, and local coding-agent/Impeccable setup directories. Do not commit local hook configs or bundled skill binaries.
- The package is private (`"private": true`) and has no declared license. Do not imply that the code or supplied 3D assets are licensed for reuse.
- No remote repository is currently configured. If publishing, confirm repository destination and visibility before exposing personal project assets or local content.
- Deployment should serve the Vite `dist/` directory and preserve the `/models/` and `/fonts/` static paths. Client-side navigation is currently a single-page scene; no SPA route fallback is required beyond the root page.
- External fonts and toolkit logo URLs may not load offline. Do not describe them as bundled local assets.
