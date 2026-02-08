import type { StyleRule } from './types.ts'

export function createRule(declarations: Record<string, string>): StyleRule {
  return {
    _tag: 'StyleRule',
    declarations,
    selectors: [],
    mediaQueries: [],
  }
}

export function combineRules(rules: StyleRule[]): StyleRule {
  const merged: Record<string, string> = {}
  const selectors: string[] = []
  const mediaQueries: string[] = []
  for (const rule of rules) {
    Object.assign(merged, rule.declarations)
    for (const s of rule.selectors) {
      if (!selectors.includes(s)) selectors.push(s)
    }
    for (const mq of rule.mediaQueries) {
      if (!mediaQueries.includes(mq)) mediaQueries.push(mq)
    }
  }
  return { _tag: 'StyleRule', declarations: merged, selectors, mediaQueries }
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
