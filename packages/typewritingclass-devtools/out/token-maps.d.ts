export declare const colorTokens: Record<string, string>;
export declare const radiusTokens: Record<string, string>;
export declare const shadowTokens: Record<string, string>;
export declare const textSizeTokens: Record<string, string>;
export declare const fontWeightTokens: Record<string, string>;
export declare const trackingTokens: Record<string, string>;
export declare const leadingTokens: Record<string, string>;
export declare const fontFamilyTokens: Record<string, string>;
export declare const alignItemsTokens: Record<string, string>;
export declare const justifyTokens: Record<string, string>;
export declare const displayTokens: Record<string, string>;
export declare const overflowTokens: Record<string, string>;
export declare const cursorTokens: Record<string, string>;
export declare const textAlignTokens: Record<string, string>;
export declare const objectFitTokens: Record<string, string>;
export declare const selfTokens: Record<string, string>;
export declare const textWrapTokens: Record<string, string>;
export declare const textOverflowTokens: Record<string, string>;
export declare const textTransformTokens: Record<string, string>;
export declare const gradientDirectionTokens: Record<string, string>;
interface TokenConfig {
    tokens: Record<string, string>;
    supportsOpacity?: boolean;
}
export declare const UTIL_TOKENS: Record<string, TokenConfig>;
export declare const COLOR_UTILITIES: Set<string>;
export declare const RADIUS_UTILITIES: Set<string>;
export declare const TOKEN_AWARE_UTILITIES: Set<string>;
export declare const MODIFIER_NAMES: Set<string>;
export declare const VALUELESS_UTILITIES: Set<string>;
export declare const ARG_UTILITIES: Set<string>;
/** Check whether a utility name supports token-aware property access. */
export declare function isTokenAwareUtility(name: string): boolean;
/** Check whether `tokenName` is a valid token for `utilityName`. */
export declare function isTokenForUtility(utilityName: string, tokenName: string): boolean;
/** Resolve a token to its argument string for a given utility. */
export declare function resolveTokenArg(utilityName: string, tokenName: string): string | undefined;
/** Check whether a utility name is a color utility. */
export declare function isColorUtility(name: string): boolean;
/**
 * Resolve a color token name (e.g. 'blue500') to its hex value.
 * Returns undefined for non-hex colors (transparent, current) or unknown tokens.
 */
export declare function resolveColorTokenToHex(tokenName: string): string | undefined;
export {};
//# sourceMappingURL=token-maps.d.ts.map