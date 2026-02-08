import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import * as animations from '../theme/animations.ts'

const animateMap: Record<string, string> = {
  spin: animations.spin,
  ping: animations.ping,
  pulse: animations.pulse,
  bounce: animations.bounce,
  none: 'none',
}

export function transition(): StyleRule {
  return createRule({
    'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  })
}

export function transitionAll(): StyleRule {
  return createRule({
    'transition-property': 'all',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  })
}

export function transitionColors(): StyleRule {
  return createRule({
    'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  })
}

export function transitionOpacity(): StyleRule {
  return createRule({
    'transition-property': 'opacity',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  })
}

export function transitionShadow(): StyleRule {
  return createRule({
    'transition-property': 'box-shadow',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  })
}

export function transitionTransform(): StyleRule {
  return createRule({
    'transition-property': 'transform',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  })
}

export function transitionNone(): StyleRule {
  return createRule({ 'transition-property': 'none' })
}

export function duration(value: string | number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'transition-duration': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? `${value}ms` : value
  return createRule({ 'transition-duration': v })
}

export function ease(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'transition-timing-function': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'transition-timing-function': value })
}

export function delay(value: string | number | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'transition-delay': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  const v = typeof value === 'number' ? `${value}ms` : value
  return createRule({ 'transition-delay': v })
}

export function animate(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { animation: `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ animation: animateMap[value] ?? value })
}
