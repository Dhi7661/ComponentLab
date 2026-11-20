# ComponentLab

A reusable React and TypeScript UI component library with an interactive docs site. Browse components, change their props in a live playground, preview light and dark themes, and copy React and TypeScript code.

- Live showcase: [add link after deploy]
- Storybook: [add link after deploy]

## Components

Buttons, form elements, dialogs, data display, and feedback components. See the showcase for the full list.

## Getting started

Open the Compoent Lab folder in a terminal, then run:

```bash
npm install
```

## Scripts

```bash
npm run dev         # start the showcase site
npm run test        # run unit and accessibility tests
npm run lint        # lint and type check
npm run build       # build the library and the site
npm run storybook   # start Storybook
```

## Usage

Inside the project, import components from src/components. For example, in src/App.tsx:

```tsx
import { Button } from './components/buttons/button'

export function Example() {
  return <Button variant="primary">Save</Button>
}
```

Once the library is published to npm, install it and import from the package name instead.

## Project structure

See the folder map in CONVENTIONS.md.

## Accessibility

Components follow WCAG 2.2 AA. Every component is checked with vitest-axe and keyboard tests.

## Contributing

See CONTRIBUTING.md and CONVENTIONS.md.

## License

MIT. See LICENSE.
