import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelectorTemplate } from '../rule.ts'

export const groupHover: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:hover &')
export const groupFocus: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:focus &')
export const groupActive: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:active &')
export const groupFocusVisible: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:focus-visible &')
export const groupFocusWithin: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:focus-within &')
export const groupDisabled: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:disabled &')
export const groupChecked: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:checked &')
export const groupEmpty: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:empty &')
export const groupFirst: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:first-child &')
export const groupLast: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:last-child &')
export const groupOdd: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:nth-child(odd) &')
export const groupEven: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.group:nth-child(even) &')
