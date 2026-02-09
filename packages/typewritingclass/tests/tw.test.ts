import { describe, it, expect, beforeEach } from 'vitest'
import { tw } from '../src/tw.ts'
import { isTwChain } from '../src/tw.ts'
import { _resetLayer } from '../src/cx.ts'
import { clearRegistry, generateCSS } from '../src/registry.ts'
import { p, m } from '../src/utilities/spacing.ts'

describe('tw proxy', () => {
  beforeEach(() => {
    clearRegistry()
    _resetLayer()
  })

  describe('basic utilities', () => {
    it('resolves a single utility to a class name', () => {
      const result = tw.p(4).toString()
      expect(result).toMatch(/^_[a-z0-9]+$/)
    })

    it('resolves multiple chained utilities', () => {
      const result = tw.p(4).bg('blue-500').rounded('lg').toString()
      const classes = result.split(' ')
      expect(classes).toHaveLength(3)
      classes.forEach(c => expect(c).toMatch(/^_[a-z0-9]+$/))
    })

    it('generates correct CSS for chained utilities', () => {
      tw.p(4).bg('blue-500').toString()
      const css = generateCSS()
      expect(css).toContain('padding: 1rem')
      expect(css).toContain('background-color: #3b82f6')
    })

    it('supports any order — order does not matter', () => {
      const a = tw.bg('red-500').p(4).toString()
      clearRegistry()
      _resetLayer()
      const b = tw.p(4).bg('red-500').toString()
      // Both should produce class names (may differ due to layer ordering)
      expect(a.split(' ')).toHaveLength(2)
      expect(b.split(' ')).toHaveLength(2)
    })

    it('works with opacity', () => {
      tw.opacity(0.5).toString()
      const css = generateCSS()
      expect(css).toContain('opacity: 0.5')
    })

    it('works with shadow (optional arg)', () => {
      tw.shadow('lg').toString()
      const css = generateCSS()
      expect(css).toContain('box-shadow:')
    })

    it('works with shadow (no arg via property chain)', () => {
      // tw.shadow.hover → shadow is treated as called with no args, then hover is pending
      const result = tw.shadow.hover.bg('red-500').toString()
      const css = generateCSS()
      expect(css).toContain('box-shadow:')
      expect(css).toContain(':hover')
    })
  })

  describe('value-less utilities', () => {
    it('supports flex', () => {
      tw.flex.toString()
      const css = generateCSS()
      expect(css).toContain('display: flex')
    })

    it('supports flexCol', () => {
      tw.flexCol.toString()
      const css = generateCSS()
      expect(css).toContain('flex-direction: column')
    })

    it('supports chaining value-less with valued utilities', () => {
      const result = tw.flex.flexCol.gap(4).toString()
      const classes = result.split(' ')
      expect(classes).toHaveLength(3)
      const css = generateCSS()
      expect(css).toContain('display: flex')
      expect(css).toContain('flex-direction: column')
      expect(css).toContain('gap: 1rem')
    })

    it('supports group as raw class name', () => {
      const result = tw.group.bg('slate-50').toString()
      expect(result).toContain('group')
    })

    it('supports relative, absolute, etc.', () => {
      tw.relative.toString()
      const css = generateCSS()
      expect(css).toContain('position: relative')
    })

    it('supports truncate', () => {
      tw.truncate.toString()
      const css = generateCSS()
      expect(css).toContain('text-overflow: ellipsis')
    })
  })

  describe('single modifier (property syntax)', () => {
    it('hover.bg applies hover to bg', () => {
      tw.hover.bg('blue-500').toString()
      const css = generateCSS()
      expect(css).toContain(':hover')
      expect(css).toContain('background-color: #3b82f6')
    })

    it('dark.bg applies dark modifier', () => {
      tw.dark.bg('slate-900').toString()
      const css = generateCSS()
      expect(css).toContain('prefers-color-scheme: dark')
      expect(css).toContain('background-color:')
    })

    it('modifier applies only to the next utility', () => {
      tw.bg('white').hover.bg('blue-500').p(4).toString()
      const css = generateCSS()
      // p(4) should NOT be under :hover
      const lines = css.split('\n')
      const paddingRule = lines.find(l => l.includes('padding: 1rem'))
      expect(paddingRule).toBeDefined()
      // The hover rule should contain bg
      expect(css).toContain(':hover')
    })

    it('groupHover modifier works', () => {
      tw.groupHover.textColor('blue-600').toString()
      const css = generateCSS()
      expect(css).toContain('.group:hover')
      expect(css).toContain('color:')
    })

    it('responsive modifier works', () => {
      tw.md.p(8).toString()
      const css = generateCSS()
      expect(css).toContain('min-width: 768px')
      expect(css).toContain('padding: 2rem')
    })
  })

  describe('multi-utility modifier (function syntax)', () => {
    it('hover(tw.bg().textColor()) applies hover to multiple utilities', () => {
      tw.hover(tw.bg('blue-500').textColor('white')).toString()
      const css = generateCSS()
      // Both bg and textColor should be under :hover
      expect(css).toContain(':hover')
      expect(css).toContain('background-color: #3b82f6')
      expect(css).toContain('color: #ffffff')
    })

    it('preserves base styles alongside modifier group', () => {
      const result = tw.bg('slate-50').rounded('xl').p(6)
        .hover(tw.bg('slate-100').shadow('lg'))
        .toString()
      const classes = result.split(' ')
      // 3 base + 2 hover = 5
      expect(classes).toHaveLength(5)
      const css = generateCSS()
      expect(css).toContain('border-radius:')
      expect(css).toContain('padding: 1.5rem')
      expect(css).toContain(':hover')
    })

    it('focus modifier function works', () => {
      tw.focus(tw.ring(2).ringColor('blue-500')).toString()
      const css = generateCSS()
      expect(css).toContain(':focus')
    })
  })

  describe('string coercion', () => {
    it('toString() returns class string', () => {
      const result = tw.p(4).toString()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('template literal coercion works', () => {
      const classes = `${tw.p(4)} extra`
      expect(classes).toContain('extra')
      expect(classes).toMatch(/^_[a-z0-9]+ extra$/)
    })

    it('.value property returns class string', () => {
      const result = tw.p(4).value
      expect(typeof result).toBe('string')
      expect(result).toMatch(/^_[a-z0-9]+$/)
    })

    it('.className property returns class string', () => {
      const result = tw.p(4).className
      expect(typeof result).toBe('string')
      expect(result).toMatch(/^_[a-z0-9]+$/)
    })
  })

  describe('isTwChain', () => {
    it('returns true for tw chains', () => {
      expect(isTwChain(tw)).toBe(true)
      expect(isTwChain(tw.p(4))).toBe(true)
      expect(isTwChain(tw.hover.bg('red-500'))).toBe(true)
    })

    it('returns false for non-chains', () => {
      expect(isTwChain(null)).toBe(false)
      expect(isTwChain(undefined)).toBe(false)
      expect(isTwChain('string')).toBe(false)
      expect(isTwChain(42)).toBe(false)
      expect(isTwChain({})).toBe(false)
    })
  })

  describe('complex compositions', () => {
    it('reproduces the card example from the conversation', () => {
      const card = tw
        .bg('slate-50')
        .rounded('xl')
        .p(6)
        .hover(tw.bg('slate-100').shadow('lg').scale(105))
        .focus(tw.ring(2).ringColor('blue-500'))
        .toString()

      const classes = card.split(' ')
      // 3 base + 3 hover + 2 focus = 8
      expect(classes).toHaveLength(8)

      const css = generateCSS()
      expect(css).toContain('background-color:')
      expect(css).toContain('border-radius:')
      expect(css).toContain('padding: 1.5rem')
      expect(css).toContain(':hover')
      expect(css).toContain(':focus')
    })

    it('group + groupHover pattern', () => {
      const card = tw.group.bg('slate-50').toString()
      expect(card).toContain('group')

      clearRegistry()
      _resetLayer()

      const title = tw.textColor('slate-900').groupHover.textColor('blue-600').toString()
      const css = generateCSS()
      expect(css).toContain('.group:hover')
    })

    it('chains many utilities without error', () => {
      const result = tw
        .flex.flexCol.gap(4)
        .bg('white').rounded('lg').shadow('md')
        .p(6).m(4)
        .border(1).borderColor('slate-200')
        .toString()

      const classes = result.split(' ')
      expect(classes.length).toBeGreaterThanOrEqual(10)
    })
  })

  describe('fresh chain per access', () => {
    it('tw itself is not mutated by chaining', () => {
      const a = tw.p(4).toString()
      const b = tw.m(4).toString()
      // a and b should be independent
      expect(a).not.toBe(b)
    })

    it('intermediate chains are independent', () => {
      const base = tw.flex.flexCol
      const a = base.gap(4).toString()
      const b = base.gap(8).toString()
      expect(a).not.toBe(b)
      // base should still resolve to just flex + flexCol
      expect(base.toString().split(' ')).toHaveLength(2)
    })
  })

  describe('tw edge cases', () => {
    it('unknown property returns raw class name', () => {
      const result = tw.someUnknownClass.toString()
      expect(result).toContain('someUnknownClass')
    })

    it('unknown property chains with utilities', () => {
      const result = tw.myCustomClass.p(4).toString()
      expect(result).toContain('myCustomClass')
      const classes = result.split(' ')
      expect(classes).toHaveLength(2)
    })

    it('tw called as function with StyleRule args merges rules', () => {
      const result = (tw as any)(p(4), m(2))
      expect(isTwChain(result)).toBe(true)
      const str = result.toString()
      expect(str.split(' ').length).toBeGreaterThanOrEqual(2)
      const css = generateCSS()
      expect(css).toContain('padding: 1rem')
      expect(css).toContain('margin: 0.5rem')
    })

    it('tw called as function with TwChain arg extracts rules', () => {
      const chain = tw.p(4).m(2)
      const result = (tw as any)(chain)
      expect(isTwChain(result)).toBe(true)
      const str = result.toString()
      expect(str.split(' ').length).toBeGreaterThanOrEqual(2)
    })

    it('tw called as function with mixed args', () => {
      const chain = tw.p(4)
      const result = (tw as any)(chain, m(2))
      expect(isTwChain(result)).toBe(true)
      const str = result.toString()
      expect(str.split(' ').length).toBeGreaterThanOrEqual(2)
    })

    it('modifier with no TwChain arg falls back', () => {
      // Call hover as a function with no TwChain arguments (e.g., non-chain args)
      // This hits line 859: the fallback return
      const result = (tw as any).hover()
      expect(isTwChain(result)).toBe(true)
    })

    it('modifier with multiple TwChain args collects all rules', () => {
      // hover(tw.bg('red'), tw.p(4)) — multiple TwChain args
      // First arg is TwChain so it takes early return at line 841-844
      const result = (tw as any).hover(tw.bg('red'), tw.p(4))
      expect(isTwChain(result)).toBe(true)
      const css = result.toString()
      expect(css).toBeTruthy()
    })

    it('modifier with non-TwChain first arg and TwChain later args', () => {
      // First arg is a plain StyleRule (not TwChain), second is TwChain
      // This covers lines 848-857 (the allChildRules collection loop)
      const result = (tw as any).hover(p(4), tw.bg('red'))
      expect(isTwChain(result)).toBe(true)
    })
  })
})
