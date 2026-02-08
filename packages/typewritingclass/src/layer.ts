/**
 * Monotonically increasing counter used to assign a unique ordering layer
 * to each style rule. This controls the order rules appear in the generated
 * CSS, ensuring that later-declared utilities override earlier ones.
 *
 * @internal
 */
let globalLayer = 0

/**
 * Returns the next layer number and increments the global counter.
 *
 * Each call returns a value one greater than the previous call, starting
 * from `0`. The layer number is embedded into each registered rule to
 * control CSS source order: rules with lower layer numbers appear first.
 *
 * @internal
 * @returns The next sequential layer number.
 *
 * @example
 * ```ts
 * nextLayer() // 0
 * nextLayer() // 1
 * nextLayer() // 2
 * ```
 */
export function nextLayer(): number {
  return globalLayer++
}

/**
 * Assigns an explicit layer priority to a style rule.
 *
 * By default, rules receive auto-incremented layer numbers based on
 * declaration order. Use `layer()` to override this and force a rule
 * to a specific priority level. Higher numbers = higher priority
 * (overrides lower).
 *
 * @param priority - The explicit layer number to assign.
 * @returns A function that accepts style rules and wraps them with the given layer.
 *
 * @example Force a reset to lowest priority
 * ```ts
 * import { cx, layer, p, bg } from 'typewritingclass'
 *
 * cx(layer(0)(bg('white')), p(4))
 * // bg('white') is forced to layer 0, p(4) gets auto-assigned layer 1
 * // p(4) overrides any conflicting property from bg('white')
 * ```
 *
 * @example Force an override to highest priority
 * ```ts
 * cx(p(4), layer(1000)(p(8)))
 * // p(8) at layer 1000 always overrides p(4)
 * ```
 */
export function layer(priority: number): (...rules: import('./types.ts').StyleRule[]) => import('./types.ts').StyleRule {
  return (...rules) => {
    const combined = rules.length === 1
      ? rules[0]
      : {
          _tag: 'StyleRule' as const,
          declarations: Object.assign({}, ...rules.map(r => r.declarations)),
          selectors: [...new Set(rules.flatMap(r => r.selectors))],
          mediaQueries: [...new Set(rules.flatMap(r => r.mediaQueries))],
          ...(rules.some(r => r.dynamicBindings) ? {
            dynamicBindings: Object.assign({}, ...rules.filter(r => r.dynamicBindings).map(r => r.dynamicBindings)),
          } : {}),
        }
    return { ...combined, _layer: priority } as any
  }
}

/**
 * Resets the global layer counter back to `0`.
 *
 * @internal Exposed for testing only. Do not call in production code.
 */
export function _resetLayer(): void {
  globalLayer = 0
}
