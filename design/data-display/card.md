# Card

**Structure:** container with optional header (title and description), body, and footer.

## Shape
Background color-bg, 1px border color-border, radius-lg, padding 24px, shadow-sm.
- Header title: text-lg, weight 600
- Header description: text-sm, color-text-muted
- Footer: top border color-border, padding-top 16px, actions right-aligned

## Variants
- default: as described
- interactive: shadow-md on hover, pointer cursor, ring-focus when focused

## Accessibility
Use an article or section element. If the card is clickable, put the link on the title, not the whole card.
