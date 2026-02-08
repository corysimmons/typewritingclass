import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelector } from '../rule.ts'

/**
 * Applies styles only when the element is hovered.
 *
 * Use with {@link when} to conditionally apply style rules on `:hover`.
 *
 * @param rule - The style rule to apply on hover.
 * @returns A new {@link StyleRule} scoped to the `:hover` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, bg, when, hover } from 'typewritingclass'
 *
 * cx(bg('#3b82f6'), when(hover)(bg('#2563eb')))
 * // CSS: .abc { background-color: #3b82f6; }
 * //      .def:hover { background-color: #2563eb; }
 * ```
 */
export const hover: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':hover')

/**
 * Applies styles only when the element has keyboard or pointer focus.
 *
 * Use with {@link when} to conditionally apply style rules on `:focus`.
 *
 * @param rule - The style rule to apply on focus.
 * @returns A new {@link StyleRule} scoped to the `:focus` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, borderColor, when, focus } from 'typewritingclass'
 *
 * cx(borderColor('#d1d5db'), when(focus)(borderColor('#3b82f6')))
 * // CSS: .abc { border-color: #d1d5db; }
 * //      .def:focus { border-color: #3b82f6; }
 * ```
 */
export const focus: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':focus')

/**
 * Applies styles only when the element is being actively pressed.
 *
 * Use with {@link when} to conditionally apply style rules on `:active`.
 *
 * @param rule - The style rule to apply while the element is active.
 * @returns A new {@link StyleRule} scoped to the `:active` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, bg, when, active } from 'typewritingclass'
 *
 * cx(bg('#3b82f6'), when(active)(bg('#1d4ed8')))
 * // CSS: .abc { background-color: #3b82f6; }
 * //      .def:active { background-color: #1d4ed8; }
 * ```
 */
export const active: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':active')

/**
 * Applies styles only when the element is disabled.
 *
 * Use with {@link when} to conditionally apply style rules on `:disabled`.
 * Commonly used for form controls such as buttons and inputs.
 *
 * @param rule - The style rule to apply when disabled.
 * @returns A new {@link StyleRule} scoped to the `:disabled` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, opacity, when, disabled } from 'typewritingclass'
 *
 * cx(opacity('1'), when(disabled)(opacity('0.5')))
 * // CSS: .abc { opacity: 1; }
 * //      .def:disabled { opacity: 0.5; }
 * ```
 */
export const disabled: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':disabled')

/**
 * Applies styles only when the element has visible focus (typically keyboard focus).
 *
 * Use with {@link when} to conditionally apply style rules on `:focus-visible`.
 * Unlike {@link focus}, this only matches when the user agent determines that
 * focus should be visibly indicated (e.g., keyboard navigation, not mouse clicks).
 *
 * @param rule - The style rule to apply on visible focus.
 * @returns A new {@link StyleRule} scoped to the `:focus-visible` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, outline, when, focusVisible } from 'typewritingclass'
 *
 * cx(when(focusVisible)(outline('2px solid #3b82f6')))
 * // CSS: .abc:focus-visible { outline: 2px solid #3b82f6; }
 * ```
 */
export const focusVisible: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':focus-visible')

/**
 * Applies styles when the element or any of its descendants has focus.
 *
 * Use with {@link when} to conditionally apply style rules on `:focus-within`.
 * Useful for styling a parent container when a child input receives focus.
 *
 * @param rule - The style rule to apply when focus is within the element.
 * @returns A new {@link StyleRule} scoped to the `:focus-within` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, borderColor, when, focusWithin } from 'typewritingclass'
 *
 * cx(borderColor('#d1d5db'), when(focusWithin)(borderColor('#3b82f6')))
 * // CSS: .abc { border-color: #d1d5db; }
 * //      .def:focus-within { border-color: #3b82f6; }
 * ```
 */
export const focusWithin: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':focus-within')

/**
 * Applies styles only when the element is the first child of its parent.
 *
 * Use with {@link when} to conditionally apply style rules on `:first-child`.
 *
 * @param rule - The style rule to apply to the first child.
 * @returns A new {@link StyleRule} scoped to the `:first-child` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, mt, when, firstChild } from 'typewritingclass'
 *
 * cx(mt('1rem'), when(firstChild)(mt('0')))
 * // CSS: .abc { margin-top: 1rem; }
 * //      .def:first-child { margin-top: 0; }
 * ```
 */
export const firstChild: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':first-child')

/**
 * Applies styles only when the element is the last child of its parent.
 *
 * Use with {@link when} to conditionally apply style rules on `:last-child`.
 *
 * @param rule - The style rule to apply to the last child.
 * @returns A new {@link StyleRule} scoped to the `:last-child` pseudo-class.
 *
 * @example
 * ```ts
 * import { cx, mb, when, lastChild } from 'typewritingclass'
 *
 * cx(mb('1rem'), when(lastChild)(mb('0')))
 * // CSS: .abc { margin-bottom: 1rem; }
 * //      .def:last-child { margin-bottom: 0; }
 * ```
 */
export const lastChild: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':last-child')
