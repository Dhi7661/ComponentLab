import { ThemeProvider, useTheme } from './styles/theme-provider'
import { siteContent } from './registry/content'
import { Button } from './components/buttons/button'

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-surface text-text border border-border hover:bg-muted transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  )
}

function HomeCategoryCards() {
  const categories = Object.values(siteContent.categories)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{siteContent.home.categoriesHeading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="p-4 rounded-lg bg-surface border border-border shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base text-text">{cat.name}</h3>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-secondary text-on-secondary">
                  {cat.count}
                </span>
              </div>
              <p className="text-xs text-text-muted">{cat.description}</p>
            </div>
          </div>
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
    { name: 'sidebar', bg: 'bg-sidebar', text: 'text-text' },
    { name: 'muted', bg: 'bg-muted', text: 'text-text' },
    { name: 'stage', bg: 'bg-stage', text: 'text-text' },
    { name: 'danger', bg: 'bg-danger', text: 'text-on-danger' },
    { name: 'success', bg: 'bg-success', text: 'text-white dark:text-bg' },
    { name: 'warning', bg: 'bg-warning', text: 'text-white dark:text-bg' },
    { name: 'info', bg: 'bg-info', text: 'text-white dark:text-bg' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Color Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {colorTokens.map((t) => (
            <div
              key={t.name}
              className={`${t.bg} ${t.text} p-3 rounded-md border border-border text-center shadow-sm flex flex-col items-center justify-center h-20`}
            >
              <div className="font-mono text-xs font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-surface border border-border shadow-md">
          <h3 className="font-semibold text-lg mb-2">Typography & Spacing</h3>
          <p className="text-sm text-text-muted mb-3 font-sans">
            Base font: <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">Inter</code>. Monospace font:{' '}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">JetBrains Mono</code>.
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
          <h3 className="text-sm font-medium text-text-muted mb-3">Sizes (sm 32px, md 36px, lg 44px)</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">{siteContent.button.small}</Button>
            <Button size="md">{siteContent.button.medium}</Button>
            <Button size="lg">{siteContent.button.large}</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted mb-3">States</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button disabled>{siteContent.button.disabled}</Button>
            <Button loading>{siteContent.button.loading}</Button>
            <Button className="outline-2 outline-offset-2 outline-focus-ring">
              {siteContent.button.focused}
            </Button>
            <Button
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              {siteContent.button.withLeftIcon}
            </Button>
            <Button
              variant="outline"
              rightIcon={
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
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

        <HomeCategoryCards />
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
