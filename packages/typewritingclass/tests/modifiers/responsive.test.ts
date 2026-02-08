import { describe, it, expect } from 'vitest'
import { sm, md, lg, xl, _2xl, maxSm, maxMd, maxLg, maxXl, max2xl } from '../../src/modifiers/responsive.ts'
import { createRule } from '../../src/rule.ts'

describe('responsive modifiers', () => {
  const rule = createRule({ display: 'flex' })

  it('sm wraps with 640px media query', () => {
    expect(sm(rule).mediaQueries).toEqual(['(min-width: 640px)'])
  })

  it('md wraps with 768px media query', () => {
    expect(md(rule).mediaQueries).toEqual(['(min-width: 768px)'])
  })

  it('lg wraps with 1024px media query', () => {
    expect(lg(rule).mediaQueries).toEqual(['(min-width: 1024px)'])
  })

  it('xl wraps with 1280px media query', () => {
    expect(xl(rule).mediaQueries).toEqual(['(min-width: 1280px)'])
  })

  it('_2xl wraps with 1536px media query', () => {
    expect(_2xl(rule).mediaQueries).toEqual(['(min-width: 1536px)'])
  })

  it('preserves declarations', () => {
    const result = md(rule)
    expect(result.declarations).toEqual({ display: 'flex' })
  })

  it('maxSm wraps with max-width: 639px', () => {
    expect(maxSm(rule).mediaQueries).toEqual(['(max-width: 639px)'])
  })

  it('maxMd wraps with max-width: 767px', () => {
    expect(maxMd(rule).mediaQueries).toEqual(['(max-width: 767px)'])
  })

  it('maxLg wraps with max-width: 1023px', () => {
    expect(maxLg(rule).mediaQueries).toEqual(['(max-width: 1023px)'])
  })

  it('maxXl wraps with max-width: 1279px', () => {
    expect(maxXl(rule).mediaQueries).toEqual(['(max-width: 1279px)'])
  })

  it('max2xl wraps with max-width: 1535px', () => {
    expect(max2xl(rule).mediaQueries).toEqual(['(max-width: 1535px)'])
  })
})
