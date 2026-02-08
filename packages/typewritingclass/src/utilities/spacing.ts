import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'

function sp(value: number | string): string {
  return resolveSpacing(value)
}

export function p(value: number | string): StyleRule {
  return createRule({ padding: sp(value) })
}

export function px(value: number | string): StyleRule {
  const v = sp(value)
  return createRule({ 'padding-left': v, 'padding-right': v })
}

export function py(value: number | string): StyleRule {
  const v = sp(value)
  return createRule({ 'padding-top': v, 'padding-bottom': v })
}

export function pt(value: number | string): StyleRule {
  return createRule({ 'padding-top': sp(value) })
}

export function pr(value: number | string): StyleRule {
  return createRule({ 'padding-right': sp(value) })
}

export function pb(value: number | string): StyleRule {
  return createRule({ 'padding-bottom': sp(value) })
}

export function pl(value: number | string): StyleRule {
  return createRule({ 'padding-left': sp(value) })
}

export function m(value: number | string): StyleRule {
  return createRule({ margin: sp(value) })
}

export function mx(value: number | string): StyleRule {
  const v = sp(value)
  return createRule({ 'margin-left': v, 'margin-right': v })
}

export function my(value: number | string): StyleRule {
  const v = sp(value)
  return createRule({ 'margin-top': v, 'margin-bottom': v })
}

export function mt(value: number | string): StyleRule {
  return createRule({ 'margin-top': sp(value) })
}

export function mr(value: number | string): StyleRule {
  return createRule({ 'margin-right': sp(value) })
}

export function mb(value: number | string): StyleRule {
  return createRule({ 'margin-bottom': sp(value) })
}

export function ml(value: number | string): StyleRule {
  return createRule({ 'margin-left': sp(value) })
}

export function gap(value: number | string): StyleRule {
  return createRule({ gap: sp(value) })
}

export function gapX(value: number | string): StyleRule {
  return createRule({ 'column-gap': sp(value) })
}

export function gapY(value: number | string): StyleRule {
  return createRule({ 'row-gap': sp(value) })
}
