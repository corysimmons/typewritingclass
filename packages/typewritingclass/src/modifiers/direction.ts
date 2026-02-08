import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelectorTemplate } from '../rule.ts'

export const rtl: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '[dir="rtl"] &')
export const ltr: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '[dir="ltr"] &')
