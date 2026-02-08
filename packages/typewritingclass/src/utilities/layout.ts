import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'
import { isDynamic } from '../dynamic.ts'

function resolveSize(value: number | string | DynamicValue): string | DynamicValue {
  if (isDynamic(value)) return value
  if (typeof value === 'string') return value
  return resolveSpacing(value)
}

function sizeRule(prop: string, value: number | string | DynamicValue): StyleRule {
  const v = resolveSize(value)
  if (isDynamic(v)) {
    return createDynamicRule(
      { [prop]: `var(${v.__id})` },
      { [v.__id]: String(v.__value) },
    )
  }
  return createRule({ [prop]: v as string })
}

function sizeRuleMulti(props: string[], value: number | string | DynamicValue): StyleRule {
  const v = resolveSize(value)
  if (isDynamic(v)) {
    const decls: Record<string, string> = {}
    for (const prop of props) decls[prop] = `var(${v.__id})`
    return createDynamicRule(decls, { [v.__id]: String(v.__value) })
  }
  const decls: Record<string, string> = {}
  for (const prop of props) decls[prop] = v as string
  return createRule(decls)
}

/**
 * Sets the element to `display: flex`.
 *
 * Takes no arguments and produces a single flex display declaration.
 *
 * @returns A {@link StyleRule} that sets `display: flex`.
 *
 * @example
 * ```ts
 * import { cx, flex } from 'typewritingclass'
 *
 * cx(flex())
 * // CSS: display: flex;
 * ```
 */
export function flex(): StyleRule {
  return createRule({ display: 'flex' })
}

/**
 * Sets the element to `display: flex` with `flex-direction: column`.
 *
 * Takes no arguments and produces a column-oriented flex container.
 *
 * @returns A {@link StyleRule} that sets `display: flex` and `flex-direction: column`.
 *
 * @example
 * ```ts
 * import { cx, flexCol } from 'typewritingclass'
 *
 * cx(flexCol())
 * // CSS: display: flex; flex-direction: column;
 * ```
 */
export function flexCol(): StyleRule {
  return createRule({ display: 'flex', 'flex-direction': 'column' })
}

/**
 * Sets the element to `display: flex` with `flex-direction: row`.
 *
 * Takes no arguments and produces a row-oriented flex container.
 *
 * @returns A {@link StyleRule} that sets `display: flex` and `flex-direction: row`.
 *
 * @example
 * ```ts
 * import { cx, flexRow } from 'typewritingclass'
 *
 * cx(flexRow())
 * // CSS: display: flex; flex-direction: row;
 * ```
 */
export function flexRow(): StyleRule {
  return createRule({ display: 'flex', 'flex-direction': 'row' })
}

/**
 * Sets `flex-wrap: wrap` on a flex container to allow children to wrap.
 *
 * Takes no arguments.
 *
 * @returns A {@link StyleRule} that sets `flex-wrap: wrap`.
 *
 * @example
 * ```ts
 * import { cx, flexWrap } from 'typewritingclass'
 *
 * cx(flexWrap())
 * // CSS: flex-wrap: wrap;
 * ```
 */
export function flexWrap(): StyleRule {
  return createRule({ 'flex-wrap': 'wrap' })
}

/**
 * Sets the element to `display: inline-flex`.
 *
 * Takes no arguments and produces an inline-level flex container.
 *
 * @returns A {@link StyleRule} that sets `display: inline-flex`.
 *
 * @example
 * ```ts
 * import { cx, inlineFlex } from 'typewritingclass'
 *
 * cx(inlineFlex())
 * // CSS: display: inline-flex;
 * ```
 */
export function inlineFlex(): StyleRule {
  return createRule({ display: 'inline-flex' })
}

/**
 * Sets the element to `display: grid`, optionally defining equal-width columns.
 *
 * When called without arguments, sets only `display: grid`. When called with a
 * column count, also sets `grid-template-columns` with equal-width `1fr` columns.
 *
 * @param cols - Optional number of equal-width columns.
 * @returns A {@link StyleRule} that sets `display: grid` and optionally `grid-template-columns`.
 *
 * @example Grid without columns
 * ```ts
 * import { cx, grid } from 'typewritingclass'
 *
 * cx(grid())
 * // CSS: display: grid;
 * ```
 *
 * @example Grid with columns
 * ```ts
 * cx(grid(3))
 * // CSS: display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
 * ```
 */
export function grid(cols?: number): StyleRule {
  const decls: Record<string, string> = { display: 'grid' }
  if (cols !== undefined) {
    decls['grid-template-columns'] = `repeat(${cols}, minmax(0, 1fr))`
  }
  return createRule(decls)
}

/**
 * Sets the number of equal-width grid columns.
 *
 * @param n - The number of columns.
 * @returns A {@link StyleRule} that sets `grid-template-columns`.
 *
 * @example
 * ```ts
 * import { cx, gridCols } from 'typewritingclass'
 *
 * cx(gridCols(4))
 * // CSS: grid-template-columns: repeat(4, minmax(0, 1fr));
 * ```
 */
export function gridCols(n: number): StyleRule {
  return createRule({ 'grid-template-columns': `repeat(${n}, minmax(0, 1fr))` })
}

/**
 * Sets the number of equal-height grid rows.
 *
 * @param n - The number of rows.
 * @returns A {@link StyleRule} that sets `grid-template-rows`.
 *
 * @example
 * ```ts
 * import { cx, gridRows } from 'typewritingclass'
 *
 * cx(gridRows(3))
 * // CSS: grid-template-rows: repeat(3, minmax(0, 1fr));
 * ```
 */
export function gridRows(n: number): StyleRule {
  return createRule({ 'grid-template-rows': `repeat(${n}, minmax(0, 1fr))` })
}

/**
 * Sets the width of an element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'100%'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `width`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, w } from 'typewritingclass'
 *
 * cx(w(64))
 * // CSS: width: 16rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(w('100%'))
 * // CSS: width: 100%;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, w, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(w(dynamic(width)))
 * // CSS: width: var(--twc-d0);
 * // style: { '--twc-d0': width }
 * ```
 */
export function w(value: number | string | DynamicValue): StyleRule {
  return sizeRule('width', value)
}

/**
 * Sets the height of an element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'100vh'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `height`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, h } from 'typewritingclass'
 *
 * cx(h(12))
 * // CSS: height: 3rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(h('100vh'))
 * // CSS: height: 100vh;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, h, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(h(dynamic(height)))
 * // CSS: height: var(--twc-d0);
 * // style: { '--twc-d0': height }
 * ```
 */
export function h(value: number | string | DynamicValue): StyleRule {
  return sizeRule('height', value)
}

/**
 * Sets both width and height of an element to the same value.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'48px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets both `width` and `height`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, size } from 'typewritingclass'
 *
 * cx(size(10))
 * // CSS: width: 2.5rem; height: 2.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(size('48px'))
 * // CSS: width: 48px; height: 48px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, size, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(size(dynamic(dim)))
 * // CSS: width: var(--twc-d0); height: var(--twc-d0);
 * // style: { '--twc-d0': dim }
 * ```
 */
export function size(value: number | string | DynamicValue): StyleRule {
  return sizeRuleMulti(['width', 'height'], value)
}

/**
 * Sets the minimum width of an element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'200px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `min-width`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, minW } from 'typewritingclass'
 *
 * cx(minW(48))
 * // CSS: min-width: 12rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(minW('0'))
 * // CSS: min-width: 0;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, minW, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(minW(dynamic(minWidth)))
 * // CSS: min-width: var(--twc-d0);
 * // style: { '--twc-d0': minWidth }
 * ```
 */
export function minW(value: number | string | DynamicValue): StyleRule {
  return sizeRule('min-width', value)
}

/**
 * Sets the minimum height of an element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'100vh'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `min-height`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, minH } from 'typewritingclass'
 *
 * cx(minH(96))
 * // CSS: min-height: 24rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(minH('100vh'))
 * // CSS: min-height: 100vh;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, minH, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(minH(dynamic(minHeight)))
 * // CSS: min-height: var(--twc-d0);
 * // style: { '--twc-d0': minHeight }
 * ```
 */
export function minH(value: number | string | DynamicValue): StyleRule {
  return sizeRule('min-height', value)
}

/**
 * Sets the maximum width of an element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'768px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `max-width`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, maxW } from 'typewritingclass'
 *
 * cx(maxW(80))
 * // CSS: max-width: 20rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(maxW('768px'))
 * // CSS: max-width: 768px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, maxW, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(maxW(dynamic(maxWidth)))
 * // CSS: max-width: var(--twc-d0);
 * // style: { '--twc-d0': maxWidth }
 * ```
 */
export function maxW(value: number | string | DynamicValue): StyleRule {
  return sizeRule('max-width', value)
}

/**
 * Sets the maximum height of an element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'100vh'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `max-height`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, maxH } from 'typewritingclass'
 *
 * cx(maxH(40))
 * // CSS: max-height: 10rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(maxH('100vh'))
 * // CSS: max-height: 100vh;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, maxH, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(maxH(dynamic(maxHeight)))
 * // CSS: max-height: var(--twc-d0);
 * // style: { '--twc-d0': maxHeight }
 * ```
 */
export function maxH(value: number | string | DynamicValue): StyleRule {
  return sizeRule('max-height', value)
}

/**
 * Sets the CSS `display` property of an element.
 *
 * Accepts any valid CSS display value as a string.
 *
 * @param value - A CSS display value (`'block'`, `'none'`, `'inline-block'`, etc.).
 * @returns A {@link StyleRule} that sets `display`.
 *
 * @example Block display
 * ```ts
 * import { cx, display } from 'typewritingclass'
 *
 * cx(display('block'))
 * // CSS: display: block;
 * ```
 *
 * @example Hide element
 * ```ts
 * cx(display('none'))
 * // CSS: display: none;
 * ```
 */
export function display(value: string): StyleRule {
  return createRule({ display: value })
}

/**
 * Sets the `align-items` property on a flex or grid container.
 *
 * Accepts any valid CSS align-items value as a string.
 *
 * @param value - A CSS align-items value (`'center'`, `'flex-start'`, `'stretch'`, etc.).
 * @returns A {@link StyleRule} that sets `align-items`.
 *
 * @example Center alignment
 * ```ts
 * import { cx, items } from 'typewritingclass'
 *
 * cx(items('center'))
 * // CSS: align-items: center;
 * ```
 *
 * @example Start alignment
 * ```ts
 * cx(items('flex-start'))
 * // CSS: align-items: flex-start;
 * ```
 */
export function items(value: string): StyleRule {
  return createRule({ 'align-items': value })
}

/**
 * Sets the `justify-content` property on a flex or grid container.
 *
 * Accepts any valid CSS justify-content value as a string.
 *
 * @param value - A CSS justify-content value (`'center'`, `'space-between'`, `'flex-end'`, etc.).
 * @returns A {@link StyleRule} that sets `justify-content`.
 *
 * @example Center justification
 * ```ts
 * import { cx, justify } from 'typewritingclass'
 *
 * cx(justify('center'))
 * // CSS: justify-content: center;
 * ```
 *
 * @example Space between
 * ```ts
 * cx(justify('space-between'))
 * // CSS: justify-content: space-between;
 * ```
 */
export function justify(value: string): StyleRule {
  return createRule({ 'justify-content': value })
}

/**
 * Sets the `align-self` property on a flex or grid child.
 *
 * Accepts any valid CSS align-self value as a string.
 *
 * @param value - A CSS align-self value (`'center'`, `'flex-start'`, `'stretch'`, etc.).
 * @returns A {@link StyleRule} that sets `align-self`.
 *
 * @example Center self-alignment
 * ```ts
 * import { cx, self } from 'typewritingclass'
 *
 * cx(self('center'))
 * // CSS: align-self: center;
 * ```
 *
 * @example End self-alignment
 * ```ts
 * cx(self('flex-end'))
 * // CSS: align-self: flex-end;
 * ```
 */
export function self(value: string): StyleRule {
  return createRule({ 'align-self': value })
}

/**
 * Sets the `overflow` behavior on both axes of an element.
 *
 * Accepts any valid CSS overflow value as a string.
 *
 * @param value - A CSS overflow value (`'hidden'`, `'auto'`, `'scroll'`, `'visible'`).
 * @returns A {@link StyleRule} that sets `overflow`.
 *
 * @example Hidden overflow
 * ```ts
 * import { cx, overflow } from 'typewritingclass'
 *
 * cx(overflow('hidden'))
 * // CSS: overflow: hidden;
 * ```
 *
 * @example Auto overflow
 * ```ts
 * cx(overflow('auto'))
 * // CSS: overflow: auto;
 * ```
 */
export function overflow(value: string): StyleRule {
  return createRule({ overflow: value })
}

/**
 * Sets the horizontal overflow behavior of an element.
 *
 * Accepts any valid CSS overflow-x value as a string.
 *
 * @param value - A CSS overflow-x value (`'hidden'`, `'auto'`, `'scroll'`, `'visible'`).
 * @returns A {@link StyleRule} that sets `overflow-x`.
 *
 * @example Auto horizontal scroll
 * ```ts
 * import { cx, overflowX } from 'typewritingclass'
 *
 * cx(overflowX('auto'))
 * // CSS: overflow-x: auto;
 * ```
 *
 * @example Hidden horizontal overflow
 * ```ts
 * cx(overflowX('hidden'))
 * // CSS: overflow-x: hidden;
 * ```
 */
export function overflowX(value: string): StyleRule {
  return createRule({ 'overflow-x': value })
}

/**
 * Sets the vertical overflow behavior of an element.
 *
 * Accepts any valid CSS overflow-y value as a string.
 *
 * @param value - A CSS overflow-y value (`'hidden'`, `'auto'`, `'scroll'`, `'visible'`).
 * @returns A {@link StyleRule} that sets `overflow-y`.
 *
 * @example Scrollable vertical overflow
 * ```ts
 * import { cx, overflowY } from 'typewritingclass'
 *
 * cx(overflowY('scroll'))
 * // CSS: overflow-y: scroll;
 * ```
 *
 * @example Hidden vertical overflow
 * ```ts
 * cx(overflowY('hidden'))
 * // CSS: overflow-y: hidden;
 * ```
 */
export function overflowY(value: string): StyleRule {
  return createRule({ 'overflow-y': value })
}

/**
 * Sets the element to `position: relative`.
 *
 * Takes no arguments. Creates a positioning context for absolutely positioned children.
 *
 * @returns A {@link StyleRule} that sets `position: relative`.
 *
 * @example
 * ```ts
 * import { cx, relative } from 'typewritingclass'
 *
 * cx(relative())
 * // CSS: position: relative;
 * ```
 */
export function relative(): StyleRule {
  return createRule({ position: 'relative' })
}

/**
 * Sets the element to `position: absolute`.
 *
 * Takes no arguments. Removes the element from normal flow and positions it
 * relative to its nearest positioned ancestor.
 *
 * @returns A {@link StyleRule} that sets `position: absolute`.
 *
 * @example
 * ```ts
 * import { cx, absolute } from 'typewritingclass'
 *
 * cx(absolute())
 * // CSS: position: absolute;
 * ```
 */
export function absolute(): StyleRule {
  return createRule({ position: 'absolute' })
}

/**
 * Sets the element to `position: fixed`.
 *
 * Takes no arguments. Removes the element from normal flow and positions it
 * relative to the viewport.
 *
 * @returns A {@link StyleRule} that sets `position: fixed`.
 *
 * @example
 * ```ts
 * import { cx, fixed } from 'typewritingclass'
 *
 * cx(fixed())
 * // CSS: position: fixed;
 * ```
 */
export function fixed(): StyleRule {
  return createRule({ position: 'fixed' })
}

/**
 * Sets the element to `position: sticky`.
 *
 * Takes no arguments. The element is treated as relative until it crosses a
 * specified threshold, then treated as fixed.
 *
 * @returns A {@link StyleRule} that sets `position: sticky`.
 *
 * @example
 * ```ts
 * import { cx, sticky } from 'typewritingclass'
 *
 * cx(sticky())
 * // CSS: position: sticky;
 * ```
 */
export function sticky(): StyleRule {
  return createRule({ position: 'sticky' })
}

/**
 * Sets the `top` position offset of a positioned element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'0'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `top`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, top } from 'typewritingclass'
 *
 * cx(top(0))
 * // CSS: top: 0px;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(top('50%'))
 * // CSS: top: 50%;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, top, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(top(dynamic(offset)))
 * // CSS: top: var(--twc-d0);
 * // style: { '--twc-d0': offset }
 * ```
 */
export function top(value: number | string | DynamicValue): StyleRule {
  return sizeRule('top', value)
}

/**
 * Sets the `right` position offset of a positioned element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'0'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `right`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, right } from 'typewritingclass'
 *
 * cx(right(4))
 * // CSS: right: 1rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(right('0'))
 * // CSS: right: 0;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, right, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(right(dynamic(offset)))
 * // CSS: right: var(--twc-d0);
 * // style: { '--twc-d0': offset }
 * ```
 */
export function right(value: number | string | DynamicValue): StyleRule {
  return sizeRule('right', value)
}

/**
 * Sets the `bottom` position offset of a positioned element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'0'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `bottom`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, bottom } from 'typewritingclass'
 *
 * cx(bottom(0))
 * // CSS: bottom: 0px;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(bottom('2rem'))
 * // CSS: bottom: 2rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, bottom, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(bottom(dynamic(offset)))
 * // CSS: bottom: var(--twc-d0);
 * // style: { '--twc-d0': offset }
 * ```
 */
export function bottom(value: number | string | DynamicValue): StyleRule {
  return sizeRule('bottom', value)
}

/**
 * Sets the `left` position offset of a positioned element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'0'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `left`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, left } from 'typewritingclass'
 *
 * cx(left(4))
 * // CSS: left: 1rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(left('50%'))
 * // CSS: left: 50%;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, left, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(left(dynamic(offset)))
 * // CSS: left: var(--twc-d0);
 * // style: { '--twc-d0': offset }
 * ```
 */
export function left(value: number | string | DynamicValue): StyleRule {
  return sizeRule('left', value)
}

/**
 * Sets the `inset` shorthand property (top, right, bottom, left) on a positioned element.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`0` -> `0px`), raw string (`'0'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `inset`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, inset } from 'typewritingclass'
 *
 * cx(inset(0))
 * // CSS: inset: 0px;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(inset('0'))
 * // CSS: inset: 0;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, inset, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(inset(dynamic(offset)))
 * // CSS: inset: var(--twc-d0);
 * // style: { '--twc-d0': offset }
 * ```
 */
export function inset(value: number | string | DynamicValue): StyleRule {
  return sizeRule('inset', value)
}

/**
 * Sets the `z-index` stacking order of an element.
 *
 * Accepts a numeric z-index value, a raw string, or a {@link DynamicValue}
 * for runtime values. Numeric values are converted to strings.
 *
 * @param value - A z-index number (`10`, `50`), raw string (`'auto'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `z-index`.
 *
 * @example Numeric z-index
 * ```ts
 * import { cx, z } from 'typewritingclass'
 *
 * cx(z(10))
 * // CSS: z-index: 10;
 * ```
 *
 * @example String z-index
 * ```ts
 * cx(z('auto'))
 * // CSS: z-index: auto;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, z, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(z(dynamic(zIndex)))
 * // CSS: z-index: var(--twc-d0);
 * // style: { '--twc-d0': zIndex }
 * ```
 */
export function z(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'z-index': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'z-index': String(value) })
}
