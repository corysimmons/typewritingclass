import { describe, it, expect } from 'vitest'
import { bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage, bgGradient, gradientFrom, gradientVia, gradientTo } from '../../src/utilities/backgrounds.ts'

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

  it('gradientVia sets --twc-gradient-via', () => {
    expect(gradientVia('#00ff00').declarations).toEqual({ '--twc-gradient-via': '#00ff00' })
  })

  it('gradientTo sets --twc-gradient-to', () => {
    expect(gradientTo('#0000ff').declarations).toEqual({ '--twc-gradient-to': '#0000ff' })
  })

  it('all return valid StyleRules', () => {
    expect(bgAttachment('scroll')._tag).toBe('StyleRule')
    expect(bgGradient()._tag).toBe('StyleRule')
    expect(gradientFrom('red')._tag).toBe('StyleRule')
  })
})
