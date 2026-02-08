import type { StyleRule } from './types.ts'

export function createRule(declarations: Record<string, string>): StyleRule {
  return {
    _tag: 'StyleRule',
    declarations,
    selectors: [],
    mediaQueries: [],
  }
}

export function createDynamicRule(
  declarations: Record<string, string>,
  dynamicBindings: Record<string, string>,
): StyleRule {
  return {
    _tag: 'StyleRule',
    declarations,
    selectors: [],
    mediaQueries: [],
    dynamicBindings,
  }
}

export function combineRules(rules: StyleRule[]): StyleRule {
  const merged: Record<string, string> = {}
  const selectors: string[] = []
  const mediaQueries: string[] = []
  let dynamicBindings: Record<string, string> | undefined
  for (const rule of rules) {
    Object.assign(merged, rule.declarations)
    for (const s of rule.selectors) {
      if (!selectors.includes(s)) selectors.push(s)
    }
    for (const mq of rule.mediaQueries) {
      if (!mediaQueries.includes(mq)) mediaQueries.push(mq)
    }
    if (rule.dynamicBindings) {
      if (!dynamicBindings) dynamicBindings = {}
      Object.assign(dynamicBindings, rule.dynamicBindings)
    }
  }
  const result: StyleRule = { _tag: 'StyleRule', declarations: merged, selectors, mediaQueries }
  if (dynamicBindings) result.dynamicBindings = dynamicBindings
  return result
}

export function wrapWithSelector(rule: StyleRule, selector: string): StyleRule {
  return {
    ...rule,
    selectors: [...rule.selectors, selector],
  }
}

export function wrapWithMediaQuery(rule: StyleRule, query: string): StyleRule {
  return {
    ...rule,
    mediaQueries: [...rule.mediaQueries, query],
  }
}
