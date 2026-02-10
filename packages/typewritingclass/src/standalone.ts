import type { StyleRule } from './types.ts'
import type { TokenConfig } from './tokens.ts'
import { resolveColorWithOpacity } from './utilities/colors.ts'

/**
 * Wraps a utility function in a Proxy that supports property-access token
 * resolution alongside the original function-call API.
 *
 * @example
 * ```ts
 * import { bg, rounded } from 'typewritingclass'
 *
 * // Property access (new)
 * cx(bg.blue500, rounded.lg)
 *
 * // Function call (backward compat)
 * cx(bg('blue-500'), rounded('lg'))
 *
 * // Opacity via callable syntax
 * cx(bg.blue500(25))  // 25% opacity
 * ```
 */
export function createStandaloneProxy(
  utilFn: (...args: any[]) => StyleRule,
  config: TokenConfig,
): any {
  return new Proxy(utilFn, {
    get(_target, prop: string | symbol) {
      if (typeof prop === 'symbol') return (utilFn as any)[prop]
      if (prop in config.tokens) {
        const tokenArg = config.tokens[prop]
        const rule = utilFn(tokenArg)

        if (config.supportsOpacity) {
          // Return a callable proxy that acts as a StyleRule (get)
          // and accepts an opacity argument (apply)
          return new Proxy(function () {} as any, {
            get(_t, ruleProp: string | symbol) {
              return (rule as any)[ruleProp]
            },
            apply(_t, _this, args) {
              return utilFn(resolveColorWithOpacity(tokenArg, args[0]))
            },
          })
        }

        return rule
      }
      return (utilFn as any)[prop]
    },
    apply(_target, _this, args) {
      return utilFn(...args)
    },
  })
}
