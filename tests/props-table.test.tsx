import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropsTable } from '../src/components/playground/props-table'
import { buttonEntry } from '../src/registry/button'
import { siteContent } from '../src/registry/content'

describe('PropsTable', () => {
  const { columns, requiredBadge, noDefault } = siteContent.playground.propsTable

  it('renders table headers: Prop, Type, Default, and Description', () => {
    render(<PropsTable props={buttonEntry.props} />)

    expect(screen.getByRole('columnheader', { name: columns.prop })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: columns.type })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: columns.default })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: columns.description })).toBeInTheDocument()
  })

  it('renders all props from the registry entry', () => {
    render(<PropsTable props={buttonEntry.props} />)

    buttonEntry.props.forEach((prop) => {
      expect(screen.getByText(prop.name)).toBeInTheDocument()
      expect(screen.getByText(prop.description)).toBeInTheDocument()
    })
  })

  it('renders required badge for required props and default value when provided', () => {
    render(<PropsTable props={buttonEntry.props} />)

    // children is required
    expect(screen.getByText(requiredBadge)).toBeInTheDocument()

    // variant has defaultValue "'primary'"
    expect(screen.getByText("'primary'")).toBeInTheDocument()

    // size has defaultValue "'md'"
    expect(screen.getByText("'md'")).toBeInTheDocument()

    // leftIcon does not have a default value, shows noDefault dash
    expect(screen.getAllByText(noDefault).length).toBeGreaterThan(0)
  })
})
