import { describe, it, expect } from 'vitest'
import { cursor, select, pointerEvents } from '../../src/utilities/interactivity.ts'

describe('interactivity utilities', () => {
  it('cursor sets cursor', () => {
    expect(cursor('pointer').declarations).toEqual({ cursor: 'pointer' })
  })

  it('select sets user-select', () => {
    expect(select('none').declarations).toEqual({ 'user-select': 'none' })
  })

  it('pointerEvents sets pointer-events', () => {
    expect(pointerEvents('none').declarations).toEqual({ 'pointer-events': 'none' })
  })
})
