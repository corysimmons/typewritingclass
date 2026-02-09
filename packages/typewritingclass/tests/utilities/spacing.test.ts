import { describe, it, expect } from 'vitest'
import { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap, gapX, gapY, ps, pe, ms, me, spaceX, spaceY, spaceXReverse, spaceYReverse } from '../../src/utilities/spacing.ts'
import { dynamic } from '../../src/dynamic.ts'

describe('spacing utilities', () => {
  it('p resolves numeric values from spacing scale', () => {
    expect(p(4).declarations).toEqual({ padding: '1rem' })
  })

  it('p passes through string values', () => {
    expect(p('2em').declarations).toEqual({ padding: '2em' })
  })

  it('px sets left and right padding', () => {
    expect(px(4).declarations).toEqual({ 'padding-left': '1rem', 'padding-right': '1rem' })
  })

  it('py sets top and bottom padding', () => {
    expect(py(2).declarations).toEqual({ 'padding-top': '0.5rem', 'padding-bottom': '0.5rem' })
  })

  it('pt sets padding-top', () => {
    expect(pt(1).declarations).toEqual({ 'padding-top': '0.25rem' })
  })

  it('pr sets padding-right', () => {
    expect(pr(1).declarations).toEqual({ 'padding-right': '0.25rem' })
  })

  it('pb sets padding-bottom', () => {
    expect(pb(1).declarations).toEqual({ 'padding-bottom': '0.25rem' })
  })

  it('pl sets padding-left', () => {
    expect(pl(1).declarations).toEqual({ 'padding-left': '0.25rem' })
  })

  it('m resolves spacing scale', () => {
    expect(m(8).declarations).toEqual({ margin: '2rem' })
  })

  it('mx sets left and right margin', () => {
    expect(mx(4).declarations).toEqual({ 'margin-left': '1rem', 'margin-right': '1rem' })
  })

  it('my sets top and bottom margin', () => {
    expect(my(4).declarations).toEqual({ 'margin-top': '1rem', 'margin-bottom': '1rem' })
  })

  it('mt sets margin-top', () => {
    expect(mt(2).declarations).toEqual({ 'margin-top': '0.5rem' })
  })

  it('mr sets margin-right', () => {
    expect(mr(2).declarations).toEqual({ 'margin-right': '0.5rem' })
  })

  it('mb sets margin-bottom', () => {
    expect(mb(2).declarations).toEqual({ 'margin-bottom': '0.5rem' })
  })

  it('ml sets margin-left', () => {
    expect(ml(2).declarations).toEqual({ 'margin-left': '0.5rem' })
  })

  it('gap sets gap', () => {
    expect(gap(4).declarations).toEqual({ gap: '1rem' })
  })

  it('gapX sets column-gap', () => {
    expect(gapX(4).declarations).toEqual({ 'column-gap': '1rem' })
  })

  it('gapY sets row-gap', () => {
    expect(gapY(4).declarations).toEqual({ 'row-gap': '1rem' })
  })

  it('resolves half-unit spacing', () => {
    expect(p(0.5).declarations).toEqual({ padding: '0.125rem' })
  })

  it('resolves zero spacing', () => {
    expect(p(0).declarations).toEqual({ padding: '0px' })
  })

  it('all return valid StyleRules', () => {
    expect(p(1)._tag).toBe('StyleRule')
    expect(m(1)._tag).toBe('StyleRule')
    expect(gap(1)._tag).toBe('StyleRule')
  })

  it('ps sets padding-inline-start', () => {
    expect(ps(4).declarations).toEqual({ 'padding-inline-start': '1rem' })
  })

  it('pe sets padding-inline-end', () => {
    expect(pe(4).declarations).toEqual({ 'padding-inline-end': '1rem' })
  })

  it('ms sets margin-inline-start', () => {
    expect(ms(4).declarations).toEqual({ 'margin-inline-start': '1rem' })
  })

  it('me sets margin-inline-end', () => {
    expect(me(4).declarations).toEqual({ 'margin-inline-end': '1rem' })
  })

  it('spaceX sets margin-left with selectorTemplate', () => {
    const result = spaceX(4)
    expect(result.declarations).toEqual({ 'margin-left': '1rem' })
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
  })

  it('spaceY sets margin-top with selectorTemplate', () => {
    const result = spaceY(2)
    expect(result.declarations).toEqual({ 'margin-top': '0.5rem' })
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
  })

  it('spaceXReverse sets --twc-space-x-reverse with selectorTemplate', () => {
    const result = spaceXReverse()
    expect(result.declarations).toEqual({ '--twc-space-x-reverse': '1' })
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
  })

  it('spaceYReverse sets --twc-space-y-reverse with selectorTemplate', () => {
    const result = spaceYReverse()
    expect(result.declarations).toEqual({ '--twc-space-y-reverse': '1' })
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
  })

  it('p() with dynamic value produces CSS variable binding', () => {
    const d = dynamic(16)
    const rule = p(d)
    expect(rule.declarations.padding).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
    expect(Object.values(rule.dynamicBindings!)[0]).toBe('16')
  })

  it('m() with dynamic value produces CSS variable binding', () => {
    const d = dynamic(8)
    const rule = m(d)
    expect(rule.declarations.margin).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('mx() with dynamic value produces CSS variable binding for both sides', () => {
    const d = dynamic(8)
    const rule = mx(d)
    expect(rule.declarations['margin-left']).toContain('var(')
    expect(rule.declarations['margin-right']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('px() with dynamic value produces CSS variable binding for both sides', () => {
    const d = dynamic(4)
    const rule = px(d)
    expect(rule.declarations['padding-left']).toContain('var(')
    expect(rule.declarations['padding-right']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('gap() with dynamic value produces CSS variable binding', () => {
    const d = dynamic(4)
    const rule = gap(d)
    expect(rule.declarations.gap).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('pt() with dynamic value produces CSS variable binding', () => {
    const d = dynamic(2)
    const rule = pt(d)
    expect(rule.declarations['padding-top']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('spacing with non-scale number falls back to value * 0.25rem', () => {
    // 13 is not in the spacing scale, so resolveSpacing falls back to 13 * 0.25 = 3.25rem
    expect(p(13).declarations).toEqual({ padding: '3.25rem' })
  })

  it('spacing with another non-scale number', () => {
    // 15 is not in the spacing scale either
    expect(m(15).declarations).toEqual({ margin: '3.75rem' })
  })
})
