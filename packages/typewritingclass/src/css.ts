import type { StyleRule } from './types.ts'
import { createRule, createDynamicRule } from './rule.ts'
import { isDynamic } from './dynamic.ts'
import type { DynamicValue } from './dynamic.ts'

/**
 * Creates a {@link StyleRule} from a plain object of CSS declarations.
 *
 * Use this overload when you want to write raw CSS property-value pairs
 * without reaching for a specific utility function.
 *
 * @param declarations - A record mapping CSS property names to their values.
 * @returns A {@link StyleRule} containing the given declarations.
 *
 * @example Object of declarations
 * ```ts
 * import { cx, css } from 'typewritingclass'
 *
 * cx(css({ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' }))
 * // CSS: display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
 * ```
 */
export function css(declarations: Record<string, string>): StyleRule
/**
 * Creates a {@link StyleRule} from a tagged template literal of CSS declarations.
 *
 * Interpolated values can be plain strings, numbers, or {@link DynamicValue}
 * instances. Dynamic values are replaced with `var(--twc-dN)` references in
 * the generated CSS and must be applied to the element via inline styles
 * (see {@link dcx}).
 *
 * @param strings - The static portions of the template literal (provided automatically).
 * @param values - Interpolated expressions -- strings, numbers, or {@link DynamicValue}s.
 * @returns A {@link StyleRule} with parsed declarations (and `dynamicBindings`
 *          if any interpolated value was created with {@link dynamic}).
 *
 * @example Tagged template with static values
 * ```ts
 * import { cx, css } from 'typewritingclass'
 *
 * cx(css`
 *   display: flex;
 *   align-items: center;
 *   gap: 0.5rem;
 * `)
 * // CSS: display: flex; align-items: center; gap: 0.5rem;
 * ```
 *
 * @example Tagged template with interpolated values
 * ```ts
 * import { cx, css } from 'typewritingclass'
 * import { blue } from 'typewritingclass/theme/colors'
 *
 * const size = '2rem'
 * cx(css`
 *   width: ${size};
 *   height: ${size};
 *   background-color: ${blue[500]};
 * `)
 * // CSS: width: 2rem; height: 2rem; background-color: #3b82f6;
 * ```
 *
 * @example Tagged template with dynamic values
 * ```ts
 * import { dcx, css, dynamic } from 'typewritingclass'
 *
 * const color = dynamic('#e11d48')
 * const { className, style } = dcx(css`
 *   background-color: ${color};
 *   padding: 1rem;
 * `)
 * // className => "_a1b2c"
 * // style     => { '--twc-d0': '#e11d48' }
 * // CSS: ._a1b2c { background-color: var(--twc-d0); padding: 1rem; }
 * ```
 */
export function css(strings: TemplateStringsArray, ...values: (string | number | DynamicValue)[]): StyleRule
/**
 * Creates a {@link StyleRule} from either a declarations object or a tagged
 * template literal.
 *
 * This is the implementation signature that dispatches to the appropriate
 * overload. See the individual overload signatures for detailed docs and
 * examples.
 *
 * @param first - Either a `Record<string, string>` (object overload) or a
 *                `TemplateStringsArray` (tagged template overload).
 * @param values - Interpolated template values (only used in the tagged
 *                 template overload).
 * @returns A {@link StyleRule} with the parsed CSS declarations.
 */
export function css(
  first: Record<string, string> | TemplateStringsArray,
  ...values: (string | number | DynamicValue)[]
): StyleRule {
  // Object overload
  if (!Array.isArray(first) && !('raw' in first)) {
    return createRule(first as Record<string, string>)
  }

  // Tagged template literal overload
  const strings = first as TemplateStringsArray
  const declarations: Record<string, string> = {}
  let dynamicBindings: Record<string, string> | undefined

  // Reconstruct the template, collecting dynamic values
  let raw = ''
  for (let i = 0; i < strings.length; i++) {
    raw += strings[i]
    if (i < values.length) {
      const val = values[i]
      if (isDynamic(val)) {
        if (!dynamicBindings) dynamicBindings = {}
        dynamicBindings[val.__id] = String(val.__value)
        raw += `var(${val.__id})`
      } else {
        raw += String(val)
      }
    }
  }

  // Parse "prop: value;" pairs from the raw string
  const lines = raw.split(';')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue
    const prop = trimmed.slice(0, colonIdx).trim()
    const value = trimmed.slice(colonIdx + 1).trim()
    if (prop && value) {
      declarations[prop] = value
    }
  }

  if (dynamicBindings) {
    return createDynamicRule(declarations, dynamicBindings)
  }
  return createRule(declarations)
}
