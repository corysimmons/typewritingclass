import type { StyleRule } from '../types.ts'
import type { TextSize } from '../theme/typography.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveColor } from './colors.ts'
import { letterSpacings, lineHeights, fontFamilies } from '../theme/typography.ts'

const trackingMap: Record<string, string> = { ...letterSpacings }
const leadingMap: Record<string, string> = { ...lineHeights }
const fontFamilyMap: Record<string, string> = { ...fontFamilies }

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
  return createRule({ 'letter-spacing': trackingMap[value] ?? value })
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
export function leading(value: string | number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'line-height': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'string' ? (leadingMap[value] ?? value) : String(value)
  return createRule({ 'line-height': v })
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

export function fontFamily(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'font-family': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'font-family': fontFamilyMap[value] ?? value })
}

export function antialiased(): StyleRule {
  return createRule({
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  })
}

export function subpixelAntialiased(): StyleRule {
  return createRule({
    '-webkit-font-smoothing': 'auto',
    '-moz-osx-font-smoothing': 'auto',
  })
}

export function italic(): StyleRule {
  return createRule({ 'font-style': 'italic' })
}

export function notItalic(): StyleRule {
  return createRule({ 'font-style': 'normal' })
}

export function normalNums(): StyleRule {
  return createRule({ 'font-variant-numeric': 'normal' })
}

export function ordinal(): StyleRule {
  return createRule({ 'font-variant-numeric': 'ordinal' })
}

export function slashedZero(): StyleRule {
  return createRule({ 'font-variant-numeric': 'slashed-zero' })
}

export function liningNums(): StyleRule {
  return createRule({ 'font-variant-numeric': 'lining-nums' })
}

export function oldstyleNums(): StyleRule {
  return createRule({ 'font-variant-numeric': 'oldstyle-nums' })
}

export function proportionalNums(): StyleRule {
  return createRule({ 'font-variant-numeric': 'proportional-nums' })
}

export function tabularNums(): StyleRule {
  return createRule({ 'font-variant-numeric': 'tabular-nums' })
}

export function diagonalFractions(): StyleRule {
  return createRule({ 'font-variant-numeric': 'diagonal-fractions' })
}

export function stackedFractions(): StyleRule {
  return createRule({ 'font-variant-numeric': 'stacked-fractions' })
}

export function lineClamp(value: number): StyleRule {
  return createRule({
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': String(value),
  })
}

export function listStyleImage(value: string): StyleRule {
  return createRule({ 'list-style-image': value })
}

export function listStylePosition(value: string): StyleRule {
  return createRule({ 'list-style-position': value })
}

export function listStyleType(value: string): StyleRule {
  return createRule({ 'list-style-type': value })
}

export function textDecoration(value: string): StyleRule {
  return createRule({ 'text-decoration-line': value })
}

export function textDecorationColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'text-decoration-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'text-decoration-color': resolveColor(value) })
}

export function textDecorationStyle(value: string): StyleRule {
  return createRule({ 'text-decoration-style': value })
}

export function textDecorationThickness(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'text-decoration-thickness': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'text-decoration-thickness': value })
}

export function textUnderlineOffset(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'text-underline-offset': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'text-underline-offset': value })
}

export function textTransform(value: string): StyleRule {
  return createRule({ 'text-transform': value })
}

export function textOverflow(value: string): StyleRule {
  return createRule({ 'text-overflow': value })
}

export function textWrap(value: string): StyleRule {
  return createRule({ 'text-wrap': value })
}

export function textIndent(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'text-indent': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'text-indent': value })
}

export function verticalAlign(value: string): StyleRule {
  return createRule({ 'vertical-align': value })
}

export function whitespace(value: string): StyleRule {
  return createRule({ 'white-space': value })
}

export function wordBreak(value: string): StyleRule {
  return createRule({ 'word-break': value })
}

export function hyphens(value: string): StyleRule {
  return createRule({ hyphens: value })
}

export function content_(value: string): StyleRule {
  return createRule({ content: value })
}

export function truncate(): StyleRule {
  return createRule({
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  })
}
