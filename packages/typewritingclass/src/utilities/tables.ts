import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'
import { isDynamic } from '../dynamic.ts'

export function borderCollapse(): StyleRule {
  return createRule({ 'border-collapse': 'collapse' })
}

export function borderSeparate(): StyleRule {
  return createRule({ 'border-collapse': 'separate' })
}

export function borderSpacing(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-spacing': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : value
  return createRule({ 'border-spacing': v })
}

export function borderSpacingX(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-spacing': `var(${value.__id}) 0` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : value
  return createRule({ 'border-spacing': `${v} 0` })
}

export function borderSpacingY(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-spacing': `0 var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? resolveSpacing(value) : value
  return createRule({ 'border-spacing': `0 ${v}` })
}

export function tableLayout(value: string): StyleRule {
  return createRule({ 'table-layout': value })
}

export function captionSide(value: string): StyleRule {
  return createRule({ 'caption-side': value })
}
