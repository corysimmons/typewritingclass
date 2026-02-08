import { describe, it, expect, beforeEach } from 'vitest'
import { dynamic, isDynamic, _resetDynamicCounter } from '../src/dynamic.ts'
import type { DynamicValue } from '../src/dynamic.ts'

describe('dynamic()', () => {
  beforeEach(() => {
    _resetDynamicCounter()
  })

  it('returns a DynamicValue with correct tag', () => {
    const d = dynamic('#ff0000')
    expect(d._tag).toBe('DynamicValue')
  })

  it('preserves the original value', () => {
    const d = dynamic('#ff0000')
    expect(d.__value).toBe('#ff0000')
  })

  it('generates unique IDs with counter', () => {
    const d0 = dynamic('a')
    const d1 = dynamic('b')
    const d2 = dynamic('c')
    expect(d0.__id).toBe('--twc-d0')
    expect(d1.__id).toBe('--twc-d1')
    expect(d2.__id).toBe('--twc-d2')
  })

  it('accepts string values', () => {
    const d = dynamic('100px')
    expect(d.__value).toBe('100px')
  })

  it('accepts number values', () => {
    const d = dynamic(42)
    expect(d.__value).toBe(42)
  })

  it('counter resets properly', () => {
    dynamic('a')
    dynamic('b')
    _resetDynamicCounter()
    const d = dynamic('c')
    expect(d.__id).toBe('--twc-d0')
  })
})

describe('isDynamic()', () => {
  beforeEach(() => {
    _resetDynamicCounter()
  })

  it('returns true for DynamicValue', () => {
    expect(isDynamic(dynamic('test'))).toBe(true)
  })

  it('returns false for strings', () => {
    expect(isDynamic('hello')).toBe(false)
  })

  it('returns false for numbers', () => {
    expect(isDynamic(42)).toBe(false)
  })

  it('returns false for null', () => {
    expect(isDynamic(null)).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(isDynamic(undefined)).toBe(false)
  })

  it('returns false for plain objects', () => {
    expect(isDynamic({ _tag: 'Other' })).toBe(false)
  })

  it('acts as type guard', () => {
    const val: string | DynamicValue = dynamic('test')
    if (isDynamic(val)) {
      // TypeScript should see val as DynamicValue here
      expect(val.__id).toBe('--twc-d0')
    }
  })
})
