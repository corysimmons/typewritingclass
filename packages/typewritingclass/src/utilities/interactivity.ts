import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveSpacing } from '../theme/spacing.ts'
import { resolveColor } from './colors.ts'

/**
 * Sets the `cursor` style of an element.
 *
 * Accepts a raw CSS cursor string or a {@link DynamicValue} for runtime values.
 *
 * @param value - A CSS cursor value (`'pointer'`, `'grab'`, `'not-allowed'`, etc.) or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `cursor`.
 *
 * @example Pointer cursor
 * ```ts
 * import { cx, cursor } from 'typewritingclass'
 *
 * cx(cursor('pointer'))
 * // CSS: cursor: pointer;
 * ```
 *
 * @example Not-allowed cursor
 * ```ts
 * cx(cursor('not-allowed'))
 * // CSS: cursor: not-allowed;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, cursor, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(cursor(dynamic(cursorType)))
 * // CSS: cursor: var(--twc-d0);
 * // style: { '--twc-d0': cursorType }
 * ```
 */
export function cursor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { cursor: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ cursor: value })
}

/**
 * Sets the `user-select` behavior of an element.
 *
 * Controls whether the user can select text within the element.
 * Accepts a raw CSS user-select string.
 *
 * @param value - A CSS user-select value (`'none'`, `'text'`, `'all'`, `'auto'`).
 * @returns A {@link StyleRule} that sets `user-select`.
 *
 * @example Prevent selection
 * ```ts
 * import { cx, select } from 'typewritingclass'
 *
 * cx(select('none'))
 * // CSS: user-select: none;
 * ```
 *
 * @example Allow text selection
 * ```ts
 * cx(select('text'))
 * // CSS: user-select: text;
 * ```
 *
 * @example Select all on click
 * ```ts
 * cx(select('all'))
 * // CSS: user-select: all;
 * ```
 */
export function select(value: string): StyleRule {
  return createRule({ 'user-select': value })
}

/**
 * Sets the `pointer-events` behavior of an element.
 *
 * Controls whether the element can be the target of pointer events (clicks, hovers, etc.).
 * Accepts a raw CSS pointer-events string.
 *
 * @param value - A CSS pointer-events value (`'none'`, `'auto'`).
 * @returns A {@link StyleRule} that sets `pointer-events`.
 *
 * @example Disable pointer events
 * ```ts
 * import { cx, pointerEvents } from 'typewritingclass'
 *
 * cx(pointerEvents('none'))
 * // CSS: pointer-events: none;
 * ```
 *
 * @example Enable pointer events
 * ```ts
 * cx(pointerEvents('auto'))
 * // CSS: pointer-events: auto;
 * ```
 */
export function pointerEvents(value: string): StyleRule {
  return createRule({ 'pointer-events': value })
}

export function accentColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'accent-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'accent-color': resolveColor(value) })
}

export function appearance(value: string): StyleRule {
  return createRule({ appearance: value })
}

export function caretColor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'caret-color': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'caret-color': resolveColor(value) })
}

export function resize(value: string): StyleRule {
  return createRule({ resize: value })
}

export function scrollBehavior(value: string): StyleRule {
  return createRule({ 'scroll-behavior': value })
}

function scrollSpacingRule(prop: string, value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { [prop]: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : value
  return createRule({ [prop]: v })
}

export function scrollMargin(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-margin', value)
}

export function scrollMarginX(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'scroll-margin-left': `var(${value.__id})`, 'scroll-margin-right': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : String(value)
  return createRule({ 'scroll-margin-left': v, 'scroll-margin-right': v })
}

export function scrollMarginY(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'scroll-margin-top': `var(${value.__id})`, 'scroll-margin-bottom': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : String(value)
  return createRule({ 'scroll-margin-top': v, 'scroll-margin-bottom': v })
}

export function scrollMarginT(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-margin-top', value)
}

export function scrollMarginR(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-margin-right', value)
}

export function scrollMarginB(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-margin-bottom', value)
}

export function scrollMarginL(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-margin-left', value)
}

export function scrollPadding(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-padding', value)
}

export function scrollPaddingX(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'scroll-padding-left': `var(${value.__id})`, 'scroll-padding-right': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : String(value)
  return createRule({ 'scroll-padding-left': v, 'scroll-padding-right': v })
}

export function scrollPaddingY(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'scroll-padding-top': `var(${value.__id})`, 'scroll-padding-bottom': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : String(value)
  return createRule({ 'scroll-padding-top': v, 'scroll-padding-bottom': v })
}

export function scrollPaddingT(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-padding-top', value)
}

export function scrollPaddingR(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-padding-right', value)
}

export function scrollPaddingB(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-padding-bottom', value)
}

export function scrollPaddingL(value: number | string | DynamicValue): StyleRule {
  return scrollSpacingRule('scroll-padding-left', value)
}

export function snapAlign(value: string): StyleRule {
  return createRule({ 'scroll-snap-align': value })
}

export function snapStop(value: string): StyleRule {
  return createRule({ 'scroll-snap-stop': value })
}

export function snapType(value: string): StyleRule {
  return createRule({ 'scroll-snap-type': value })
}

export function touchAction(value: string): StyleRule {
  return createRule({ 'touch-action': value })
}

export function willChange(value: string): StyleRule {
  return createRule({ 'will-change': value })
}
