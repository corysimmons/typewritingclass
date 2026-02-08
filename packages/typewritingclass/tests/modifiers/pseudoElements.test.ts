import { describe, it, expect } from 'vitest'
import { before, after, placeholder_, file_, marker, selection_, firstLine, firstLetter, backdrop_ } from '../../src/modifiers/pseudoElements.ts'
import { createRule } from '../../src/rule.ts'

describe('pseudo-element modifiers', () => {
  const rule = createRule({ color: 'red' })

  it('before adds ::before selector and content', () => {
    const result = before(rule)
    expect(result.selectors).toEqual(['::before'])
    expect(result.declarations.content).toBe('""')
    expect(result.declarations.color).toBe('red')
  })

  it('after adds ::after selector and content', () => {
    const result = after(rule)
    expect(result.selectors).toEqual(['::after'])
    expect(result.declarations.content).toBe('""')
  })

  it('before does not override existing content', () => {
    const withContent = createRule({ content: '"*"', color: 'blue' })
    const result = before(withContent)
    expect(result.declarations.content).toBe('"*"')
  })

  it('placeholder_ adds ::placeholder selector', () => {
    expect(placeholder_(rule).selectors).toEqual(['::placeholder'])
  })

  it('file_ adds ::file-selector-button selector', () => {
    expect(file_(rule).selectors).toEqual(['::file-selector-button'])
  })

  it('marker adds ::marker selector', () => {
    expect(marker(rule).selectors).toEqual(['::marker'])
  })

  it('selection_ adds ::selection selector', () => {
    expect(selection_(rule).selectors).toEqual(['::selection'])
  })

  it('firstLine adds ::first-line selector', () => {
    expect(firstLine(rule).selectors).toEqual(['::first-line'])
  })

  it('firstLetter adds ::first-letter selector', () => {
    expect(firstLetter(rule).selectors).toEqual(['::first-letter'])
  })

  it('backdrop_ adds ::backdrop selector', () => {
    expect(backdrop_(rule).selectors).toEqual(['::backdrop'])
  })
})
