# Toast

**Structure:** card with tone icon, title, optional description, close button.

## Placement
Bottom right on desktop, full width at the bottom on mobile. Stack with 8px gap, maximum 3 visible.

## Shape
Width up to 360px, padding 16px, background color-bg, 1px border color-border, shadow-md, radius-md.

## Behavior
Auto-dismiss after 5 seconds by default. Pause on hover and focus. Close button always available.
Enter: slide in from the right and fade in over 200ms. Respect prefers-reduced-motion.

## Accessibility
Container uses aria-live="polite". Error toasts use aria-live="assertive".
