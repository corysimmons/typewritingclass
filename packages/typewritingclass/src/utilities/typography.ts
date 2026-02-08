import type { StyleRule } from '../types.ts'
import type { TextSize } from '../theme/typography.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

export function text(size: TextSize | string | DynamicValue): StyleRule {
  if (isDynamic(size)) {
    return createDynamicRule(
      { 'font-size': `var(${size.__id})` },
      { [size.__id]: String(size.__value) },
    )
  }
  if (typeof size === 'string') {
    return createRule({ 'font-size': size })
  }
  return createRule({ 'font-size': size.fontSize, 'line-height': size.lineHeight })
}

export function font(weight: string | DynamicValue): StyleRule {
  if (isDynamic(weight)) {
    return createDynamicRule(
      { 'font-weight': `var(${weight.__id})` },
      { [weight.__id]: String(weight.__value) },
    )
  }
  return createRule({ 'font-weight': weight })
}

export function tracking(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'letter-spacing': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'letter-spacing': value })
}

export function leading(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'line-height': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'line-height': value })
}

export function textAlign(value: string): StyleRule {
  return createRule({ 'text-align': value })
}
