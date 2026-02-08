import type { StyleRule } from '../types.ts'
import type { DynamicValue } from '../dynamic.ts'
import { createRule, createDynamicRule } from '../rule.ts'
import { isDynamic } from '../dynamic.ts'

function filterRule(fn: string, value: string | DynamicValue, prop: 'filter' | 'backdrop-filter' = 'filter'): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { [prop]: `${fn}(var(${value.__id}))` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ [prop]: `${fn}(${value})` })
}

// --- Filter utilities ---

export function blur(value: string | DynamicValue = '8px'): StyleRule {
  return filterRule('blur', value)
}

export function brightness(value: string | DynamicValue): StyleRule {
  return filterRule('brightness', value)
}

export function contrast(value: string | DynamicValue): StyleRule {
  return filterRule('contrast', value)
}

export function dropShadow(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { filter: `drop-shadow(var(${value.__id}))` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ filter: `drop-shadow(${value})` })
}

export function grayscale(value: string | DynamicValue = '100%'): StyleRule {
  return filterRule('grayscale', value)
}

export function hueRotate(value: string | DynamicValue): StyleRule {
  return filterRule('hue-rotate', value)
}

export function invert(value: string | DynamicValue = '100%'): StyleRule {
  return filterRule('invert', value)
}

export function saturate(value: string | DynamicValue): StyleRule {
  return filterRule('saturate', value)
}

export function sepia(value: string | DynamicValue = '100%'): StyleRule {
  return filterRule('sepia', value)
}

// --- Backdrop filter utilities ---

export function backdropBlur(value: string | DynamicValue = '8px'): StyleRule {
  return filterRule('blur', value, 'backdrop-filter')
}

export function backdropBrightness(value: string | DynamicValue): StyleRule {
  return filterRule('brightness', value, 'backdrop-filter')
}

export function backdropContrast(value: string | DynamicValue): StyleRule {
  return filterRule('contrast', value, 'backdrop-filter')
}

export function backdropGrayscale(value: string | DynamicValue = '100%'): StyleRule {
  return filterRule('grayscale', value, 'backdrop-filter')
}

export function backdropHueRotate(value: string | DynamicValue): StyleRule {
  return filterRule('hue-rotate', value, 'backdrop-filter')
}

export function backdropInvert(value: string | DynamicValue = '100%'): StyleRule {
  return filterRule('invert', value, 'backdrop-filter')
}

export function backdropOpacity(value: string | DynamicValue): StyleRule {
  return filterRule('opacity', value, 'backdrop-filter')
}

export function backdropSaturate(value: string | DynamicValue): StyleRule {
  return filterRule('saturate', value, 'backdrop-filter')
}

export function backdropSepia(value: string | DynamicValue = '100%'): StyleRule {
  return filterRule('sepia', value, 'backdrop-filter')
}
