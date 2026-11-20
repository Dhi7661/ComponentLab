import { NavLink } from 'react-router-dom'
import { siteContent } from '../registry/content'

interface SidebarGroup {
  label: string
  items: { label: string; to: string; end?: boolean }[]
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: siteContent.sidebar.overview,
    items: [
      { label: siteContent.sidebar.introduction, to: '/', end: true },
      { label: siteContent.sidebar.allComponents, to: '/components', end: true },
    ],
  },
  {
    label: siteContent.sidebar.groups.buttons,
    items: [
      { label: siteContent.sidebar.items.button, to: '/components/button' },
    ],
  },
  {
    label: siteContent.sidebar.groups.forms,
    items: [
      { label: siteContent.sidebar.items.input, to: '/components/input' },
      { label: siteContent.sidebar.items.checkbox, to: '/components/checkbox' },
      { label: siteContent.sidebar.items.radioGroup, to: '/components/radio-group' },
      { label: siteContent.sidebar.items.select, to: '/components/select' },
    ],
  },
  {
    label: siteContent.sidebar.groups.overlays,
    items: [
      { label: siteContent.sidebar.items.dialog, to: '/components/dialog' },
      { label: siteContent.sidebar.items.confirmDialog, to: '/components/confirm-dialog' },
    ],
  },
  {
    label: siteContent.sidebar.groups.dataDisplay,
    items: [
      { label: siteContent.sidebar.items.badge, to: '/components/badge' },
      { label: siteContent.sidebar.items.avatar, to: '/components/avatar' },
      { label: siteContent.sidebar.items.card, to: '/components/card' },
      { label: siteContent.sidebar.items.table, to: '/components/table' },
    ],
  },
  {
    label: siteContent.sidebar.groups.feedback,
    items: [
      { label: siteContent.sidebar.items.alert, to: '/components/alert' },
      { label: siteContent.sidebar.items.toast, to: '/components/toast' },
      { label: siteContent.sidebar.items.tooltip, to: '/components/tooltip' },
    ],
  },
]

export function Sidebar() {
  return (
    <aside
      aria-label="Sidebar navigation"
      className="w-60 shrink-0 bg-sidebar border-r border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4 space-y-6"
    >
      {sidebarGroups.map((group) => (
        <div key={group.label} className="space-y-1">
          <div className="text-xs uppercase font-medium text-text-muted px-2.5 py-1 tracking-wider">
            {group.label}
          </div>
          <nav className="space-y-0.5">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                    isActive
                      ? 'bg-secondary text-on-secondary'
                      : 'text-text-muted hover:bg-muted hover:text-text'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  )
}

