import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import * as colors from '../theme/colors.ts'

const colorMap: Record<string, string> = {}
const colorScales: Record<string, colors.ColorScale> = {
  slate: colors.slate, gray: colors.gray, zinc: colors.zinc, neutral: colors.neutral,
  stone: colors.stone, red: colors.red, orange: colors.orange, amber: colors.amber,
  yellow: colors.yellow, lime: colors.lime, green: colors.green, emerald: colors.emerald,
  teal: colors.teal, cyan: colors.cyan, sky: colors.sky, blue: colors.blue,
  indigo: colors.indigo, violet: colors.violet, purple: colors.purple, fuchsia: colors.fuchsia,
  pink: colors.pink, rose: colors.rose,
}
for (const [name, scale] of Object.entries(colorScales)) {
  for (const [shade, hex] of Object.entries(scale)) {
    colorMap[`${name}-${shade}`] = hex
  }
}
colorMap['white'] = colors.white
colorMap['black'] = colors.black
colorMap['transparent'] = 'transparent'
colorMap['current'] = 'currentColor'

export function resolveColor(value: string): string {
  return colorMap[value] ?? value
}

/**
 * Resolves a color token key with opacity applied.
 *
 * Looks up the color key via {@link resolveColor}, parses 6-digit hex to RGB,
 * and returns an `rgb(R G B / alpha)` string.
 *
 * @param colorKey - A color token key (e.g. `'blue-500'`) or raw color string.
 * @param opacity - Opacity value. Values > 1 are treated as percentages (e.g. 25 → 0.25), values ≤ 1 as fractions.
 * @returns An `rgb()` color string with alpha, or the resolved color as-is if not a 6-digit hex.
 */
export function resolveColorWithOpacity(colorKey: string, opacity: number): string {
  const hex = resolveColor(colorKey)
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const alpha = opacity > 1 ? opacity / 100 : opacity
  return `rgb(${r} ${g} ${b} / ${alpha})`
}

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
  return createRule({ 'background-color': resolveColor(color) })
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
  return createRule({ color: resolveColor(color) })
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
  return createRule({ 'border-color': resolveColor(color) })
}
