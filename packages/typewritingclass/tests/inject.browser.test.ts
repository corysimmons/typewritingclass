// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('inject (browser)', () => {
  beforeEach(() => {
    // Remove any existing style element from previous tests
    document.getElementById('twc')?.remove()
    // Reset module cache so inject.ts re-runs init() on each import
    vi.resetModules()
  })

  it('creates a <style id="twc"> element on import', async () => {
    await import('../src/inject.ts')
    const el = document.getElementById('twc')
    expect(el).toBeTruthy()
    expect(el?.tagName).toBe('STYLE')
  })

  it('appends the style element to document.head', async () => {
    await import('../src/inject.ts')
    const el = document.getElementById('twc')
    expect(el?.parentNode).toBe(document.head)
  })

  it('flushes CSS to the style element on microtask', async () => {
    // Register a rule into the registry before importing inject
    const { register } = await import('../src/registry.ts')
    const { createRule } = await import('../src/rule.ts')
    register('_browser_test', createRule({ color: 'red' }), 0)

    // Import inject, which will call init() -> scheduleUpdate() -> queueMicrotask(flush)
    await import('../src/inject.ts')

    // Wait for microtask to flush
    await new Promise<void>((resolve) => queueMicrotask(resolve))
    // One more microtask to be sure flush has completed
    await new Promise<void>((resolve) => queueMicrotask(resolve))

    const el = document.getElementById('twc')
    expect(el?.textContent).toBeTruthy()
    expect(el?.textContent).toContain('color: red')
  })

  it('reuses existing <style id="twc"> element', async () => {
    const existing = document.createElement('style')
    existing.id = 'twc'
    document.head.appendChild(existing)

    await import('../src/inject.ts')

    const all = document.querySelectorAll('#twc')
    expect(all.length).toBe(1)
  })

  it('updates style element when new rules are registered', async () => {
    await import('../src/inject.ts')

    // Wait for initial flush
    await new Promise<void>((resolve) => queueMicrotask(resolve))

    // Now register a new rule - this should trigger onChange -> scheduleUpdate
    const { register } = await import('../src/registry.ts')
    const { createRule } = await import('../src/rule.ts')
    register('_dynamic_test', createRule({ 'font-size': '16px' }), 99)

    // Wait for the scheduled microtask flush
    await new Promise<void>((resolve) => queueMicrotask(resolve))
    await new Promise<void>((resolve) => queueMicrotask(resolve))

    const el = document.getElementById('twc')
    expect(el?.textContent).toContain('font-size: 16px')
  })
})
