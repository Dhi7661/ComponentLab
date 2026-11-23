import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CodeSnippet } from '../src/components/playground/code-snippet'
import { buttonEntry } from '../src/registry/button'
import { siteContent } from '../src/registry/content'

describe('CodeSnippet', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    })
  })

  it('renders file tab with ButtonExample.tsx and TypeScript code', () => {
    render(
      <CodeSnippet
        entry={buttonEntry}
        values={{ variant: 'primary', size: 'md', children: 'Click me' }}
      />,
    )

    expect(screen.getByText('ButtonExample.tsx')).toBeInTheDocument()
    expect(screen.getByText(/import \{ Button \} from '@\/components\/buttons\/button'/)).toBeInTheDocument()
    expect(screen.getByText(/export function ButtonExample\(\)/)).toBeInTheDocument()
  })

  it('updates the code snippet based on control values', () => {
    const { rerender } = render(
      <CodeSnippet
        entry={buttonEntry}
        values={{
          variant: 'secondary',
          size: 'lg',
          children: 'Submit Button',
          disabled: true,
          fullWidth: true,
          leftIcon: 'download',
        }}
      />,
    )

    expect(screen.getByText(/variant="secondary"/)).toBeInTheDocument()
    expect(screen.getByText(/size="lg"/)).toBeInTheDocument()
    expect(screen.getByText(/disabled/)).toBeInTheDocument()
    expect(screen.getByText(/fullWidth/)).toBeInTheDocument()
    expect(screen.getByText(/leftIcon=\{<DownloadIcon \/>\}/)).toBeInTheDocument()
    expect(screen.getByText(/Submit Button/)).toBeInTheDocument()

    // Rerender with different props
    rerender(
      <CodeSnippet
        entry={buttonEntry}
        values={{
          variant: 'outline',
          size: 'sm',
          children: 'Outline Button',
          loading: true,
        }}
      />,
    )

    expect(screen.getByText(/variant="outline"/)).toBeInTheDocument()
    expect(screen.getByText(/size="sm"/)).toBeInTheDocument()
    expect(screen.getByText(/loading/)).toBeInTheDocument()
    expect(screen.queryByText(/disabled/)).not.toBeInTheDocument()
  })

  it('copies code to clipboard and temporarily updates button text to "Copied!"', async () => {
    render(
      <CodeSnippet
        entry={buttonEntry}
        values={{ variant: 'primary', size: 'md', children: 'Click me' }}
      />,
    )

    const copyButton = screen.getByRole('button', { name: siteContent.playground.codeSnippet.copy })
    expect(copyButton).toBeInTheDocument()

    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.getByText(siteContent.playground.codeSnippet.copied)).toBeInTheDocument()
    })

    await waitFor(
      () => {
        expect(screen.getByText(siteContent.playground.codeSnippet.copy)).toBeInTheDocument()
      },
      { timeout: 2500 },
    )
  })
})
