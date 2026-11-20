# Dialog

**Structure:** backdrop, panel, title, description, content area, footer with actions, close button.
**Content:** title and description are passed as props. Close label: dialog.close in src/registry/content.ts.
**Built on:** Radix UI Dialog.

## Shape
- Backdrop: black at 50% opacity
- Panel: max-width 480px, padding 24px, background color-bg, radius-lg, shadow-md
- Title: text-lg, weight 600
- Description: text-sm, color-text-muted
- Close button: ghost, icon only, top right
- Footer: buttons right-aligned, 8px gap

## Motion
Fade the backdrop and scale the panel from 95% to 100% over 150ms. Respect prefers-reduced-motion.

## Behavior
Focus moves to the first focusable element on open and stays inside the dialog. Escape and backdrop click close it. Focus returns to the trigger on close.

## Accessibility
role="dialog", aria-modal="true", aria-labelledby and aria-describedby point to the title and description.
