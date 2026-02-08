import { describe, it, expect } from 'vitest'
import { groupHover, groupFocus, groupActive, groupFocusVisible, groupFocusWithin, groupDisabled, groupChecked, groupEmpty, groupFirst, groupLast, groupOdd, groupEven } from '../../src/modifiers/group.ts'
import { createRule } from '../../src/rule.ts'

describe('group modifiers', () => {
  const rule = createRule({ color: 'red' })

  it('groupHover sets selectorTemplate', () => {
    expect(groupHover(rule).selectorTemplate).toBe('.group:hover &')
  })

  it('groupFocus sets selectorTemplate', () => {
    expect(groupFocus(rule).selectorTemplate).toBe('.group:focus &')
  })

  it('groupActive sets selectorTemplate', () => {
    expect(groupActive(rule).selectorTemplate).toBe('.group:active &')
  })

  it('groupFocusVisible sets selectorTemplate', () => {
    expect(groupFocusVisible(rule).selectorTemplate).toBe('.group:focus-visible &')
  })

  it('groupFocusWithin sets selectorTemplate', () => {
    expect(groupFocusWithin(rule).selectorTemplate).toBe('.group:focus-within &')
  })

  it('groupDisabled sets selectorTemplate', () => {
    expect(groupDisabled(rule).selectorTemplate).toBe('.group:disabled &')
  })

  it('groupChecked sets selectorTemplate', () => {
    expect(groupChecked(rule).selectorTemplate).toBe('.group:checked &')
  })

  it('groupEmpty sets selectorTemplate', () => {
    expect(groupEmpty(rule).selectorTemplate).toBe('.group:empty &')
  })

  it('groupFirst sets selectorTemplate', () => {
    expect(groupFirst(rule).selectorTemplate).toBe('.group:first-child &')
  })

  it('groupLast sets selectorTemplate', () => {
    expect(groupLast(rule).selectorTemplate).toBe('.group:last-child &')
  })

  it('groupOdd sets selectorTemplate', () => {
    expect(groupOdd(rule).selectorTemplate).toBe('.group:nth-child(odd) &')
  })

  it('groupEven sets selectorTemplate', () => {
    expect(groupEven(rule).selectorTemplate).toBe('.group:nth-child(even) &')
  })

  it('preserves declarations', () => {
    expect(groupHover(rule).declarations).toEqual({ color: 'red' })
  })
})
