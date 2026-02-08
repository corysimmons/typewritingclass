import type { StyleRule } from './types.ts'
import { generateHash } from './hash.ts'
import { register } from './registry.ts'

let globalLayer = 0

export function cx(...args: (StyleRule | string)[]): string {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      const layer = globalLayer++
      const className = generateHash(arg, layer)
      register(className, arg, layer)
      return className
    })
    .join(' ')
}

/** @internal — exposed for testing only */
export function _resetLayer(): void {
  globalLayer = 0
}
