'use client'

import { useMemo } from 'react'
import type { StyleRule, DynamicResult } from 'typewritingclass'
import { dcx } from 'typewritingclass'

/**
 * React hook that composes style rules into a `className` + `style` object.
 *
 * Wraps {@link dcx} in `useMemo` for stable references across re-renders.
 * The returned {@link DynamicResult} object can be spread directly onto JSX
 * elements, providing both the generated class name and any inline CSS custom
 * property bindings needed by `dynamic()` values.
 *
 * The memo dependency array is the `args` array itself, so the result is
 * recalculated only when the input rules or class name strings change.
 *
 * @param args - One or more {@link StyleRule} objects or string class names
 *   to compose together.
 * @returns A {@link DynamicResult} with `className` and `style` properties,
 *   suitable for spreading onto a JSX element.
 *
 * @example
 * ```tsx
 * import { useStyle } from 'typewritingclass-react'
 * import { p, bg, dynamic } from 'typewritingclass'
 *
 * function Card({ color }: { color: string }) {
 *   const props = useStyle(p(6), bg(dynamic(color)))
 *   return <div {...props}>Content</div>
 *   // Renders: <div class="_a1b _c2d" style="--twc-d0: #ff0000">Content</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Mixing style rules with plain class names
 * import { useStyle } from 'typewritingclass-react'
 * import { p, rounded } from 'typewritingclass'
 *
 * function Badge() {
 *   const props = useStyle(p(2), rounded('full'), 'custom-badge')
 *   return <span {...props}>New</span>
 *   // Renders: <span class="_x1y _z2w custom-badge" style={{}}>New</span>
 * }
 * ```
 */
export function useStyle(...args: (StyleRule | string)[]): DynamicResult {
  return useMemo(() => dcx(...args), args)
}
