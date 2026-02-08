import { describe, it, expect, beforeEach } from 'vitest'
import { createRule, wrapWithSelectorTemplate } from '../src/rule.ts'
import { generateHash } from '../src/hash.ts'
import { register, generateCSS, clearRegistry } from '../src/registry.ts'

describe('selectorTemplate', () => {
  beforeEach(() => {
    clearRegistry()
  })

  it('wrapWithSelectorTemplate sets the selectorTemplate field', () => {
    const rule = createRule({ 'margin-left': '1rem' })
    const result = wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations).toEqual({ 'margin-left': '1rem' })
  })

  it('renderRule replaces & with .className when selectorTemplate is set', () => {
    const rule = createRule({ 'margin-left': '0.5rem' })
    const wrapped = wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
    const className = generateHash(wrapped, 0)
    register(className, wrapped, 0)
    const css = generateCSS()
    expect(css).toContain(`.${className} > :not([hidden]) ~ :not([hidden])`)
    expect(css).toContain('margin-left: 0.5rem')
  })

  it('renderRule replaces & with .className for group pattern', () => {
    const rule = createRule({ color: 'blue' })
    const wrapped = wrapWithSelectorTemplate(rule, '.group:hover &')
    const className = generateHash(wrapped, 0)
    register(className, wrapped, 0)
    const css = generateCSS()
    expect(css).toContain(`.group:hover .${className}`)
    expect(css).toContain('color: blue')
  })

  it('generateHash includes selectorTemplate in hash input', () => {
    const rule = createRule({ color: 'red' })
    const a = wrapWithSelectorTemplate(rule, '.group:hover &')
    const b = wrapWithSelectorTemplate(rule, '.group:focus &')
    expect(generateHash(a, 0)).not.toBe(generateHash(b, 0))
  })

  it('rules without selectorTemplate produce different hash than those with', () => {
    const rule = createRule({ color: 'red' })
    const withTemplate = wrapWithSelectorTemplate(rule, '.group:hover &')
    expect(generateHash(rule, 0)).not.toBe(generateHash(withTemplate, 0))
  })
})
