import React, { useRef, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { siteContent } from '../registry/content'
import { useTheme } from '../styles/theme-provider'

export function TopBar() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/components?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/components')
    }
  }

  return (
    <header className="h-14 border-b border-border bg-bg sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left: Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          to="/"
          className="text-lg font-semibold text-text tracking-tight hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
        >
          {siteContent.brand.name}
        </Link>
      </div>

      {/* Center: Search Field */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-[480px] relative">
        <input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={siteContent.nav.searchPlaceholder}
          aria-label={siteContent.nav.searchAriaLabel}
          className="w-full h-9 pl-3 pr-12 text-sm bg-surface text-text border border-border rounded-md placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <kbd className="text-[10px] font-mono font-medium text-text-muted bg-muted border border-border px-1.5 py-0.5 rounded">
            {siteContent.nav.shortcutKey}
          </kbd>
        </div>
      </form>

      {/* Right: Nav link and Theme toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <NavLink
          to="/components"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded px-2 py-1 ${
              isActive ? 'text-primary font-semibold' : 'text-text-muted hover:text-text'
            }`
          }
        >
          {siteContent.nav.components}
        </NavLink>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-surface text-text border border-border hover:bg-muted transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-label={
            resolvedTheme === 'dark'
              ? siteContent.nav.themeToggleLightAria
              : siteContent.nav.themeToggleDarkAria
          }
          title={
            resolvedTheme === 'dark'
              ? siteContent.nav.themeToggleLightAria
              : siteContent.nav.themeToggleDarkAria
          }
        >
          {resolvedTheme === 'dark' ? (
            <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

