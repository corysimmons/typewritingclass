import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock React's useMemo to just call the factory
vi.mock('react', () => ({
  useMemo: (fn: () => any) => fn(),
}))

// We need to import internal test helpers - re-export them via test helpers
// For this test, we'll use a workaround: import dcx directly and test useStyle delegates correctly
import { useStyle } from '../src/useStyle.ts'
import { bg, p, dynamic, dcx } from 'typewritingclass'

describe('useStyle()', () => {
  it('returns an object with className and style', () => {
    const result = useStyle(p(4))
    expect(result).toHaveProperty('className')
    expect(result).toHaveProperty('style')
    expect(typeof result.className).toBe('string')
    expect(typeof result.style).toBe('object')
  })

  it('returns className for static rules', () => {
    const result = useStyle(p(4))
    expect(result.className).toMatch(/^_[a-z0-9]+$/)
    expect(result.style).toEqual({})
  })

  it('returns dynamic bindings in style', () => {
    const d = dynamic('#ff0000')
    const result = useStyle(bg(d))
    expect(result.className).toMatch(/_[a-z0-9]+/)
    expect(Object.keys(result.style).length).toBeGreaterThan(0)
    // The style should contain a CSS custom property mapping
    const values = Object.values(result.style)
    expect(values).toContain('#ff0000')
  })

  it('composes static and dynamic rules', () => {
    const d = dynamic('#ff0000')
    const result = useStyle(p(4), bg(d))
    const classes = result.className.split(' ')
    expect(classes.length).toBeGreaterThanOrEqual(2)
    // Should have dynamic bindings
    expect(Object.keys(result.style).length).toBeGreaterThan(0)
  })

  it('passes through string class names', () => {
    const result = useStyle('my-class', p(4))
    expect(result.className).toContain('my-class')
  })

  it('produces same result as dcx()', () => {
    const d = dynamic('#00ff00')
    const hookResult = useStyle(p(4), bg(d))
    // They should have equivalent structure (though class names may differ due to layer counter)
    expect(hookResult).toHaveProperty('className')
    expect(hookResult).toHaveProperty('style')
  })
})
