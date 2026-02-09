// ---------------------------------------------------------------------------
// Brand infrastructure
// ---------------------------------------------------------------------------

declare const __brand: unique symbol

/**
 * Creates a nominal/branded type from a base type.
 *
 * Branded types look like their base type at runtime but are distinct at the
 * type level, preventing accidental misuse (e.g. passing a color where a
 * spacing value is expected).
 *
 * @example
 * ```ts
 * type Meters = Brand<number, 'meters'>
 * type Seconds = Brand<number, 'seconds'>
 *
 * const d: Meters = 5 as Meters
 * const t: Seconds = d // Type error — distinct brands!
 * ```
 */
export type Brand<T, B extends string> = T & { readonly [__brand]: B }

// ---------------------------------------------------------------------------
// CSS value brands
// ---------------------------------------------------------------------------

/**
 * A branded CSS color value — hex, `rgb()`, `hsl()`, CSS variable, etc.
 *
 * Theme color tokens (e.g. `blue[500]`) carry this brand. Raw color strings
 * are also accepted alongside `CSSColor` since utility functions accept both.
 */
export type CSSColor = Brand<string, 'css-color'>

/**
 * A branded CSS length value — `rem`, `px`, `em`, `%`, `vh`, `vw`, etc.
 *
 * Theme spacing, size, and border-radius tokens carry this brand.
 */
export type CSSLength = Brand<string, 'css-length'>

/**
 * A branded CSS shadow value — `box-shadow` definition string.
 *
 * Theme shadow tokens (e.g. `lg` from `theme/shadows`) carry this brand.
 */
export type CSSShadow = Brand<string, 'css-shadow'>

/**
 * A branded CSS font-weight value — numeric string like `'400'` or `'700'`.
 *
 * Theme font weight tokens (e.g. `bold`, `semibold`) carry this brand.
 */
export type CSSFontWeight = Brand<string, 'css-font-weight'>

// ---------------------------------------------------------------------------
// Utility input types
// ---------------------------------------------------------------------------

/** Shorthand for any DynamicValue — used in utility input types. */
type DynamicValueAny = import('./dynamic.ts').DynamicValue

/**
 * Input type for color utilities ({@link bg}, {@link textColor}, {@link borderColor}).
 *
 * Accepts theme color tokens (`CSSColor`), raw CSS color strings, or dynamic values.
 */
export type ColorInput = CSSColor | string | DynamicValueAny

/**
 * Input type for spacing utilities ({@link p}, {@link m}, {@link gap}).
 *
 * Accepts a theme scale number (`4` → `1rem`), a raw CSS length string
 * (`'1.5rem'`), a theme length token, or a dynamic value.
 */
export type SpacingInput = number | CSSLength | string | DynamicValueAny

/**
 * Input type for size utilities ({@link w}, {@link h}, {@link minW}).
 *
 * Accepts a theme scale number, a raw CSS string (`'100%'`), a theme size
 * token (`full`, `screen`), or a dynamic value.
 */
export type SizeInput = number | CSSLength | string | DynamicValueAny

/**
 * Input type for border-radius utilities ({@link rounded}).
 *
 * Accepts a theme radius token (`lg`), a raw CSS string, or a dynamic value.
 */
export type RadiusInput = CSSLength | string | DynamicValueAny

/**
 * Input type for shadow utilities ({@link shadow}).
 *
 * Accepts a theme shadow token (`lg`), a raw CSS string, or a dynamic value.
 */
export type ShadowInput = CSSShadow | string | DynamicValueAny

// ---------------------------------------------------------------------------
// Core types
// ---------------------------------------------------------------------------

/**
 * A self-contained CSS rule produced by utility functions or modifier
 * composition.
 *
 * `StyleRule` is the fundamental unit of the typewritingclass system. Every
 * utility (`p`, `bg`, `rounded`, ...) returns a `StyleRule`, and composing
 * functions like `cx` and `dcx` consume them to generate class names and
 * register CSS in the global stylesheet.
 *
 * You rarely need to construct a `StyleRule` by hand -- use the provided
 * utilities instead.
 *
 * @example Inspecting a rule returned by a utility
 * ```ts
 * import { p } from 'typewritingclass'
 *
 * const rule = p(4)
 * // rule.declarations  => { padding: '1rem' }
 * // rule.selectors      => []
 * // rule.mediaQueries   => []
 * ```
 *
 * @example A rule wrapped with a modifier
 * ```ts
 * import { p, hover } from 'typewritingclass'
 *
 * const rule = hover(p(4))
 * // rule.selectors => [':hover']
 * // CSS: .className:hover { padding: 1rem; }
 * ```
 */
export interface StyleRule {
  /** Discriminant tag used for runtime type narrowing. Always `'StyleRule'`. */
  _tag: 'StyleRule'
  /**
   * A map of CSS property-value pairs that this rule will emit.
   *
   * Keys are CSS property names (e.g. `'padding'`, `'background-color'`),
   * and values are their corresponding CSS values (e.g. `'1rem'`, `'#3b82f6'`).
   */
  declarations: Record<string, string>
  /**
   * Pseudo-class or pseudo-element selectors appended to the generated
   * class name (e.g. `[':hover']`, `[':focus', ':active']`).
   *
   * An empty array means the rule applies unconditionally.
   */
  selectors: string[]
  /**
   * Media query strings that wrap the generated rule
   * (e.g. `['(min-width: 768px)']`).
   *
   * An empty array means no `@media` wrapper is emitted.
   */
  mediaQueries: string[]
  /**
   * CSS custom property bindings for dynamic (runtime-changeable) values.
   *
   * When present, the generated CSS references `var(--twc-dN)` and these
   * bindings must be applied as inline `style` on the element (via `dcx`).
   * Keys are CSS custom property names (e.g. `'--twc-d0'`), values are
   * the current runtime values (e.g. `'#ff0000'`).
   */
  dynamicBindings?: Record<string, string>
  /**
   * `@supports` query strings that wrap the generated rule
   * (e.g. `['(display: grid)']`).
   *
   * An empty array means no `@supports` wrapper is emitted.
   */
  supportsQueries: string[]
  /**
   * Optional selector template that wraps the generated class name in a
   * more complex selector pattern. The `&` character is replaced with the
   * generated `.className` at render time.
   *
   * Used for utilities like `spaceX`/`spaceY` (child combinator selectors),
   * `group-*` / `peer-*` modifiers, and `rtl`/`ltr` direction modifiers.
   *
   * @example
   * ```ts
   * // spaceX uses: '& > :not([hidden]) ~ :not([hidden])'
   * // group-hover uses: '.group:hover &'
   * ```
   */
  selectorTemplate?: string
}

/**
 * A function that accepts a design-token value and returns a {@link StyleRule}.
 *
 * Every spacing, color, typography, and layout helper (`p`, `bg`, `text`, ...)
 * satisfies this signature. The `value` parameter is intentionally `any` so
 * that individual utilities can narrow it to their own accepted types
 * (e.g. `number | string | DynamicValue`).
 *
 * @param value - The design-token or raw CSS value to apply.
 * @returns A {@link StyleRule} containing the appropriate CSS declarations.
 *
 * @example
 * ```ts
 * import type { Utility } from 'typewritingclass'
 * import { p } from 'typewritingclass'
 *
 * // `p` satisfies the Utility signature:
 * const myUtility: Utility = p
 * const rule = myUtility(4)
 * // CSS: padding: 1rem;
 * ```
 */
export type Utility = (value: any) => StyleRule

/**
 * A function that transforms a {@link StyleRule} by wrapping it with a
 * pseudo-class selector or a media query.
 *
 * Modifiers are composable -- you can chain them via {@link when} to build
 * multi-condition rules (e.g. "on hover, at medium breakpoint").
 *
 * @param rule - The source {@link StyleRule} to transform.
 * @returns A new {@link StyleRule} with additional selectors or media queries.
 *
 * @example
 * ```ts
 * import type { Modifier } from 'typewritingclass'
 * import { hover, md } from 'typewritingclass'
 *
 * // `hover` and `md` are both Modifiers:
 * const hoverMod: Modifier = hover
 * const mdMod: Modifier = md
 * ```
 */
export type Modifier = (rule: StyleRule) => StyleRule

/**
 * The return value of {@link dcx}, containing both a class string and an
 * inline `style` object for dynamic CSS custom-property bindings.
 *
 * Use this when your styles include runtime-changeable values created with
 * {@link dynamic}. The `className` goes on the element's class attribute, and
 * `style` must be spread onto the element's inline style so the CSS custom
 * properties are set.
 *
 * @example
 * ```ts
 * import { dcx, bg, dynamic } from 'typewritingclass'
 *
 * const color = dynamic('#ff0000')
 * const result = dcx(bg(color))
 * // result.className => "_a1b2c"
 * // result.style     => { '--twc-d0': '#ff0000' }
 *
 * // In JSX:
 * // <div className={result.className} style={result.style} />
 * // CSS: .\_a1b2c { background-color: var(--twc-d0); }
 * ```
 */
export interface DynamicResult {
  /** A space-separated string of generated CSS class names, ready for `className` or `class`. */
  className: string
  /**
   * An object of CSS custom property assignments to apply as inline styles.
   *
   * Keys are custom property names (e.g. `'--twc-d0'`), values are the
   * current runtime values (e.g. `'#ff0000'`, `'1.5rem'`).
   */
  style: Record<string, string>
}
