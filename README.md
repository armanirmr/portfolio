# Armani Romero — Interactive Portfolio

An interactive, 3D portfolio for software engineer Armani Romero. Visitors explore a small, stylized world and step into four objects to view selected work, a profile, a toolkit, and contact options. The visual direction takes cues from *Persona 4 Golden* and its bright, graphic game menus; this is an independent portfolio and is not affiliated with Atlus or the Persona series.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints the local address when the server starts (usually `http://localhost:5173`). The dev script binds to `0.0.0.0`, so the app can also be opened from another device on the same network using the computer's LAN address.

Other scripts:

```sh
npm run build    # Create the production bundle in dist/
npm run preview  # Serve the production bundle locally
```

## Experience and controls

- **Landing:** Explore the 3D diorama, hover or tap its objects, or use the section labels and navigation.
- **Work:** Enter the laptop and choose among three projects on its screen. Open the explicit **Visit Project Site** action to leave the portfolio.
- **Engineer:** Read Armani's profile in a scrollable personnel-file card. The Morrillo character uses an idle loop in the world and section-specific looking, waving, and pointing animations.
- **Toolkit:** Open the toolbox to see six floating tool cards. Hover or tap them for emphasis.
- **Get in Touch:** Open the envelope and use the email, copy-email, or LinkedIn actions.

Navigation supports desktop mouse-wheel section changes, the bottom navigation, the menu, object selection, and keyboard shortcuts `1`–`4`. `Escape` returns to the world. On touch devices, swipe vertically to move between sections and tap objects or navigation controls. A motion toggle controls ambient motion; the app also respects the browser's reduced-motion preference. Interface sound effects have a first-visit choice saved in a one-year cookie and a persistent in-page toggle. Browsers require a click, tap, or key press during each visit before they allow sound playback; the sound control indicates when that activation is still needed. The profile card can scroll independently from desktop section navigation.

The interface includes accessible navigation alternatives for the 3D project controls and a fallback panel for exploring projects and contact details if WebGL cannot initialize.

## Selected work and contact

| Project | Description | Live site |
| --- | --- | --- |
| Changeweft | AI-assisted software delivery workflow | [changeweft.armanirmr.workers.dev](https://changeweft.armanirmr.workers.dev/) |
| Baja Coordinator Services | Bilingual customer-facing service | [bajacoordinatorservices.com](https://www.bajacoordinatorservices.com/) |
| Fulikuli / FLKL | Music site and Fulikuli OS | [flkl.vercel.app](https://flkl.vercel.app/) |

Contact: [armanirmr@gmail.com](mailto:armanirmr@gmail.com) · [LinkedIn](https://www.linkedin.com/in/armani-romero/)

## Tech and visual system

- **Vite**, **React**, and **Three.js** power the single-page experience and real-time scene.
- **React Three Fiber is not used**; Three.js rendering, raycasting, camera transitions, GLTF loading, animation mixers, and post-processing are managed in the scene component.
- **GLTFLoader** loads the supplied GLB models. Their materials are converted to cel-shaded/toon materials where supported. A custom scene handles lighting, outlines, shadows, labels, and responsive cameras.
- **Minerva Modern** font files are served locally. Additional interface typefaces and the tool-card logos are loaded from external Google Fonts and Wikimedia URLs, so those assets require a network connection.
- The app is a Vite project, not a Next.js app. There is no backend or environment configuration required for local development.

### 3D model inventory

The models used by the app live in `public/models/` and are served as static assets:

| Files | Purpose |
| --- | --- |
| `laptop.glb` | Work object |
| `morrillo_idle.glb` | Engineer idle character and base rig |
| `morrillo_waving.glb` | Engineer section animation |
| `morrillo_looking.glb` | Work section animation |
| `morrillo_pointing.glb` | Toolkit section animation |
| `toolbox_idle.glb` | Toolkit object |
| `toolbox_open.glb`, `toolbox_close.glb` | Toolbox section transitions |
| `envelope.glb` | Get in Touch object and opening animation |
| `envelope_close.glb` | Envelope closing animation |

The source project also contains original toolbox GLBs in `assets/model-sources/`. Keep public model filenames in sync with the paths in `src/main.jsx` when replacing assets.

## Project structure

```text
.
├── assets/model-sources/  # Original model source files
├── public/
│   ├── fonts/             # Locally served Minerva Modern font files
│   └── models/            # GLB models loaded by the browser
├── src/
│   ├── main.jsx           # React UI, Three.js scene, content, and interactions
│   ├── style.css          # Layout, visual system, responsive behavior, and motion
│   └── three-runtime.js   # Narrow Three.js export used by the scene
├── PRODUCT.md             # Product goals, audience, and content constraints
├── index.html             # Vite entry HTML and page metadata
└── package.json           # Dependencies and npm scripts
```

## Notes

- Project names, descriptions, technology details, and availability language should stay grounded in Armani's actual work; do not add Salesloft as a project.
- No license is currently declared. Ask before reusing the site or supplied 3D assets outside this portfolio.
- No automated test script is configured in `package.json`.
