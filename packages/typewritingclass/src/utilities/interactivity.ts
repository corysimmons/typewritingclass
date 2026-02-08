import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

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
