import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { resolveSpacing } from '../theme/spacing.ts'
import { isDynamic } from '../dynamic.ts'

function sp(value: number | string | DynamicValue): string | DynamicValue {
  if (isDynamic(value)) return value
  return resolveSpacing(value as number | string)
}

function spacingRule(prop: string, value: number | string | DynamicValue): StyleRule {
  const v = sp(value)
  if (isDynamic(v)) {
    return createDynamicRule(
      { [prop]: `var(${v.__id})` },
      { [v.__id]: String(v.__value) },
    )
  }
  return createRule({ [prop]: v as string })
}

function spacingRuleMulti(props: string[], value: number | string | DynamicValue): StyleRule {
  const v = sp(value)
  if (isDynamic(v)) {
    const decls: Record<string, string> = {}
    for (const prop of props) decls[prop] = `var(${v.__id})`
    return createDynamicRule(decls, { [v.__id]: String(v.__value) })
  }
  const decls: Record<string, string> = {}
  for (const prop of props) decls[prop] = v as string
  return createRule(decls)
}

export function p(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding', value)
}

export function px(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['padding-left', 'padding-right'], value)
}

export function py(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['padding-top', 'padding-bottom'], value)
}

export function pt(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-top', value)
}

export function pr(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-right', value)
}

export function pb(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-bottom', value)
}

export function pl(value: number | string | DynamicValue): StyleRule {
  return spacingRule('padding-left', value)
}

export function m(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin', value)
}

export function mx(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['margin-left', 'margin-right'], value)
}

export function my(value: number | string | DynamicValue): StyleRule {
  return spacingRuleMulti(['margin-top', 'margin-bottom'], value)
}

export function mt(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-top', value)
}

export function mr(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-right', value)
}

export function mb(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-bottom', value)
}

export function ml(value: number | string | DynamicValue): StyleRule {
  return spacingRule('margin-left', value)
}

export function gap(value: number | string | DynamicValue): StyleRule {
  return spacingRule('gap', value)
}

export function gapX(value: number | string | DynamicValue): StyleRule {
  return spacingRule('column-gap', value)
}

export function gapY(value: number | string | DynamicValue): StyleRule {
  return spacingRule('row-gap', value)
}
