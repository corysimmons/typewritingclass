import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'
import { DEFAULT as defaultShadow } from '../theme/shadows.ts'

export function shadow(value?: string): StyleRule {
  return createRule({ 'box-shadow': value ?? defaultShadow })
}

export function opacity(value: number): StyleRule {
  return createRule({ opacity: String(value) })
}

export function backdrop(value: string): StyleRule {
  return createRule({ 'backdrop-filter': value })
}
