import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithMediaQuery } from '../rule.ts'

export const dark: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(prefers-color-scheme: dark)')
