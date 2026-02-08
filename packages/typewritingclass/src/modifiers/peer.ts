import type { StyleRule, Modifier } from '../types.ts'
import { wrapWithSelectorTemplate } from '../rule.ts'

export const peerHover: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:hover ~ &')
export const peerFocus: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:focus ~ &')
export const peerActive: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:active ~ &')
export const peerFocusVisible: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:focus-visible ~ &')
export const peerDisabled: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:disabled ~ &')
export const peerChecked: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:checked ~ &')
export const peerInvalid: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:invalid ~ &')
export const peerRequired: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:required ~ &')
export const peerPlaceholderShown: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:placeholder-shown ~ &')
