/**
 * Runtime style injection module.
 *
 * This module automatically creates a `<style id="twc">` element in the
 * document head and keeps it synchronised with the {@link registry}. Whenever
 * a new rule is registered, a microtask is scheduled to regenerate the full
 * CSS and update the style element.
 *
 * The module self-initialises on import. In non-browser environments (e.g., SSR)
 * the initialisation is silently skipped.
 *
 * @internal
 * @module
 */

import { generateCSS, onChange } from './registry.ts'

/**
 * Cached reference to the `<style id="twc">` element managed by this module.
 *
 * @internal
 */
let styleEl: HTMLStyleElement | null = null

/**
 * Whether a CSS update microtask is already scheduled.
 *
 * @internal
 */
let pending = false

/**
 * Writes the latest generated CSS into the `<style>` element.
 *
 * Called as a microtask callback. Resets the `pending` flag so that
 * subsequent registry changes will schedule a new update.
 *
 * @internal
 */
function flush(): void {
  pending = false
  if (!styleEl) return
  styleEl.textContent = generateCSS()
}

/**
 * Schedules a CSS update on the next microtask if one is not already pending.
 *
 * Multiple synchronous rule registrations are batched into a single DOM write,
 * avoiding redundant style recalculations.
 *
 * @internal
 */
function scheduleUpdate(): void {
  if (pending) return
  pending = true
  queueMicrotask(flush)
}

/**
 * Initialises the runtime style injection.
 *
 * - Looks for an existing `<style id="twc">` element or creates one.
 * - Subscribes to registry changes via {@link onChange}.
 * - Triggers an initial CSS flush.
 *
 * This function is a no-op in non-browser environments (SSR-safe).
 *
 * @internal
 */
function init(): void {
  if (typeof document === 'undefined') return
  if (styleEl) return

  styleEl = document.getElementById('twc') as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = 'twc'
    document.head.appendChild(styleEl)
  }

  onChange(scheduleUpdate)
  scheduleUpdate()
}

init()
