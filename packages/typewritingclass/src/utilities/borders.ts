import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule, wrapWithSelectorTemplate } from '../rule.ts'
import * as borderRadii from '../theme/borders.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveColor } from './colors.ts'

function px(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value
}

const radiusMap: Record<string, string> = {
  none: borderRadii.none, sm: borderRadii.sm, DEFAULT: borderRadii.DEFAULT,
  md: borderRadii.md, lg: borderRadii.lg, xl: borderRadii.xl,
  '2xl': borderRadii._2xl, '3xl': borderRadii._3xl, full: borderRadii.full,
}

function resolveRadius(value?: string | DynamicValue): string {
  if (value == null) return borderRadii.DEFAULT
  if (typeof value === 'string') return radiusMap[value] ?? value
  return value as unknown as string // DynamicValue handled before this
}

/**
 * Sets the `border-radius` on all corners of an element.
 *
 * When called without arguments, uses the default border radius (`0.25rem`).
 * Accepts an optional raw CSS string or a {@link DynamicValue} for runtime values.
 *
 * @param value - Optional CSS border-radius string (`'0.5rem'`, `'9999px'`) or `dynamic()` value. Defaults to `'0.25rem'`.
 * @returns A {@link StyleRule} that sets `border-radius`.
 *
 * @example Default radius
 * ```ts
 * import { cx, rounded } from 'typewritingclass'
 *
 * cx(rounded())
 * // CSS: border-radius: 0.25rem;
 * ```
 *
 * @example Custom radius
 * ```ts
 * cx(rounded('0.5rem'))
 * // CSS: border-radius: 0.5rem;
 * ```
 *
 * @example Full rounding (pill shape)
 * ```ts
 * cx(rounded('9999px'))
 * // CSS: border-radius: 9999px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, rounded, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(rounded(dynamic(radius)))
 * // CSS: border-radius: var(--twc-d0);
 * // style: { '--twc-d0': radius }
 * ```
 */
export function rounded(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'border-radius': resolveRadius(value) })
}

/**
 * Sets the `border-radius` on the top-left and top-right corners of an element.
 *
 * When called without arguments, uses the default border radius (`0.25rem`).
 * Accepts an optional raw CSS string or a {@link DynamicValue} for runtime values.
 *
 * @param value - Optional CSS border-radius string (`'0.5rem'`) or `dynamic()` value. Defaults to `'0.25rem'`.
 * @returns A {@link StyleRule} that sets `border-top-left-radius` and `border-top-right-radius`.
 *
 * @example Default radius
 * ```ts
 * import { cx, roundedT } from 'typewritingclass'
 *
 * cx(roundedT())
 * // CSS: border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem;
 * ```
 *
 * @example Custom radius
 * ```ts
 * cx(roundedT('1rem'))
 * // CSS: border-top-left-radius: 1rem; border-top-right-radius: 1rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, roundedT, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(roundedT(dynamic(radius)))
 * // CSS: border-top-left-radius: var(--twc-d0); border-top-right-radius: var(--twc-d0);
 * // style: { '--twc-d0': radius }
 * ```
 */
export function roundedT(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-left-radius': `var(${value.__id})`, 'border-top-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-top-left-radius': v, 'border-top-right-radius': v })
}

/**
 * Sets the `border-radius` on the bottom-left and bottom-right corners of an element.
 *
 * When called without arguments, uses the default border radius (`0.25rem`).
 * Accepts an optional raw CSS string or a {@link DynamicValue} for runtime values.
 *
 * @param value - Optional CSS border-radius string (`'0.5rem'`) or `dynamic()` value. Defaults to `'0.25rem'`.
 * @returns A {@link StyleRule} that sets `border-bottom-left-radius` and `border-bottom-right-radius`.
 *
 * @example Default radius
 * ```ts
 * import { cx, roundedB } from 'typewritingclass'
 *
 * cx(roundedB())
 * // CSS: border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0.25rem;
 * ```
 *
 * @example Custom radius
 * ```ts
 * cx(roundedB('1rem'))
 * // CSS: border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, roundedB, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(roundedB(dynamic(radius)))
 * // CSS: border-bottom-left-radius: var(--twc-d0); border-bottom-right-radius: var(--twc-d0);
 * // style: { '--twc-d0': radius }
 * ```
 */
export function roundedB(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-bottom-left-radius': `var(${value.__id})`, 'border-bottom-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-bottom-left-radius': v, 'border-bottom-right-radius': v })
}

/**
 * Sets the `border-radius` on the top-left and bottom-left corners of an element.
 *
 * When called without arguments, uses the default border radius (`0.25rem`).
 * Accepts an optional raw CSS string or a {@link DynamicValue} for runtime values.
 *
 * @param value - Optional CSS border-radius string (`'0.5rem'`) or `dynamic()` value. Defaults to `'0.25rem'`.
 * @returns A {@link StyleRule} that sets `border-top-left-radius` and `border-bottom-left-radius`.
 *
 * @example Default radius
 * ```ts
 * import { cx, roundedL } from 'typewritingclass'
 *
 * cx(roundedL())
 * // CSS: border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem;
 * ```
 *
 * @example Custom radius
 * ```ts
 * cx(roundedL('0.75rem'))
 * // CSS: border-top-left-radius: 0.75rem; border-bottom-left-radius: 0.75rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, roundedL, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(roundedL(dynamic(radius)))
 * // CSS: border-top-left-radius: var(--twc-d0); border-bottom-left-radius: var(--twc-d0);
 * // style: { '--twc-d0': radius }
 * ```
 */
export function roundedL(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-left-radius': `var(${value.__id})`, 'border-bottom-left-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-top-left-radius': v, 'border-bottom-left-radius': v })
}

/**
 * Sets the `border-radius` on the top-right and bottom-right corners of an element.
 *
 * When called without arguments, uses the default border radius (`0.25rem`).
 * Accepts an optional raw CSS string or a {@link DynamicValue} for runtime values.
 *
 * @param value - Optional CSS border-radius string (`'0.5rem'`) or `dynamic()` value. Defaults to `'0.25rem'`.
 * @returns A {@link StyleRule} that sets `border-top-right-radius` and `border-bottom-right-radius`.
 *
 * @example Default radius
 * ```ts
 * import { cx, roundedR } from 'typewritingclass'
 *
 * cx(roundedR())
 * // CSS: border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem;
 * ```
 *
 * @example Custom radius
 * ```ts
 * cx(roundedR('0.75rem'))
 * // CSS: border-top-right-radius: 0.75rem; border-bottom-right-radius: 0.75rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, roundedR, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(roundedR(dynamic(radius)))
 * // CSS: border-top-right-radius: var(--twc-d0); border-bottom-right-radius: var(--twc-d0);
 * // style: { '--twc-d0': radius }
 * ```
 */
export function roundedR(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-right-radius': `var(${value.__id})`, 'border-bottom-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-top-right-radius': v, 'border-bottom-right-radius': v })
}

/**
 * Sets a solid border on all sides of an element.
 *
 * When called without arguments, defaults to `1px` width. Sets both
 * `border-width` and `border-style: solid`.
 *
 * @param width - Optional CSS border-width string (`'2px'`). Defaults to `'1px'`.
 * @returns A {@link StyleRule} that sets `border-width` and `border-style`.
 *
 * @example Default width
 * ```ts
 * import { cx, border } from 'typewritingclass'
 *
 * cx(border())
 * // CSS: border-width: 1px; border-style: solid;
 * ```
 *
 * @example Custom width
 * ```ts
 * cx(border('2px'))
 * // CSS: border-width: 2px; border-style: solid;
 * ```
 */
export function border(width?: string | number): StyleRule {
  return createRule({ 'border-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

/**
 * Sets a solid border on the top side of an element.
 *
 * When called without arguments, defaults to `1px` width. Sets both
 * `border-top-width` and `border-style: solid`.
 *
 * @param width - Optional CSS border-width string (`'2px'`). Defaults to `'1px'`.
 * @returns A {@link StyleRule} that sets `border-top-width` and `border-style`.
 *
 * @example Default width
 * ```ts
 * import { cx, borderT } from 'typewritingclass'
 *
 * cx(borderT())
 * // CSS: border-top-width: 1px; border-style: solid;
 * ```
 *
 * @example Custom width
 * ```ts
 * cx(borderT('2px'))
 * // CSS: border-top-width: 2px; border-style: solid;
 * ```
 */
export function borderT(width?: string | number): StyleRule {
  return createRule({ 'border-top-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

/**
 * Sets a solid border on the right side of an element.
 *
 * When called without arguments, defaults to `1px` width. Sets both
 * `border-right-width` and `border-style: solid`.
 *
 * @param width - Optional CSS border-width string (`'2px'`). Defaults to `'1px'`.
 * @returns A {@link StyleRule} that sets `border-right-width` and `border-style`.
 *
 * @example Default width
 * ```ts
 * import { cx, borderR } from 'typewritingclass'
 *
 * cx(borderR())
 * // CSS: border-right-width: 1px; border-style: solid;
 * ```
 *
 * @example Custom width
 * ```ts
 * cx(borderR('3px'))
 * // CSS: border-right-width: 3px; border-style: solid;
 * ```
 */
export function borderR(width?: string | number): StyleRule {
  return createRule({ 'border-right-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

/**
 * Sets a solid border on the bottom side of an element.
 *
 * When called without arguments, defaults to `1px` width. Sets both
 * `border-bottom-width` and `border-style: solid`.
 *
 * @param width - Optional CSS border-width string (`'2px'`). Defaults to `'1px'`.
 * @returns A {@link StyleRule} that sets `border-bottom-width` and `border-style`.
 *
 * @example Default width
 * ```ts
 * import { cx, borderB } from 'typewritingclass'
 *
 * cx(borderB())
 * // CSS: border-bottom-width: 1px; border-style: solid;
 * ```
 *
 * @example Custom width
 * ```ts
 * cx(borderB('2px'))
 * // CSS: border-bottom-width: 2px; border-style: solid;
 * ```
 */
export function borderB(width?: string | number): StyleRule {
  return createRule({ 'border-bottom-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

/**
 * Sets a solid border on the left side of an element.
 *
 * When called without arguments, defaults to `1px` width. Sets both
 * `border-left-width` and `border-style: solid`.
 *
 * @param width - Optional CSS border-width string (`'2px'`). Defaults to `'1px'`.
 * @returns A {@link StyleRule} that sets `border-left-width` and `border-style`.
 *
 * @example Default width
 * ```ts
 * import { cx, borderL } from 'typewritingclass'
 *
 * cx(borderL())
 * // CSS: border-left-width: 1px; border-style: solid;
 * ```
 *
 * @example Custom width
 * ```ts
 * cx(borderL('4px'))
 * // CSS: border-left-width: 4px; border-style: solid;
 * ```
 */
export function borderL(width?: string | number): StyleRule {
  return createRule({ 'border-left-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

/**
 * Creates a focus-ring-style `box-shadow` around an element.
 *
 * When called without arguments, defaults to `3px` width and `#3b82f6` (blue) color.
 * Produces a `box-shadow` with zero offset and zero blur, acting as an outline alternative.
 *
 * @param width - Optional ring width string (`'2px'`). Defaults to `'3px'`.
 * @param color - Optional ring color string (`'#ef4444'`). Defaults to `'#3b82f6'`.
 * @returns A {@link StyleRule} that sets `box-shadow`.
 *
 * @example Default ring
 * ```ts
 * import { cx, ring } from 'typewritingclass'
 *
 * cx(ring())
 * // CSS: box-shadow: 0 0 0 3px #3b82f6;
 * ```
 *
 * @example Custom width and color
 * ```ts
 * cx(ring('2px', '#ef4444'))
 * // CSS: box-shadow: 0 0 0 2px #ef4444;
 * ```
 *
 * @example Custom width only
 * ```ts
 * cx(ring('1px'))
 * // CSS: box-shadow: 0 0 0 1px #3b82f6;
 * ```
 */
export function ring(width?: string | number, color?: string): StyleRule {
  const w = width != null ? px(width) : '3px'
  const c = color ?? '#3b82f6'
  return createRule({ 'box-shadow': `0 0 0 ${w} ${c}` })
}

// --- Individual corner radius utilities ---

export function roundedTL(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-left-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'border-top-left-radius': resolveRadius(value) })
}

export function roundedTR(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'border-top-right-radius': resolveRadius(value) })
}

export function roundedBR(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-bottom-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'border-bottom-right-radius': resolveRadius(value) })
}

export function roundedBL(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-bottom-left-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'border-bottom-left-radius': resolveRadius(value) })
}

export function roundedSS(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-start-start-radius': `var(${value.__id})`, 'border-end-start-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-start-start-radius': v, 'border-end-start-radius': v })
}

export function roundedSE(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-start-end-radius': `var(${value.__id})`, 'border-end-end-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-start-end-radius': v, 'border-end-end-radius': v })
}

export function roundedEE(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-start-end-radius': `var(${value.__id})`, 'border-end-end-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-start-end-radius': v, 'border-end-end-radius': v })
}

export function roundedES(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-end-start-radius': `var(${value.__id})`, 'border-start-start-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = resolveRadius(value)
  return createRule({ 'border-end-start-radius': v, 'border-start-start-radius': v })
}

// --- Directional border width utilities ---

export function borderX(width?: string | number): StyleRule {
  const w = width != null ? px(width) : '1px'
  return createRule({ 'border-left-width': w, 'border-right-width': w, 'border-style': 'solid' })
}

export function borderY(width?: string | number): StyleRule {
  const w = width != null ? px(width) : '1px'
  return createRule({ 'border-top-width': w, 'border-bottom-width': w, 'border-style': 'solid' })
}

export function borderS(width?: string | number): StyleRule {
  return createRule({ 'border-inline-start-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

export function borderE(width?: string | number): StyleRule {
  return createRule({ 'border-inline-end-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
}

export function borderStyle(value: string): StyleRule {
  return createRule({ 'border-style': value })
}

// --- Outline utilities ---

export function outlineWidth(value: string | number): StyleRule {
  return createRule({ 'outline-width': px(value) })
}

export function outlineColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'outline-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'outline-color': resolveColor(value) })
}

export function outlineStyle(value: string): StyleRule {
  return createRule({ 'outline-style': value })
}

export function outlineOffset(value: string | number): StyleRule {
  return createRule({ 'outline-offset': px(value) })
}

export function outline(width?: string | number, style?: string, color?: string): StyleRule {
  const decls: Record<string, string> = {}
  decls['outline-width'] = width != null ? px(width) : '2px'
  decls['outline-style'] = style ?? 'solid'
  if (color) decls['outline-color'] = color
  return createRule(decls)
}

export function outlineNone(): StyleRule {
  return createRule({ outline: '2px solid transparent', 'outline-offset': '2px' })
}

// --- Ring utilities ---

export function ringInset(): StyleRule {
  return createRule({ '--twc-ring-inset': 'inset' })
}

export function ringColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { '--twc-ring-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ '--twc-ring-color': resolveColor(value) })
}

export function ringOffsetWidth(value: string | number): StyleRule {
  return createRule({ '--twc-ring-offset-width': px(value) })
}

export function ringOffsetColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { '--twc-ring-offset-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ '--twc-ring-offset-color': resolveColor(value) })
}

// --- Divide utilities (selector-template-based) ---

export function divideX(width?: string | number): StyleRule {
  const rule = createRule({ 'border-left-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function divideY(width?: string | number): StyleRule {
  const rule = createRule({ 'border-top-width': width != null ? px(width) : '1px', 'border-style': 'solid' })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function divideColor(value: string | DynamicValue): StyleRule {
  let rule: StyleRule
  if (isDynamic(value)) {
    rule = createDynamicRule(
      { 'border-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  } else {
    rule = createRule({ 'border-color': resolveColor(value) })
  }
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function divideStyle(value: string): StyleRule {
  const rule = createRule({ 'border-style': value })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function divideXReverse(): StyleRule {
  const rule = createRule({ '--twc-divide-x-reverse': '1' })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function divideYReverse(): StyleRule {
  const rule = createRule({ '--twc-divide-y-reverse': '1' })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}
