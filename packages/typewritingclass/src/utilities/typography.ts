import type { StyleRule } from '../types.ts'
import type { TextSize } from '../theme/typography.ts'
import { createRule } from '../rule.ts'

export function text(size: TextSize | string): StyleRule {
  if (typeof size === 'string') {
    return createRule({ 'font-size': size })
  }
  return createRule({ 'font-size': size.fontSize, 'line-height': size.lineHeight })
}

export function font(weight: string): StyleRule {
  return createRule({ 'font-weight': weight })
}

export function tracking(value: string): StyleRule {
  return createRule({ 'letter-spacing': value })
}

export function leading(value: string): StyleRule {
  return createRule({ 'line-height': value })
}

export function textAlign(value: string): StyleRule {
  return createRule({ 'text-align': value })
}
