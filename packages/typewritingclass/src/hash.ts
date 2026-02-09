import type { StyleRule } from './types.ts'

/**
 * Computes a DJB2 hash of the given string.
 *
 * DJB2 is a fast, non-cryptographic hash function created by Daniel J. Bernstein.
 * It produces a 32-bit unsigned integer from an arbitrary string input.
 *
 * @internal
 * @param str - The string to hash.
 * @returns A 32-bit unsigned integer hash value.
 *
 * @see {@link https://en.wikipedia.org/wiki/Daniel_J._Bernstein | DJB2 hash algorithm}
 */
function djb2(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  return hash >>> 0
}

/**
 * Generates a unique, deterministic class name for a style rule at a given layer.
 *
 * The hash is computed from the serialised declarations, selectors, media queries,
 * and layer number. Identical inputs always produce the same class name, enabling
 * deduplication in the {@link register | registry}.
 *
 * The returned string is prefixed with `_` so it is a valid CSS class name
 * (class names must not start with a digit), followed by the base-36 encoded
 * DJB2 hash.
 *
 * @internal
 * @param rule - The {@link StyleRule} to hash.
 * @param layer - The layer ordering number assigned to this rule.
 * @returns A deterministic class name string (e.g., `'_1a2b3c'`).
 *
 * @example
 * ```ts
 * const rule = createRule({ padding: '1rem' })
 * generateHash(rule, 0) // '_h7k2m' (deterministic for the same input)
 * generateHash(rule, 0) // '_h7k2m' (same input = same hash)
 * ```
 */
export function generateHash(rule: StyleRule, _layer?: number): string {
  const input =
    JSON.stringify(rule.declarations) +
    JSON.stringify(rule.selectors) +
    JSON.stringify(rule.mediaQueries) +
    JSON.stringify(rule.supportsQueries) +
    (rule.selectorTemplate ?? '')
  return '_' + djb2(input).toString(36)
}
