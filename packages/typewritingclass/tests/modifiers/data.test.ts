import { describe, it, expect } from 'vitest'
import { data } from '../../src/modifiers/data.ts'
import { createRule } from '../../src/rule.ts'

describe('data modifier', () => {
  const rule = createRule({ color: 'red' })

  it('data factory creates custom data attribute selector', () => {
    const dataActive = data('active')
    expect(dataActive(rule).selectors).toEqual(['[data-active]'])
  })

  it('data with value selector', () => {
    const dataState = data('state="open"')
    expect(dataState(rule).selectors).toEqual(['[data-state="open"]'])
  })

  it('preserves declarations', () => {
    const dataActive = data('active')
    expect(dataActive(rule).declarations).toEqual({ color: 'red' })
  })
})
