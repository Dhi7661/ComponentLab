import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ComponentDetailPage } from '../src/pages/component-detail-page'
import { siteContent } from '../src/registry/content'

function renderButtonPlayground() {
  return render(
    <MemoryRouter initialEntries={['/components/button']}>
      <Routes>
        <Route path="/components/:name" element={<ComponentDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Component Playground Page', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    })
  })

  it('renders breadcrumbs, title, description, and import snippet', () => {
    renderButtonPlayground()

    // Breadcrumbs
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByText(siteContent.componentPage.breadcrumbComponents)).toBeInTheDocument()
    expect(screen.getByText('Buttons')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument()

    // Import chip
    expect(
      screen.getByText("import { Button } from '@/components/buttons/button'"),
    ).toBeInTheDocument()

    // Default button in preview stage
    const previewStage = screen.getByTestId('preview-stage')
    const previewButton = within(previewStage).getByRole('button', {
      name: siteContent.button.label,
    })
    expect(previewButton).toBeInTheDocument()
    expect(previewButton).toHaveClass('bg-primary')
  })

  it('updates preview button when changing variant and size controls', () => {
    renderButtonPlayground()

    const previewStage = screen.getByTestId('preview-stage')
    const previewButton = within(previewStage).getByRole('button')

    // Change variant to Secondary
    const secondaryOption = screen.getByRole('radio', {
      name: siteContent.playground.variants.secondary,
    })
    fireEvent.click(secondaryOption)
    expect(previewButton).toHaveClass('bg-secondary')

    // Change variant to Destructive
    const destructiveOption = screen.getByRole('radio', {
      name: siteContent.playground.variants.destructive,
    })
    fireEvent.click(destructiveOption)
    expect(previewButton).toHaveClass('bg-danger')

    // Change size to Large
    const largeOption = screen.getByRole('radio', {
      name: siteContent.playground.sizes.lg,
    })
    fireEvent.click(largeOption)
    expect(previewButton).toHaveClass('h-11')
  })

  it('updates preview button when changing label text', () => {
    renderButtonPlayground()

    const previewStage = screen.getByTestId('preview-stage')
    const labelInput = screen.getByLabelText(siteContent.playground.labels.children)

    fireEvent.change(labelInput, { target: { value: 'Save Changes' } })

    expect(
      within(previewStage).getByRole('button', { name: 'Save Changes' }),
    ).toBeInTheDocument()
  })

  it('updates preview button when toggling loading, disabled, and fullWidth', () => {
    renderButtonPlayground()

    const previewStage = screen.getByTestId('preview-stage')
    let previewButton = within(previewStage).getByRole('button')

    // Toggle Loading switch
    const loadingSwitch = screen.getByLabelText(siteContent.playground.labels.loading)
    fireEvent.click(loadingSwitch)

    expect(previewButton).toHaveAttribute('aria-busy', 'true')
    expect(previewButton).toBeDisabled()
    expect(within(previewButton).getByTestId('button-spinner')).toBeInTheDocument()

    // Turn off loading
    fireEvent.click(loadingSwitch)
    expect(previewButton).not.toHaveAttribute('aria-busy')

    // Toggle Disabled switch
    const disabledSwitch = screen.getByLabelText(siteContent.playground.labels.disabled)
    fireEvent.click(disabledSwitch)

    previewButton = within(previewStage).getByRole('button')
    expect(previewButton).toBeDisabled()
    expect(previewButton).toHaveClass('opacity-50')

    // Toggle Full width switch
    const fullWidthSwitch = screen.getByLabelText(siteContent.playground.labels.fullWidth)
    fireEvent.click(fullWidthSwitch)
    expect(previewButton).toHaveClass('w-full')
  })

  it('renders selected icon inside preview button', () => {
    renderButtonPlayground()

    const previewStage = screen.getByTestId('preview-stage')
    const iconSelect = screen.getByLabelText(siteContent.playground.labels.leftIcon)

    fireEvent.change(iconSelect, { target: { value: 'download' } })

    const previewButton = within(previewStage).getByRole('button')
    const iconSpan = previewButton.querySelector('span[aria-hidden="true"]')
    expect(iconSpan).toBeInTheDocument()
    expect(iconSpan?.querySelector('svg')).toBeInTheDocument()
  })

  it('switches between Code, Props API, and Accessibility tabs', () => {
    renderButtonPlayground()

    // Default tab is Code
    expect(screen.getByRole('tab', { name: siteContent.componentPage.tabs.code })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tabpanel', { name: siteContent.componentPage.tabs.code })).toBeInTheDocument()
    expect(screen.getByText('ButtonExample.tsx')).toBeInTheDocument()

    // Switch to Props API tab
    const propsTab = screen.getByRole('tab', { name: siteContent.componentPage.tabs.props })
    fireEvent.click(propsTab)

    expect(propsTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: siteContent.componentPage.tabs.props })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: siteContent.playground.propsTable.columns.prop })).toBeInTheDocument()

    // Switch to Accessibility tab
    const a11yTab = screen.getByRole('tab', { name: siteContent.componentPage.tabs.accessibility })
    fireEvent.click(a11yTab)

    expect(a11yTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: siteContent.componentPage.tabs.accessibility })).toBeInTheDocument()
    expect(screen.getByText(siteContent.componentPage.accessibility.keyboardHeading)).toBeInTheDocument()
    expect(screen.getByText(siteContent.componentPage.accessibility.ariaHeading)).toBeInTheDocument()
    expect(screen.getByText(siteContent.componentPage.accessibility.contrastHeading)).toBeInTheDocument()
  })

  it('resets controls and preview when Reset is clicked', () => {
    renderButtonPlayground()

    const previewStage = screen.getByTestId('preview-stage')

    // Change variant to Secondary
    const secondaryOption = screen.getByRole('radio', {
      name: siteContent.playground.variants.secondary,
    })
    fireEvent.click(secondaryOption)

    // Change label
    const labelInput = screen.getByLabelText(siteContent.playground.labels.children)
    fireEvent.change(labelInput, { target: { value: 'Modified Label' } })

    let previewButton = within(previewStage).getByRole('button')
    expect(previewButton).toHaveClass('bg-secondary')
    expect(previewButton).toHaveTextContent('Modified Label')

    // Click Reset button in properties panel
    const resetButtons = screen.getAllByRole('button', { name: siteContent.playground.reset })
    fireEvent.click(resetButtons[0])

    previewButton = within(previewStage).getByRole('button')
    expect(previewButton).toHaveClass('bg-primary')
    expect(previewButton).toHaveTextContent(siteContent.button.label)
  })

  it('copies import statement when import copy button is clicked', () => {
    renderButtonPlayground()

    const copyImportBtn = screen.getByRole('button', {
      name: siteContent.componentPage.copyImport,
    })
    fireEvent.click(copyImportBtn)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "import { Button } from '@/components/buttons/button'",
    )
  })
})
