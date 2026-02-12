export declare const modifierInfo: Record<string, {
    type: 'selector' | 'media' | 'pseudo-element';
    value: string;
}>;
/**
 * Attempt to resolve a color argument.
 * Handles patterns like:
 *   - 'blue[500]'  ->  look up in colorScales
 *   - 'blue-500'   ->  look up in colorScales (dash-separated)
 *   - 'white'      ->  look up in namedColors
 *   - '#3b82f6'    ->  pass through
 *   - 'rgb(...)'   ->  pass through
 *   - a quoted string literal like "'red'" -> strip quotes
 */
export declare function resolveColor(raw: string): string | undefined;
type CSSDeclarations = Record<string, string>;
/**
 * Return raw CSS declarations for a single utility call.
 */
export declare function generateUtilityDeclarations(fnName: string, argStr: string): CSSDeclarations | undefined;
/**
 * Generate a CSS preview string for a single utility call like `p(4)`.
 * Returns undefined if the utility is not recognized.
 */
export declare function generateUtilityPreview(fnName: string, argStr: string): string | undefined;
/**
 * Resolve a token in the context of a utility.
 * E.g. resolveTokenInContext('bg', 'blue500') → { 'background-color': '#3b82f6' }
 * E.g. resolveTokenInContext('rounded', 'lg') → { 'border-radius': '0.5rem' }
 */
export declare function resolveTokenInContext(utilityName: string, tokenName: string): CSSDeclarations | undefined;
/**
 * Return raw CSS declarations for the utilities inside a when() call.
 */
export declare function generateWhenDeclarations(utilityArgs: string): CSSDeclarations | undefined;
/**
 * Generate a CSS preview for a when() call.
 * Pattern: when(modifier)(utility1, utility2, ...)
 *   or:    when(mod1, mod2)(utility1, utility2, ...)
 */
export declare function generateWhenPreview(modifierArgs: string, utilityArgs: string): string | undefined;
/**
 * Parse inner function calls from a comma-separated argument list.
 * E.g., "p(4), bg('#f00'), flex()" -> [{name: 'p', args: '4'}, ...]
 */
export declare function parseFunctionCalls(input: string): Array<{
    name: string;
    args: string;
}>;
/**
 * Check whether a function name is a known typewritingclass utility.
 */
export declare function isKnownUtility(name: string): boolean;
/**
 * Check whether a function name is a known typewritingclass modifier.
 */
export declare function isKnownModifier(name: string): boolean;
/**
 * Get the full list of known utility names (for diagnostics / testing).
 */
export declare function getKnownUtilities(): string[];
/**
 * Get the full list of known modifier names (for diagnostics / testing).
 */
export declare function getKnownModifiers(): string[];
export {};
//# sourceMappingURL=css-preview.d.ts.map