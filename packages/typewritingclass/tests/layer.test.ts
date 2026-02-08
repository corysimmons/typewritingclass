import { describe, it, expect, beforeEach } from 'vitest'
import { cx, _resetLayer } from '../src/cx.ts'
import { clearRegistry, generateCSS } from '../src/registry.ts'
import { createRule } from '../src/rule.ts'
import { layer } from '../src/layer.ts'

describe('layer()', () => {
  beforeEach(() => {
    clearRegistry()
    _resetLayer()
  })

  it('forces a rule to a specific layer priority', () => {
    // Without layer(), auto-incremented layers: 0, 1
    // With layer(100), the rule is forced to layer 100
    const lowPriority = createRule({ color: 'red' })
    const highPriority = layer(100)(createRule({ color: 'blue' }))

    cx(highPriority, lowPriority)
    const css = generateCSS()

    // lowPriority (auto layer 1) should come before highPriority (layer 100)
    const redPos = css.indexOf('color: red')
    const bluePos = css.indexOf('color: blue')
    // Lower layer numbers appear first in CSS, higher override
    // red is at auto-layer 1, blue is at explicit layer 100
    expect(redPos).toBeLessThan(bluePos)
  })

  it('combines multiple rules at the same explicit layer', () => {
    const combined = layer(50)(
      createRule({ color: 'red' }),
      createRule({ padding: '1rem' }),
    )
    expect(combined.declarations).toEqual({ color: 'red', padding: '1rem' })
  })

  it('preserves dynamic bindings', () => {
    const rule = {
      _tag: 'StyleRule' as const,
      declarations: { color: 'var(--twc-d0)' },
      selectors: [],
      mediaQueries: [],
      dynamicBindings: { '--twc-d0': '#ff0000' },
    }
    const result = layer(10)(rule)
    expect(result.dynamicBindings).toEqual({ '--twc-d0': '#ff0000' })
  })

  it('preserves selectors and media queries', () => {
    const rule = {
      _tag: 'StyleRule' as const,
      declarations: { color: 'red' },
      selectors: [':hover'],
      mediaQueries: ['(min-width: 768px)'],
    }
    const result = layer(5)(rule)
    expect(result.selectors).toEqual([':hover'])
    expect(result.mediaQueries).toEqual(['(min-width: 768px)'])
  })
})
