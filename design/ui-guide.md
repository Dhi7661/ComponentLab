# ComponentLab UI guide

This file is the source of truth for the look of ComponentLab: layout, colors in light and dark mode, typography, and states.

Color values come from ColorPalette_LightDark.xlsx. Where the palette has no separate value for a token, the token reuses the closest palette value, and the table says so.

## 1. Brand

- Wordmark: the text "ComponentLab" in Inter, weight 600, 18px, color-text. No logo image.
- The wordmark is a plain link to the home page.

## 2. Modes

- Light and dark modes are both required, with the same layout in each.
- The site follows the system setting by default. The theme toggle in the top bar switches modes and saves the choice.
- ThemeProvider adds the class "dark" to the html element in dark mode and removes it in light mode.

## 3. Colors

All values are written as light / dark.

### Surfaces and text

| Token | Light / Dark | Use |
|---|---|---|
| color-bg | #EDF1F8 / #202124 | Page background |
| color-surface | #F5F7FC / #292A2D | Panels, cards, properties panel |
| color-sidebar | #E3E9F3 / #292A2D | Sidebar |
| color-stage | #EDF1F8 / #202124 | Preview stage (same as page background) |
| color-stage-dot | #C9D2E0 / #3C4043 | Dot pattern on the stage (same as border) |
| color-border | #C9D2E0 / #3C4043 | Dividers and panel edges |
| color-border-strong | #A9B4C7 / #5F6368 | Outline buttons and inputs |
| color-text | #1B1F2A / #E8EAED | Main text |
| color-text-muted | #4F5B6E / #9AA0A6 | Descriptions, helper text, labels |
| color-muted | #DDE4F0 / #3C4043 | Hover backgrounds, including ghost and outline buttons |

### Brand and actions

| Token | Light / Dark | Use |
|---|---|---|
| color-primary | #1A73E8 / #8AB4F8 | Primary buttons, selected tabs |
| color-primary-hover | #1765CC / #AECBFA | Hover state of primary |
| color-on-primary | #FFFFFF / #202124 | Text on primary |
| color-focus-ring | #1A73E8 / #8AB4F8 | Keyboard focus ring |
| color-secondary | #D3E3FD / #394457 | Secondary buttons, active sidebar item, avatar fallback |
| color-secondary-hover | #BCD5FA / #46546B | Hover state of secondary |
| color-on-secondary | #0B57D0 / #8AB4F8 | Text on secondary and on the active sidebar item |

### Status

| Token | Light / Dark | Use |
|---|---|---|
| color-danger | #C5221F / #F28B82 | Destructive buttons, error fills |
| color-danger-hover | #A51D1A / #F5A9A3 | Hover state of destructive |
| color-danger-text | #C5221F / #F28B82 | Error text (same as danger) |
| color-on-danger | #FFFFFF / #202124 | Text on danger |
| color-success | #0D652D / #81C995 | Success icons and fills |
| color-success-text | #0D652D / #81C995 | Success text (same as success) |
| color-warning | #8A5A00 / #FDD663 | Warning icons and fills |
| color-warning-text | #8A5A00 / #FDD663 | Warning text (same as warning) |
| color-info | #1A73E8 / #8AB4F8 | Info icons and fills |
| color-info-text | #0B57D0 / #8AB4F8 | Info text. Derived: the palette's #1A73E8 falls below 4.5:1 on the light background, so the darker blue is used for text. |

### Code

| Token | Light / Dark | Use |
|---|---|---|
| color-code-bg | #DDE4F0 / #1E1F20 | Code block background |
| color-code-text | #1B1F2A / #E8EAED | Code text |

## 4. Button colors

| Variant | Light background | Light text | Dark background | Dark text | Border |
|---|---|---|---|---|---|
| Primary | #1A73E8 | #FFFFFF | #8AB4F8 | #202124 | none |
| Secondary | #D3E3FD | #0B57D0 | #394457 | #8AB4F8 | none |
| Outline | transparent | #1B1F2A | transparent | #E8EAED | 1px color-border-strong |
| Ghost | transparent | #1B1F2A | transparent | #E8EAED | none |
| Destructive | #C5221F | #FFFFFF | #F28B82 | #202124 | none |

Hover: Primary uses color-primary-hover. Outline and Ghost use color-muted. Secondary uses a shade one step darker than its background (light #BCD5FA, dark #46546B). Destructive uses #A51D1A in light mode and #F5A9A3 in dark mode.

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
- Shadow in light mode: shadow-sm is 0 1px 2px rgba(60,64,67,0.3). shadow-md is 0 2px 6px 2px rgba(60,64,67,0.15). Use shadow-md only on menus and dialogs.
- Shadow in dark mode: shadow-md is 0 4px 12px rgba(0,0,0,0.5). Dark mode relies on borders more than shadows.
- Focus ring: 2px solid color-focus-ring with a 2px offset. Show it only for keyboard focus (:focus-visible).
- Motion: 150ms for dialogs and menus, 200ms for toasts. With prefers-reduced-motion, remove movement and keep fades only.

## 8. Layout

### Top bar (height 56px, bottom border color-border)

- Left: the wordmark.
- Center: search field, maximum width 480px, placeholder "Search components, props, tokens...", with a ⌘K hint on the right.
- Right: "Components" link, "Design tokens" link, theme toggle, then GitHub and Storybook buttons. Show the GitHub and Storybook buttons only after their links exist.
- Do not show a version badge, star count, or user avatar.

### Sidebar (width 240px, sticky, background color-sidebar)

Group labels are text-xs, uppercase, in color-text-muted.

- Overview: Introduction, All components, Design tokens
- Buttons: Button
- Form elements: Input, Checkbox, Radio group, Select
- Modals & dialogs: Dialog, Confirm dialog
- Data display: Badge, Avatar, Card, Table
- Feedback: Alert, Toast, Tooltip

The active item uses color-secondary as its background and color-on-secondary as its text, with weight 500 and radius-md. Inactive items use color-text-muted, and hover uses color-muted. Show only these 14 components.

### Component page

From top to bottom:

1. Breadcrumb in text-sm: Components / Form elements / Input. The current page uses color-text.
2. Title in text-3xl, weight 700. Show an "Accessible" badge only after the component passes its accessibility checks.
3. Description in text-lg, color-text-muted, one or two sentences.
4. Import line in a monospace chip with a copy button. Example: import { Button } from './components/buttons/button'
5. Preview panel:
   - Toolbar: a segmented control for "Mobile 375px", "Tablet 768px", and "Desktop 100%". On the right, a theme toggle for the preview and a Reset button.
   - Stage: color-stage with a dot pattern in color-stage-dot, minimum height 320px, component centered.
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