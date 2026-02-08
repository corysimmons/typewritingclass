import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'
import { DEFAULT as defaultRadius } from '../theme/borders.ts'

export function rounded(value?: string): StyleRule {
  return createRule({ 'border-radius': value ?? defaultRadius })
}

export function roundedT(value?: string): StyleRule {
  const v = value ?? defaultRadius
  return createRule({ 'border-top-left-radius': v, 'border-top-right-radius': v })
}

export function roundedB(value?: string): StyleRule {
  const v = value ?? defaultRadius
  return createRule({ 'border-bottom-left-radius': v, 'border-bottom-right-radius': v })
}

export function roundedL(value?: string): StyleRule {
  const v = value ?? defaultRadius
  return createRule({ 'border-top-left-radius': v, 'border-bottom-left-radius': v })
}

export function roundedR(value?: string): StyleRule {
  const v = value ?? defaultRadius
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
