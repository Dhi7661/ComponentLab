/**
 * Centralized site and UI copy per CONVENTIONS.md
 */
export const siteContent = {
  brand: {
    name: 'ComponentLab',
    tagline:
      'A reusable React and TypeScript UI component library with an interactive documentation site.',
  },
  home: {
    title: 'Explore, preview and reuse UI components',
    subtitle:
      'Browse components, change their props in a live playground, preview them in light and dark mode, and copy ready-to-use React and TypeScript code.',
    browseButton: 'Browse components',
    tokensButton: 'Design tokens',
  },
  categories: {
    buttons: {
      name: 'Buttons',
      description: 'Interactive button controls, variants, and loading states',
    },
    forms: {
      name: 'Form elements',
      description: 'Accessible form inputs, selects, radios, and checkboxes',
    },
    overlays: {
      name: 'Modals & dialogs',
      description: 'Focus-trapped dialogs and confirmation popups',
    },
    dataDisplay: {
      name: 'Data display',
      description: 'Cards, tables, avatars, and badge elements',
    },
    feedback: {
      name: 'Feedback',
      description: 'Alert banners, toasts, and floating tooltips',
    },
  },
  button: {
    title: 'Button Component',
    description: 'Interactive button control with multiple variants, sizes, and states.',
    label: 'Click me',
    primary: 'Primary',
    secondary: 'Secondary',
    outline: 'Outline',
    ghost: 'Ghost',
    destructive: 'Destructive',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    loading: 'Loading button',
    disabled: 'Disabled button',
    withLeftIcon: 'With Left Icon',
    withRightIcon: 'With Right Icon',
  },
} as const
