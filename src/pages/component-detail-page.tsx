import { useParams, Link } from 'react-router-dom'
import { getComponent } from '../registry'
import { siteContent } from '../registry/content'

export function ComponentDetailPage() {
  const { name } = useParams<{ name: string }>()
  const component = name ? getComponent(name) : undefined

  if (!component) {
    return (
      <div className="min-h-screen bg-bg text-text p-6 md:p-12 transition-colors">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">{siteContent.notFound.title}</h1>
          <p className="text-text-muted">{siteContent.notFound.description}</p>
          <Link
            to="/components"
            className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            {siteContent.componentPage.backToIndex}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text p-6 md:p-12 transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link
            to="/components"
            className="text-sm text-text-muted hover:text-text mb-4 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
          >
            ← {siteContent.componentPage.backToIndex}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{component.name}</h1>
          <p className="text-sm text-text-muted mt-1 capitalize">
            {siteContent.componentPage.categoryLabel}: {component.category}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border">
          <p className="text-sm text-text-muted">{component.description}</p>
        </div>

        <div className="p-4 rounded-lg bg-secondary text-on-secondary border border-border">
          <p className="text-sm font-medium">{siteContent.componentPage.phaseNotice}</p>
        </div>
      </div>
    </div>
  )
}
