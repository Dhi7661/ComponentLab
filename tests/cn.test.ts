import { describe, it, expect } from 'vitest'
import { cn } from '../src/utils/cn'

describe('cn utility', () => {
  it('combines multiple class names', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary')
  })

  it('handles falsy and conditional values correctly', () => {
    const isHidden = false
    const isActive = true
    expect(cn('base', isHidden && 'hidden', null, undefined, isActive && 'active')).toBe(
      'base active',
    )
  })

  it('resolves conflicting Tailwind utility classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles arrays and objects', () => {
    expect(cn(['foo', 'bar'], { baz: true, qux: false })).toBe('foo bar baz')
  })
})
