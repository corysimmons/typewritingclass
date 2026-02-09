import type { StyleRule } from './types.ts'
import { generateHash } from './hash.ts'
import { register } from './registry.ts'
import { nextLayer, _resetLayer } from './layer.ts'

/**
 * Composes style rules and string class names into a single CSS class string.
 *
 * Each {@link StyleRule} is registered in the global stylesheet and assigned a
 * unique, deterministic class name. Later arguments override earlier ones when
 * CSS properties conflict -- order is your specificity.
 *
 * Plain strings are passed through unchanged, so you can mix generated rules
 * with external or hand-written class names.
 *
 * @param args - Style rules from utility functions, or plain class name strings.
 * @returns A space-separated class string ready for `className` or `class`.
 *
 * @example Basic composition
 * ```ts
 * import { cx, p, bg, rounded } from 'typewritingclass'
 * import { blue } from 'typewritingclass/theme/colors'
 * import { lg } from 'typewritingclass/theme/borders'
 *
 * const className = cx(p(4), bg(blue[500]), rounded(lg))
 * // => "_a1b2c _d3e4f _g5h6i"
 * // CSS: padding: 1rem; background-color: #3b82f6; border-radius: 0.5rem;
 * ```
 *
 * @example Override earlier rules
 * ```ts
 * import { cx, p } from 'typewritingclass'
 *
 * cx(p(4), p(2))
 * // Only p(2) applies -- later rules are placed on a higher layer
 * // CSS: padding: 0.5rem;
 * ```
 *
 * @example Mix string classes with rules
 * ```ts
 * import { cx, p, bg } from 'typewritingclass'
 * import { white } from 'typewritingclass/theme/colors'
 *
 * cx('my-component', p(4), bg(white))
 * // => "my-component _a1b2c _d3e4f"
 * ```
 *
 * @example With modifiers
 * ```ts
 * import { cx, p, bg, when, hover, md } from 'typewritingclass'
 * import { blue } from 'typewritingclass/theme/colors'
 *
 * cx(
 *   p(4),
 *   when(hover)(bg(blue[600])),
 *   when(md)(p(8)),
 * )
 * // CSS:
 * //   .cls1 { padding: 1rem; }
 * //   .cls2:hover { background-color: #2563eb; }
 * //   @media (min-width: 768px) { .cls3 { padding: 2rem; } }
 * ```
 */
export function cx(...args: (StyleRule | string)[]): string {
  if (process.env.NODE_ENV !== 'production') {
    warnConflicts(args)
  }
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      // TwChain proxies are typeof 'function' — coerce to string,
      // which recursively calls cx() on the chain's internal rules.
      if (typeof arg === 'function') return String(arg)
      const layerNum = (arg as any)._layer ?? nextLayer()
      const className = generateHash(arg, layerNum)
      register(className, arg, layerNum)
      return className
    })
    .join(' ')
}

/**
 * In development mode, warns when multiple StyleRules in a single cx() call
 * declare the same CSS property without being an obvious intentional override.
 *
 * This helps catch accidental conflicts like `cx(p(4), p(8))` where the user
 * may have meant to use only one.
 *
 * @internal
 */
function warnConflicts(args: (StyleRule | string)[]): void {
  const seen = new Map<string, number>()
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (typeof arg === 'string' || typeof arg === 'function') continue
    for (const prop of Object.keys(arg.declarations)) {
      if (seen.has(prop)) {
        console.warn(
          `[typewritingclass] cx() conflict: "${prop}" is set by arguments at index ${seen.get(prop)} and ${i}. ` +
          `The later value will override. If intentional, this warning can be ignored.`,
        )
      }
      seen.set(prop, i)
    }
  }
}

export { _resetLayer }
