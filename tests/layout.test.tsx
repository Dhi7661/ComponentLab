import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import { AppLayout } from '../src/layouts/app-layout'
import { ThemeProvider } from '../src/styles/theme-provider'
import { siteContent } from '../src/registry/content'

function renderAppLayout(initialEntry = '/') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path="/"
              element={
                <div>
                  <h1>Home</h1>
                  <Link to="/other">Go to other</Link>
                </div>
              }
            />
            <Route path="/other" element={<h1>Other Page</h1>} />
            <Route path="/components/button" element={<h1>Button Detail</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('Responsive Layout and Mobile Drawer', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('renders menu button with menuToggleAria and md:hidden class', () => {
    renderAppLayout()
    const menuButton = screen.getByRole('button', { name: siteContent.nav.menuToggleAria })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveClass('md:hidden')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Desktop sidebar has hidden md:block
    const sidebar = screen.getByRole('complementary', { name: 'Sidebar navigation' })
    expect(sidebar).toHaveClass('hidden', 'md:block')
  })

  it('opens mobile drawer when clicking the menu button', () => {
    renderAppLayout()
    const menuButton = screen.getByRole('button', { name: siteContent.nav.menuToggleAria })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(menuButton)

    const drawer = screen.getByRole('dialog')
    expect(drawer).toBeInTheDocument()
    expect(drawer).toHaveAttribute('aria-label', siteContent.nav.menuToggleAria)
    expect(screen.getByRole('button', { name: siteContent.nav.closeMenuAria })).toBeInTheDocument()
  })

  it('closes mobile drawer with close button and returns focus to menu button', () => {
    renderAppLayout()
    const menuButton = screen.getByRole('button', { name: siteContent.nav.menuToggleAria })

    fireEvent.click(menuButton)
    const closeButton = screen.getByRole('button', { name: siteContent.nav.closeMenuAria })

    // Focus should move into the drawer (to close button)
    expect(document.activeElement).toBe(closeButton)

    // Click close button
    fireEvent.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    // Focus should return to the menu button
    expect(document.activeElement).toBe(menuButton)
  })

  it('closes mobile drawer on Escape key and returns focus to menu button', () => {
    renderAppLayout()
    const menuButton = screen.getByRole('button', { name: siteContent.nav.menuToggleAria })

    fireEvent.click(menuButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(menuButton)
  })

  it('closes mobile drawer on route change', async () => {
    renderAppLayout('/')
    const menuButton = screen.getByRole('button', { name: siteContent.nav.menuToggleAria })

    fireEvent.click(menuButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Click link inside drawer to navigate
    const drawer = screen.getByRole('dialog')
    const buttonLink = drawer.querySelector('a[href="/components/button"]')
    expect(buttonLink).toBeInTheDocument()

    if (buttonLink) {
      fireEvent.click(buttonLink)
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('drawer contains motion-reduce classes for prefers-reduced-motion', () => {
    renderAppLayout()
    const menuButton = screen.getByRole('button', { name: siteContent.nav.menuToggleAria })
    fireEvent.click(menuButton)

    const drawer = screen.getByRole('dialog')
    expect(drawer).toHaveClass('motion-reduce:transition-none', 'motion-reduce:transform-none')
  })
})
