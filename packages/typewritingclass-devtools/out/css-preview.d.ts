/**
 * Generate a CSS preview string for a single utility call like `p(4)`.
 * Returns undefined if the utility is not recognized.
 */
export declare function generateUtilityPreview(fnName: string, argStr: string): string | undefined;
/**
 * Generate a CSS preview for a cx() call by parsing each inner utility call
 * and composing their declarations.
 */
export declare function generateCxPreview(innerArgs: string): string | undefined;
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
//# sourceMappingURL=css-preview.d.ts.map