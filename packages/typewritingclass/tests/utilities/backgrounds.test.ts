import { describe, it, expect } from 'vitest'
import { bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage, bgGradient, gradientFrom, gradientVia, gradientTo } from '../../src/utilities/backgrounds.ts'
import { dynamic } from '../../src/dynamic.ts'

describe('background utilities', () => {
  it('bgAttachment sets background-attachment', () => {
    expect(bgAttachment('fixed').declarations).toEqual({ 'background-attachment': 'fixed' })
  })

  it('bgClip sets background-clip', () => {
    expect(bgClip('text').declarations).toEqual({ 'background-clip': 'text' })
  })

  it('bgOrigin sets background-origin', () => {
    expect(bgOrigin('border-box').declarations).toEqual({ 'background-origin': 'border-box' })
  })

  it('bgPosition sets background-position', () => {
    expect(bgPosition('center').declarations).toEqual({ 'background-position': 'center' })
  })

  it('bgRepeat sets background-repeat', () => {
    expect(bgRepeat('no-repeat').declarations).toEqual({ 'background-repeat': 'no-repeat' })
  })

  it('bgSize sets background-size', () => {
    expect(bgSize('cover').declarations).toEqual({ 'background-size': 'cover' })
  })

  it('bgImage sets background-image', () => {
    expect(bgImage('url(/img.png)').declarations).toEqual({ 'background-image': 'url(/img.png)' })
  })

  it('bgGradient sets gradient with default direction', () => {
    const d = bgGradient().declarations
    expect(d['background-image']).toContain('linear-gradient')
    expect(d['background-image']).toContain('to right')
  })

  it('bgGradient accepts custom direction', () => {
    const d = bgGradient('to bottom').declarations
    expect(d['background-image']).toContain('to bottom')
  })

  it('gradientFrom sets --twc-gradient-from', () => {
    expect(gradientFrom('#ff0000').declarations).toEqual({ '--twc-gradient-from': '#ff0000' })
  })

  it('gradientVia sets --twc-gradient-via and --twc-gradient-stops', () => {
    expect(gradientVia('#00ff00').declarations).toEqual({
      '--twc-gradient-via': '#00ff00',
      '--twc-gradient-stops': 'var(--twc-gradient-from, transparent), var(--twc-gradient-via), var(--twc-gradient-to, transparent)',
    })
  })

  it('gradientTo sets --twc-gradient-to', () => {
    expect(gradientTo('#0000ff').declarations).toEqual({ '--twc-gradient-to': '#0000ff' })
  })

  it('all return valid StyleRules', () => {
    expect(bgAttachment('scroll')._tag).toBe('StyleRule')
    expect(bgGradient()._tag).toBe('StyleRule')
    expect(gradientFrom('red')._tag).toBe('StyleRule')
  })

  it('bgPosition() with dynamic value', () => {
    const d = dynamic('center')
    const rule = bgPosition(d)
    expect(rule.declarations['background-position']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('bgSize() with dynamic value', () => {
    const d = dynamic('cover')
    const rule = bgSize(d)
    expect(rule.declarations['background-size']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('bgImage() with dynamic value', () => {
    const d = dynamic('url(test.png)')
    const rule = bgImage(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('bgGradient() creates linear gradient', () => {
    const rule = bgGradient()
    expect(rule.declarations['background-image']).toContain('linear-gradient')
  })

  it('gradientFrom() with dynamic color', () => {
    const d = dynamic('#3b82f6')
    const rule = gradientFrom(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('gradientVia() with dynamic color', () => {
    const d = dynamic('#8b5cf6')
    const rule = gradientVia(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('gradientTo() with dynamic color', () => {
    const d = dynamic('#ef4444')
    const rule = gradientTo(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('bgPosition() with string value', () => {
    const rule = bgPosition('center top')
    expect(rule.declarations['background-position']).toBe('center top')
  })

  it('bgSize() with string value', () => {
    const rule = bgSize('contain')
    expect(rule.declarations['background-size']).toBe('contain')
  })

  it('bgImage() with string value', () => {
    const rule = bgImage('url(test.png)')
    expect(rule.declarations['background-image']).toBe('url(test.png)')
  })
})
