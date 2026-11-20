# ComponentLab UI guide

This file is the source of truth for the look of ComponentLab: layout, colors in light and dark mode, typography, and states. Color values are placeholders until they are checked against the Stitch Theme page.

## 1. Brand

- Wordmark: the text "ComponentLab" in Inter, weight 600, 18px, color-text. No logo image.
- The wordmark is a plain link to the home page.

## 2. Modes

- Dark and light modes are both required. Dark is the first design, and light mirrors the same layout.
- The site follows the system setting by default. The theme toggle in the top bar switches modes and saves the choice.
- ThemeProvider adds the class "dark" to the html element in dark mode and removes it in light mode.

## 3. Colors

All values are written as light / dark.

### Surfaces and text

| Token | Light / Dark | Use |
|---|---|---|
| color-bg | #FFFFFF / #0B0F19 | Page background |
| color-surface | #F8FAFC / #111827 | Sidebar, properties panel, cards |
| color-stage | #F1F5F9 / #0B0F19 | Preview stage |
| color-stage-dot | #CBD5E1 / #1F2937 | Dot pattern on the stage |
| color-border | #E2E8F0 / #1F2937 | Dividers and panel edges |
| color-border-strong | #CBD5E1 / #334155 | Outline buttons, inputs |
| color-text | #0F172A / #F1F5F9 | Main text |
| color-text-muted | #475569 / #94A3B8 | Descriptions, helper text, labels |
| color-muted | #F1F5F9 / #1E293B | Hover and selected backgrounds |

### Brand and actions

| Token | Light / Dark | Use |
|---|---|---|
| color-primary | #4F46E5 / #5B53E8 | Primary buttons, active sidebar item, selected tabs |
| color-primary-hover | #4338CA / #6E66F0 | Hover state of primary |
| color-on-primary | #FFFFFF / #FFFFFF | Text on primary |
| color-focus-ring | #4F46E5 / #818CF8 | Keyboard focus ring |
| color-secondary | #E0E7FF / #1E1B4B | Secondary buttons, avatar fallback |
| color-on-secondary | #3730A3 / #C7D2FE | Text on secondary |

### Status

| Token | Light / Dark | Use |
|---|---|---|
| color-danger | #DC2626 / #DC2626 | Destructive buttons, error fills |
| color-danger-text | #B91C1C / #F87171 | Error text |
| color-success | #16A34A / #22C55E | Success icons and fills |
| color-success-text | #15803D / #4ADE80 | Success text |
| color-warning | #D97706 / #F59E0B | Warning icons and fills |
| color-warning-text | #92400E / #FBBF24 | Warning text |
| color-info | #2563EB / #3B82F6 | Info icons and fills |
| color-info-text | #1D4ED8 / #60A5FA | Info text |

### Code

| Token | Light / Dark | Use |
|---|---|---|
| color-code-bg | #F1F5F9 / #111827 | Code block background |
| color-code-text | #0F172A / #E2E8F0 | Code text |

## 4. Button colors

| Variant | Light background | Light text | Dark background | Dark text | Border |
|---|---|---|---|---|---|
| Primary | #4F46E5 | #FFFFFF | #5B53E8 | #FFFFFF | none |
| Secondary | #E0E7FF | #3730A3 | #1E1B4B | #C7D2FE | none |
| Outline | transparent | #0F172A | transparent | #F1F5F9 | 1px color-border-strong |
| Ghost | transparent | #0F172A | transparent | #F1F5F9 | none |
| Destructive | #DC2626 | #FFFFFF | #DC2626 | #FFFFFF | none |

Hover: Primary uses color-primary-hover. Ghost uses color-muted. Destructive hover uses #B91C1C in both modes. Outline hover uses color-muted.

## 5. Contrast rules

- Text at 14px and above must reach 4.5:1 against its background in both modes.
- Icons, control borders, and focus rings must reach 3:1.
- Use only the text colors listed in this guide. Do not pick a color from a screenshot.

## 6. Typography

- UI text: Inter. Code, prop names, and token names: JetBrains Mono.
- Fallbacks: system-ui and sans-serif for UI, ui-monospace and monospace for code.
- No serif font anywhere on the site.
- Sizes: text-xs 12px, text-sm 14px, text-base 16px, text-lg 18px, text-xl 20px, text-3xl 30px, text-4xl 36px.
- Weights: 400 body, 500 controls and labels, 600 headings and the wordmark, 700 page titles.
- Labels use full words: "Primary", "Medium", "Disabled". No abbreviations like "pri" or "md".

## 7. Shape, effects, and motion

- Spacing: 4px base. Common values are 8, 12, 16, 24, and 32.
- Radius: radius-sm 4px for checkboxes and chips. radius-md 8px for buttons, inputs, and menus. radius-lg 12px for cards, panels, and dialogs. radius-full for avatars and badges.
- Shadow in light mode: shadow-sm is 0 1px 2px rgba(15,23,42,0.06). shadow-md is 0 4px 12px rgba(15,23,42,0.10).
- Shadow in dark mode: shadow-md is 0 4px 12px rgba(0,0,0,0.5). Dark mode relies on borders more than shadows.
- Focus ring: 2px solid color-focus-ring with a 2px offset. Show it only for keyboard focus (:focus-visible).
- Motion: 150ms for dialogs and menus, 200ms for toasts. With prefers-reduced-motion, remove movement and keep fades only.

## 8. Layout

### Top bar (height 56px, bottom border color-border)

- Left: the wordmark.
- Center: search field, maximum width 480px, placeholder "Search components, props, tokens...", with a ⌘K hint on the right.
- Right: "Components" link, "Design tokens" link, theme toggle, then GitHub and Storybook buttons. Show the GitHub and Storybook buttons only after their links exist.
- Do not show a version badge, star count, or user avatar.

### Sidebar (width 240px, sticky)

Group labels are text-xs, uppercase, in color-text-muted.

- Overview: Introduction, All components, Design tokens
- Buttons: Button
- Form elements: Input, Checkbox, Radio group, Select
- Modals & dialogs: Dialog, Confirm dialog
- Data display: Badge, Avatar, Card, Table
- Feedback: Alert, Toast, Tooltip

The active item uses color-primary with white text, weight 500, and radius-md. Inactive items use color-text-muted, and hover uses color-muted. Show only these 14 components.

### Component page

From top to bottom:

1. Breadcrumb in text-sm: Components / Form elements / Input. The current page uses color-text.
2. Title in text-3xl, weight 700. Show an "Accessible" badge only after the component passes its accessibility checks.
3. Description in text-lg, color-text-muted, one or two sentences.
4. Import line in a monospace chip with a copy button. Example: import { Button } from './components/buttons/button'
5. Preview panel:
   - Toolbar: a segmented control for "Mobile 375px", "Tablet 768px", and "Desktop 100%". On the right, a theme toggle for the preview and a Reset button.
   - Stage: color-stage with a dot pattern, minimum height 320px, component centered.
   - Properties panel (width 320px, color-surface, border color-border): heading "Properties" with Reset.
     - Variant: segmented control with Primary, Secondary, Outline, Ghost, Destructive.
     - Size: segmented control with Small 32px, Medium 36px, Large 44px.
     - Label: text input.
     - Leading icon: dropdown with None, Arrow right, Download, Bookmark.
     - Loading, Disabled, Full width: switches.
     - Each control shows its prop name in monospace, text-xs, below the label: variant, size, children, leftIcon, loading, disabled, fullWidth.
6. Tabs: Code, Props API, Accessibility. The active tab uses color-primary.
   - Code: file tab "ButtonExample.tsx", TypeScript only, a Copy button. Uses color-code-bg. Imports use the real path from this project.
   - Props API: table with Prop, Type, Default, Description.
   - Accessibility: keyboard behavior, ARIA attributes used, and contrast notes.

### Home page

- Headline in text-4xl, weight 700: "Explore, preview and reuse UI components".
- Subtitle in text-lg, color-text-muted.
- Buttons: "Browse components" (Primary) and "Design tokens" (Outline).
- Category cards in a grid: Buttons (1 component), Form elements (4), Modals & dialogs (2), Data display (4), Feedback (3).

### Component index

- Search field across the full width.
- Filter chips: All, Buttons, Form elements, Modals & dialogs, Data display, Feedback. The selected chip uses color-primary.
- Card grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Each card has a 120px preview area on color-stage, the component name, and its category in color-text-muted.

### Design tokens page

- Swatches for every color token, with light and dark values side by side and the token name in monospace.
- Type scale, spacing, radius, and shadow examples.

### Mobile (below 768px)

- The sidebar becomes a menu button in the top bar that opens a full-height drawer.
- The properties panel moves below the stage. The viewport toggle stays visible.

## 9. Content rules

- Do not show invented numbers: no versions, star counts, download counts, or user counts.
- Do not show links, badges, or install commands until they work.
- The only brand asset is the text wordmark.
- Page text comes from src/registry/content.ts, not typed directly into components.
- Code samples use the real import paths from this project.

## 10. Checklist before release

- Every page is checked in both light and dark mode.
- Every text color used passes the contrast rules in section 5.
- No serif font appears anywhere.
- All labels use full words.
- No invented numbers, badges, or links appear.
