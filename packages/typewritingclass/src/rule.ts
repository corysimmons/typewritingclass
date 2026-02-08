import type { StyleRule } from './types.ts'

/**
 * Creates a static {@link StyleRule} from a set of CSS declarations.
 *
 * This is the lowest-level rule constructor. The returned rule has no
 * selectors, media queries, or dynamic bindings attached.
 *
 * @internal
 * @param declarations - A record of CSS property-value pairs
 *   (e.g., `{ 'background-color': '#3b82f6' }`).
 * @returns A new {@link StyleRule} with the given declarations and empty
 *   `selectors` and `mediaQueries` arrays.
 *
 * @example
 * ```ts
 * const rule = createRule({ 'padding': '1rem', 'margin': '0' })
 * // { _tag: 'StyleRule', declarations: { padding: '1rem', margin: '0' }, selectors: [], mediaQueries: [] }
 * ```
 */
export function createRule(declarations: Record<string, string>): StyleRule {
  return {
    _tag: 'StyleRule',
    declarations,
    selectors: [],
    mediaQueries: [],
    supportsQueries: [],
  }
}

/**
 * Creates a {@link StyleRule} that includes dynamic CSS custom property bindings.
 *
 * Dynamic rules are produced when a utility receives a {@link dynamic} value.
 * The `dynamicBindings` map CSS custom property names to runtime expressions,
 * enabling values that can change without regenerating the class name.
 *
 * @internal
 * @param declarations - A record of CSS property-value pairs, where values may
 *   reference CSS custom properties (e.g., `{ color: 'var(--twc-d0)' }`).
 * @param dynamicBindings - A record mapping CSS custom property names to their
 *   runtime values (e.g., `{ '--twc-d0': '#ff0000' }`).
 * @returns A new {@link StyleRule} with declarations, empty selectors/mediaQueries,
 *   and the given `dynamicBindings`.
 *
 * @example
 * ```ts
 * const rule = createDynamicRule(
 *   { 'color': 'var(--twc-d0)' },
 *   { '--twc-d0': '#ff0000' },
 * )
 * // rule.dynamicBindings === { '--twc-d0': '#ff0000' }
 * ```
 */
export function createDynamicRule(
  declarations: Record<string, string>,
  dynamicBindings: Record<string, string>,
): StyleRule {
  return {
    _tag: 'StyleRule',
    declarations,
    selectors: [],
    mediaQueries: [],
    supportsQueries: [],
    dynamicBindings,
  }
}

/**
 * Merges multiple {@link StyleRule} objects into a single combined rule.
 *
 * Declarations are merged left-to-right (later rules override earlier ones for
 * the same property). Selectors and media queries are de-duplicated and
 * concatenated. Dynamic bindings from all rules are merged together.
 *
 * @internal
 * @param rules - An array of {@link StyleRule} objects to merge.
 * @returns A single {@link StyleRule} containing the merged declarations,
 *   selectors, media queries, and dynamic bindings from all input rules.
 *
 * @example
 * ```ts
 * const a = createRule({ padding: '1rem' })
 * const b = createRule({ margin: '0' })
 * const combined = combineRules([a, b])
 * // combined.declarations === { padding: '1rem', margin: '0' }
 * ```
 */
export function combineRules(rules: StyleRule[]): StyleRule {
  const merged: Record<string, string> = {}
  const selectors: string[] = []
  const mediaQueries: string[] = []
  const supportsQueries: string[] = []
  let dynamicBindings: Record<string, string> | undefined
  for (const rule of rules) {
    Object.assign(merged, rule.declarations)
    for (const s of rule.selectors) {
      if (!selectors.includes(s)) selectors.push(s)
    }
    for (const mq of rule.mediaQueries) {
      if (!mediaQueries.includes(mq)) mediaQueries.push(mq)
    }
    for (const sq of rule.supportsQueries) {
      if (!supportsQueries.includes(sq)) supportsQueries.push(sq)
    }
    if (rule.dynamicBindings) {
      if (!dynamicBindings) dynamicBindings = {}
      Object.assign(dynamicBindings, rule.dynamicBindings)
    }
  }
  const result: StyleRule = { _tag: 'StyleRule', declarations: merged, selectors, mediaQueries, supportsQueries }
  if (dynamicBindings) result.dynamicBindings = dynamicBindings
  return result
}

/**
 * Returns a copy of the given rule with an additional CSS selector appended.
 *
 * The selector is appended directly to the generated class name when the CSS
 * is rendered (e.g., `.abc:hover`). Multiple selectors can be stacked by
 * calling this function repeatedly.
 *
 * @internal
 * @param rule - The source {@link StyleRule} to wrap.
 * @param selector - The CSS selector suffix to append (e.g., `':hover'`, `':first-child'`).
 * @returns A new {@link StyleRule} with the selector added to its `selectors` array.
 *
 * @example
 * ```ts
 * const base = createRule({ opacity: '1' })
 * const hovered = wrapWithSelector(base, ':hover')
 * // Rendered CSS: .abc:hover { opacity: 1; }
 * ```
 */
export function wrapWithSelector(rule: StyleRule, selector: string): StyleRule {
  return {
    ...rule,
    selectors: [...rule.selectors, selector],
  }
}

/**
 * Returns a copy of the given rule wrapped in an additional CSS media query.
 *
 * When rendered, the rule's CSS block is nested inside a `@media` at-rule.
 * Multiple media queries can be stacked by calling this function repeatedly.
 *
 * @internal
 * @param rule - The source {@link StyleRule} to wrap.
 * @param query - The media query condition (e.g., `'(min-width: 768px)'`,
 *   `'(prefers-color-scheme: dark)'`).
 * @returns A new {@link StyleRule} with the query added to its `mediaQueries` array.
 *
 * @example
 * ```ts
 * const base = createRule({ padding: '2rem' })
 * const responsive = wrapWithMediaQuery(base, '(min-width: 768px)')
 * // Rendered CSS: @media (min-width: 768px) { .abc { padding: 2rem; } }
 * ```
 */
export function wrapWithMediaQuery(rule: StyleRule, query: string): StyleRule {
  return {
    ...rule,
    mediaQueries: [...rule.mediaQueries, query],
  }
}

/**
 * Returns a copy of the given rule with a selector template applied.
 *
 * The template uses `&` as a placeholder for the generated class name.
 * At render time, `&` is replaced with `.className`.
 *
 * @internal
 * @param rule - The source {@link StyleRule} to wrap.
 * @param template - The selector template (e.g., `'.group:hover &'`).
 * @returns A new {@link StyleRule} with the `selectorTemplate` set.
 */
export function wrapWithSelectorTemplate(rule: StyleRule, template: string): StyleRule {
  return {
    ...rule,
    selectorTemplate: template,
  }
}

/**
 * Returns a copy of the given rule wrapped in an additional CSS `@supports` query.
 *
 * When rendered, the rule's CSS block is nested inside a `@supports` at-rule.
 * Multiple supports queries can be stacked by calling this function repeatedly.
 *
 * @internal
 * @param rule - The source {@link StyleRule} to wrap.
 * @param query - The supports query condition (e.g., `'(display: grid)'`).
 * @returns A new {@link StyleRule} with the query added to its `supportsQueries` array.
 */
export function wrapWithSupportsQuery(rule: StyleRule, query: string): StyleRule {
  return {
    ...rule,
    supportsQueries: [...rule.supportsQueries, query],
  }
}
