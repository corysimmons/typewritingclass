import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

export function cursor(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { cursor: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ cursor: value })
}

export function select(value: string): StyleRule {
  return createRule({ 'user-select': value })
}

export function pointerEvents(value: string): StyleRule {
  return createRule({ 'pointer-events': value })
}
