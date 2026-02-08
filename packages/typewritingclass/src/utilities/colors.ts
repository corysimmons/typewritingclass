import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'

export function bg(color: string): StyleRule {
  return createRule({ 'background-color': color })
}

export function textColor(color: string): StyleRule {
  return createRule({ color })
}

export function borderColor(color: string): StyleRule {
  return createRule({ 'border-color': color })
}
