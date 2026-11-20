import { Link, useSearchParams } from 'react-router-dom'
import { siteContent } from '../registry/content'
import { getAllComponents } from '../registry'

export function ComponentsIndexPage() {
  const [searchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const query = searchParams.get('q') || ''
  const components = getAllComponents()

  const filteredComponents = components.filter((comp) => {
    const matchesCategory = !categoryFilter || comp.category === categoryFilter.toLowerCase()
    const matchesQuery = !query || comp.name.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="min-h-screen bg-bg text-text p-6 md:p-12 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{siteContent.componentsIndex.title}</h1>
          <p className="text-lg text-text-muted mt-1">{siteContent.componentsIndex.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredComponents.map((comp) => (
            <Link
              key={comp.id}
              to={`/components/${comp.id}`}
              className="p-4 rounded-lg bg-surface border border-border hover:bg-muted transition-colors block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              <div className="h-28 bg-stage rounded border border-stage-dot mb-3 flex items-center justify-center text-xs text-text-muted">
                {comp.name}
              </div>
              <h2 className="font-semibold text-base text-text">{comp.name}</h2>
              <p className="text-xs text-text-muted capitalize mt-1">{comp.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
