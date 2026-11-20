# Radio group

**Structure:** fieldset with legend (group label), then options. Each option is a circle plus label.
**Layout:** vertical by default, horizontal optional. 12px gap between options.

## Shape
Circle 16px, 1px border color-border. Selected: border color-primary with an 8px dot in color-primary.

## States
- hover: border color-primary
- focus-visible: ring-focus
- disabled: opacity 50%

## Behavior
Tab enters the group. Arrow keys move and select. Only the selected option is in the tab order.

## Accessibility
Native input type="radio" with a shared name.
