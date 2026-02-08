import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { DEFAULT as defaultShadow } from '../theme/shadows.ts'
import { isDynamic } from '../dynamic.ts'

export function shadow(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'box-shadow': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'box-shadow': (value as string | undefined) ?? defaultShadow })
}

export function opacity(value: number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { opacity: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ opacity: String(value) })
}

export function backdrop(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'backdrop-filter': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'backdrop-filter': value })
}
