import type { StyleRule } from './types.ts'
import { createRule, createDynamicRule } from './rule.ts'
import { isDynamic } from './dynamic.ts'
import type { DynamicValue } from './dynamic.ts'

export function css(declarations: Record<string, string>): StyleRule
export function css(strings: TemplateStringsArray, ...values: (string | number | DynamicValue)[]): StyleRule
export function css(
  first: Record<string, string> | TemplateStringsArray,
  ...values: (string | number | DynamicValue)[]
): StyleRule {
  // Object overload
  if (!Array.isArray(first) && !('raw' in first)) {
    return createRule(first as Record<string, string>)
  }

  // Tagged template literal overload
  const strings = first as TemplateStringsArray
  const declarations: Record<string, string> = {}
  let dynamicBindings: Record<string, string> | undefined

  // Reconstruct the template, collecting dynamic values
  let raw = ''
  for (let i = 0; i < strings.length; i++) {
    raw += strings[i]
    if (i < values.length) {
      const val = values[i]
      if (isDynamic(val)) {
        if (!dynamicBindings) dynamicBindings = {}
        dynamicBindings[val.__id] = String(val.__value)
        raw += `var(${val.__id})`
      } else {
        raw += String(val)
      }
    }
  }

  // Parse "prop: value;" pairs from the raw string
  const lines = raw.split(';')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue
    const prop = trimmed.slice(0, colonIdx).trim()
    const value = trimmed.slice(colonIdx + 1).trim()
    if (prop && value) {
      declarations[prop] = value
    }
  }

  if (dynamicBindings) {
    return createDynamicRule(declarations, dynamicBindings)
  }
  return createRule(declarations)
}
