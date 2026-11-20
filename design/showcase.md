# Showcase site

## App shell
- Top bar: height 56px, bottom border color-border. Logo left, search center (max-width 480px, height 36px, ⌘K hint), theme toggle and GitHub icon right.
- Sidebar: width 240px, sticky. Groups: Buttons, Form Elements, Modals & Dialogs, Data Display, Feedback, Theme. Group labels text-xs, uppercase, color-text-muted. Active item: background color-muted, weight 500, 2px primary bar on the left.
- Main: max-width 1100px, padding 32px.
- Skip link "Skip to content" appears on first Tab.

## Home
- Headline text-4xl, weight 700, from home.title in src/registry/content.ts. Subtitle text-lg, color-text-muted.
- Buttons: primary "Browse components", outline "View on GitHub".
- Category grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Each card: icon, category name, component count.

## Component index
- Search field full width, filter chips in pill shape (selected chip uses color-primary).
- Grid of cards, 3 columns on desktop. Each card: preview area 120px tall on color-surface with a dotted pattern, component name, category badge.

## Component page
- Breadcrumb text-sm. Title text-3xl, weight 700. Short description in color-text-muted.
- Two columns: preview (about two-thirds width) and playground (about one-third).
- Preview canvas: 1px border, radius-lg, dotted background, min-height 240px. Toolbar above it: theme toggle, width toggle (mobile, tablet, desktop), reset.
- Playground: segmented controls for variant and size, text input for label, switches for disabled and loading, dropdown for icon.
- Below the preview: tabs "Code" and "Props". Code is a mono block on color-surface with a copy button top right. Props is a table.
- Accessibility card at the bottom with keyboard and ARIA notes.

## Mobile
The sidebar becomes a menu button that opens a drawer. Playground controls stack below the preview.

## Theme page
Color swatches for every token, the type scale, spacing, radius, and shadows, each labeled with its token name.
