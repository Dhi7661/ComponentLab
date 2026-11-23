import { Link } from 'react-router-dom'
import type { ComponentCategory } from '../registry/schema'
import { siteContent } from '../registry/content'

interface CategoryCardItem {
  id: ComponentCategory
  name: string
  description: string
  count: number
}

const homeCategoryCardsData: CategoryCardItem[] = [
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

export function HomeCategoryCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text">{siteContent.home.categoriesHeading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {homeCategoryCardsData.map((cat) => (
          <Link
            key={cat.id}
            to={`/components?category=${cat.id}`}
            className="p-4 rounded-lg bg-surface border border-border shadow-sm flex flex-col justify-between hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base text-text">{cat.name}</h3>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-secondary text-on-secondary">
                  {cat.count}
                </span>
              </div>
              <p className="text-xs text-text-muted">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <div className="p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-text">{siteContent.home.title}</h1>
          <p className="text-lg text-text-muted">{siteContent.home.subtitle}</p>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/components"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring transition-colors"
            >
              {siteContent.home.browseButton}
            </Link>
          </div>
        </header>

        <section className="pt-4 border-t border-border">
          <HomeCategoryCards />
        </section>
      </div>
    </div>
  )
}
