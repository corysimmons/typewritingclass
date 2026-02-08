import type { StyleRule, DynamicResult } from './types.ts'
import { generateHash } from './hash.ts'
import { register } from './registry.ts'
import { nextLayer } from './layer.ts'

export function dcx(...args: (StyleRule | string)[]): DynamicResult {
  const classNames: string[] = []
  const style: Record<string, string> = {}

  for (const arg of args) {
    if (typeof arg === 'string') {
      classNames.push(arg)
      continue
    }
    const layer = nextLayer()
    const className = generateHash(arg, layer)
    register(className, arg, layer)
    classNames.push(className)

    if (arg.dynamicBindings) {
      Object.assign(style, arg.dynamicBindings)
    }
  }

  return { className: classNames.join(' '), style }
}
