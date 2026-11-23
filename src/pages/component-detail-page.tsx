import { useParams, Link } from 'react-router-dom'
import { getComponent } from '../registry'
import { siteContent } from '../registry/content'

const knownComponents: Record<string, { name: string; category: string }> = {
  button: { name: siteContent.sidebar.items.button, category: siteContent.sidebar.groups.buttons },
  input: { name: siteContent.sidebar.items.input, category: siteContent.sidebar.groups.forms },
  checkbox: { name: siteContent.sidebar.items.checkbox, category: siteContent.sidebar.groups.forms },
  'radio-group': { name: siteContent.sidebar.items.radioGroup, category: siteContent.sidebar.groups.forms },
  select: { name: siteContent.sidebar.items.select, category: siteContent.sidebar.groups.forms },
  dialog: { name: siteContent.sidebar.items.dialog, category: siteContent.sidebar.groups.overlays },
  'confirm-dialog': { name: siteContent.sidebar.items.confirmDialog, category: siteContent.sidebar.groups.overlays },
  badge: { name: siteContent.sidebar.items.badge, category: siteContent.sidebar.groups.dataDisplay },
  avatar: { name: siteContent.sidebar.items.avatar, category: siteContent.sidebar.groups.dataDisplay },
  card: { name: siteContent.sidebar.items.card, category: siteContent.sidebar.groups.dataDisplay },
  table: { name: siteContent.sidebar.items.table, category: siteContent.sidebar.groups.dataDisplay },
  alert: { name: siteContent.sidebar.items.alert, category: siteContent.sidebar.groups.feedback },
  toast: { name: siteContent.sidebar.items.toast, category: siteContent.sidebar.groups.feedback },
  tooltip: { name: siteContent.sidebar.items.tooltip, category: siteContent.sidebar.groups.feedback },
}

export function ComponentDetailPage() {
  const { name } = useParams<{ name: string }>()
  const registered = name ? getComponent(name) : undefined
  const fallback = name ? knownComponents[name] : undefined

  if (!registered && !fallback) {
    return (
      <div className="p-6 md:p-12">
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

  const displayName = fallback?.name || registered?.name
  const displayCategory = fallback?.category || registered?.category

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link
            to="/components"
            className="text-sm text-text-muted hover:text-text mb-4 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
          >
            ← {siteContent.componentPage.backToIndex}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{displayName}</h1>
          <p className="text-sm text-text-muted mt-1 capitalize">
            {siteContent.componentPage.categoryLabel}: {displayCategory}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border">
          <p className="text-sm text-text-muted">{registered?.description || siteContent.componentPage.phaseNotice}</p>
        </div>

        <div className="p-4 rounded-lg bg-secondary text-on-secondary border border-border">
          <p className="text-sm font-medium">{siteContent.componentPage.phaseNotice}</p>
        </div>
      </div>
    </div>
  )
}
