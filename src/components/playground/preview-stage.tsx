import React, { useState } from 'react'
import { siteContent } from '../../registry/content'

export type ViewportMode = 'mobile' | 'tablet' | 'desktop'
export type PreviewTheme = 'light' | 'dark'

export interface PreviewStageProps {
  children?: React.ReactNode
  onReset?: () => void
  initialViewport?: ViewportMode
  initialTheme?: PreviewTheme
}

const viewportWidthClasses: Record<ViewportMode, string> = {
  mobile: 'max-w-[375px]',
  tablet: 'max-w-[768px]',
  desktop: 'max-w-full',
}

export function PreviewStage({
  children,
  onReset,
  initialViewport = 'desktop',
  initialTheme = 'light',
}: PreviewStageProps) {
  const [viewport, setViewport] = useState<ViewportMode>(initialViewport)
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>(initialTheme)

  const togglePreviewTheme = () => {
    setPreviewTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleReset = () => {
    setViewport('desktop')
    setPreviewTheme('light')
    onReset?.()
  }

  const viewportOptions: { mode: ViewportMode; label: string }[] = [
    { mode: 'mobile', label: siteContent.playground.viewport.mobile },
    { mode: 'tablet', label: siteContent.playground.viewport.tablet },
    { mode: 'desktop', label: siteContent.playground.viewport.desktop },
  ]

  return (
    <div
      aria-label="Component preview panel"
      className="w-full rounded-lg border border-border bg-surface overflow-hidden shadow-sm flex flex-col"
    >
      {/* Toolbar */}
      <div className="h-12 border-b border-border bg-surface px-3 py-2 flex items-center justify-between gap-3">
        {/* Left: Viewport Segmented Control */}
        <div
          role="radiogroup"
          aria-label="Viewport size"
          className="flex items-center gap-1 bg-muted p-0.5 rounded-md border border-border"
        >
          {viewportOptions.map(({ mode, label }) => {
            const isSelected = viewport === mode
            return (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setViewport(mode)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                  isSelected
                    ? 'bg-surface text-text shadow-sm border border-border'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Right: Preview Theme Toggle & Reset Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePreviewTheme}
            className="p-1.5 rounded-md bg-surface text-text border border-border hover:bg-muted transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            aria-label={
              previewTheme === 'dark'
                ? siteContent.playground.stageThemeLightAria
                : siteContent.playground.stageThemeDarkAria
            }
            title={
              previewTheme === 'dark'
                ? siteContent.playground.stageThemeLightAria
                : siteContent.playground.stageThemeDarkAria
            }
          >
            {previewTheme === 'dark' ? (
              <svg
                data-testid="stage-sun-icon"
                className="w-4 h-4 text-warning"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                data-testid="stage-moon-icon"
                className="w-4 h-4 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-text-muted hover:text-text transition-colors cursor-pointer px-2 py-1 rounded border border-border bg-surface hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            {siteContent.playground.reset}
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div
        data-testid="preview-stage"
        className={`w-full min-h-[320px] bg-stage bg-[radial-gradient(var(--color-stage-dot)_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-6 overflow-x-auto transition-colors ${
          previewTheme === 'dark' ? 'dark text-text' : 'light text-text'
        }`}
      >
        <div
          data-testid="viewport-container"
          className={`w-full ${viewportWidthClasses[viewport]} mx-auto flex items-center justify-center transition-all duration-200 motion-reduce:transition-none`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
