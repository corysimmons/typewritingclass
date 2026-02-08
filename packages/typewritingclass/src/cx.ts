import type { StyleRule } from './types.ts'
import { generateHash } from './hash.ts'
import { register } from './registry.ts'
import { nextLayer, _resetLayer } from './layer.ts'

export function cx(...args: (StyleRule | string)[]): string {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      const layer = nextLayer()
      const className = generateHash(arg, layer)
      register(className, arg, layer)
      return className
    })
    .join(' ')
}

export { _resetLayer }
