import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelector } from '../rule.ts'

export const hover: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':hover')
export const focus: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':focus')
export const active: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':active')
export const disabled: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':disabled')
export const focusVisible: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':focus-visible')
export const focusWithin: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':focus-within')
export const firstChild: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':first-child')
export const lastChild: Modifier = (rule: StyleRule) => wrapWithSelector(rule, ':last-child')
