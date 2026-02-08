import { describe, it, expect } from 'vitest'
import {
  transition, transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone,
  duration, ease, delay, animate,
} from '../../src/utilities/transitions.ts'

describe('transition utilities', () => {
  it('transition sets default properties', () => {
    const d = transition().declarations
    expect(d['transition-property']).toContain('color')
    expect(d['transition-timing-function']).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
    expect(d['transition-duration']).toBe('150ms')
  })

  it('transitionAll sets all', () => {
    expect(transitionAll().declarations['transition-property']).toBe('all')
  })

  it('transitionColors sets color properties', () => {
    expect(transitionColors().declarations['transition-property']).toContain('color')
    expect(transitionColors().declarations['transition-property']).not.toContain('transform')
  })

  it('transitionOpacity sets opacity', () => {
    expect(transitionOpacity().declarations['transition-property']).toBe('opacity')
  })

  it('transitionShadow sets box-shadow', () => {
    expect(transitionShadow().declarations['transition-property']).toBe('box-shadow')
  })

  it('transitionTransform sets transform', () => {
    expect(transitionTransform().declarations['transition-property']).toBe('transform')
  })

  it('transitionNone sets none', () => {
    expect(transitionNone().declarations['transition-property']).toBe('none')
  })

  it('duration with number adds ms', () => {
    expect(duration(300).declarations).toEqual({ 'transition-duration': '300ms' })
  })

  it('duration with string passes through', () => {
    expect(duration('0.5s').declarations).toEqual({ 'transition-duration': '0.5s' })
  })

  it('ease sets timing function', () => {
    expect(ease('linear').declarations).toEqual({ 'transition-timing-function': 'linear' })
  })

  it('delay with number adds ms', () => {
    expect(delay(100).declarations).toEqual({ 'transition-delay': '100ms' })
  })

  it('delay with string passes through', () => {
    expect(delay('0.2s').declarations).toEqual({ 'transition-delay': '0.2s' })
  })

  it('animate sets animation', () => {
    expect(animate('spin 1s linear infinite').declarations).toEqual({ animation: 'spin 1s linear infinite' })
  })

  it('all return valid StyleRules', () => {
    expect(transition()._tag).toBe('StyleRule')
    expect(duration(150)._tag).toBe('StyleRule')
    expect(animate('none')._tag).toBe('StyleRule')
  })
})
