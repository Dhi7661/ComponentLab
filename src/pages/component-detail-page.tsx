import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getComponent, type ComponentRegistryEntry } from '../registry'
import { siteContent } from '../registry/content'
import { cn } from '../utils/cn'
import { PreviewStage } from '../components/playground/preview-stage'
import { PlaygroundControls } from '../components/playground/playground-controls'
import { CodeSnippet } from '../components/playground/code-snippet'
import { PropsTable } from '../components/playground/props-table'
import { Button } from '../components/buttons/button'
import type { ButtonVariant, Size } from '../types'

const knownComponents: Record<string, { name: string; category: string; categoryKey: string }> = {
  button: {
    name: siteContent.sidebar.items.button,
    category: siteContent.sidebar.groups.buttons,
    categoryKey: 'buttons',
  },
  input: {
    name: siteContent.sidebar.items.input,
    category: siteContent.sidebar.groups.forms,
    categoryKey: 'forms',
  },
  checkbox: {
    name: siteContent.sidebar.items.checkbox,
    category: siteContent.sidebar.groups.forms,
    categoryKey: 'forms',
  },
  'radio-group': {
    name: siteContent.sidebar.items.radioGroup,
    category: siteContent.sidebar.groups.forms,
    categoryKey: 'forms',
  },
  select: {
    name: siteContent.sidebar.items.select,
    category: siteContent.sidebar.groups.forms,
    categoryKey: 'forms',
  },
  dialog: {
    name: siteContent.sidebar.items.dialog,
    category: siteContent.sidebar.groups.overlays,
    categoryKey: 'overlays',
  },
  'confirm-dialog': {
    name: siteContent.sidebar.items.confirmDialog,
    category: siteContent.sidebar.groups.overlays,
    categoryKey: 'overlays',
  },
  badge: {
    name: siteContent.sidebar.items.badge,
    category: siteContent.sidebar.groups.dataDisplay,
    categoryKey: 'data-display',
  },
  avatar: {
    name: siteContent.sidebar.items.avatar,
    category: siteContent.sidebar.groups.dataDisplay,
    categoryKey: 'data-display',
  },
  card: {
    name: siteContent.sidebar.items.card,
    category: siteContent.sidebar.groups.dataDisplay,
    categoryKey: 'data-display',
  },
  table: {
    name: siteContent.sidebar.items.table,
    category: siteContent.sidebar.groups.dataDisplay,
    categoryKey: 'data-display',
  },
  alert: {
    name: siteContent.sidebar.items.alert,
    category: siteContent.sidebar.groups.feedback,
    categoryKey: 'feedback',
  },
  toast: {
    name: siteContent.sidebar.items.toast,
    category: siteContent.sidebar.groups.feedback,
    categoryKey: 'feedback',
  },
  tooltip: {
    name: siteContent.sidebar.items.tooltip,
    category: siteContent.sidebar.groups.feedback,
    categoryKey: 'feedback',
  },
}

function renderPreviewComponent(entry: ComponentRegistryEntry, values: Record<string, unknown>) {
  if (entry.id === 'button') {
    const renderIcon = (iconName: unknown) => {
      if (iconName === 'arrow-right') {
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )
      }
      if (iconName === 'download') {
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )
      }
      if (iconName === 'bookmark') {
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        )
      }
      return undefined
    }

    return (
      <Button
        variant={values.variant as ButtonVariant}
        size={values.size as Size}
        disabled={Boolean(values.disabled)}
        loading={Boolean(values.loading)}
        fullWidth={Boolean(values.fullWidth)}
        leftIcon={renderIcon(values.leftIcon)}
      >
        {(values.children as string) || siteContent.button.label}
      </Button>
    )
  }

  return null
}

function ComponentDetailContent({
  entry,
  fallback,
}: {
  entry: ComponentRegistryEntry
  fallback?: { name: string; category: string; categoryKey: string }
}) {
  const [controlValues, setControlValues] = useState<Record<string, unknown>>(() => {
    return entry.defaultProps ? { ...entry.defaultProps } : {}
  })
  const [activeTab, setActiveTab] = useState<'code' | 'props' | 'accessibility'>('code')
  const [copiedImport, setCopiedImport] = useState(false)

  const componentDisplayName = fallback?.name || entry.name
  const categoryDisplayName = fallback?.category || entry.category
  const categoryKey = fallback?.categoryKey || entry.category
  const importStatement = `import { ${componentDisplayName} } from '${entry.importPath}'`

  const handleReset = () => {
    setControlValues(entry.defaultProps ? { ...entry.defaultProps } : {})
  }

  const handleChange = (name: string, value: unknown) => {
    setControlValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCopyImport = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(importStatement).catch(() => {})
    }
    setCopiedImport(true)
    setTimeout(() => {
      setCopiedImport(false)
    }, 2000)
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          to="/components"
          className="text-text-muted hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
        >
          {siteContent.componentPage.breadcrumbComponents}
        </Link>
        <span className="text-text-muted select-none" aria-hidden="true">
          /
        </span>
        <Link
          to={`/components?category=${categoryKey}`}
          className="text-text-muted hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
        >
          {categoryDisplayName}
        </Link>
        <span className="text-text-muted select-none" aria-hidden="true">
          /
        </span>
        <span className="text-text font-medium" aria-current="page">
          {componentDisplayName}
        </span>
      </nav>

      {/* 2 & 3. Title and Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-text">{componentDisplayName}</h1>
        <p className="text-lg text-text-muted leading-relaxed">{entry.description}</p>
      </div>

      {/* 4. Import line in monospace chip with copy button */}
      <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-md border border-border bg-surface text-sm font-mono max-w-full overflow-x-auto">
        <code className="text-text select-all whitespace-nowrap">{importStatement}</code>
        <button
          type="button"
          onClick={handleCopyImport}
          className="p-1 rounded text-text-muted hover:text-text hover:bg-muted transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-label={copiedImport ? siteContent.componentPage.copiedImport : siteContent.componentPage.copyImport}
        >
          {copiedImport ? (
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 5. Preview panel: Stage & Properties panel */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-start">
        <PreviewStage onReset={handleReset}>{renderPreviewComponent(entry, controlValues)}</PreviewStage>
        <PlaygroundControls
          entry={entry}
          values={controlValues}
          onChange={handleChange}
          onReset={handleReset}
        />
      </div>

      {/* 6. Tabs: Code, Props API, Accessibility */}
      <div className="space-y-6">
        <div className="border-b border-border">
          <nav className="flex space-x-8" aria-label="Component tabs" role="tablist">
            <button
              type="button"
              role="tab"
              id="tab-code"
              aria-controls="tabpanel-code"
              aria-selected={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
              className={cn(
                'py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                activeTab === 'code'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text hover:border-border',
              )}
            >
              {siteContent.componentPage.tabs.code}
            </button>
            <button
              type="button"
              role="tab"
              id="tab-props"
              aria-controls="tabpanel-props"
              aria-selected={activeTab === 'props'}
              onClick={() => setActiveTab('props')}
              className={cn(
                'py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                activeTab === 'props'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text hover:border-border',
              )}
            >
              {siteContent.componentPage.tabs.props}
            </button>
            <button
              type="button"
              role="tab"
              id="tab-accessibility"
              aria-controls="tabpanel-accessibility"
              aria-selected={activeTab === 'accessibility'}
              onClick={() => setActiveTab('accessibility')}
              className={cn(
                'py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                activeTab === 'accessibility'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text hover:border-border',
              )}
            >
              {siteContent.componentPage.tabs.accessibility}
            </button>
          </nav>
        </div>

        {activeTab === 'code' && (
          <div role="tabpanel" id="tabpanel-code" aria-labelledby="tab-code" tabIndex={0}>
            <CodeSnippet entry={entry} values={controlValues} />
          </div>
        )}

        {activeTab === 'props' && (
          <div role="tabpanel" id="tabpanel-props" aria-labelledby="tab-props" tabIndex={0}>
            <PropsTable props={entry.props} />
          </div>
        )}

        {activeTab === 'accessibility' && (
          <div
            role="tabpanel"
            id="tabpanel-accessibility"
            aria-labelledby="tab-accessibility"
            tabIndex={0}
            className="space-y-6 p-6 rounded-lg border border-border bg-surface"
          >
            {entry.accessibility ? (
              <>
                {entry.accessibility.keyboardBehavior && entry.accessibility.keyboardBehavior.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-text mb-3">
                      {siteContent.componentPage.accessibility.keyboardHeading}
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-text">
                      {entry.accessibility.keyboardBehavior.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.accessibility.ariaAttributes && entry.accessibility.ariaAttributes.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-text mb-3">
                      {siteContent.componentPage.accessibility.ariaHeading}
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-text">
                      {entry.accessibility.ariaAttributes.map((item, idx) => (
                        <li key={idx} className="font-mono text-xs">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.accessibility.contrastNotes && (
                  <div>
                    <h3 className="text-base font-semibold text-text mb-2">
                      {siteContent.componentPage.accessibility.contrastHeading}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {entry.accessibility.contrastNotes}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-text-muted">
                {siteContent.componentPage.accessibility.noData}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
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

  if (registered) {
    return <ComponentDetailContent key={registered.id} entry={registered} fallback={fallback} />
  }

  // Fallback for components without full registry entry yet
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
          <h1 className="text-3xl font-bold tracking-tight">{fallback?.name}</h1>
          <p className="text-sm text-text-muted mt-1 capitalize">
            {siteContent.componentPage.categoryLabel}: {fallback?.category}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border">
          <p className="text-sm text-text-muted">{siteContent.componentPage.fallbackDescription}</p>
        </div>

        <div className="p-4 rounded-lg bg-secondary text-on-secondary border border-border">
          <p className="text-sm font-medium">{siteContent.componentPage.phaseNotice}</p>
        </div>
      </div>
    </div>
  )
}
