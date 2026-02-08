import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'
import { isDynamic } from '../dynamic.ts'

function resolveSize(value: number | string | DynamicValue): string | DynamicValue {
  if (isDynamic(value)) return value
  if (typeof value === 'string') return value
  return resolveSpacing(value)
}

function sizeRule(prop: string, value: number | string | DynamicValue): StyleRule {
  const v = resolveSize(value)
  if (isDynamic(v)) {
    return createDynamicRule(
      { [prop]: `var(${v.__id})` },
      { [v.__id]: String(v.__value) },
    )
  }
  return createRule({ [prop]: v as string })
}

function sizeRuleMulti(props: string[], value: number | string | DynamicValue): StyleRule {
  const v = resolveSize(value)
  if (isDynamic(v)) {
    const decls: Record<string, string> = {}
    for (const prop of props) decls[prop] = `var(${v.__id})`
    return createDynamicRule(decls, { [v.__id]: String(v.__value) })
  }
  const decls: Record<string, string> = {}
  for (const prop of props) decls[prop] = v as string
  return createRule(decls)
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

export function w(value: number | string | DynamicValue): StyleRule {
  return sizeRule('width', value)
}

export function h(value: number | string | DynamicValue): StyleRule {
  return sizeRule('height', value)
}

export function size(value: number | string | DynamicValue): StyleRule {
  return sizeRuleMulti(['width', 'height'], value)
}

export function minW(value: number | string | DynamicValue): StyleRule {
  return sizeRule('min-width', value)
}

export function minH(value: number | string | DynamicValue): StyleRule {
  return sizeRule('min-height', value)
}

export function maxW(value: number | string | DynamicValue): StyleRule {
  return sizeRule('max-width', value)
}

export function maxH(value: number | string | DynamicValue): StyleRule {
  return sizeRule('max-height', value)
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

export function top(value: number | string | DynamicValue): StyleRule {
  return sizeRule('top', value)
}

export function right(value: number | string | DynamicValue): StyleRule {
  return sizeRule('right', value)
}

export function bottom(value: number | string | DynamicValue): StyleRule {
  return sizeRule('bottom', value)
}

export function left(value: number | string | DynamicValue): StyleRule {
  return sizeRule('left', value)
}

export function inset(value: number | string | DynamicValue): StyleRule {
  return sizeRule('inset', value)
}

export function z(value: number | string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'z-index': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'z-index': String(value) })
}
