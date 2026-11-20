import * as React from 'react'
import { cn } from '../../utils/cn'
import type { ButtonVariant, Size } from '../../types'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover/90',
  secondary: 'bg-secondary text-on-secondary hover:bg-secondary/80 active:bg-secondary/70',
  outline: 'border border-border-strong bg-transparent text-text hover:bg-muted active:bg-muted/80',
  ghost: 'bg-transparent text-text hover:bg-muted active:bg-muted/80',
  destructive: 'bg-danger text-on-danger hover:bg-danger-hover active:bg-danger-hover/90',
}

const buttonSizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: Size
  fullWidth?: boolean
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
