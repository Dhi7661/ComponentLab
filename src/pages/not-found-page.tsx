import { Link } from 'react-router-dom'
import { siteContent } from '../registry/content'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold">{siteContent.notFound.title}</h1>
        <p className="text-text-muted text-sm">{siteContent.notFound.description}</p>
        <div>
          <Link
            to="/"
            className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring transition-colors"
          >
            {siteContent.notFound.backHome}
          </Link>
        </div>
      </div>
    </div>
  )
}
