import { describe, it, expect } from 'vitest'

describe('inject module', () => {
  it('can be imported without error in non-browser environment', async () => {
    await expect(import('../src/inject.ts')).resolves.toBeDefined()
  })
})
