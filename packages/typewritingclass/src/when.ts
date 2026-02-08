import type { StyleRule, Modifier } from './types.ts'
import { combineRules } from './rule.ts'

/**
 * Creates a conditional style applicator by composing one or more modifiers.
 *
 * Returns a function that accepts style rules and wraps them with the given
 * modifiers applied right-to-left (innermost modifier listed first). This
 * lets you express multi-condition rules like "on hover at the `md` breakpoint"
 * in a readable, composable way.
 *
 * Multiple style rules passed to the returned function are merged into a single
 * combined rule before modifiers are applied, so selectors and media queries
 * are shared across all declarations.
 *
 * @param modifiers - One or more {@link Modifier} functions (e.g. `hover`, `md`, `dark`)
 *                    applied right-to-left around the inner rules.
 * @returns A function that accepts {@link StyleRule}s and returns a single
 *          modifier-wrapped `StyleRule`.
 *
 * @example Single modifier -- hover state
 * ```ts
 * import { cx, bg, when, hover } from 'typewritingclass'
 * import { blue } from 'typewritingclass/theme/colors'
 *
 * cx(when(hover)(bg(blue[600])))
 * // CSS: .cls:hover { background-color: #2563eb; }
 * ```
 *
 * @example Stacked modifiers -- hover at medium breakpoint
 * ```ts
 * import { cx, bg, p, when, hover, md } from 'typewritingclass'
 * import { blue } from 'typewritingclass/theme/colors'
 *
 * cx(when(hover, md)(bg(blue[700]), p(8)))
 * // CSS:
 * //   @media (min-width: 768px) {
 * //     .cls:hover { background-color: #1d4ed8; padding: 2rem; }
 * //   }
 * ```
 *
 * @example Dark mode styling
 * ```ts
 * import { cx, bg, textColor, when, dark } from 'typewritingclass'
 * import { slate, white } from 'typewritingclass/theme/colors'
 *
 * cx(
 *   bg(white),
 *   textColor(slate[900]),
 *   when(dark)(bg(slate[900]), textColor(white)),
 * )
 * // CSS:
 * //   .cls1 { background-color: #ffffff; }
 * //   .cls2 { color: #0f172a; }
 * //   .dark .cls3 { background-color: #0f172a; color: #ffffff; }
 * ```
 */
export function when(...modifiers: Modifier[]) {
  return (...rules: StyleRule[]): StyleRule => {
    const combined = combineRules(rules)
    return modifiers.reduceRight((acc, mod) => mod(acc), combined)
  }
}
