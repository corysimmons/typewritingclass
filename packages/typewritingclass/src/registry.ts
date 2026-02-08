import type { StyleRule } from './types.ts'

interface RegistryEntry {
  rule: StyleRule
  layer: number
}

const registry = new Map<string, RegistryEntry>()
const listeners: Array<() => void> = []

export function register(className: string, rule: StyleRule, layer: number): void {
  if (registry.has(className)) return
  registry.set(className, { rule, layer })
  for (const cb of listeners) cb()
}

export function onChange(callback: () => void): () => void {
  listeners.push(callback)
  return () => {
    const idx = listeners.indexOf(callback)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}

function renderRule(className: string, rule: StyleRule): string {
  const decls = Object.entries(rule.declarations)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join('\n')

  let selector = `.${className}`
  if (rule.selectors.length > 0) {
    selector += rule.selectors.join('')
  }

  let css = `${selector} {\n${decls}\n}`

  for (const mq of rule.mediaQueries) {
    css = `@media ${mq} {\n${css}\n}`
  }

  return css
}

export function generateCSS(): string {
  const entries = [...registry.entries()].sort((a, b) => a[1].layer - b[1].layer)
  const rules = entries.map(([className, { rule }]) => renderRule(className, rule))
  if (rules.length === 0) return ''
  return rules.join('\n\n')
}

export function getRegistry(): ReadonlyMap<string, RegistryEntry> {
  return registry
}

export function clearRegistry(): void {
  registry.clear()
}
