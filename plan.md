# Portfolio Landing Page Rebuild

## Goal

Build a complete, responsive portfolio landing page inspired by the public reference at [jackiehu.design](https://jackiehu.design/?ref=landing.love), then personalize its identity, writing, projects, links, and visual details for Abhir. Use the reference for observable layout and interaction cues; all copy and branding will be editable and replaceable.

## Stack

- **Vite + React** for a small, fast single-page application.
- **Plain CSS** with custom properties and responsive breakpoints for precise visual control.
- **No component or animation framework** unless a real need appears; prefer accessible browser-native behavior and small CSS transitions.
- **JavaScript** for simple interactions such as the music-player control and responsive navigation.

## Reference notes

Observed on 2026-10-13 in the public page:

- Editorial, text-first portfolio with generous whitespace and restrained colors.
- A “Currently cooking” introductory feature.
- “Recently Made” featured projects, followed by an “Other Work” list.
- An About section with personal background and social/contact links.
- A decorative music-player element and playful visual details lower on the page.
- Project rows and selected visual elements appear interactive.

The reference currently includes Jackie Hu’s name, biography, project names, and links. These are reference content only and will be replaced with the owner’s information before the personalized release. Do not reuse the reference’s private/proprietary source code or assets.

## Phases and checklist

### Phase 1 — Project foundation

- [x] Confirm the workspace is empty and ready for the project.
- [x] Review the prior conversation and identify the requested reference and outcome.
- [x] Inspect the current public page and record its visible sections.
- [x] Select Vite, React, and plain CSS as the implementation stack.
- [x] Create the initial app scaffold and confirm the dev server starts.

### Phase 2 — Page structure

- [ ] Build the page shell and responsive navigation.
- [x] Recreate the full-screen scrapbook hero composition with a centered identity, collage, decorative player, desktop-style objects, and scroll cue.
- [x] Replace CSS-drawn desk and folder objects with the supplied transparent PNG cutouts from `photo/`.
- [x] Add a transparent photo-style desk collage for the reference-specific dome lamp, textured papers, graph notebook, pen, and blue cosmetic tube; layer the supplied coffee stain, film roll, and lighter over it.
- [ ] Add the introduction / “currently working on” hero copy using final personal details.
- [ ] Add featured projects and the secondary work list.
- [ ] Add About, social, and contact sections.
- [ ] Add the lower-page decorative/player area.

### Phase 3 — Visual implementation

- [x] Tune the hero typography, object layering, player card, folder, AirDrop card, toolbar, cursor, and scroll cue against the supplied desktop reference.
- [ ] Match the reference’s typography scale, whitespace, alignment, and muted palette.
- [ ] Build project rows/cards and their hover/focus states.
- [ ] Add small, purposeful motion while respecting reduced-motion preferences.
- [ ] Recreate decorative details with original CSS or replaceable assets.

### Phase 4 — Personalization

- [ ] Replace all reference identity and biography content with Abhir’s details.
- [ ] Replace project titles, summaries, dates, and destinations with real work.
- [ ] Add the owner’s social links, email, and any preferred accent/identity details.
- [ ] Remove any remaining placeholder or reference-owner content.

### Phase 5 — Responsive and accessibility pass

- [ ] Check narrow mobile, tablet, and desktop layouts.
- [ ] Verify keyboard navigation, visible focus, semantic headings, and link labels.
- [ ] Verify color contrast and reduced-motion behavior.
- [ ] Confirm interactions work with touch and keyboard as well as mouse.

### Phase 6 — Final review

- [ ] Run the app and inspect it in a browser at multiple viewport sizes.
- [ ] Fix console/build errors and obvious layout issues.
- [ ] Check that all final links and contact actions work.
- [ ] Update this checklist as phases are completed.

## Working decisions / open content

- The project should reproduce the page’s overall structure and interaction feel while keeping the implementation original and the owner’s content easy to edit.
- Until the owner supplies personal copy and project links, use clearly marked temporary content rather than presenting Jackie Hu’s identity as the owner’s.
- The local machine has Node.js v24.18.0. PowerShell blocks the `npm.ps1` shim, so use `npm.cmd` for npm commands.
