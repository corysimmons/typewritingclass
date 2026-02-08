import type { StyleRule } from '../types.ts'
import type { TextSize } from '../theme/typography.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

/**
 * Sets the font size (and optionally line height) of an element.
 *
 * Accepts a {@link TextSize} object from the typography theme (which sets both
 * `font-size` and `line-height`), a raw CSS string for `font-size` only,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param size - A {@link TextSize} preset (e.g. `typography.base`), a raw CSS string (`'1.5rem'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `font-size` and optionally `line-height`.
 *
 * @example TextSize preset
 * ```ts
 * import { cx, text } from 'typewritingclass'
 * import * as typography from 'typewritingclass/theme/typography'
 *
 * cx(text(typography.lg))
 * // CSS: font-size: 1.125rem; line-height: 1.75rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(text('2rem'))
 * // CSS: font-size: 2rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, text, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(text(dynamic(fontSize)))
 * // CSS: font-size: var(--twc-d0);
 * // style: { '--twc-d0': fontSize }
 * ```
 */
export function text(size: TextSize | string | DynamicValue): StyleRule {
  if (isDynamic(size)) {
    return createDynamicRule(
      { 'font-size': `var(${size.__id})` },
      { [size.__id]: String(size.__value) },
    )
  }
  if (typeof size === 'string') {
    return createRule({ 'font-size': size })
  }
  return createRule({ 'font-size': size.fontSize, 'line-height': size.lineHeight })
}

/**
 * Sets the font weight of an element.
 *
 * Accepts a raw CSS font-weight string or a {@link DynamicValue} for runtime values.
 * Use the typography theme exports (e.g. `typography.bold`) for standard weights.
 *
 * @param weight - A font-weight string (`'700'`, `'bold'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `font-weight`.
 *
 * @example Typography theme weight
 * ```ts
 * import { cx, font } from 'typewritingclass'
 * import * as typography from 'typewritingclass/theme/typography'
 *
 * cx(font(typography.bold))
 * // CSS: font-weight: 700;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(font('600'))
 * // CSS: font-weight: 600;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, font, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(font(dynamic(weight)))
 * // CSS: font-weight: var(--twc-d0);
 * // style: { '--twc-d0': weight }
 * ```
 */
export function font(weight: string | DynamicValue): StyleRule {
  if (isDynamic(weight)) {
    return createDynamicRule(
      { 'font-weight': `var(${weight.__id})` },
      { [weight.__id]: String(weight.__value) },
    )
  }
  return createRule({ 'font-weight': weight })
}

/**
 * Sets the letter spacing (tracking) of an element.
 *
 * Accepts a raw CSS letter-spacing string or a {@link DynamicValue} for runtime values.
 *
 * @param value - A CSS letter-spacing string (`'-0.025em'`, `'0.05em'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `letter-spacing`.
 *
 * @example Raw value
 * ```ts
 * import { cx, tracking } from 'typewritingclass'
 *
 * cx(tracking('-0.025em'))
 * // CSS: letter-spacing: -0.025em;
 * ```
 *
 * @example Wide tracking
 * ```ts
 * cx(tracking('0.1em'))
 * // CSS: letter-spacing: 0.1em;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, tracking, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(tracking(dynamic(letterSpacing)))
 * // CSS: letter-spacing: var(--twc-d0);
 * // style: { '--twc-d0': letterSpacing }
 * ```
 */
export function tracking(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'letter-spacing': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'letter-spacing': value })
}

/**
 * Sets the line height (leading) of an element.
 *
 * Accepts a raw CSS line-height string or a {@link DynamicValue} for runtime values.
 *
 * @param value - A CSS line-height string (`'1.5'`, `'2rem'`) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `line-height`.
 *
 * @example Unitless ratio
 * ```ts
 * import { cx, leading } from 'typewritingclass'
 *
 * cx(leading('1.5'))
 * // CSS: line-height: 1.5;
 * ```
 *
 * @example Fixed value
 * ```ts
 * cx(leading('2rem'))
 * // CSS: line-height: 2rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, leading, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(leading(dynamic(lineHeight)))
 * // CSS: line-height: var(--twc-d0);
 * // style: { '--twc-d0': lineHeight }
 * ```
 */
export function leading(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'line-height': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'line-height': value })
}

/**
 * Sets the text alignment of an element.
 *
 * Accepts a raw CSS text-align string.
 *
 * @param value - A CSS text-align value (`'left'`, `'center'`, `'right'`, `'justify'`).
 * @returns A {@link StyleRule} that sets `text-align`.
 *
 * @example Center alignment
 * ```ts
 * import { cx, textAlign } from 'typewritingclass'
 *
 * cx(textAlign('center'))
 * // CSS: text-align: center;
 * ```
 *
 * @example Right alignment
 * ```ts
 * cx(textAlign('right'))
 * // CSS: text-align: right;
 * ```
 */
export function textAlign(value: string): StyleRule {
  return createRule({ 'text-align': value })
}
