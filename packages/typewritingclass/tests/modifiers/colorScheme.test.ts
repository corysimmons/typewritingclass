import { describe, it, expect } from 'vitest'
import { dark } from '../../src/modifiers/colorScheme.ts'
import { createRule } from '../../src/rule.ts'

describe('color scheme modifiers', () => {
  it('dark wraps with prefers-color-scheme media query', () => {
    const rule = createRule({ 'background-color': '#1e293b' })
    const result = dark(rule)
    expect(result.mediaQueries).toEqual(['(prefers-color-scheme: dark)'])
    expect(result.declarations).toEqual({ 'background-color': '#1e293b' })
  })
})
