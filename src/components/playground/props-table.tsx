import type { ComponentPropDoc } from '../../registry/schema'
import { siteContent } from '../../registry/content'

export interface PropsTableProps {
  props: ComponentPropDoc[]
}

export function PropsTable({ props }: PropsTableProps) {
  const { columns, requiredBadge, noDefault, title } = siteContent.playground.propsTable

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <table aria-label={title} className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <th scope="col" className="px-4 py-3">
              {columns.prop}
            </th>
            <th scope="col" className="px-4 py-3">
              {columns.type}
            </th>
            <th scope="col" className="px-4 py-3">
              {columns.default}
            </th>
            <th scope="col" className="px-4 py-3">
              {columns.description}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-muted/20 transition-colors">
              <td className="px-4 py-3 align-top whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-sm font-semibold text-text">
                    {prop.name}
                  </code>
                  {prop.required && (
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-primary text-on-primary">
                      {requiredBadge}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-xs text-text-muted bg-muted px-1.5 py-0.5 rounded border border-border inline-block break-words">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top whitespace-nowrap">
                {prop.defaultValue ? (
                  <code className="font-mono text-xs text-text-muted bg-muted/60 px-1.5 py-0.5 rounded border border-border/50">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-xs text-text-muted">{noDefault}</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-sm text-text-muted leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
