import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule, wrapWithSelectorTemplate } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'
import { isDynamic } from '../dynamic.ts'

function sp(value: number | string | DynamicValue): string | DynamicValue {
  if (isDynamic(value)) return value
  return resolveSpacing(value as number | string)
}

function spacingRule(prop: string, value: number | string | DynamicValue): StyleRule {
  const v = sp(value)
  if (isDynamic(v)) {
    return createDynamicRule(
      { [prop]: `var(${v.__id})` },
      { [v.__id]: String(v.__value) },
    )
  }
  return createRule({ [prop]: v as string })
}

function spacingRuleMulti(props: string[], value: number | string | DynamicValue): StyleRule {
  const v = sp(value)
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
 * Sets padding on all sides.
 *
 * Accepts a theme spacing scale number (maps to the spacing scale), a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'2.5rem'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, p } from 'typewritingclass'
 *
 * cx(p(4))
 * // CSS: padding: 1rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(p('2.5rem'))
 * // CSS: padding: 2.5rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, p, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(p(dynamic(spacing)))
 * // CSS: padding: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function p(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding', value)
}

/**
 * Sets horizontal padding (left and right).
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'20px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding-left` and `padding-right`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, px } from 'typewritingclass'
 *
 * cx(px(6))
 * // CSS: padding-left: 1.5rem; padding-right: 1.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(px('10px'))
 * // CSS: padding-left: 10px; padding-right: 10px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, px, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(px(dynamic(spacing)))
 * // CSS: padding-left: var(--twc-d0); padding-right: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function px(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['padding-left', 'padding-right'], value)
}

/**
 * Sets vertical padding (top and bottom).
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'20px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding-top` and `padding-bottom`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, py } from 'typewritingclass'
 *
 * cx(py(2))
 * // CSS: padding-top: 0.5rem; padding-bottom: 0.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(py('1em'))
 * // CSS: padding-top: 1em; padding-bottom: 1em;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, py, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(py(dynamic(spacing)))
 * // CSS: padding-top: var(--twc-d0); padding-bottom: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function py(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['padding-top', 'padding-bottom'], value)
}

/**
 * Sets top padding.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'8px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding-top`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, pt } from 'typewritingclass'
 *
 * cx(pt(8))
 * // CSS: padding-top: 2rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(pt('0.5em'))
 * // CSS: padding-top: 0.5em;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, pt, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(pt(dynamic(spacing)))
 * // CSS: padding-top: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function pt(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-top', value)
}

/**
 * Sets right padding.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'12px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding-right`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, pr } from 'typewritingclass'
 *
 * cx(pr(3))
 * // CSS: padding-right: 0.75rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(pr('1rem'))
 * // CSS: padding-right: 1rem;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, pr, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(pr(dynamic(spacing)))
 * // CSS: padding-right: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function pr(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-right', value)
}

/**
 * Sets bottom padding.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'16px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding-bottom`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, pb } from 'typewritingclass'
 *
 * cx(pb(10))
 * // CSS: padding-bottom: 2.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(pb('2em'))
 * // CSS: padding-bottom: 2em;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, pb, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(pb(dynamic(spacing)))
 * // CSS: padding-bottom: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function pb(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-bottom', value)
}

/**
 * Sets left padding.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'24px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `padding-left`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, pl } from 'typewritingclass'
 *
 * cx(pl(5))
 * // CSS: padding-left: 1.25rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(pl('3ch'))
 * // CSS: padding-left: 3ch;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, pl, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(pl(dynamic(spacing)))
 * // CSS: padding-left: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function pl(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-left', value)
}

/**
 * Sets margin on all sides.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'auto'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, m } from 'typewritingclass'
 *
 * cx(m(4))
 * // CSS: margin: 1rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(m('auto'))
 * // CSS: margin: auto;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, m, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(m(dynamic(spacing)))
 * // CSS: margin: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function m(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin', value)
}

/**
 * Sets horizontal margin (left and right).
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'auto'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin-left` and `margin-right`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, mx } from 'typewritingclass'
 *
 * cx(mx(8))
 * // CSS: margin-left: 2rem; margin-right: 2rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(mx('auto'))
 * // CSS: margin-left: auto; margin-right: auto;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, mx, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(mx(dynamic(spacing)))
 * // CSS: margin-left: var(--twc-d0); margin-right: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function mx(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['margin-left', 'margin-right'], value)
}

/**
 * Sets vertical margin (top and bottom).
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'2em'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin-top` and `margin-bottom`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, my } from 'typewritingclass'
 *
 * cx(my(6))
 * // CSS: margin-top: 1.5rem; margin-bottom: 1.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(my('0.5em'))
 * // CSS: margin-top: 0.5em; margin-bottom: 0.5em;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, my, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(my(dynamic(spacing)))
 * // CSS: margin-top: var(--twc-d0); margin-bottom: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function my(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['margin-top', 'margin-bottom'], value)
}

/**
 * Sets top margin.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'1em'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin-top`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, mt } from 'typewritingclass'
 *
 * cx(mt(2))
 * // CSS: margin-top: 0.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(mt('10px'))
 * // CSS: margin-top: 10px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, mt, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(mt(dynamic(spacing)))
 * // CSS: margin-top: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function mt(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-top', value)
}

/**
 * Sets right margin.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'1em'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin-right`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, mr } from 'typewritingclass'
 *
 * cx(mr(3))
 * // CSS: margin-right: 0.75rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(mr('auto'))
 * // CSS: margin-right: auto;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, mr, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(mr(dynamic(spacing)))
 * // CSS: margin-right: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function mr(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-right', value)
}

/**
 * Sets bottom margin.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'2em'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin-bottom`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, mb } from 'typewritingclass'
 *
 * cx(mb(4))
 * // CSS: margin-bottom: 1rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(mb('20px'))
 * // CSS: margin-bottom: 20px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, mb, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(mb(dynamic(spacing)))
 * // CSS: margin-bottom: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function mb(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-bottom', value)
}

/**
 * Sets left margin.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'auto'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `margin-left`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, ml } from 'typewritingclass'
 *
 * cx(ml(12))
 * // CSS: margin-left: 3rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(ml('auto'))
 * // CSS: margin-left: auto;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, ml, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(ml(dynamic(spacing)))
 * // CSS: margin-left: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function ml(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-left', value)
}

/**
 * Sets gap between flex or grid children on both axes.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'20px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `gap`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, gap } from 'typewritingclass'
 *
 * cx(gap(4))
 * // CSS: gap: 1rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(gap('1.5em'))
 * // CSS: gap: 1.5em;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, gap, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(gap(dynamic(spacing)))
 * // CSS: gap: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function gap(value: number | string | DynamicValue): StyleRule {
  return spacingRule('gap', value)
}

/**
 * Sets horizontal (column) gap between flex or grid children.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'10px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `column-gap`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, gapX } from 'typewritingclass'
 *
 * cx(gapX(2))
 * // CSS: column-gap: 0.5rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(gapX('12px'))
 * // CSS: column-gap: 12px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, gapX, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(gapX(dynamic(spacing)))
 * // CSS: column-gap: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function gapX(value: number | string | DynamicValue): StyleRule {
  return spacingRule('column-gap', value)
}

/**
 * Sets vertical (row) gap between flex or grid children.
 *
 * Accepts a theme spacing scale number, a raw CSS string,
 * or a {@link DynamicValue} for runtime values.
 *
 * @param value - Spacing scale number (`4` -> `1rem`), raw string (`'10px'`), or `dynamic()` value.
 * @returns A {@link StyleRule} that sets `row-gap`.
 *
 * @example Theme scale
 * ```ts
 * import { cx, gapY } from 'typewritingclass'
 *
 * cx(gapY(3))
 * // CSS: row-gap: 0.75rem;
 * ```
 *
 * @example Raw value
 * ```ts
 * cx(gapY('8px'))
 * // CSS: row-gap: 8px;
 * ```
 *
 * @example Dynamic value
 * ```ts
 * import { dcx, gapY, dynamic } from 'typewritingclass'
 *
 * const { className, style } = dcx(gapY(dynamic(spacing)))
 * // CSS: row-gap: var(--twc-d0);
 * // style: { '--twc-d0': spacing }
 * ```
 */
export function gapY(value: number | string | DynamicValue): StyleRule {
  return spacingRule('row-gap', value)
}

export function ps(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-inline-start', value)
}

export function pe(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-inline-end', value)
}

export function ms(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-inline-start', value)
}

export function me(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-inline-end', value)
}

export function spaceX(value: number | string | DynamicValue): StyleRule {
  const rule = spacingRule('margin-left', value)
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function spaceY(value: number | string | DynamicValue): StyleRule {
  const rule = spacingRule('margin-top', value)
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function spaceXReverse(): StyleRule {
  const rule = createRule({ '--twc-space-x-reverse': '1' })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}

export function spaceYReverse(): StyleRule {
  const rule = createRule({ '--twc-space-y-reverse': '1' })
  return wrapWithSelectorTemplate(rule, '& > :not([hidden]) ~ :not([hidden])')
}
