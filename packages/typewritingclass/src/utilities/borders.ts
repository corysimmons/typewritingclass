import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { DEFAULT as defaultRadius } from '../theme/borders.ts'
import { isDynamic } from '../dynamic.ts'

export function rounded(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'border-radius': (value as string | undefined) ?? defaultRadius })
}

export function roundedT(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-left-radius': `var(${value.__id})`, 'border-top-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = (value as string | undefined) ?? defaultRadius
  return createRule({ 'border-top-left-radius': v, 'border-top-right-radius': v })
}

export function roundedB(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-bottom-left-radius': `var(${value.__id})`, 'border-bottom-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = (value as string | undefined) ?? defaultRadius
  return createRule({ 'border-bottom-left-radius': v, 'border-bottom-right-radius': v })
}

export function roundedL(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-left-radius': `var(${value.__id})`, 'border-bottom-left-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = (value as string | undefined) ?? defaultRadius
  return createRule({ 'border-top-left-radius': v, 'border-bottom-left-radius': v })
}

export function roundedR(value?: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'border-top-right-radius': `var(${value.__id})`, 'border-bottom-right-radius': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = (value as string | undefined) ?? defaultRadius
  return createRule({ 'border-top-right-radius': v, 'border-bottom-right-radius': v })
}

export function border(width?: string): StyleRule {
  return createRule({ 'border-width': width ?? '1px', 'border-style': 'solid' })
}

export function borderT(width?: string): StyleRule {
  return createRule({ 'border-top-width': width ?? '1px', 'border-style': 'solid' })
}

export function borderR(width?: string): StyleRule {
  return createRule({ 'border-right-width': width ?? '1px', 'border-style': 'solid' })
}

export function borderB(width?: string): StyleRule {
  return createRule({ 'border-bottom-width': width ?? '1px', 'border-style': 'solid' })
}

export function borderL(width?: string): StyleRule {
  return createRule({ 'border-left-width': width ?? '1px', 'border-style': 'solid' })
}

export function ring(width?: string, color?: string): StyleRule {
  const w = width ?? '3px'
  const c = color ?? '#3b82f6'
  return createRule({ 'box-shadow': `0 0 0 ${w} ${c}` })
}
