import { ThemeProvider, useTheme } from './styles/theme-provider'
import { siteContent } from './registry/content'
import { Button } from './components/buttons/button'

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-muted">
        Mode: <strong className="text-text capitalize">{theme}</strong> ({resolvedTheme})
      </span>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring transition-colors cursor-pointer"
        aria-label="Toggle light or dark theme"
      >
        Toggle {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
      </button>
      <div className="flex gap-1 border border-border rounded-md p-1 bg-surface">
        {(['light', 'dark', 'system'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-2 py-1 text-xs rounded font-medium capitalize cursor-pointer ${
              theme === t ? 'bg-primary text-on-primary' : 'text-text-muted hover:bg-muted'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

function TokenGallery() {
  const colorTokens = [
    { name: 'primary', bg: 'bg-primary', text: 'text-on-primary' },
    { name: 'secondary', bg: 'bg-secondary', text: 'text-on-secondary' },
    { name: 'surface', bg: 'bg-surface', text: 'text-text' },
    { name: 'muted', bg: 'bg-muted', text: 'text-text' },
    { name: 'stage', bg: 'bg-stage', text: 'text-text' },
    { name: 'danger', bg: 'bg-danger', text: 'text-on-danger' },
    { name: 'success', bg: 'bg-success', text: 'text-white' },
    { name: 'warning', bg: 'bg-warning', text: 'text-white' },
    { name: 'info', bg: 'bg-info', text: 'text-white' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Color Tokens</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
          {colorTokens.map((t) => (
            <div
              key={t.name}
              className={`${t.bg} ${t.text} p-3 rounded-md border border-border text-center shadow-sm flex flex-col justify-between h-24`}
            >
              <div className="text-xs opacity-75">token</div>
              <div className="font-mono text-xs font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-surface border border-border shadow-md">
          <h3 className="font-semibold text-lg mb-2">Typography & Spacing</h3>
          <p className="text-sm text-text-muted mb-3 font-sans">
            Base font: <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">Inter</code>. Monospace font: <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">JetBrains Mono</code>.
          </p>
          <div className="space-y-1">
            <p className="text-xs text-text-muted">text-xs (12px)</p>
            <p className="text-sm">text-sm (14px) - Controls and labels</p>
            <p className="text-base">text-base (16px) - Body text</p>
            <p className="text-lg font-medium">text-lg (18px) - Subtitle</p>
            <p className="text-xl font-semibold">text-xl (20px) - Section title</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border shadow-md">
          <h3 className="font-semibold text-lg mb-2">Border Radius & Shadows</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="p-3 bg-muted rounded-sm border border-border">radius-sm (4px)</div>
            <div className="p-3 bg-muted rounded-md border border-border">radius-md (8px)</div>
            <div className="p-3 bg-muted rounded-lg border border-border shadow-sm">radius-lg (12px)</div>
            <div className="px-4 py-2 bg-muted rounded-full border border-border">radius-full</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ButtonShowcase() {
  return (
    <section className="space-y-6 pt-6 border-t border-border">
      <div>
        <h2 className="text-xl font-semibold">{siteContent.button.title}</h2>
        <p className="text-sm text-text-muted mt-1">{siteContent.button.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-text-muted mb-3">Variants</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="primary">{siteContent.button.primary}</Button>
            <Button variant="secondary">{siteContent.button.secondary}</Button>
            <Button variant="outline">{siteContent.button.outline}</Button>
            <Button variant="ghost">{siteContent.button.ghost}</Button>
            <Button variant="destructive">{siteContent.button.destructive}</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted mb-3">Sizes</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">{siteContent.button.small}</Button>
            <Button size="md">{siteContent.button.medium}</Button>
            <Button size="lg">{siteContent.button.large}</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted mb-3">States</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button disabled>{siteContent.button.disabled}</Button>
            <Button loading>{siteContent.button.loading}</Button>
            <Button
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                </svg>
              }
            >
              {siteContent.button.withLeftIcon}
            </Button>
            <Button
              variant="outline"
              rightIcon={
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              }
            >
              {siteContent.button.withRightIcon}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function MainContent() {
  return (
    <div className="min-h-screen bg-bg text-text p-6 md:p-12 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{siteContent.brand.name}</h1>
            <p className="text-sm text-text-muted mt-1">{siteContent.brand.tagline}</p>
          </div>
          <ThemeToggle />
        </header>

        <TokenGallery />
        <ButtonShowcase />
      </div>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  )
}

export default App
