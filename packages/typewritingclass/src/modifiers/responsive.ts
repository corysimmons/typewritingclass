import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithMediaQuery } from '../rule.ts'

/**
 * Applies styles at the **small** breakpoint and above (`min-width: 640px`).
 *
 * Use with {@link when} to make style rules responsive. Wraps the rule in a
 * `@media (min-width: 640px)` query.
 *
 * @param rule - The style rule to apply at `>=640px`.
 * @returns A new {@link StyleRule} wrapped in the small-breakpoint media query.
 *
 * @example
 * ```ts
 * import { cx, p, when, sm } from 'typewritingclass'
 *
 * cx(p('1rem'), when(sm)(p('2rem')))
 * // CSS: .abc { padding: 1rem; }
 * //      @media (min-width: 640px) { .def { padding: 2rem; } }
 * ```
 */
export const sm: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 640px)')

/**
 * Applies styles at the **medium** breakpoint and above (`min-width: 768px`).
 *
 * Use with {@link when} to make style rules responsive. Wraps the rule in a
 * `@media (min-width: 768px)` query.
 *
 * @param rule - The style rule to apply at `>=768px`.
 * @returns A new {@link StyleRule} wrapped in the medium-breakpoint media query.
 *
 * @example
 * ```ts
 * import { cx, grid, gridCols, when, md } from 'typewritingclass'
 *
 * cx(gridCols('1'), when(md)(gridCols('2')))
 * // CSS: .abc { grid-template-columns: 1; }
 * //      @media (min-width: 768px) { .def { grid-template-columns: 2; } }
 * ```
 */
export const md: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 768px)')

/**
 * Applies styles at the **large** breakpoint and above (`min-width: 1024px`).
 *
 * Use with {@link when} to make style rules responsive. Wraps the rule in a
 * `@media (min-width: 1024px)` query.
 *
 * @param rule - The style rule to apply at `>=1024px`.
 * @returns A new {@link StyleRule} wrapped in the large-breakpoint media query.
 *
 * @example
 * ```ts
 * import { cx, maxW, when, lg } from 'typewritingclass'
 *
 * cx(maxW('100%'), when(lg)(maxW('1024px')))
 * // CSS: .abc { max-width: 100%; }
 * //      @media (min-width: 1024px) { .def { max-width: 1024px; } }
 * ```
 */
export const lg: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 1024px)')

/**
 * Applies styles at the **extra-large** breakpoint and above (`min-width: 1280px`).
 *
 * Use with {@link when} to make style rules responsive. Wraps the rule in a
 * `@media (min-width: 1280px)` query.
 *
 * @param rule - The style rule to apply at `>=1280px`.
 * @returns A new {@link StyleRule} wrapped in the extra-large-breakpoint media query.
 *
 * @example
 * ```ts
 * import { cx, maxW, when, xl } from 'typewritingclass'
 *
 * cx(maxW('100%'), when(xl)(maxW('1280px')))
 * // CSS: .abc { max-width: 100%; }
 * //      @media (min-width: 1280px) { .def { max-width: 1280px; } }
 * ```
 */
export const xl: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 1280px)')

/**
 * Applies styles at the **2x-large** breakpoint and above (`min-width: 1536px`).
 *
 * Use with {@link when} to make style rules responsive. Wraps the rule in a
 * `@media (min-width: 1536px)` query.
 *
 * Exported as `_2xl` because identifiers cannot start with a digit in JavaScript.
 *
 * @param rule - The style rule to apply at `>=1536px`.
 * @returns A new {@link StyleRule} wrapped in the 2xl-breakpoint media query.
 *
 * @example
 * ```ts
 * import { cx, maxW, when, _2xl } from 'typewritingclass'
 *
 * cx(maxW('100%'), when(_2xl)(maxW('1536px')))
 * // CSS: .abc { max-width: 100%; }
 * //      @media (min-width: 1536px) { .def { max-width: 1536px; } }
 * ```
 */
export const _2xl: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 1536px)')

export const maxSm: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(max-width: 639px)')
export const maxMd: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(max-width: 767px)')
export const maxLg: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(max-width: 1023px)')
export const maxXl: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(max-width: 1279px)')
export const max2xl: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(max-width: 1535px)')
