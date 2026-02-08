import { describe, it, expect } from 'vitest'
import { generateHash } from '../src/hash.ts'
import { createRule } from '../src/rule.ts'

describe('generateHash', () => {
  it('returns a string starting with underscore', () => {
    const rule = createRule({ color: 'red' })
    const hash = generateHash(rule, 0)
    expect(hash).toMatch(/^_[a-z0-9]+$/)
  })

  it('is deterministic', () => {
    const rule = createRule({ color: 'red' })
    const a = generateHash(rule, 0)
    const b = generateHash(rule, 0)
    expect(a).toBe(b)
  })

  it('produces different hashes for different declarations', () => {
    const rule1 = createRule({ color: 'red' })
    const rule2 = createRule({ color: 'blue' })
    expect(generateHash(rule1, 0)).not.toBe(generateHash(rule2, 0))
  })

  it('produces different hashes for different layers', () => {
    const rule = createRule({ color: 'red' })
    expect(generateHash(rule, 0)).not.toBe(generateHash(rule, 1))
  })

  it('accounts for selectors in hash', () => {
    const rule1 = createRule({ color: 'red' })
    const rule2 = { ...rule1, selectors: [':hover'] }
    expect(generateHash(rule1, 0)).not.toBe(generateHash(rule2, 0))
  })

  it('accounts for media queries in hash', () => {
    const rule1 = createRule({ color: 'red' })
    const rule2 = { ...rule1, mediaQueries: ['(min-width: 768px)'] }
    expect(generateHash(rule1, 0)).not.toBe(generateHash(rule2, 0))
  })
})
