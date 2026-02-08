import type { StyleRule } from './types.ts'

function djb2(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  return hash >>> 0
}

export function generateHash(rule: StyleRule, layer: number): string {
  const input =
    JSON.stringify(rule.declarations) +
    JSON.stringify(rule.selectors) +
    JSON.stringify(rule.mediaQueries) +
    String(layer)
  return '_' + djb2(input).toString(36)
}
