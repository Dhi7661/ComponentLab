import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from '../src/pages/home-page'
import { siteContent } from '../src/registry/content'

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders headline in text-4xl font-bold and subtitle in text-lg text-text-muted', () => {
    renderHomePage()
    const heading = screen.getByRole('heading', { level: 1, name: siteContent.home.title })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-4xl', 'font-bold')

    const subtitle = screen.getByText(siteContent.home.subtitle)
    expect(subtitle).toBeInTheDocument()
    expect(subtitle).toHaveClass('text-lg', 'text-text-muted')
  })

  it('renders "Browse components" button linking to /components', () => {
    renderHomePage()
    const browseLink = screen.getByRole('link', { name: siteContent.home.browseButton })
    expect(browseLink).toHaveAttribute('href', '/components')
    expect(browseLink).toHaveClass('bg-primary', 'text-on-primary')
  })

  it('does not render a Design tokens button or link', () => {
    renderHomePage()
    expect(screen.queryByRole('link', { name: siteContent.home.tokensButton })).not.toBeInTheDocument()
  })

  it('renders exactly five category cards linking to correct category URLs', () => {
    renderHomePage()

    const expectedCategories = [
      {
        id: 'buttons',
        name: siteContent.categories.buttons.name,
        description: siteContent.categories.buttons.description,
        count: siteContent.categories.buttons.count,
      },
      {
        id: 'forms',
        name: siteContent.categories.forms.name,
        description: siteContent.categories.forms.description,
        count: siteContent.categories.forms.count,
      },
      {
        id: 'overlays',
        name: siteContent.categories.overlays.name,
        description: siteContent.categories.overlays.description,
        count: siteContent.categories.overlays.count,
      },
      {
        id: 'data-display',
        name: siteContent.categories.dataDisplay.name,
        description: siteContent.categories.dataDisplay.description,
        count: siteContent.categories.dataDisplay.count,
      },
      {
        id: 'feedback',
        name: siteContent.categories.feedback.name,
        description: siteContent.categories.feedback.description,
        count: siteContent.categories.feedback.count,
      },
    ]

    expectedCategories.forEach((cat) => {
      const cardLink = screen.getByRole('link', { name: new RegExp(cat.name, 'i') })
      expect(cardLink).toHaveAttribute('href', `/components?category=${cat.id}`)

      const card = within(cardLink)
      expect(card.getByText(cat.name)).toBeInTheDocument()
      expect(card.getByText(cat.description)).toBeInTheDocument()
      expect(card.getByText(cat.count.toString())).toBeInTheDocument()
    })
  })
})
