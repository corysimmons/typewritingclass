import { describe, it, expect } from 'vitest'
import { __twcDynamic } from '../src/runtime.ts'

describe('__twcDynamic', () => {
  it('returns className and style', () => {
    const result = __twcDynamic('_abc123', { '--twc-d0': '#ff0000' })
    expect(result.className).toBe('_abc123')
    expect(result.style).toEqual({ '--twc-d0': '#ff0000' })
  })

  it('handles multiple bindings', () => {
    const bindings = { '--twc-d0': '1rem', '--twc-d1': '#3b82f6' }
    const result = __twcDynamic('_test', bindings)
    expect(result.style).toEqual(bindings)
  })

  it('handles empty bindings', () => {
    const result = __twcDynamic('_empty', {})
    expect(result.className).toBe('_empty')
    expect(result.style).toEqual({})
  })
})
