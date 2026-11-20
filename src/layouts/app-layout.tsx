import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './top-bar'
import { Sidebar, SidebarNav } from './sidebar'
import { siteContent } from '../registry/content'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export function MobileDrawer({ isOpen, onClose, triggerRef }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(isOpen)

  // Focus management: move focus in on open, return to trigger on close
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    } else if (wasOpenRef.current && !isOpen) {
      triggerRef.current?.focus()
    }
    wasOpenRef.current = isOpen
  }, [isOpen, triggerRef])

  // Close on Escape key and trap Tab key focus
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return

        const firstElement = focusables[0]
        const lastElement = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="md:hidden" data-testid="mobile-drawer-root">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
        data-testid="drawer-backdrop"
      />

      {/* Drawer */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={siteContent.nav.menuToggleAria}
        className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-sidebar border-r border-border shadow-xl flex flex-col transition-transform duration-200 ease-in-out motion-reduce:transition-none motion-reduce:transform-none"
      >
        <div className="h-14 border-b border-border px-4 flex items-center justify-between shrink-0">
          <span className="font-semibold text-text text-base">
            {siteContent.brand.name}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={siteContent.nav.closeMenuAria}
            className="p-1.5 rounded-md bg-surface text-text border border-border hover:bg-muted transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            <svg
              className="w-4 h-4 text-text"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <SidebarNav onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}

export function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false)
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <TopBar
        onOpenMenu={() => setIsDrawerOpen(true)}
        menuButtonRef={menuButtonRef}
        isDrawerOpen={isDrawerOpen}
      />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 bg-bg">
          <Outlet />
        </main>
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        triggerRef={menuButtonRef}
      />
    </div>
  )
}
