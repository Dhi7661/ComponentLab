# Design tokens

Default values until they are checked against Stitch. Use token names in code, never raw hex values.

## Colors (light / dark)

| Token | Light | Dark | Used for |
|---|---|---|---|
| color-bg | #FFFFFF | #0B0F19 | Page and panel background |
| color-surface | #F8FAFC | #111827 | Code blocks, table header |
| color-text | #0F172A | #F1F5F9 | Main text |
| color-text-muted | #64748B | #94A3B8 | Helper text, descriptions |
| color-border | #E2E8F0 | #1F2937 | Borders and dividers |
| color-muted | #F1F5F9 | #1E293B | Hover and selected backgrounds |
| color-primary | #4F46E5 | #6366F1 | Primary actions, focus ring |
| color-on-primary | #FFFFFF | #FFFFFF | Text on primary |
| color-secondary | #E0E7FF | #1E1B4B | Secondary button, avatar fallback |
| color-on-secondary | #3730A3 | #C7D2FE | Text on secondary |
| color-danger | #DC2626 | #EF4444 | Errors, destructive actions |
| color-on-danger | #FFFFFF | #FFFFFF | Text on danger |
| color-success | #16A34A | #22C55E | Success states |
| color-warning | #D97706 | #F59E0B | Warning states |
| color-info | #2563EB | #3B82F6 | Info states |

## Typography

- Fonts: font-sans Inter, font-mono JetBrains Mono
- Sizes: text-xs 12px, text-sm 14px, text-base 16px, text-lg 18px, text-xl 20px, text-3xl 30px, text-4xl 36px
- Weights: 400 body, 500 controls, 600 headings, 700 page titles

## Spacing and shape

- Spacing: 4px base (use 8, 12, 16, 24, 32)
- Radius: radius-sm 4px, radius-md 8px, radius-lg 12px, radius-full 9999px
- shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
- shadow-md: 0 4px 12px rgba(0,0,0,0.08)
- ring-focus: 2px solid color-primary, 2px offset
