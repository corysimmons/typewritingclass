import { describe, it, expect } from 'vitest'
import { injectTheme, setTheme } from '../src/theme/inject-theme.ts'

describe('injectTheme', () => {
  it('is a no-op in non-browser environment', () => {
    expect(() => injectTheme(':root { --color: blue; }')).not.toThrow()
  })
})

describe('setTheme', () => {
  it('is a no-op in non-browser environment', () => {
    expect(() => setTheme('dark')).not.toThrow()
  })
})
