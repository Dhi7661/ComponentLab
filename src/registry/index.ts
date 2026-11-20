import type { ComponentRegistry, ComponentRegistryEntry, ComponentCategory } from './schema'
import { buttonEntry } from './button'

export * from './schema'
export * from './content'
export * from './button'

export const registry: ComponentRegistry = {
  [buttonEntry.id]: buttonEntry,
}

export function registerComponent(entry: ComponentRegistryEntry): void {
  registry[entry.id] = entry
}

export function getComponent(id: string): ComponentRegistryEntry | undefined {
  return registry[id]
}

export function getComponentsByCategory(category: ComponentCategory): ComponentRegistryEntry[] {
  return Object.values(registry).filter((entry) => entry.category === category)
}

export function getAllComponents(): ComponentRegistryEntry[] {
  return Object.values(registry)
}
