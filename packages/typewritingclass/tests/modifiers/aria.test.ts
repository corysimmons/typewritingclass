import { describe, it, expect } from 'vitest'
import { ariaChecked, ariaDisabled, ariaExpanded, ariaHidden, ariaPressed, ariaReadonly, ariaRequired, ariaSelected, aria } from '../../src/modifiers/aria.ts'
import { createRule } from '../../src/rule.ts'

describe('aria modifiers', () => {
  const rule = createRule({ color: 'red' })

  it('ariaChecked adds [aria-checked="true"] selector', () => {
    expect(ariaChecked(rule).selectors).toEqual(['[aria-checked="true"]'])
  })

  it('ariaDisabled adds [aria-disabled="true"] selector', () => {
    expect(ariaDisabled(rule).selectors).toEqual(['[aria-disabled="true"]'])
  })

  it('ariaExpanded adds [aria-expanded="true"] selector', () => {
    expect(ariaExpanded(rule).selectors).toEqual(['[aria-expanded="true"]'])
  })

  it('ariaHidden adds [aria-hidden="true"] selector', () => {
    expect(ariaHidden(rule).selectors).toEqual(['[aria-hidden="true"]'])
  })

  it('ariaPressed adds [aria-pressed="true"] selector', () => {
    expect(ariaPressed(rule).selectors).toEqual(['[aria-pressed="true"]'])
  })

  it('ariaReadonly adds [aria-readonly="true"] selector', () => {
    expect(ariaReadonly(rule).selectors).toEqual(['[aria-readonly="true"]'])
  })

  it('ariaRequired adds [aria-required="true"] selector', () => {
    expect(ariaRequired(rule).selectors).toEqual(['[aria-required="true"]'])
  })

  it('ariaSelected adds [aria-selected="true"] selector', () => {
    expect(ariaSelected(rule).selectors).toEqual(['[aria-selected="true"]'])
  })

  it('aria factory creates custom attribute selector', () => {
    const ariaSort = aria('sort="ascending"')
    expect(ariaSort(rule).selectors).toEqual(['[aria-sort="ascending"]'])
  })

  it('preserves declarations', () => {
    expect(ariaChecked(rule).declarations).toEqual({ color: 'red' })
  })
})
