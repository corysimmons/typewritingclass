import { describe, it, expect, beforeEach } from 'vitest'
import { cx, _resetLayer } from '../src/cx.ts'
import { clearRegistry, generateCSS } from '../src/registry.ts'
import { createRule } from '../src/rule.ts'

describe('cx', () => {
  beforeEach(() => {
    clearRegistry()
    _resetLayer()
  })

  it('returns a class name for a style rule', () => {
    const result = cx(createRule({ color: 'red' }))
    expect(result).toMatch(/^_[a-z0-9]+$/)
  })

  it('passes through raw strings', () => {
    const result = cx('my-class')
    expect(result).toBe('my-class')
  })

  it('composes multiple rules into space-separated class names', () => {
    const result = cx(
      createRule({ color: 'red' }),
      createRule({ padding: '1rem' }),
    )
    const classes = result.split(' ')
    expect(classes).toHaveLength(2)
    expect(classes[0]).toMatch(/^_/)
    expect(classes[1]).toMatch(/^_/)
  })

  it('mixes rules and strings', () => {
    const result = cx(
      'static-class',
      createRule({ color: 'red' }),
      'another-class',
    )
    const classes = result.split(' ')
    expect(classes[0]).toBe('static-class')
    expect(classes[1]).toMatch(/^_/)
    expect(classes[2]).toBe('another-class')
  })

  it('registers rules in the CSS registry', () => {
    cx(createRule({ color: 'red' }))
    const css = generateCSS()
    expect(css).toContain('color: red')
  })

  it('later rules get higher layer numbers (override semantics)', () => {
    cx(
      createRule({ color: 'red' }),
      createRule({ color: 'blue' }),
    )
    const css = generateCSS()
    const redPos = css.indexOf('color: red')
    const bluePos = css.indexOf('color: blue')
    expect(redPos).toBeLessThan(bluePos)
  })
})
