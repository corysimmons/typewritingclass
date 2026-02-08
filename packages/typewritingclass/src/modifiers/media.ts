import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithMediaQuery } from '../rule.ts'

export const motionReduce: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(prefers-reduced-motion: reduce)')
export const motionSafe: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(prefers-reduced-motion: no-preference)')
export const print_: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, 'print')
export const portrait: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(orientation: portrait)')
export const landscape: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(orientation: landscape)')
export const contrastMore: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(prefers-contrast: more)')
export const contrastLess: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(prefers-contrast: less)')
export const forcedColors: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(forced-colors: active)')
