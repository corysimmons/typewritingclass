import type { StyleRule } from './types.ts'

/**
 * An entry in the style registry, pairing a {@link StyleRule} with its
 * layer ordering number.
 *
 * @internal
 */
interface RegistryEntry {
  /** The style rule containing CSS declarations, selectors, and media queries. */
  rule: StyleRule
  /** The layer number determining the order this rule appears in the generated CSS. Lower numbers come first. */
  layer: number
}

/**
 * Global map of generated class names to their {@link RegistryEntry}.
 * Each unique class name is registered at most once.
 *
 * @internal
 */
const registry = new Map<string, RegistryEntry>()

/**
 * List of callbacks invoked whenever a new rule is registered.
 *
 * @internal
 */
const listeners: Array<() => void> = []

/**
 * Registers a style rule under a generated class name.
 *
 * If the class name is already registered, the call is a no-op (first-write-wins).
 * After a successful registration, all listeners registered via {@link onChange}
 * are notified synchronously.
 *
 * @internal
 * @param className - The unique hashed class name (e.g., `'_a1b2c'`).
 * @param rule - The {@link StyleRule} to associate with the class name.
 * @param layer - The layer ordering number from {@link nextLayer}, controlling
 *   the position of this rule in the final CSS output.
 *
 * @example
 * ```ts
 * register('_a1b2c', createRule({ padding: '1rem' }), 0)
 * ```
 */
export function register(className: string, rule: StyleRule, layer: number): void {
  if (registry.has(className)) return
  registry.set(className, { rule, layer })
  for (const cb of listeners) cb()
}

/**
 * Subscribes a callback to be invoked whenever a new rule is registered.
 *
 * This is used by the runtime style injection module ({@link inject}) to
 * schedule CSS updates when new rules appear.
 *
 * @internal
 * @param callback - A function to call on each new registration.
 * @returns An unsubscribe function that removes the listener when called.
 *
 * @example
 * ```ts
 * const unsubscribe = onChange(() => {
 *   console.log('New rule registered, CSS may need updating')
 * })
 *
 * // Later, stop listening:
 * unsubscribe()
 * ```
 */
export function onChange(callback: () => void): () => void {
  listeners.push(callback)
  return () => {
    const idx = listeners.indexOf(callback)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}

/**
 * Renders a single registry entry into a CSS rule string.
 *
 * Builds the selector from the class name and any pseudo-class/attribute
 * selectors, then wraps the result in `@media` blocks for each media query.
 *
 * @internal
 * @param className - The hashed class name.
 * @param rule - The {@link StyleRule} to render.
 * @returns A complete CSS rule string, potentially wrapped in media queries.
 */
function renderRule(className: string, rule: StyleRule): string {
  const decls = Object.entries(rule.declarations)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join('\n')

  let selector: string
  if (rule.selectorTemplate) {
    selector = rule.selectorTemplate.replace(/&/g, `.${className}`)
  } else {
    selector = `.${className}`
    if (rule.selectors.length > 0) {
      selector += rule.selectors.join('')
    }
  }

  let css = `${selector} {\n${decls}\n}`

  for (const sq of rule.supportsQueries) {
    css = `@supports ${sq} {\n${css}\n}`
  }

  for (const mq of rule.mediaQueries) {
    css = `@media ${mq} {\n${css}\n}`
  }

  return css
}

/**
 * Generates a complete CSS stylesheet string from all registered rules.
 *
 * Rules are sorted by their layer number (ascending) so that later-declared
 * utilities naturally override earlier ones in the cascade. Rules are
 * separated by blank lines.
 *
 * @internal
 * @returns The full CSS string for all registered style rules, or an empty
 *   string if no rules have been registered.
 *
 * @example
 * ```ts
 * register('_a', createRule({ padding: '1rem' }), 0)
 * register('_b', createRule({ margin: '0' }), 1)
 *
 * generateCSS()
 * // "._a {\n  padding: 1rem;\n}\n\n._b {\n  margin: 0;\n}"
 * ```
 */
export function generateCSS(): string {
  const entries = [...registry.entries()].sort((a, b) => a[1].layer - b[1].layer)
  const rules = entries.map(([className, { rule }]) => renderRule(className, rule))
  if (rules.length === 0) return ''
  return rules.join('\n\n')
}

/**
 * Returns a read-only view of the internal style registry.
 *
 * Useful for debugging and testing to inspect which rules have been registered.
 *
 * @internal
 * @returns A `ReadonlyMap` mapping class names to their {@link RegistryEntry}.
 */
export function getRegistry(): ReadonlyMap<string, RegistryEntry> {
  return registry
}

/**
 * Removes all entries from the style registry.
 *
 * Primarily used in tests to reset state between test cases. Does **not**
 * notify change listeners.
 *
 * @internal
 */
export function clearRegistry(): void {
  registry.clear()
}
