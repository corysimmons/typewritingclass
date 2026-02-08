import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

/**
 * Sets the background color of an element.
 *
 * Accepts a raw CSS color string or a {@link DynamicValue} for runtime values.
 *
 * @param color - CSS color string (e.g. `'#3b82f6'`, `'red'`, `'rgb(59, 130, 246)'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `background-color`.
 *
 * @example CSS color string
 * ```ts
 * import { cx, bg } from 'typewritingclass'
 *
 * cx(bg('#3b82f6'))
 * // CSS: background-color: #3b82f6;
 * ```
 *
 * @example Named color
 * ```ts
 * cx(bg('transparent'))
 * // CSS: background-color: transparent;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, bg, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(bg(dynamic(themeColor)))
 * // CSS: background-color: var(--twc-d0);
 * // style: { '--twc-d0': themeColor }
 * ```
 */
export function bg(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { 'background-color': `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ 'background-color': color })
}

/**
 * Sets the text color of an element.
 *
 * Accepts a raw CSS color string or a {@link DynamicValue} for runtime values.
 *
 * @param color - CSS color string (e.g. `'#111827'`, `'white'`, `'rgb(17, 24, 39)'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `color`.
 *
 * @example CSS color string
 * ```ts
 * import { cx, textColor } from 'typewritingclass'
 *
 * cx(textColor('#111827'))
 * // CSS: color: #111827;
 * ```
 *
 * @example Named color
 * ```ts
 * cx(textColor('inherit'))
 * // CSS: color: inherit;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, textColor, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(textColor(dynamic(themeColor)))
 * // CSS: color: var(--twc-d0);
 * // style: { '--twc-d0': themeColor }
 * ```
 */
export function textColor(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { color: `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ color })
}

/**
 * Sets the border color of an element.
 *
 * Accepts a raw CSS color string or a {@link DynamicValue} for runtime values.
 *
 * @param color - CSS color string (e.g. `'#e5e7eb'`, `'red'`, `'rgb(229, 231, 235)'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `border-color`.
 *
 * @example CSS color string
 * ```ts
 * import { cx, borderColor } from 'typewritingclass'
 *
 * cx(borderColor('#e5e7eb'))
 * // CSS: border-color: #e5e7eb;
 * ```
 *
 * @example Named color
 * ```ts
 * cx(borderColor('currentColor'))
 * // CSS: border-color: currentColor;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, borderColor, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(borderColor(dynamic(themeColor)))
 * // CSS: border-color: var(--twc-d0);
 * // style: { '--twc-d0': themeColor }
 * ```
 */
export function borderColor(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { 'border-color': `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ 'border-color': color })
}
