import type { StyleRule } from './types.ts'
import { createRule } from './rule.ts'

export function css(declarations: Record<string, string>): StyleRule {
  return createRule(declarations)
}
