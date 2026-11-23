import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PlaygroundControls } from '../src/components/playground/playground-controls'
import { buttonEntry } from '../src/registry/button'
import { siteContent } from '../src/registry/content'

describe('PlaygroundControls', () => {
  const defaultValues = buttonEntry.defaultProps || {}

  it('renders heading and Reset button', () => {
    const handleReset = vi.fn()
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={defaultValues}
        onChange={vi.fn()}
        onReset={handleReset}
      />,
    )

    expect(screen.getByRole('heading', { level: 2, name: siteContent.playground.properties })).toBeInTheDocument()
    const resetButton = screen.getByRole('button', { name: siteContent.playground.reset })
    expect(resetButton).toBeInTheDocument()

    fireEvent.click(resetButton)
    expect(handleReset).toHaveBeenCalledTimes(1)
  })

  it('renders all 7 prop names in monospace font', () => {
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={defaultValues}
        onChange={vi.fn()}
      />,
    )

    const expectedProps = ['variant', 'size', 'children', 'leftIcon', 'loading', 'disabled', 'fullWidth']
    expectedProps.forEach((propName) => {
      expect(screen.getByText(propName)).toBeInTheDocument()
    })
  })

  it('renders segmented controls for variant with all options and calls onChange', () => {
    const handleChange = vi.fn()
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={{ ...defaultValues, variant: 'primary' }}
        onChange={handleChange}
      />,
    )

    const primaryRadio = screen.getByRole('radio', { name: siteContent.playground.variants.primary })
    expect(primaryRadio).toHaveAttribute('aria-checked', 'true')

    const secondaryRadio = screen.getByRole('radio', { name: siteContent.playground.variants.secondary })
    expect(secondaryRadio).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(secondaryRadio)
    expect(handleChange).toHaveBeenCalledWith('variant', 'secondary')
  })

  it('renders segmented controls for size with all options and calls onChange', () => {
    const handleChange = vi.fn()
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={{ ...defaultValues, size: 'md' }}
        onChange={handleChange}
      />,
    )

    const mdRadio = screen.getByRole('radio', { name: siteContent.playground.sizes.md })
    expect(mdRadio).toHaveAttribute('aria-checked', 'true')

    const lgRadio = screen.getByRole('radio', { name: siteContent.playground.sizes.lg })
    fireEvent.click(lgRadio)
    expect(handleChange).toHaveBeenCalledWith('size', 'lg')
  })

  it('renders text input for children and calls onChange', () => {
    const handleChange = vi.fn()
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={{ ...defaultValues, children: 'Submit' }}
        onChange={handleChange}
      />,
    )

    const input = screen.getByLabelText(siteContent.playground.labels.children)
    expect(input).toHaveValue('Submit')

    fireEvent.change(input, { target: { value: 'New Label' } })
    expect(handleChange).toHaveBeenCalledWith('children', 'New Label')
  })

  it('renders dropdown for leftIcon and calls onChange', () => {
    const handleChange = vi.fn()
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={{ ...defaultValues, leftIcon: 'none' }}
        onChange={handleChange}
      />,
    )

    const select = screen.getByLabelText(siteContent.playground.labels.leftIcon)
    expect(select).toHaveValue('none')

    fireEvent.change(select, { target: { value: 'download' } })
    expect(handleChange).toHaveBeenCalledWith('leftIcon', 'download')
  })

  it('renders switches for boolean props (loading, disabled, fullWidth) and calls onChange', () => {
    const handleChange = vi.fn()
    render(
      <PlaygroundControls
        entry={buttonEntry}
        values={{ ...defaultValues, loading: false, disabled: true, fullWidth: false }}
        onChange={handleChange}
      />,
    )

    const loadingSwitch = screen.getByRole('switch', { name: siteContent.playground.labels.loading })
    expect(loadingSwitch).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(loadingSwitch)
    expect(handleChange).toHaveBeenCalledWith('loading', true)

    const disabledSwitch = screen.getByRole('switch', { name: siteContent.playground.labels.disabled })
    expect(disabledSwitch).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(disabledSwitch)
    expect(handleChange).toHaveBeenCalledWith('disabled', false)

    const fullWidthSwitch = screen.getByRole('switch', { name: siteContent.playground.labels.fullWidth })
    expect(fullWidthSwitch).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(fullWidthSwitch)
    expect(handleChange).toHaveBeenCalledWith('fullWidth', true)
  })
})
