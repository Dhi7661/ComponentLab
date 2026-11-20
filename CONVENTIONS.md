# Conventions

## Folder map

All paths are relative to the project root, the Compoent Lab folder (the folder that contains package.json).

```
Compoent Lab/
├── .github/workflows/         CI and deploy workflows
├── .storybook/                Storybook settings
├── design/                    UI specs, one file per component (see design/README.md)
│   ├── buttons/
│   ├── forms/
│   ├── overlays/
│   ├── data-display/
│   ├── feedback/
│   ├── showcase.md
│   └── tokens.md
├── public/
├── src/
│   ├── components/            one folder per category, one file per component
│   │   ├── buttons/
│   │   ├── forms/
│   │   ├── overlays/
│   │   ├── data-display/
│   │   └── feedback/
│   ├── hooks/                 custom hooks, such as useFocusTrap
│   ├── layouts/               app shell: top bar and sidebar
│   ├── pages/                 home, component index, component page
│   ├── registry/              one file per component, plus content.ts
│   ├── styles/                tokens.ts and global CSS
│   ├── types/                 shared types, such as Variant and Size
│   ├── utils/                 cn.ts and other helpers
│   ├── App.tsx
│   ├── main.tsx
│   └── index.ts               library exports
├── tests/                     one test file per component
├── AGENTS.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CONVENTIONS.md
├── README.md
└── package.json
```

One component uses the same name everywhere. For the Button, the names are:
- src/components/buttons/button.tsx
- src/registry/button.ts
- tests/button.test.tsx
- design/buttons/button.md

## Naming
- Component names in code: PascalCase (Button, ConfirmDialog).
- File names: kebab-case (confirm-dialog.tsx, radio-group.md). One component per file.
- Category folders: kebab-case, the same in src/components and design (buttons, forms, overlays, data-display, feedback).
- Props: camelCase. Shared prop names: variant, size, disabled, loading, className.
- Variants: lowercase (primary, outline, destructive). Sizes: sm, md, lg.

## Components
- Use forwardRef for every component that renders a DOM element.
- Accept className and merge it with the component's classes using cn() from src/utils/cn.ts.
- Set displayName on every forwardRef component.
- Spread remaining native props onto the root element.
- Keep variant and size mappings in one object at the top of the file.

## Props and types
- Export the props type for every component, named ComponentNameProps.
- Use the shared Variant and Size types from src/types.
- Do not use any. Use unknown and narrow it when needed.
- Prefer a union type over booleans when a prop has more than two states.

## Content and tokens
- All text comes from src/registry/content.ts.
- Colors, fonts, spacing, radius, and shadows come from src/styles/tokens.ts, which mirrors design/tokens.md.
- Use Tailwind classes that map to those tokens. No raw hex values or arbitrary pixel values inside components.
- Every interactive element shows the focus-visible ring.

## Accessibility
- Every interactive element works with the keyboard.
- Every form control has a visible label or an aria-label.
- Errors and helper text are linked with aria-describedby.
- Respect prefers-reduced-motion for any animation.
- Each component has at least one vitest-axe check.

## Testing
- Test behavior, not implementation: clicks, typing, keyboard use, and announcements.
- Query by role and label with Testing Library, never by class name.
- Test file: tests/<component>.test.tsx, using the same name as the component file (tests/confirm-dialog.test.tsx).

## Git
- One branch per phase: phase/NN-name.
- One commit per completed feature.
- Format: type(scope): short description, in the present tense.
- Types: feat, fix, test, docs, style, refactor, chore, ci.
- Commit only when lint, type check, and tests pass.
- Never commit node_modules, .env files, or secrets.
