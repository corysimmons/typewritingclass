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
export const peerFocusWithin: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:focus-within ~ &')
export const peerEmpty: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:empty ~ &')
export const peerFirst: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:first-child ~ &')
export const peerLast: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:last-child ~ &')
export const peerOdd: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:nth-child(odd) ~ &')
export const peerEven: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:nth-child(even) ~ &')
export const peerOpen: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer[open] ~ &')
export const peerVisited: Modifier = (rule: StyleRule) => wrapWithSelectorTemplate(rule, '.peer:visited ~ &')

export function peerHas(selector: string): Modifier {
  return (rule: StyleRule) => wrapWithSelectorTemplate(rule, `.peer:has(${selector}) ~ &`)
}
