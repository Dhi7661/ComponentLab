# Table

**Structure:** header row, body rows, optional empty state.

## Shape
Full width. Rows 48px tall. Cell padding 16px horizontal.
- Header: background color-surface, text-sm, weight 600, color-text-muted, bottom border color-border
- Body rows: bottom border color-border, hover background color-muted

## Sorting
Sortable header is a button with a chevron icon. The sorted column shows an up or down arrow in color-primary.

## Accessibility
th has aria-sort set to ascending, descending, or none. The sort button's name is the column label.

## Empty state
One full-width row with table.empty in src/registry/content.ts.
