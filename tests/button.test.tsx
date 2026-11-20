import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Button } from '../src/components/buttons/button'

describe('Button component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events when enabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Submit</Button>)

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    )

    const btn = screen.getByRole('button', { name: 'Disabled' })
    expect(btn).toBeDisabled()
    await user.click(btn)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('handles loading state with spinner and accessibility announcement', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button loading onClick={handleClick}>
        Save
      </Button>,
    )

    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Loading')).toHaveClass('sr-only')
    expect(screen.getByTestId('button-spinner')).toHaveAttribute('aria-hidden', 'true')

    await user.click(btn)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders left and right icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Navigate
      </Button>,
    )

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByTestId('left-icon').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('forwards ref to the native button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('supports keyboard activation via Enter and Space', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Keyboard</Button>)

    const btn = screen.getByRole('button', { name: 'Keyboard' })
    btn.focus()
    expect(btn).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)

    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('passes automated accessibility checks with vitest-axe', async () => {
    const { container } = render(
      <div className="space-y-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
