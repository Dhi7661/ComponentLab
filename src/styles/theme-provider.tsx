import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'componentlab-theme'

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(defaultTheme: Theme, storageKey: string): { theme: Theme; resolved: ResolvedTheme } {
  if (typeof window === 'undefined') {
    return { theme: defaultTheme, resolved: defaultTheme === 'system' ? 'light' : defaultTheme }
  }

  try {
    const urlTheme = new URLSearchParams(window.location.search).get('theme') as Theme | null
    if (urlTheme === 'light' || urlTheme === 'dark') {
      return { theme: urlTheme, resolved: urlTheme }
    }
    const stored = localStorage.getItem(storageKey) as Theme | null
    const chosen = stored || defaultTheme
    const resolved = chosen === 'system' ? getSystemTheme() : chosen
    return { theme: chosen, resolved }
  } catch {
    return { theme: defaultTheme, resolved: defaultTheme === 'system' ? getSystemTheme() : defaultTheme }
  }
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [initial] = useState(() => getInitialTheme(defaultTheme, storageKey))
  const [theme, setThemeState] = useState<Theme>(initial.theme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(initial.resolved)

  // Ensure DOM class is applied immediately on mount
  useEffect(() => {
    const root = document.documentElement
    const resolved = theme === 'system' ? getSystemTheme() : theme

    setResolvedTheme(resolved)

    if (resolved === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  // Synchronous immediate application during initial render
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    if (resolvedTheme === 'dark' && !root.classList.contains('dark')) {
      root.classList.add('dark')
    } else if (resolvedTheme === 'light' && root.classList.contains('dark')) {
      root.classList.remove('dark')
    }
  }

  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const resolved = getSystemTheme()
      setResolvedTheme(resolved)
      if (resolved === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch {
        // localStorage may fail in restricted/private browsing modes
      }
    },
    [storageKey],
  )

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
