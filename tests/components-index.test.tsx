import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ComponentsIndexPage } from '../src/pages/components-index'
import { siteContent } from '../src/registry/content'
import { TopBar } from '../src/layouts/top-bar'
import { ThemeProvider } from '../src/styles/theme-provider'

function renderIndex(initialEntry = '/components') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="/components"
            element={
              <div>
                <TopBar />
                <ComponentsIndexPage />
              </div>
            }
          />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('ComponentsIndexPage', () => {
  it('renders all 14 components by default when no filters are applied', () => {
    renderIndex('/components')
    expect(screen.getByRole('heading', { level: 1, name: siteContent.componentsIndex.title })).toBeInTheDocument()
    expect(screen.getByText(`14 ${siteContent.nav.components}`)).toBeInTheDocument()

    // Filter chip "All" should be selected
    const allChip = screen.getByRole('button', { name: siteContent.componentsIndex.filterAll })
    expect(allChip).toHaveAttribute('aria-pressed', 'true')
    expect(allChip).toHaveClass('bg-primary', 'text-on-primary')
  })

  it('filters to only the Button card when /components?category=buttons is loaded', () => {
    renderIndex('/components?category=buttons')
    expect(screen.getByText(`1 ${siteContent.nav.components}`)).toBeInTheDocument()

    const buttonLink = screen.getByRole('link', { name: /Button/i })
    expect(buttonLink).toHaveAttribute('href', '/components/button')
    expect(screen.queryByRole('link', { name: /Input/i })).not.toBeInTheDocument()

    const buttonsChip = screen.getByRole('button', { name: siteContent.categories.buttons.name })
    expect(buttonsChip).toHaveAttribute('aria-pressed', 'true')
    expect(buttonsChip).toHaveClass('bg-primary', 'text-on-primary')
  })

  it('filters by search query q in URL', () => {
    renderIndex('/components?q=input')
    expect(screen.getByText(`1 ${siteContent.nav.components}`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Input/i })).toHaveAttribute('href', '/components/input')
    expect(screen.queryByRole('link', { name: /Button/i })).not.toBeInTheDocument()
  })

  it('synchronizes top bar search and page search input via URL', () => {
    renderIndex('/components?q=dialog')

    // TopBar searchbox and page searchbox both have value "dialog"
    const searchInputs = screen.getAllByRole('searchbox')
    expect(searchInputs.length).toBeGreaterThanOrEqual(2)
    searchInputs.forEach((input) => {
      expect(input).toHaveValue('dialog')
    })
  })

  it('updates filtering and URL when clicking category chips', () => {
    renderIndex('/components')

    const formsChip = screen.getByRole('button', { name: siteContent.categories.forms.name })
    fireEvent.click(formsChip)

    // Form elements has 4 items
    expect(screen.getByText(`4 ${siteContent.nav.components}`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Input/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Checkbox/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Radio group/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Select/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Button/i })).not.toBeInTheDocument()

    // Clicking "All" resets the filter
    const allChip = screen.getByRole('button', { name: siteContent.componentsIndex.filterAll })
    fireEvent.click(allChip)
    expect(screen.getByText(`14 ${siteContent.nav.components}`)).toBeInTheDocument()
  })

  it('shows empty state when no components match query', () => {
    renderIndex('/components?q=nonexistent')
    expect(screen.getByText(siteContent.componentsIndex.emptyTitle)).toBeInTheDocument()
    expect(screen.getByText(siteContent.componentsIndex.emptyDescription)).toBeInTheDocument()
    expect(screen.getByText(`0 ${siteContent.nav.components}`)).toBeInTheDocument()
  })

  it('renders cards with 120px preview area on color-stage and focus rings', () => {
    renderIndex('/components?category=buttons')
    const buttonCard = screen.getByRole('link', { name: /Button/i })
    expect(buttonCard).toHaveClass('focus-visible:outline-focus-ring')

    const preview = buttonCard.querySelector('.bg-stage')
    expect(preview).toBeInTheDocument()
    expect(preview).toHaveClass('h-[120px]')
  })

  it('does not render a Design tokens button or link', () => {
    renderIndex('/components')
    expect(screen.queryByRole('link', { name: siteContent.nav.designTokens })).not.toBeInTheDocument()
  })
})
