export type ComponentCategory =
  | 'buttons'
  | 'forms'
  | 'overlays'
  | 'data-display'
  | 'feedback'

export type PropControl =
  | { type: 'select'; options: readonly string[] }
  | { type: 'boolean' }
  | { type: 'text' }
  | { type: 'number'; min?: number; max?: number; step?: number }

export interface ComponentPropDoc {
  name: string
  type: string
  defaultValue?: string
  description: string
  required?: boolean
  control?: PropControl
}

export interface ComponentAccessibilityDoc {
  keyboardBehavior: string[]
  ariaAttributes: string[]
  contrastNotes?: string
}

export interface ComponentRegistryEntry {
  id: string
  name: string
  category: ComponentCategory
  description: string
  importPath: string
  exampleCode: string
  props: ComponentPropDoc[]
  accessibility?: ComponentAccessibilityDoc
  defaultProps?: Record<string, unknown>
}

export type ComponentRegistry = Record<string, ComponentRegistryEntry>
