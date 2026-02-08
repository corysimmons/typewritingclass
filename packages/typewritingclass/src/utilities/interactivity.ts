import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'

export function cursor(value: string): StyleRule {
  return createRule({ cursor: value })
}

export function select(value: string): StyleRule {
  return createRule({ 'user-select': value })
}

export function pointerEvents(value: string): StyleRule {
  return createRule({ 'pointer-events': value })
}
