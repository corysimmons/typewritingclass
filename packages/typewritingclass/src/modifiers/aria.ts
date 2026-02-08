import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelector } from '../rule.ts'

export const ariaChecked: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-checked="true"]')
export const ariaDisabled: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-disabled="true"]')
export const ariaExpanded: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-expanded="true"]')
export const ariaHidden: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-hidden="true"]')
export const ariaPressed: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-pressed="true"]')
export const ariaReadonly: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-readonly="true"]')
export const ariaRequired: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-required="true"]')
export const ariaSelected: Modifier = (rule: StyleRule) => wrapWithSelector(rule, '[aria-selected="true"]')

export function aria(attr: string): Modifier {
  return (rule: StyleRule) => wrapWithSelector(rule, `[aria-${attr}]`)
}
