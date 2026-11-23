import type { ComponentRegistryEntry, ComponentPropDoc } from '../../registry/schema'
import { siteContent } from '../../registry/content'

export interface PlaygroundControlsProps {
  entry: ComponentRegistryEntry
  values: Record<string, unknown>
  onChange: (name: string, value: unknown) => void
  onReset?: () => void
}

export function PlaygroundControls({
  entry,
  values,
  onChange,
  onReset,
}: PlaygroundControlsProps) {
  const getPropLabel = (propName: string): string => {
    switch (propName) {
      case 'variant':
        return siteContent.playground.labels.variant
      case 'size':
        return siteContent.playground.labels.size
      case 'children':
        return siteContent.playground.labels.children
      case 'leftIcon':
        return siteContent.playground.labels.leftIcon
      case 'loading':
        return siteContent.playground.labels.loading
      case 'disabled':
        return siteContent.playground.labels.disabled
      case 'fullWidth':
        return siteContent.playground.labels.fullWidth
      default:
        return propName
    }
  }

  const getVariantOptionLabel = (option: string): string => {
    switch (option) {
      case 'primary':
        return siteContent.playground.variants.primary
      case 'secondary':
        return siteContent.playground.variants.secondary
      case 'outline':
        return siteContent.playground.variants.outline
      case 'ghost':
        return siteContent.playground.variants.ghost
      case 'destructive':
        return siteContent.playground.variants.destructive
      default:
        return option
    }
  }

  const getSizeOptionLabel = (option: string): string => {
    switch (option) {
      case 'sm':
        return siteContent.playground.sizes.sm
      case 'md':
        return siteContent.playground.sizes.md
      case 'lg':
        return siteContent.playground.sizes.lg
      default:
        return option
    }
  }

  const getIconOptionLabel = (option: string): string => {
    switch (option) {
      case 'none':
        return siteContent.playground.icons.none
      case 'arrow-right':
        return siteContent.playground.icons.arrowRight
      case 'download':
        return siteContent.playground.icons.download
      case 'bookmark':
        return siteContent.playground.icons.bookmark
      default:
        return option
    }
  }

  const renderControl = (prop: ComponentPropDoc) => {
    const value = values[prop.name] ?? entry.defaultProps?.[prop.name]
    const control = prop.control
    if (!control) return null

    // Segmented control for variant and size
    if (prop.name === 'variant' && control.type === 'select') {
      return (
        <div
          role="radiogroup"
          aria-label={getPropLabel(prop.name)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-muted p-1 rounded-md border border-border"
        >
          {control.options.map((option) => {
            const isSelected = value === option
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange(prop.name, option)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                  isSelected
                    ? 'bg-surface text-text shadow-sm border border-border'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {getVariantOptionLabel(option)}
              </button>
            )
          })}
        </div>
      )
    }

    if (prop.name === 'size' && control.type === 'select') {
      return (
        <div
          role="radiogroup"
          aria-label={getPropLabel(prop.name)}
          className="flex flex-col gap-1 bg-muted p-1 rounded-md border border-border"
        >
          {control.options.map((option) => {
            const isSelected = value === option
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange(prop.name, option)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                  isSelected
                    ? 'bg-surface text-text shadow-sm border border-border'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {getSizeOptionLabel(option)}
              </button>
            )
          })}
        </div>
      )
    }

    // Text control for children (label)
    if (control.type === 'text') {
      return (
        <input
          type="text"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(prop.name, e.target.value)}
          aria-label={getPropLabel(prop.name)}
          className="w-full h-9 px-3 text-sm bg-surface text-text border border-border rounded-md placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        />
      )
    }

    // Dropdown / Select control for icons
    if (control.type === 'select') {
      return (
        <select
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(prop.name, e.target.value)}
          aria-label={getPropLabel(prop.name)}
          className="w-full h-9 px-3 text-sm bg-surface text-text border border-border rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          {control.options.map((option) => (
            <option key={option} value={option}>
              {prop.name === 'leftIcon' ? getIconOptionLabel(option) : option}
            </option>
          ))}
        </select>
      )
    }

    // Switch control for booleans (loading, disabled, fullWidth)
    if (control.type === 'boolean') {
      const isChecked = Boolean(value)
      return (
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-label={getPropLabel(prop.name)}
          onClick={() => onChange(prop.name, !isChecked)}
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
            isChecked ? 'bg-primary justify-end' : 'bg-muted border border-border justify-start'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full bg-surface shadow-sm transition-transform ${
              isChecked ? 'bg-on-primary' : 'bg-surface'
            }`}
          />
        </button>
      )
    }

    return null
  }

  // Filter props that have a defined control
  const controllableProps = entry.props.filter((p) => Boolean(p.control))

  return (
    <aside
      aria-label={siteContent.playground.properties}
      className="w-full lg:w-80 shrink-0 bg-surface border border-border rounded-lg p-4 space-y-5"
    >
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h2 className="text-base font-semibold text-text">
          {siteContent.playground.properties}
        </h2>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-text-muted hover:text-primary transition-colors cursor-pointer rounded px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            {siteContent.playground.reset}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {controllableProps.map((prop) => {
          const isBoolean = prop.control?.type === 'boolean'
          return (
            <div
              key={prop.name}
              className={
                isBoolean
                  ? 'flex items-center justify-between py-1 border-b border-border/50 last:border-b-0'
                  : 'space-y-1.5'
              }
            >
              <div>
                <label className="text-sm font-medium text-text block">
                  {getPropLabel(prop.name)}
                </label>
                <span className="text-[11px] font-mono text-text-muted block">
                  {prop.name}
                </span>
              </div>
              <div>{renderControl(prop)}</div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
