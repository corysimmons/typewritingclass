import type { StyleRule, Modifier } from './types.ts'
import { combineRules } from './rule.ts'

export function when(...modifiers: Modifier[]) {
  return (...rules: StyleRule[]): StyleRule => {
    const combined = combineRules(rules)
    return modifiers.reduceRight((acc, mod) => mod(acc), combined)
  }
}
