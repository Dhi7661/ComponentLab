import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../src/styles/theme-provider'
import { HomePage } from '../src/pages/home-page'
import { ComponentsIndexPage } from '../src/pages/components-index'
import { ComponentDetailPage } from '../src/pages/component-detail-page'
import { NotFoundPage } from '../src/pages/not-found-page'
import App from '../src/App'
import { siteContent } from '../src/registry/content'

function renderWithRouter(initialEntry: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsIndexPage />} />
          <Route path="/components/:name" element={<ComponentDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('App and Router', () => {
  it('renders home page on root route', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: siteContent.home.title }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: siteContent.home.browseButton }),
    ).toHaveAttribute('href', '/components')
  })

  it('renders components index page on /components', () => {
    renderWithRouter('/components')
    expect(
      screen.getByRole('heading', { level: 1, name: siteContent.componentsIndex.title }),
    ).toBeInTheDocument()
  })

  it('renders component placeholder on /components/:name', () => {
    renderWithRouter('/components/button')
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText(siteContent.componentPage.phaseNotice)).toBeInTheDocument()
  })

  it('renders not found page on unknown route with back home link', () => {
    renderWithRouter('/non-existent-route')
    expect(screen.getByRole('heading', { level: 1, name: siteContent.notFound.title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: siteContent.notFound.backHome })).toHaveAttribute('href', '/')
  })
})
