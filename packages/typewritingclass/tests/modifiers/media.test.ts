import { describe, it, expect } from 'vitest'
import { motionReduce, motionSafe, print_, portrait, landscape, contrastMore, contrastLess, forcedColors } from '../../src/modifiers/media.ts'
import { createRule } from '../../src/rule.ts'

describe('media modifiers', () => {
  const rule = createRule({ color: 'red' })

  it('motionReduce wraps with prefers-reduced-motion: reduce', () => {
    expect(motionReduce(rule).mediaQueries).toEqual(['(prefers-reduced-motion: reduce)'])
  })

  it('motionSafe wraps with prefers-reduced-motion: no-preference', () => {
    expect(motionSafe(rule).mediaQueries).toEqual(['(prefers-reduced-motion: no-preference)'])
  })

  it('print_ wraps with print', () => {
    expect(print_(rule).mediaQueries).toEqual(['print'])
  })

  it('portrait wraps with orientation: portrait', () => {
    expect(portrait(rule).mediaQueries).toEqual(['(orientation: portrait)'])
  })

  it('landscape wraps with orientation: landscape', () => {
    expect(landscape(rule).mediaQueries).toEqual(['(orientation: landscape)'])
  })

  it('contrastMore wraps with prefers-contrast: more', () => {
    expect(contrastMore(rule).mediaQueries).toEqual(['(prefers-contrast: more)'])
  })

  it('contrastLess wraps with prefers-contrast: less', () => {
    expect(contrastLess(rule).mediaQueries).toEqual(['(prefers-contrast: less)'])
  })

  it('forcedColors wraps with forced-colors: active', () => {
    expect(forcedColors(rule).mediaQueries).toEqual(['(forced-colors: active)'])
  })

  it('preserves declarations', () => {
    expect(motionReduce(rule).declarations).toEqual({ color: 'red' })
  })
})
