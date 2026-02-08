import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

export function bg(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { 'background-color': `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ 'background-color': color })
}

export function textColor(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { color: `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ color })
}

export function borderColor(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { 'border-color': `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ 'border-color': color })
}
