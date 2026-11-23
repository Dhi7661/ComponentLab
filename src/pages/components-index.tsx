import { Link, useSearchParams } from 'react-router-dom'
import type { ComponentCategory } from '../registry/schema'
import { siteContent } from '../registry/content'
import { getComponent } from '../registry'

interface ComponentCardItem {
  id: string
  name: string
  categoryId: ComponentCategory
  categoryName: string
}

const allComponentsList: ComponentCardItem[] = [
  {
    id: 'button',
    name: siteContent.sidebar.items.button,
    categoryId: 'buttons',
    categoryName: siteContent.sidebar.groups.buttons,
  },
  {
    id: 'input',
    name: siteContent.sidebar.items.input,
    categoryId: 'forms',
    categoryName: siteContent.sidebar.groups.forms,
  },
  {
    id: 'checkbox',
    name: siteContent.sidebar.items.checkbox,
    categoryId: 'forms',
    categoryName: siteContent.sidebar.groups.forms,
  },
  {
    id: 'radio-group',
    name: siteContent.sidebar.items.radioGroup,
    categoryId: 'forms',
    categoryName: siteContent.sidebar.groups.forms,
  },
  {
    id: 'select',
    name: siteContent.sidebar.items.select,
    categoryId: 'forms',
    categoryName: siteContent.sidebar.groups.forms,
  },
  {
    id: 'dialog',
    name: siteContent.sidebar.items.dialog,
    categoryId: 'overlays',
    categoryName: siteContent.sidebar.groups.overlays,
  },
  {
    id: 'confirm-dialog',
    name: siteContent.sidebar.items.confirmDialog,
    categoryId: 'overlays',
    categoryName: siteContent.sidebar.groups.overlays,
  },
  {
    id: 'badge',
    name: siteContent.sidebar.items.badge,
    categoryId: 'data-display',
    categoryName: siteContent.sidebar.groups.dataDisplay,
  },
  {
    id: 'avatar',
    name: siteContent.sidebar.items.avatar,
    categoryId: 'data-display',
    categoryName: siteContent.sidebar.groups.dataDisplay,
  },
  {
    id: 'card',
    name: siteContent.sidebar.items.card,
    categoryId: 'data-display',
    categoryName: siteContent.sidebar.groups.dataDisplay,
  },
  {
    id: 'table',
    name: siteContent.sidebar.items.table,
    categoryId: 'data-display',
    categoryName: siteContent.sidebar.groups.dataDisplay,
  },
  {
    id: 'alert',
    name: siteContent.sidebar.items.alert,
    categoryId: 'feedback',
    categoryName: siteContent.sidebar.groups.feedback,
  },
  {
    id: 'toast',
    name: siteContent.sidebar.items.toast,
    categoryId: 'feedback',
    categoryName: siteContent.sidebar.groups.feedback,
  },
  {
    id: 'tooltip',
    name: siteContent.sidebar.items.tooltip,
    categoryId: 'feedback',
    categoryName: siteContent.sidebar.groups.feedback,
  },
]

const filterChips: { id: 'all' | ComponentCategory; label: string }[] = [
  { id: 'all', label: siteContent.componentsIndex.filterAll },
  { id: 'buttons', label: siteContent.categories.buttons.name },
  { id: 'forms', label: siteContent.categories.forms.name },
  { id: 'overlays', label: siteContent.categories.overlays.name },
  { id: 'data-display', label: siteContent.categories.dataDisplay.name },
  { id: 'feedback', label: siteContent.categories.feedback.name },
]

export function ComponentsIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const qParam = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const handleSearchChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value.trim()) {
      nextParams.set('q', value)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams, { replace: true })
  }

  const handleCategoryChange = (categoryId: 'all' | ComponentCategory) => {
    const nextParams = new URLSearchParams(searchParams)
    if (categoryId === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', categoryId)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const filteredComponents = allComponentsList.filter((comp) => {
    const registered = getComponent(comp.id)
    const compName = registered?.name || comp.name
    const compCategory = registered?.category || comp.categoryId

    const matchesCategory =
      !categoryParam || compCategory.toLowerCase() === categoryParam.toLowerCase()

    const qLower = qParam.trim().toLowerCase()
    const matchesQuery =
      !qLower ||
      compName.toLowerCase().includes(qLower) ||
      comp.categoryName.toLowerCase().includes(qLower) ||
      compCategory.toLowerCase().includes(qLower)

    return matchesCategory && matchesQuery
  })

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            {siteContent.componentsIndex.title}
          </h1>
          <p className="text-lg text-text-muted mt-1">
            {siteContent.componentsIndex.subtitle}
          </p>
        </div>

        {/* Full-width search field */}
        <div className="w-full">
          <input
            type="search"
            value={qParam}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={siteContent.componentsIndex.searchPlaceholder}
            aria-label={siteContent.nav.searchAriaLabel}
            className="w-full h-10 px-4 text-sm bg-surface text-text border border-border rounded-md placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          />
        </div>

        {/* Filter chips */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={siteContent.home.categoriesHeading}
        >
          {filterChips.map((chip) => {
            const isSelected =
              chip.id === 'all'
                ? !categoryParam
                : categoryParam.toLowerCase() === chip.id

            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleCategoryChange(chip.id)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface text-text border-border hover:bg-muted'
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>

        {/* Filtered card count */}
        <div className="text-xs font-medium text-text-muted">
          {filteredComponents.length} {siteContent.nav.components}
        </div>

        {/* Component card grid */}
        {filteredComponents.length === 0 ? (
          <div className="text-center py-12 space-y-2 border border-dashed border-border rounded-lg p-8">
            <h2 className="text-lg font-semibold text-text">
              {siteContent.componentsIndex.emptyTitle}
            </h2>
            <p className="text-sm text-text-muted">
              {siteContent.componentsIndex.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((comp) => {
              const registered = getComponent(comp.id)
              const displayName = registered?.name || comp.name

              return (
                <Link
                  key={comp.id}
                  to={`/components/${comp.id}`}
                  className="group block rounded-lg border border-border bg-surface overflow-hidden shadow-sm hover:shadow hover:border-border-strong transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                  <div className="h-[120px] bg-stage flex items-center justify-center border-b border-border p-4">
                    <span className="text-xs font-mono text-text-muted opacity-70">
                      {displayName}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h2 className="font-semibold text-base text-text group-hover:text-primary transition-colors">
                      {displayName}
                    </h2>
                    <p className="text-xs text-text-muted capitalize">
                      {comp.categoryName}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
