# Agent instructions

Paths in these rules are relative to the project root, the Compoent Lab folder.

Before any task, read CONVENTIONS.md and follow it.

## Design rules
- Component specs are in design/. Follow the spec for the component you are building. The spec for src/components/buttons/button.tsx is design/buttons/button.md.
- Screenshots and design images are for layout, spacing, and visual style only.
- Never copy text, headings, names, numbers, images, or sample data from a screenshot.
- All text comes from src/registry/content.ts.
- All colors, fonts, spacing, radius, and shadows come from src/styles/tokens.ts, which mirrors design/tokens.md.
- For a new component, first list what you will take from the spec or image and what you will ignore. Then wait for my approval before writing code.
- Build one component per task. Do not start the next component until I approve it.
- Commit each finished feature using the Conventional Commits format in CONVENTIONS.md.
