import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PreviewStage } from '../src/components/playground/preview-stage'
import { siteContent } from '../src/registry/content'

describe('PreviewStage', () => {
  it('renders viewport segmented controls and updates width container', () => {
    render(
      <PreviewStage>
        <div data-testid="target-component">Test Component</div>
      </PreviewStage>,
    )

    const desktopRadio = screen.getByRole('radio', { name: siteContent.playground.viewport.desktop })
    expect(desktopRadio).toHaveAttribute('aria-checked', 'true')

    const viewportContainer = screen.getByTestId('viewport-container')
    expect(viewportContainer).toHaveClass('max-w-full')

    // Click Mobile 375px
    const mobileRadio = screen.getByRole('radio', { name: siteContent.playground.viewport.mobile })
    fireEvent.click(mobileRadio)
    expect(mobileRadio).toHaveAttribute('aria-checked', 'true')
    expect(desktopRadio).toHaveAttribute('aria-checked', 'false')
    expect(viewportContainer).toHaveClass('max-w-[375px]')

    // Click Tablet 768px
    const tabletRadio = screen.getByRole('radio', { name: siteContent.playground.viewport.tablet })
    fireEvent.click(tabletRadio)
    expect(tabletRadio).toHaveAttribute('aria-checked', 'true')
    expect(viewportContainer).toHaveClass('max-w-[768px]')
  })

  it('toggles stage theme without changing document or parent theme', () => {
    render(
      <PreviewStage initialTheme="light">
        <div>Content</div>
      </PreviewStage>,
    )

    const stage = screen.getByTestId('preview-stage')
    expect(stage).toHaveClass('light')
    expect(stage).not.toHaveClass('dark')

    const toggleButton = screen.getByRole('button', {
      name: siteContent.playground.stageThemeDarkAria,
    })
    expect(screen.getByTestId('stage-moon-icon')).toBeInTheDocument()

    // Click theme toggle
    fireEvent.click(toggleButton)

    // Stage is now dark, but documentElement is untouched
    expect(stage).toHaveClass('dark')
    expect(stage).not.toHaveClass('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByTestId('stage-sun-icon')).toBeInTheDocument()

    // Click again to return to light
    fireEvent.click(
      screen.getByRole('button', { name: siteContent.playground.stageThemeLightAria }),
    )
    expect(stage).toHaveClass('light')
    expect(stage).not.toHaveClass('dark')
    expect(screen.getByTestId('stage-moon-icon')).toBeInTheDocument()
  })

  it('applies light class when document is in dark mode', () => {
    document.documentElement.classList.add('dark')
    render(
      <PreviewStage initialTheme="light">
        <div>Content</div>
      </PreviewStage>,
    )

    const stage = screen.getByTestId('preview-stage')
    expect(stage).toHaveClass('light')
    expect(stage).not.toHaveClass('dark')

    document.documentElement.classList.remove('dark')
  })

  it('resets viewport and stage theme and triggers onReset callback', () => {
    const handleReset = vi.fn()
    render(
      <PreviewStage initialViewport="mobile" initialTheme="dark" onReset={handleReset}>
        <div>Content</div>
      </PreviewStage>,
    )

    const stage = screen.getByTestId('preview-stage')
    const viewportContainer = screen.getByTestId('viewport-container')
    expect(stage).toHaveClass('dark')
    expect(viewportContainer).toHaveClass('max-w-[375px]')

    const resetButton = screen.getByRole('button', { name: siteContent.playground.reset })
    fireEvent.click(resetButton)

    expect(handleReset).toHaveBeenCalledTimes(1)
    expect(stage).toHaveClass('light')
    expect(stage).not.toHaveClass('dark')
    expect(viewportContainer).toHaveClass('max-w-full')
  })

  it('has minimum height 320px and centers the component', () => {
    render(
      <PreviewStage>
        <button type="button">Centered Button</button>
      </PreviewStage>,
    )

    const stage = screen.getByTestId('preview-stage')
    expect(stage).toHaveClass('min-h-[320px]', 'bg-stage', 'items-center', 'justify-center')
  })
})
