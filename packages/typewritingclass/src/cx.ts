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
  return _cxCore(args)
}

/**
 * Core cx logic without conflict warnings.
 * Used internally by tw chain resolution to avoid false-positive warnings
 * when chain utilities intentionally override each other (e.g. `.transitionColors.duration(200)`).
 *
 * @internal
 */
export function _cxCore(args: (StyleRule | string)[]): string {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      // TwChain proxies are typeof 'function' — coerce to string,
      // which recursively calls cx() on the chain's internal rules.
      // Callable StyleRule proxies (from standalone token API) are also
      // functions but expose _tag === 'StyleRule' — treat those as rules.
      if (typeof arg === 'function' && (arg as any)._tag !== 'StyleRule') return String(arg)
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
  // Track which arg index set each (context, property) pair
  const seen = new Map<string, number>()
  // Track how many declarations the arg that first set this key had
  const seenDeclCount = new Map<string, number>()
  const warned = new Set<string>()

  // For cross-context override detection: track all (context, index) pairs per property
  const propContexts = new Map<string, { context: string, index: number, mediaQueries: string[] }[]>()

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (typeof arg === 'string' || typeof arg === 'function') continue
    const context = arg.mediaQueries.join('|') + '::' + arg.selectors.join('|')
    const declKeys = Object.keys(arg.declarations)
    for (const prop of declKeys) {
      const key = context + '::' + prop
      if (seen.has(key)) {
        // Skip shorthand+longhand refinement: if the earlier arg was a
        // compound rule (multiple declarations) and the later arg is a
        // single-property refinement, this is intentional narrowing
        // (e.g. transitionAll() + duration(150)).
        const earlierCount = seenDeclCount.get(key)!
        if (earlierCount > 1 && declKeys.length === 1) {
          seen.set(key, i)
          seenDeclCount.set(key, declKeys.length)
          continue
        }

        const msg =
          `[typewritingclass] cx() conflict: "${prop}" is set by arguments at index ${seen.get(key)} and ${i}. ` +
          `The later value will override. If intentional, this warning can be ignored.`
        if (!warned.has(msg)) {
          warned.add(msg)
          console.warn(msg)
        }
      }
      seen.set(key, i)
      seenDeclCount.set(key, declKeys.length)

      // Track for cross-context detection
      if (!propContexts.has(prop)) propContexts.set(prop, [])
      propContexts.get(prop)!.push({ context, index: i, mediaQueries: arg.mediaQueries })
    }
  }

  // Detect cross-context overrides: a later rule with a non-overlapping media
  // query silently wins over an earlier rule when both queries match at once.
  // e.g. .sm(bg('blue')).dark(bg('green')) — dark wins over sm in dark+wide viewport.
  for (const [prop, entries] of propContexts) {
    for (let j = 1; j < entries.length; j++) {
      const later = entries[j]
      // Only check rules that have media queries (not base rules)
      if (later.mediaQueries.length === 0) continue
      for (let k = 0; k < j; k++) {
        const earlier = entries[k]
        if (earlier.context === later.context) continue // same context, already handled
        if (earlier.mediaQueries.length === 0) continue // base→conditional is fine
        // Two different non-empty media query contexts for the same property.
        // Check if one is a subset of the other (nested = intentional).
        const earlierSet = new Set(earlier.mediaQueries)
        const laterSet = new Set(later.mediaQueries)
        const isSubset = [...laterSet].every(q => earlierSet.has(q)) ||
                         [...earlierSet].every(q => laterSet.has(q))
        if (isSubset) continue // one contains the other — intentional specificity
        // Two independent media queries for the same prop — source order hazard
        const msg =
          `[typewritingclass] cx() cascade hazard: "${prop}" is set by arg ${earlier.index} ` +
          `(${earlier.mediaQueries.join(' + ')}) and arg ${later.index} ` +
          `(${later.mediaQueries.join(' + ')}). When both queries match, arg ${later.index} ` +
          `wins due to source order. To fix, combine them: ` +
          `.sm(tw.dark(...)) instead of separate .sm(...).dark(...).`
        if (!warned.has(msg)) {
          warned.add(msg)
          console.warn(msg)
        }
      }
    }
  }
}

export { _resetLayer }
