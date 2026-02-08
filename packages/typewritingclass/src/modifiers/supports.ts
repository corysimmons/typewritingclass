import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSupportsQuery } from '../rule.ts'

export function supports(query: string): Modifier {
  return (rule: StyleRule) => wrapWithSupportsQuery(rule, query)
}
