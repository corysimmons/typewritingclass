import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveSpacing } from '../theme/spacing.ts'

function transformRule(fn: string, value: string | number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { transform: `${fn}(var(${value.__id}))` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ transform: `${fn}(${value})` })
}

export function scale(value: string | number | DynamicValue): StyleRule {
  return transformRule('scale', value)
}

export function scaleX(value: string | number | DynamicValue): StyleRule {
  return transformRule('scaleX', value)
}

export function scaleY(value: string | number | DynamicValue): StyleRule {
  return transformRule('scaleY', value)
}

export function rotate(value: string | DynamicValue): StyleRule {
  return transformRule('rotate', value)
}

export function translateX(value: string | number | DynamicValue): StyleRule {
  if (typeof value === 'number') return transformRule('translateX', resolveSpacing(value))
  return transformRule('translateX', value)
}

export function translateY(value: string | number | DynamicValue): StyleRule {
  if (typeof value === 'number') return transformRule('translateY', resolveSpacing(value))
  return transformRule('translateY', value)
}

export function skewX(value: string | DynamicValue): StyleRule {
  return transformRule('skewX', value)
}

export function skewY(value: string | DynamicValue): StyleRule {
  return transformRule('skewY', value)
}

export function transformOrigin(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'transform-origin': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'transform-origin': value })
}

export function transformGpu(): StyleRule {
  return createRule({ transform: 'translate3d(0, 0, 0)' })
}

export function transformNone(): StyleRule {
  return createRule({ transform: 'none' })
}
