import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'
import { resolveColor } from './colors.ts'

export function bgAttachment(value: string): StyleRule {
  return createRule({ 'background-attachment': value })
}

export function bgClip(value: string): StyleRule {
  return createRule({ 'background-clip': value })
}

export function bgOrigin(value: string): StyleRule {
  return createRule({ 'background-origin': value })
}

export function bgPosition(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'background-position': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'background-position': value })
}

export function bgRepeat(value: string): StyleRule {
  return createRule({ 'background-repeat': value })
}

export function bgSize(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'background-size': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'background-size': value })
}

export function bgImage(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'background-image': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'background-image': value })
}

export function bgGradient(direction: string = 'to right'): StyleRule {
  return createRule({
    'background-image': `linear-gradient(${direction}, var(--twc-gradient-stops, var(--twc-gradient-from, transparent), var(--twc-gradient-to, transparent)))`,
  })
}

export function gradientFrom(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { '--twc-gradient-from': `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ '--twc-gradient-from': resolveColor(color) })
}

export function gradientVia(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { '--twc-gradient-via': `var(${color.__id})`, '--twc-gradient-stops': 'var(--twc-gradient-from, transparent), var(--twc-gradient-via), var(--twc-gradient-to, transparent)' },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ '--twc-gradient-via': resolveColor(color), '--twc-gradient-stops': 'var(--twc-gradient-from, transparent), var(--twc-gradient-via), var(--twc-gradient-to, transparent)' })
}

export function gradientTo(color: string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { '--twc-gradient-to': `var(${color.__id})` },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ '--twc-gradient-to': resolveColor(color) })
}
