# Input

**Structure:** label above, input, then helper text or error message below.
**Content:** input.label, input.helper, input.error in src/registry/content.ts.

## Shape
Height 40px, padding-x 12px, text-base, radius-md, 1px border color-border, background color-bg, text color-text. Placeholder in color-text-muted.

## States
- hover: border color-text-muted
- focus-visible: ring-focus
- disabled: background color-muted, opacity 60%
- error: border color-danger, error message in color-danger with an icon

## Accessibility
Label linked with htmlFor. Helper and error linked with aria-describedby. aria-invalid="true" when there is an error.
