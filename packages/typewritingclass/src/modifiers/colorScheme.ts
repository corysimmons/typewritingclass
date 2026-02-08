import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithMediaQuery } from '../rule.ts'

/**
 * Applies styles only when the user's operating system or browser is set to a dark color scheme.
 *
 * Use with {@link when} to conditionally apply style rules inside a
 * `@media (prefers-color-scheme: dark)` query. This responds to the user's
 * system-level preference, not a manual theme toggle. For manual theme switching,
 * see {@link setTheme} and the theme API.
 *
 * @param rule - The style rule to apply in dark mode.
 * @returns A new {@link StyleRule} wrapped in the `prefers-color-scheme: dark` media query.
 *
 * @example
 * ```ts
 * import { cx, bg, color, when, dark } from 'typewritingclass'
 *
 * cx(
 *   bg('#ffffff'),
 *   color('#111827'),
 *   when(dark)(bg('#111827')),
 *   when(dark)(color('#f9fafb')),
 * )
 * // CSS: .abc { background-color: #ffffff; }
 * //      .def { color: #111827; }
 * //      @media (prefers-color-scheme: dark) { .ghi { background-color: #111827; } }
 * //      @media (prefers-color-scheme: dark) { .jkl { color: #f9fafb; } }
 * ```
 */
export const dark: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(prefers-color-scheme: dark)')
