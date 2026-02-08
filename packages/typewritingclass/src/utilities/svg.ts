import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveColor } from './colors.ts'

export function fill(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { fill: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ fill: resolveColor(value) })
}

export function stroke(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { stroke: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ stroke: resolveColor(value) })
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
