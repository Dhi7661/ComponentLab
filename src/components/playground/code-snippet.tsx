import { useState } from 'react'
import type { ComponentRegistryEntry } from '../../registry/schema'
import { siteContent } from '../../registry/content'

export interface CodeSnippetProps {
  entry: ComponentRegistryEntry
  values: Record<string, unknown>
  fileName?: string
}

function generateSnippetCode(
  entry: ComponentRegistryEntry,
  values: Record<string, unknown>,
): string {
  const componentName = entry.id.charAt(0).toUpperCase() + entry.id.slice(1)
  const importPath = entry.importPath

  const propLines: string[] = []

  // Variant
  if (values.variant && typeof values.variant === 'string') {
    propLines.push(`  variant="${values.variant}"`)
  }

  // Size
  if (values.size && typeof values.size === 'string') {
    propLines.push(`  size="${values.size}"`)
  }

  // Booleans
  if (values.disabled) {
    propLines.push('  disabled')
  }
  if (values.loading) {
    propLines.push('  loading')
  }
  if (values.fullWidth) {
    propLines.push('  fullWidth')
  }

  // LeftIcon
  if (values.leftIcon && values.leftIcon !== 'none') {
    const iconName = String(values.leftIcon)
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
    propLines.push(`  leftIcon={<${iconName}Icon />}`)
  }

  const label = typeof values.children === 'string' ? values.children : ''

  const propsString = propLines.length > 0 ? `\n${propLines.join('\n')}\n` : ' '

  const componentJsx = label
    ? propLines.length > 0
      ? `<${componentName}${propsString}>\n  ${label}\n</${componentName}>`
      : `<${componentName}>${label}</${componentName}>`
    : propLines.length > 0
      ? `<${componentName}${propsString}/>`
      : `<${componentName} />`

  return `import { ${componentName} } from '${importPath}'

export function ${componentName}Example() {
  return (
    ${componentJsx.split('\n').join('\n    ')}
  )
}
`
}

export function CodeSnippet({ entry, values, fileName }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)
  const code = generateSnippetCode(entry, values)
  const resolvedFileName =
    fileName ||
    (entry.id === 'button'
      ? siteContent.playground.codeSnippet.defaultFileName
      : `${entry.id.charAt(0).toUpperCase() + entry.id.slice(1)}Example.tsx`)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      aria-label="Code example"
      className="w-full rounded-lg border border-border overflow-hidden bg-code-bg shadow-sm"
    >
      {/* File tab bar */}
      <div className="h-10 border-b border-border bg-surface px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 text-xs font-mono font-medium rounded-t border-t-2 border-primary bg-code-bg text-code-text">
            {resolvedFileName}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-medium px-2.5 py-1 rounded border border-border bg-surface text-text hover:bg-muted transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-label={copied ? siteContent.playground.codeSnippet.copied : siteContent.playground.codeSnippet.copy}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{siteContent.playground.codeSnippet.copied}</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{siteContent.playground.codeSnippet.copy}</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre className="p-4 text-xs font-mono text-code-text overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
