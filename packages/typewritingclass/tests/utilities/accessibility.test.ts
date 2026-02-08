import { describe, it, expect } from 'vitest'
import { srOnly, notSrOnly, forcedColorAdjust } from '../../src/utilities/accessibility.ts'

describe('accessibility utilities', () => {
  it('srOnly sets screen-reader-only styles', () => {
    const d = srOnly().declarations
    expect(d.position).toBe('absolute')
    expect(d.width).toBe('1px')
    expect(d.height).toBe('1px')
    expect(d.overflow).toBe('hidden')
    expect(d.clip).toBe('rect(0, 0, 0, 0)')
    expect(d['white-space']).toBe('nowrap')
    expect(d['border-width']).toBe('0')
  })

  it('notSrOnly resets screen-reader-only styles', () => {
    const d = notSrOnly().declarations
    expect(d.position).toBe('static')
    expect(d.width).toBe('auto')
    expect(d.height).toBe('auto')
    expect(d.overflow).toBe('visible')
    expect(d.clip).toBe('auto')
    expect(d['white-space']).toBe('normal')
  })

  it('forcedColorAdjust sets the property', () => {
    expect(forcedColorAdjust('none').declarations).toEqual({ 'forced-color-adjust': 'none' })
  })

  it('forcedColorAdjust auto', () => {
    expect(forcedColorAdjust('auto').declarations).toEqual({ 'forced-color-adjust': 'auto' })
  })

  it('all return valid StyleRules', () => {
    expect(srOnly()._tag).toBe('StyleRule')
    expect(notSrOnly()._tag).toBe('StyleRule')
    expect(forcedColorAdjust('none')._tag).toBe('StyleRule')
  })
})
