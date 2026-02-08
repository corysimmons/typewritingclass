import type { DynamicResult } from './types.ts'

/**
 * Runtime helper injected by the compiler when `dynamic()` values are used.
 *
 * Combines a pre-computed static class name with a set of CSS custom property
 * bindings that carry runtime values. The returned {@link DynamicResult} can
 * be spread onto a DOM element (or passed to {@link useStyle} in React) to
 * apply both the `className` and the inline `style` containing the custom
 * property overrides.
 *
 * This function is **not intended to be called manually** -- the typewritingclass
 * compiler generates calls to it when it encounters `dynamic()` in style
 * expressions.
 *
 * @internal
 * @param className - The hashed class name generated at compile time
 *   (e.g., `'_a1b2c'`).
 * @param bindings - A record mapping CSS custom property names to their
 *   runtime string values (e.g., `{ '--twc-d0': '#ff0000' }`).
 * @returns A {@link DynamicResult} with `className` and `style` properties
 *   ready for spreading onto an element.
 *
 * @example
 * ```ts
 * // Compiler output (not written by hand):
 * __twcDynamic('_a1b2c', { '--twc-d0': props.color })
 * // => { className: '_a1b2c', style: { '--twc-d0': '#ff0000' } }
 * ```
 */
export function __twcDynamic(
  className: string,
  bindings: Record<string, string>,
): DynamicResult {
  return { className, style: bindings }
}
