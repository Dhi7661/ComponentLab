/**
 * Shared Variant and Size types for ComponentLab
 */

export type Size = 'sm' | 'md' | 'lg'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

export type StatusTone = 'info' | 'success' | 'warning' | 'danger'

export type Variant = ButtonVariant

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}
