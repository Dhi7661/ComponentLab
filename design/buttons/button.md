# Button

**Element:** native button, with an optional icon slot before the label.
**Content:** button.label in src/registry/content.ts.

## Variants
- primary: background color-primary, text color-on-primary
- secondary: background color-secondary, text color-on-secondary
- outline: 1px border color-border, transparent background, text color-text
- ghost: transparent background, hover background color-muted
- destructive: background color-danger, text color-on-danger

## Sizes
- sm: height 32px, padding-x 12px, text-sm
- md: height 40px, padding-x 16px, text-base (default)
- lg: height 48px, padding-x 24px, text-lg

## Shape
radius-md, font weight 500, 8px gap between icon and label.

## States
- hover: slightly darker background
- focus-visible: ring-focus
- disabled: opacity 50%, cursor not-allowed, no pointer events
- loading: spinner replaces the icon, label stays visible, button is disabled with aria-busy="true"

## Accessibility
Spinner is aria-hidden. While loading, include visually hidden "Loading" text.
