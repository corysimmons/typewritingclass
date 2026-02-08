import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithMediaQuery } from '../rule.ts'

export const sm: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 640px)')
export const md: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 768px)')
export const lg: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 1024px)')
export const xl: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 1280px)')
export const _2xl: Modifier = (rule: StyleRule) => wrapWithMediaQuery(rule, '(min-width: 1536px)')
