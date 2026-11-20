import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { TopBar } from '../src/layouts/top-bar'
import { ThemeProvider } from '../src/styles/theme-provider'
import { siteContent } from '../src/registry/content'

function renderTopBar(defaultTheme: 'light' | 'dark' = 'light') {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('TopBar', () => {
  const originalNavigator = window.navigator

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true,
    })
  })

  it('toggles theme between light and dark modes, showing moon in light mode and sun in dark mode', () => {
    renderTopBar('light')

    // In light mode: aria-label says "Switch to dark mode", moon icon is shown
    const toggleButton = screen.getByRole('button', {
      name: siteContent.nav.themeToggleDarkAria,
    })
    expect(toggleButton).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()

    // Click to toggle to dark mode
    fireEvent.click(toggleButton)

    // Now in dark mode: aria-label says "Switch to light mode", sun icon is shown
    expect(
      screen.getByRole('button', { name: siteContent.nav.themeToggleLightAria }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()

    // Click again to toggle back to light mode
    fireEvent.click(screen.getByRole('button', { name: siteContent.nav.themeToggleLightAria }))
    expect(
      screen.getByRole('button', { name: siteContent.nav.themeToggleDarkAria }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  it('focuses search field when Ctrl+K or Cmd+K is pressed', () => {
    renderTopBar()
    const searchInput = screen.getByRole('searchbox', {
      name: siteContent.nav.searchAriaLabel,
    })

    expect(document.activeElement).not.toBe(searchInput)

    // Trigger Ctrl+K
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    expect(document.activeElement).toBe(searchInput)

    // Blur search input
    searchInput.blur()
    expect(document.activeElement).not.toBe(searchInput)

    // Trigger Cmd+K (metaKey)
    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    expect(document.activeElement).toBe(searchInput)
  })

  it('renders "⌘K" shortcut hint on Mac platform', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        ...originalNavigator,
        platform: 'MacIntel',
      },
      configurable: true,
      writable: true,
    })

    renderTopBar()
    expect(screen.getByText(siteContent.nav.shortcutKeyMac)).toBeInTheDocument()
  })

  it('renders "Ctrl K" shortcut hint on Windows platform', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        ...originalNavigator,
        platform: 'Win32',
      },
      configurable: true,
      writable: true,
    })

    renderTopBar()
    expect(screen.getByText(siteContent.nav.shortcutKeyWindows)).toBeInTheDocument()
  })
})

