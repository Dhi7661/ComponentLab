import { describe, it, expect } from 'vitest'
import type { Size, Variant, ButtonVariant, StatusTone } from '../src/types'

describe('Shared types', () => {
  it('validates Size and Variant values at compile time', () => {
    const validSize: Size = 'md'
    const validVariant: Variant = 'primary'
    const validBtnVariant: ButtonVariant = 'outline'
    const validTone: StatusTone = 'success'

    expect(validSize).toBe('md')
    expect(validVariant).toBe('primary')
    expect(validBtnVariant).toBe('outline')
    expect(validTone).toBe('success')
  })
})
