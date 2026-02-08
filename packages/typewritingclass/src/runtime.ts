import type { DynamicResult } from './types.ts'

/**
 * Runtime helper injected by the compiler when dynamic() values are used.
 * Combines a static class name with dynamic CSS custom property bindings.
 */
export function __twcDynamic(
  className: string,
  bindings: Record<string, string>,
): DynamicResult {
  return { className, style: bindings }
}
