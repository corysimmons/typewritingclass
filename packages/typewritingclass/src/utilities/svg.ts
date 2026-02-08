import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

export function fill(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { fill: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ fill: value })
}

export function stroke(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { stroke: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ stroke: value })
}

export function strokeWidth(value: string | number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'stroke-width': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'stroke-width': String(value) })
}
