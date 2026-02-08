import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'

function resolveSize(value: number | string): string {
  if (typeof value === 'string') return value
  return resolveSpacing(value)
}

export function flex(): StyleRule {
  return createRule({ display: 'flex' })
}

export function flexCol(): StyleRule {
  return createRule({ display: 'flex', 'flex-direction': 'column' })
}

export function flexRow(): StyleRule {
  return createRule({ display: 'flex', 'flex-direction': 'row' })
}

export function flexWrap(): StyleRule {
  return createRule({ 'flex-wrap': 'wrap' })
}

export function inlineFlex(): StyleRule {
  return createRule({ display: 'inline-flex' })
}

export function grid(cols?: number): StyleRule {
  const decls: Record<string, string> = { display: 'grid' }
  if (cols !== undefined) {
    decls['grid-template-columns'] = `repeat(${cols}, minmax(0, 1fr))`
  }
  return createRule(decls)
}

export function gridCols(n: number): StyleRule {
  return createRule({ 'grid-template-columns': `repeat(${n}, minmax(0, 1fr))` })
}

export function gridRows(n: number): StyleRule {
  return createRule({ 'grid-template-rows': `repeat(${n}, minmax(0, 1fr))` })
}

export function w(value: number | string): StyleRule {
  return createRule({ width: resolveSize(value) })
}

export function h(value: number | string): StyleRule {
  return createRule({ height: resolveSize(value) })
}

export function size(value: number | string): StyleRule {
  const v = resolveSize(value)
  return createRule({ width: v, height: v })
}

export function minW(value: number | string): StyleRule {
  return createRule({ 'min-width': resolveSize(value) })
}

export function minH(value: number | string): StyleRule {
  return createRule({ 'min-height': resolveSize(value) })
}

export function maxW(value: number | string): StyleRule {
  return createRule({ 'max-width': resolveSize(value) })
}

export function maxH(value: number | string): StyleRule {
  return createRule({ 'max-height': resolveSize(value) })
}

export function display(value: string): StyleRule {
  return createRule({ display: value })
}

export function items(value: string): StyleRule {
  return createRule({ 'align-items': value })
}

export function justify(value: string): StyleRule {
  return createRule({ 'justify-content': value })
}

export function self(value: string): StyleRule {
  return createRule({ 'align-self': value })
}

export function overflow(value: string): StyleRule {
  return createRule({ overflow: value })
}

export function overflowX(value: string): StyleRule {
  return createRule({ 'overflow-x': value })
}

export function overflowY(value: string): StyleRule {
  return createRule({ 'overflow-y': value })
}

export function relative(): StyleRule {
  return createRule({ position: 'relative' })
}

export function absolute(): StyleRule {
  return createRule({ position: 'absolute' })
}

export function fixed(): StyleRule {
  return createRule({ position: 'fixed' })
}

export function sticky(): StyleRule {
  return createRule({ position: 'sticky' })
}

export function top(value: number | string): StyleRule {
  return createRule({ top: resolveSize(value) })
}

export function right(value: number | string): StyleRule {
  return createRule({ right: resolveSize(value) })
}

export function bottom(value: number | string): StyleRule {
  return createRule({ bottom: resolveSize(value) })
}

export function left(value: number | string): StyleRule {
  return createRule({ left: resolveSize(value) })
}

export function inset(value: number | string): StyleRule {
  return createRule({ inset: resolveSize(value) })
}

export function z(value: number | string): StyleRule {
  return createRule({ 'z-index': String(value) })
}
