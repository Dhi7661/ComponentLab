import type { ComponentRegistryEntry } from './schema'
import { siteContent } from './content'

export const buttonEntry: ComponentRegistryEntry = {
  id: 'button',
  name: siteContent.categories.buttons.name,
  category: 'buttons',
  description: siteContent.button.description,
  importPath: '@/components/buttons/button',
  exampleCode: `import { Button } from '@/components/buttons/button'

export function Example() {
  return (
    <Button variant="primary" size="md">
      ${siteContent.button.label}
    </Button>
  )
}`,
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
      defaultValue: "'primary'",
      description: 'Visual appearance variant of the button',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      },
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Size of the button controlling height, padding, and font size',
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The content or label to be rendered inside the button',
      control: {
        type: 'text',
      },
    },
    {
      name: 'leftIcon',
      type: 'React.ReactNode',
      description: 'Optional icon rendered before the button label',
      control: {
        type: 'select',
        options: ['none', 'arrow-right', 'download', 'bookmark'],
      },
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Displays an animated spinner, sets aria-busy="true", announces loading to screen readers, and disables interaction',
      control: {
        type: 'boolean',
      },
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the button is disabled and prevents user interaction',
      control: {
        type: 'boolean',
      },
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the button should expand to fill the full width of its container',
      control: {
        type: 'boolean',
      },
    },
    {
      name: 'rightIcon',
      type: 'React.ReactNode',
      description: 'Optional icon rendered after the button label',
    },
  ],
  accessibility: {
    keyboardBehavior: [
      'Enter: activates the button',
      'Space: activates the button',
      'Tab: moves focus to the button',
    ],
    ariaAttributes: [
      'aria-busy="true" during loading state',
      'aria-hidden="true" on decorative icons and spinner',
      'Screen-reader only announcement (.sr-only) while loading',
    ],
    contrastNotes:
      'All button variants meet WCAG AA contrast ratio of at least 4.5:1 against their backgrounds in both light and dark themes.',
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
    children: siteContent.button.label,
    leftIcon: 'none',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
}
