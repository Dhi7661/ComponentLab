import { Link } from 'react-router-dom'
import { siteContent } from '../registry/content'

export function HomePage() {
  const categories = Object.values(siteContent.categories)

  return (
    <div className="min-h-screen bg-bg text-text p-6 md:p-12 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{siteContent.home.title}</h1>
          <p className="text-lg text-text-muted">{siteContent.home.subtitle}</p>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/components"
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring transition-colors"
            >
              {siteContent.home.browseButton}
            </Link>
          </div>
        </header>

        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xl font-semibold">{siteContent.home.categoriesHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/components?category=${encodeURIComponent(cat.name)}`}
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
        </section>
      </div>
    </div>
  )
}
