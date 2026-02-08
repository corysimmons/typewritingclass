import { describe, it, expect } from 'vitest'
import { peerHover, peerFocus, peerActive, peerFocusVisible, peerDisabled, peerChecked, peerInvalid, peerRequired, peerPlaceholderShown, peerFocusWithin, peerEmpty, peerFirst, peerLast, peerOdd, peerEven, peerOpen, peerVisited, peerHas } from '../../src/modifiers/peer.ts'
import { createRule } from '../../src/rule.ts'

describe('peer modifiers', () => {
  const rule = createRule({ color: 'red' })

  it('peerHover sets selectorTemplate', () => {
    expect(peerHover(rule).selectorTemplate).toBe('.peer:hover ~ &')
  })

  it('peerFocus sets selectorTemplate', () => {
    expect(peerFocus(rule).selectorTemplate).toBe('.peer:focus ~ &')
  })

  it('peerActive sets selectorTemplate', () => {
    expect(peerActive(rule).selectorTemplate).toBe('.peer:active ~ &')
  })

  it('peerFocusVisible sets selectorTemplate', () => {
    expect(peerFocusVisible(rule).selectorTemplate).toBe('.peer:focus-visible ~ &')
  })

  it('peerDisabled sets selectorTemplate', () => {
    expect(peerDisabled(rule).selectorTemplate).toBe('.peer:disabled ~ &')
  })

  it('peerChecked sets selectorTemplate', () => {
    expect(peerChecked(rule).selectorTemplate).toBe('.peer:checked ~ &')
  })

  it('peerInvalid sets selectorTemplate', () => {
    expect(peerInvalid(rule).selectorTemplate).toBe('.peer:invalid ~ &')
  })

  it('peerRequired sets selectorTemplate', () => {
    expect(peerRequired(rule).selectorTemplate).toBe('.peer:required ~ &')
  })

  it('peerPlaceholderShown sets selectorTemplate', () => {
    expect(peerPlaceholderShown(rule).selectorTemplate).toBe('.peer:placeholder-shown ~ &')
  })

  it('peerFocusWithin sets selectorTemplate', () => {
    expect(peerFocusWithin(rule).selectorTemplate).toBe('.peer:focus-within ~ &')
  })

  it('peerEmpty sets selectorTemplate', () => {
    expect(peerEmpty(rule).selectorTemplate).toBe('.peer:empty ~ &')
  })

  it('peerFirst sets selectorTemplate', () => {
    expect(peerFirst(rule).selectorTemplate).toBe('.peer:first-child ~ &')
  })

  it('peerLast sets selectorTemplate', () => {
    expect(peerLast(rule).selectorTemplate).toBe('.peer:last-child ~ &')
  })

  it('peerOdd sets selectorTemplate', () => {
    expect(peerOdd(rule).selectorTemplate).toBe('.peer:nth-child(odd) ~ &')
  })

  it('peerEven sets selectorTemplate', () => {
    expect(peerEven(rule).selectorTemplate).toBe('.peer:nth-child(even) ~ &')
  })

  it('peerOpen sets selectorTemplate', () => {
    expect(peerOpen(rule).selectorTemplate).toBe('.peer[open] ~ &')
  })

  it('peerVisited sets selectorTemplate', () => {
    expect(peerVisited(rule).selectorTemplate).toBe('.peer:visited ~ &')
  })

  it('peerHas factory sets selectorTemplate', () => {
    const modifier = peerHas('.child')
    expect(modifier(rule).selectorTemplate).toBe('.peer:has(.child) ~ &')
  })

  it('preserves declarations', () => {
    expect(peerHover(rule).declarations).toEqual({ color: 'red' })
  })
})
