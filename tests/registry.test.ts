import { describe, it, expect } from 'vitest'
import {
  registerComponent,
  getComponent,
  getComponentsByCategory,
  type ComponentRegistryEntry,
} from '../src/registry'

describe('Component Registry Schema', () => {
  it('registers and retrieves component entries', () => {
    const mockEntry: ComponentRegistryEntry = {
      id: 'mock-button',
      name: 'Button',
      category: 'buttons',
      description: 'Test button component',
      importPath: "import { Button } from '@/components/buttons/button'",
      exampleCode: '<Button variant="primary">Click</Button>',
      props: [
        {
          name: 'variant',
          type: 'ButtonVariant',
          defaultValue: "'primary'",
          description: 'Visual style variant',
          control: {
            type: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
          },
        },
      ],
    }

    registerComponent(mockEntry)
    expect(getComponent('mock-button')).toEqual(mockEntry)
    expect(getComponentsByCategory('buttons')).toContainEqual(mockEntry)
    expect(getComponentsByCategory('forms')).toHaveLength(0)
  })
})
