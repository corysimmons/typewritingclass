import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import * as shadows from '../theme/shadows.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveColor } from './colors.ts'

const shadowMap: Record<string, string> = {
  sm: shadows.sm, DEFAULT: shadows.DEFAULT, md: shadows.md,
  lg: shadows.lg, xl: shadows.xl, '2xl': shadows._2xl,
  inner: shadows.inner, none: shadows.none,
}

function resolveShadow(value?: string): string {
  if (value == null) return shadows.DEFAULT
  return shadowMap[value] ?? value
}

/**
 * Sets the `box-shadow` of an element.
 *
 * When called without arguments, uses the default shadow from the shadows theme
 * (`0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`).
 * Accepts an optional raw CSS string or a {@link DynamicValue} for runtime values.
 *
 * @param value - Optional CSS box-shadow string or `dynamic()` value. Defaults to the theme's `DEFAULT` shadow.
 * @returns A {@link StyleRule} that sets `box-shadow`.
 *
 * @example Default shadow
 * ```ts
 * import { cx, shadow } from 'typewritingclass'
 *
 * cx(shadow())
 * // CSS: box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
 * ```
 *
 * @example Custom shadow
 * ```ts
 * cx(shadow('0 4px 6px -1px rgb(0 0 0 / 0.1)'))
 * // CSS: box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
 * ```
 *
 * @example No shadow
 * ```ts
 * cx(shadow('none'))
 * // CSS: box-shadow: none;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, shadow, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(shadow(dynamic(shadowValue)))
 * // CSS: box-shadow: var(--twc-d0);
 * // style: { '--twc-d0': shadowValue }
 * ```
 */
export function shadow(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'box-shadow': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'box-shadow': resolveShadow(value as string | undefined) })
}

/**
 * Sets the `opacity` of an element.
 *
 * Accepts a numeric opacity value (between `0` and `1`) or a {@link DynamicValue}
 * for runtime values. The numeric value is converted to a string for the CSS declaration.
 *
 * @param value - A numeric opacity (`0` to `1`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `opacity`.
 *
 * @example Fully opaque
 * ```ts
 * import { cx, opacity } from 'typewritingclass'
 *
 * cx(opacity(1))
 * // CSS: opacity: 1;
 * ```
 *
 * @example Semi-transparent
 * ```ts
 * cx(opacity(0.5))
 * // CSS: opacity: 0.5;
 * ```
 *
 * @example Hidden
 * ```ts
 * cx(opacity(0))
 * // CSS: opacity: 0;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, opacity, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(opacity(dynamic(opacityValue)))
 * // CSS: opacity: var(--twc-d0);
 * // style: { '--twc-d0': opacityValue }
 * ```
 */
export function opacity(value: number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { opacity: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ opacity: String(value) })
}

/**
 * Sets the `backdrop-filter` CSS property on an element.
 *
 * Applies graphical effects (such as blurring or color shifting) to the area
 * behind the element. Accepts a raw CSS backdrop-filter string or a
 * {@link DynamicValue} for runtime values.
 *
 * @param value - A CSS backdrop-filter string (`'blur(8px)'`, `'saturate(180%)'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `backdrop-filter`.
 *
 * @example Blur backdrop
 * ```ts
 * import { cx, backdrop } from 'typewritingclass'
 *
 * cx(backdrop('blur(8px)'))
 * // CSS: backdrop-filter: blur(8px);
 * ```
 *
 * @example Saturate backdrop
 * ```ts
 * cx(backdrop('saturate(180%)'))
 * // CSS: backdrop-filter: saturate(180%);
 * ```
 *
 * @example Combined filters
 * ```ts
 * cx(backdrop('blur(12px) saturate(150%)'))
 * // CSS: backdrop-filter: blur(12px) saturate(150%);
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, backdrop, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(backdrop(dynamic(filterValue)))
 * // CSS: backdrop-filter: var(--twc-d0);
 * // style: { '--twc-d0': filterValue }
 * ```
 */
export function backdrop(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'backdrop-filter': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'backdrop-filter': value })
}

export function shadowColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { '--twc-shadow-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ '--twc-shadow-color': resolveColor(value) })
}

export function mixBlendMode(value: string): StyleRule {
  return createRule({ 'mix-blend-mode': value })
}

export function bgBlendMode(value: string): StyleRule {
  return createRule({ 'background-blend-mode': value })
}
