# Confirm dialog

**Structure:** Dialog with an optional icon, title, message, and two buttons.
**Built on:** Dialog.
**Content:** confirm.title, confirm.message, confirm.cancel, confirm.confirm in src/registry/content.ts.

## Shape
Max-width 400px. Icon is 40px in a circle at the top: color-warning by default, color-danger when danger is true.

## Buttons
- Cancel: outline button
- Confirm: primary button, or destructive when danger is true

## Behavior
Escape and Cancel close without action. Focus starts on Cancel when danger is true, otherwise on Confirm.
