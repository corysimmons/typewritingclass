import type { StyleRule, DynamicResult } from './types.ts'
import { generateHash } from './hash.ts'
import { register } from './registry.ts'
import { nextLayer } from './layer.ts'

/**
 * Composes style rules into a class string **and** an inline style object,
 * supporting runtime-dynamic CSS values.
 *
 * Works exactly like {@link cx} for static rules, but also collects
 * `dynamicBindings` from any rule that references a {@link DynamicValue}.
 * The returned `style` object maps CSS custom properties to their current
 * values and must be spread onto the element's `style` attribute so the
 * generated `var()` references resolve correctly.
 *
 * Use `dcx` instead of `cx` whenever at least one of your style rules was
 * built with {@link dynamic}.
 *
 * @param args - Style rules from utility functions, or plain class name strings.
 * @returns A {@link DynamicResult} with `className` (space-separated class string)
 *          and `style` (CSS custom property assignments for inline styles).
 *
 * @example Dynamic background color
 * ```ts
 * import { dcx, bg, p, dynamic } from 'typewritingclass'
 *
 * const userColor = dynamic('#e11d48')
 * const { className, style } = dcx(p(4), bg(userColor))
 * // className => "_a1b2c _d3e4f"
 * // style     => { '--twc-d0': '#e11d48' }
 *
 * // In React JSX:
 * // <div className={className} style={style} />
 * // CSS: ._d3e4f { background-color: var(--twc-d0); }
 * // Inline: style="--twc-d0: #e11d48;"
 * ```
 *
 * @example Mixing static and dynamic rules
 * ```ts
 * import { dcx, p, bg, rounded, dynamic } from 'typewritingclass'
 * import { blue } from 'typewritingclass/theme/colors'
 *
 * const radius = dynamic('12px')
 * const { className, style } = dcx(p(4), bg(blue[500]), rounded(radius))
 * // className => "_a1b2c _d3e4f _g5h6i"
 * // style     => { '--twc-d0': '12px' }
 * // CSS: ._g5h6i { border-radius: var(--twc-d0); }
 * ```
 *
 * @example No dynamic values -- style is an empty object
 * ```ts
 * import { dcx, p } from 'typewritingclass'
 *
 * const { className, style } = dcx(p(4))
 * // className => "_a1b2c"
 * // style     => {}
 * ```
 */
export function dcx(...args: (StyleRule | string)[]): DynamicResult {
  const classNames: string[] = []
  const style: Record<string, string> = {}

  for (const arg of args) {
    if (typeof arg === 'string') {
      classNames.push(arg)
      continue
    }
    // TwChain proxies are typeof 'function' — coerce to string,
    // which recursively calls cx() on the chain's internal rules.
    if (typeof arg === 'function') {
      classNames.push(String(arg))
      continue
    }
    const layerNum = (arg as any)._layer ?? nextLayer()
    const className = generateHash(arg, layerNum)
    register(className, arg, layerNum)
    classNames.push(className)

    if (arg.dynamicBindings) {
      Object.assign(style, arg.dynamicBindings)
    }
  }

  return { className: classNames.join(' '), style }
}
