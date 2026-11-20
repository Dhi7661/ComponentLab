# ComponentLab UI specs

Paths are relative to the project root, the Compoent Lab folder.

Each spec describes one component, and its path matches the component file:

- design/buttons/button.md describes src/components/buttons/button.tsx
- design/forms/input.md describes src/components/forms/input.tsx
- design/overlays/confirm-dialog.md describes src/components/overlays/confirm-dialog.tsx
- design/data-display/table.md describes src/components/data-display/table.tsx
- design/feedback/toast.md describes src/components/feedback/toast.tsx

Rules:
- One file per component, in a category folder that matches src/components.
- design/tokens.md lists every color, size, and radius by token name. Values are defaults until they are checked against Stitch's Theme page.
- src/styles/tokens.ts mirrors design/tokens.md.
- All text comes from src/registry/content.ts. Each spec names its content keys.
- Build with Tailwind using token names, never raw hex values.
- Accessibility rules apply to every component: visible focus, keyboard use, and labeled controls.
