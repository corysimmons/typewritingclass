import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelector } from '../rule.ts'

export function data(attr: string): Modifier {
  return (rule: StyleRule) => wrapWithSelector(rule, `[data-${attr}]`)
}
