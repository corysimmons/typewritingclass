import { describe, it, expect } from 'vitest'
import { peerHover, peerFocus, peerActive, peerFocusVisible, peerDisabled, peerChecked, peerInvalid, peerRequired, peerPlaceholderShown } from '../../src/modifiers/peer.ts'
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

  it('preserves declarations', () => {
    expect(peerHover(rule).declarations).toEqual({ color: 'red' })
  })
})
