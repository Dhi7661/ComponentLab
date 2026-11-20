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
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-base gap-2',
  lg: 'h-12 px-6 text-lg gap-2.5',
}

const spinnerSizes: Record<Size, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: Size
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

function Spinner({ size }: { size: Size }) {
  return (
    <svg
      className={cn('animate-spin shrink-0 text-current', spinnerSizes[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-testid="button-spinner"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      disabled = false,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading ? 'true' : undefined}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors cursor-pointer select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          buttonVariants[variant],
          buttonSizes[size],
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Spinner size={size} />
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        {loading && <span className="sr-only">Loading</span>}
        {children && <span>{children}</span>}
        {rightIcon && !loading && (
          <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
