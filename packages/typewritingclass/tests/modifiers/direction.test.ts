import { describe, it, expect } from 'vitest'
import { rtl, ltr } from '../../src/modifiers/direction.ts'
import { createRule } from '../../src/rule.ts'

describe('direction modifiers', () => {
  const rule = createRule({ 'margin-left': '1rem' })

  it('rtl sets selectorTemplate with dir="rtl"', () => {
    expect(rtl(rule).selectorTemplate).toBe('[dir="rtl"] &')
  })

  it('ltr sets selectorTemplate with dir="ltr"', () => {
    expect(ltr(rule).selectorTemplate).toBe('[dir="ltr"] &')
  })

  it('preserves declarations', () => {
    expect(rtl(rule).declarations).toEqual({ 'margin-left': '1rem' })
  })
})
