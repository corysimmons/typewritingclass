import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelector } from '../rule.ts'

export const before: Modifier = (rule: StyleRule) => {
  const result = wrapWithSelector(rule, '::before')
  if (!result.declarations.content) {
    result.declarations = { content: '""', ...result.declarations }
  }
  return result
}

export const after: Modifier = (rule: StyleRule) => {
  const result = wrapWithSelector(rule, '::after')
  if (!result.declarations.content) {
    result.declarations = { content: '""', ...result.declarations }
  }
  return result
}

export const placeholder_: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::placeholder')
export const file_: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::file-selector-button')
export const marker: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::marker')
export const selection_: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::selection')
export const firstLine: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::first-line')
export const firstLetter: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::first-letter')
export const backdrop_: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '::backdrop')
