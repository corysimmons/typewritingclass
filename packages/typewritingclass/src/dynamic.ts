/**
 * A wrapper around a runtime-changeable CSS value.
 *
 * Instead of baking the value directly into the generated CSS, a
 * `DynamicValue` is replaced with a CSS custom property reference
 * (`var(--twc-dN)`). The actual value is applied at runtime through an
 * inline `style` attribute, allowing it to change without regenerating
 * the stylesheet.
 *
 * Create instances with the {@link dynamic} factory -- do not construct
 * this interface manually.
 *
 * @typeParam T - The underlying value type, constrained to `string | number`.
 *
 * @example
 * ```ts
 * import { dynamic, bg, dcx } from 'typewritingclass'
 *
 * const color = dynamic('#e11d48')
 * // color._tag    => 'DynamicValue'
 * // color.__value => '#e11d48'
 * // color.__id    => '--twc-d0'
 *
 * const { className, style } = dcx(bg(color))
 * // Generated CSS uses var(--twc-d0) instead of the literal color.
 * // style maps '--twc-d0' to '#e11d48' for the inline style attribute.
 * ```
 */
export interface DynamicValue<T extends string | number = string | number> {
  /** Discriminant tag for runtime type checking. Always `'DynamicValue'`. */
  _tag: 'DynamicValue'
  /** The current runtime value (e.g. `'#e11d48'` or `16`). */
  __value: T
  /** The generated CSS custom property name (e.g. `'--twc-d0'`). */
  __id: string
}

let counter = 0

/**
 * Wraps a value so it becomes a runtime-dynamic CSS custom property.
 *
 * The returned {@link DynamicValue} can be passed to any utility that
 * accepts `DynamicValue` (e.g. `bg`, `p`, `textColor`, `rounded`). When
 * composed via {@link dcx}, the value is not inlined into the CSS rule;
 * instead a `var(--twc-dN)` reference is emitted, and the concrete value
 * is placed in the `style` object so it can be changed at runtime without
 * touching the stylesheet.
 *
 * Each call to `dynamic` allocates a new, globally unique custom property
 * name (`--twc-d0`, `--twc-d1`, ...).
 *
 * @typeParam T - Inferred from the provided value; constrained to `string | number`.
 * @param value - The initial CSS value (e.g. a color hex string, a pixel value, etc.).
 * @returns A {@link DynamicValue} wrapping the given value with a unique CSS
 *          custom property identifier.
 *
 * @example Dynamic background color in React
 * ```ts
 * import { dcx, bg, p, dynamic } from 'typewritingclass'
 *
 * function Banner({ color }: { color: string }) {
 *   const { className, style } = dcx(p(4), bg(dynamic(color)))
 *   return <div className={className} style={style} />
 * }
 * // CSS: ._xyz { background-color: var(--twc-d0); padding: 1rem; }
 * // Inline style: --twc-d0: <whatever `color` is at render time>
 * ```
 *
 * @example Dynamic spacing
 * ```ts
 * import { dcx, p, dynamic } from 'typewritingclass'
 *
 * const spacing = dynamic('2.5rem')
 * const { className, style } = dcx(p(spacing))
 * // className => "_a1b2c"
 * // style     => { '--twc-d0': '2.5rem' }
 * // CSS: ._a1b2c { padding: var(--twc-d0); }
 * ```
 */
export function dynamic<T extends string | number>(value: T): DynamicValue<T> {
  return { _tag: 'DynamicValue', __value: value, __id: `--twc-d${counter++}` }
}

/**
 * Type-guard that checks whether an unknown value is a {@link DynamicValue}.
 *
 * Useful inside utilities and the `css` tagged-template implementation to
 * decide whether to emit a `var()` reference or inline the value directly.
 *
 * @param v - Any value to test.
 * @returns `true` if `v` is a `DynamicValue`, narrowing its type accordingly.
 *
 * @example
 * ```ts
 * import { dynamic, isDynamic } from 'typewritingclass'
 *
 * const val = dynamic('#ff0000')
 * isDynamic(val)       // => true
 * isDynamic('#ff0000') // => false
 * isDynamic(42)        // => false
 * isDynamic(null)      // => false
 * ```
 */
export function isDynamic(v: unknown): v is DynamicValue {
  return (
    typeof v === 'object' &&
    v !== null &&
    '_tag' in v &&
    (v as DynamicValue)._tag === 'DynamicValue'
  )
}

/** @internal — exposed for testing only */
export function _resetDynamicCounter(): void {
  counter = 0
}
