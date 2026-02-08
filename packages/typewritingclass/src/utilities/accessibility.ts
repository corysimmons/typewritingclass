import type { StyleRule } from '../types.ts'
import { createRule } from '../rule.ts'

export function srOnly(): StyleRule {
  return createRule({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    'white-space': 'nowrap',
    'border-width': '0',
  })
}

export function notSrOnly(): StyleRule {
  return createRule({
    position: 'static',
    width: 'auto',
    height: 'auto',
    padding: '0',
    margin: '0',
    overflow: 'visible',
    clip: 'auto',
    'white-space': 'normal',
  })
}

export function forcedColorAdjust(value: string): StyleRule {
  return createRule({ 'forced-color-adjust': value })
}
