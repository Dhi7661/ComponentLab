import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../src/App'

describe('App', () => {
  it('renders ComponentLab heading and button showcase', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ComponentLab')
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument()
  })
})
