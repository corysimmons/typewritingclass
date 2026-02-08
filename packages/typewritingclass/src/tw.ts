import type { StyleRule, Modifier } from './types.ts'
import { cx } from './cx.ts'
import { when } from './when.ts'

// --- Utilities ---
import {
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap, gapX, gapY,
  ps, pe, ms, me,
  spaceX, spaceY, spaceXReverse, spaceYReverse,
} from './utilities/spacing.ts'
import { bg, textColor, borderColor } from './utilities/colors.ts'
import {
  text, font, tracking, leading, textAlign,
  fontFamily, antialiased, subpixelAntialiased,
  italic, notItalic, truncate,
  normalNums, ordinal, slashedZero, liningNums, oldstyleNums,
  proportionalNums, tabularNums, diagonalFractions, stackedFractions,
  lineClamp, listStyleImage, listStylePosition, listStyleType,
  textDecoration, textDecorationColor, textDecorationStyle, textDecorationThickness,
  textUnderlineOffset, textTransform, textOverflow, textWrap, textIndent,
  verticalAlign, whitespace, wordBreak, hyphens, content_,
} from './utilities/typography.ts'
import {
  flex, flexCol, flexRow, flexWrap, inlineFlex,
  grid, gridCols, gridRows,
  w, h, size, minW, minH, maxW, maxH,
  display, items, justify, self,
  overflow, overflowX, overflowY,
  relative, absolute, fixed, sticky,
  top, right, bottom, left, inset,
  z,
  aspectRatio, columns, breakAfter, breakBefore, breakInside,
  boxDecorationBreak, boxSizing, float_, clear_, isolate, isolationAuto,
  objectFit, objectPosition, overscrollBehavior, overscrollX, overscrollY,
  static_, insetX, insetY, start, end,
  visible, invisible, collapse_,
  flexBasis, flexRowReverse, flexColReverse, flexWrapReverse, flexNowrap,
  flex1, flexAuto, flexInitial, flexNone,
  grow, shrink, order,
  colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd,
  gridFlow, autoCols, autoRows,
  justifyItems, justifySelf, alignContent, placeContent, placeItems, placeSelf,
  container,
} from './utilities/layout.ts'
import {
  rounded, roundedT, roundedB, roundedL, roundedR,
  roundedTL, roundedTR, roundedBR, roundedBL,
  roundedSS, roundedSE, roundedEE, roundedES,
  border, borderT, borderR, borderB, borderL,
  borderX, borderY, borderS, borderE, borderStyle,
  ring, ringColor, ringOffsetWidth, ringOffsetColor, ringInset,
  outlineWidth, outlineColor, outlineStyle, outlineOffset, outline, outlineNone,
  divideX, divideY, divideColor, divideStyle, divideXReverse, divideYReverse,
} from './utilities/borders.ts'
import { shadow, opacity, backdrop, shadowColor, mixBlendMode, bgBlendMode } from './utilities/effects.ts'
import {
  cursor, select, pointerEvents,
  accentColor, appearance, caretColor, resize,
  scrollBehavior, scrollMargin, scrollMarginX, scrollMarginY,
  scrollMarginT, scrollMarginR, scrollMarginB, scrollMarginL,
  scrollPadding, scrollPaddingX, scrollPaddingY,
  scrollPaddingT, scrollPaddingR, scrollPaddingB, scrollPaddingL,
  snapAlign, snapStop, snapType, touchAction, willChange,
} from './utilities/interactivity.ts'
import {
  blur, brightness, contrast, dropShadow, grayscale, hueRotate, invert, saturate, sepia,
  backdropBlur, backdropBrightness, backdropContrast, backdropGrayscale, backdropHueRotate,
  backdropInvert, backdropOpacity, backdropSaturate, backdropSepia,
} from './utilities/filters.ts'
import {
  scale, scaleX, scaleY, rotate, translateX, translateY, skewX, skewY,
  transformOrigin, transformGpu, transformNone,
} from './utilities/transforms.ts'
import {
  transition, transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone,
  duration, ease, delay, animate,
} from './utilities/transitions.ts'
import { borderCollapse, borderSeparate, borderSpacing, borderSpacingX, borderSpacingY, tableLayout, captionSide } from './utilities/tables.ts'
import { fill, stroke, strokeWidth } from './utilities/svg.ts'
import { srOnly, notSrOnly, forcedColorAdjust } from './utilities/accessibility.ts'
import {
  bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage, bgGradient,
  gradientFrom, gradientVia, gradientTo,
} from './utilities/backgrounds.ts'

// --- Modifiers ---
import {
  hover, focus, active, disabled, focusVisible, focusWithin, firstChild, lastChild,
  visited, checked, indeterminate, default_, required_, valid, invalid,
  inRange, outOfRange, placeholderShown, autofill, readOnly, empty,
  even, odd, firstOfType, lastOfType, onlyChild, onlyOfType, target, open_,
  has_,
} from './modifiers/pseudo.ts'
import { sm, md, lg, xl, _2xl, maxSm, maxMd, maxLg, maxXl, max2xl } from './modifiers/responsive.ts'
import { dark } from './modifiers/colorScheme.ts'
import { motionReduce, motionSafe, print_, portrait, landscape, contrastMore, contrastLess, forcedColors } from './modifiers/media.ts'
import { before, after, placeholder_, file_, marker, selection_, firstLine, firstLetter, backdrop_ } from './modifiers/pseudoElements.ts'
import { ariaChecked, ariaDisabled, ariaExpanded, ariaHidden, ariaPressed, ariaReadonly, ariaRequired, ariaSelected, aria } from './modifiers/aria.ts'
import { data } from './modifiers/data.ts'
import { supports } from './modifiers/supports.ts'
import {
  groupHover, groupFocus, groupActive, groupFocusVisible, groupFocusWithin,
  groupDisabled, groupChecked, groupEmpty, groupFirst, groupLast, groupOdd, groupEven,
  groupOpen, groupVisited, groupHas,
} from './modifiers/group.ts'
import {
  peerHover, peerFocus, peerActive, peerFocusVisible, peerDisabled,
  peerChecked, peerInvalid, peerRequired, peerPlaceholderShown,
  peerFocusWithin, peerEmpty, peerFirst, peerLast, peerOdd, peerEven, peerOpen, peerVisited, peerHas,
} from './modifiers/peer.ts'
import { rtl, ltr } from './modifiers/direction.ts'

// ---------------------------------------------------------------------------
// Lookup tables
// ---------------------------------------------------------------------------

/** Utilities that require arguments — mapped name → function */
const UTILS: Record<string, (...args: any[]) => StyleRule> = {
  // Spacing
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap, gapX, gapY,
  ps, pe, ms, me,
  spaceX, spaceY,
  // Colors
  bg, textColor, borderColor,
  // Typography
  text, font, tracking, leading, textAlign,
  fontFamily,
  lineClamp, listStyleImage, listStylePosition, listStyleType,
  textDecoration, textDecorationColor, textDecorationStyle, textDecorationThickness,
  textUnderlineOffset, textTransform, textOverflow, textWrap, textIndent,
  verticalAlign, whitespace, wordBreak, hyphens,
  content: content_,
  // Layout
  grid, gridCols, gridRows,
  w, h, size, minW, minH, maxW, maxH,
  display, items, justify, self,
  overflow, overflowX, overflowY,
  top, right, bottom, left, inset,
  z,
  aspectRatio, columns, breakAfter, breakBefore, breakInside,
  boxDecorationBreak, boxSizing,
  float: float_, clear: clear_,
  objectFit, objectPosition, overscrollBehavior, overscrollX, overscrollY,
  insetX, insetY, start, end,
  flexBasis,
  grow, shrink, order,
  colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd,
  gridFlow, autoCols, autoRows,
  justifyItems, justifySelf, alignContent, placeContent, placeItems, placeSelf,
  // Borders
  rounded, roundedT, roundedB, roundedL, roundedR,
  roundedTL, roundedTR, roundedBR, roundedBL,
  roundedSS, roundedSE, roundedEE, roundedES,
  border, borderT, borderR, borderB, borderL,
  borderX, borderY, borderS, borderE, borderStyle,
  ring, ringColor, ringOffsetWidth, ringOffsetColor,
  outlineWidth, outlineColor, outlineStyle, outlineOffset, outline,
  divideX, divideY, divideColor, divideStyle,
  // Effects
  shadow, opacity, backdrop, shadowColor, mixBlendMode, bgBlendMode,
  // Interactivity
  cursor, select, pointerEvents,
  accentColor, appearance, caretColor, resize,
  scrollBehavior, scrollMargin, scrollMarginX, scrollMarginY,
  scrollMarginT, scrollMarginR, scrollMarginB, scrollMarginL,
  scrollPadding, scrollPaddingX, scrollPaddingY,
  scrollPaddingT, scrollPaddingR, scrollPaddingB, scrollPaddingL,
  snapAlign, snapStop, snapType, touchAction, willChange,
  // Filters
  blur, brightness, contrast, dropShadow, grayscale, hueRotate, invert, saturate, sepia,
  backdropBlur, backdropBrightness, backdropContrast, backdropGrayscale, backdropHueRotate,
  backdropInvert, backdropOpacity, backdropSaturate, backdropSepia,
  // Transforms
  scale, scaleX, scaleY, rotate, translateX, translateY, skewX, skewY, transformOrigin,
  // Transitions
  transition, duration, ease, delay, animate,
  // Tables
  borderSpacing, borderSpacingX, borderSpacingY, tableLayout, captionSide,
  // SVG
  fill, stroke, strokeWidth,
  // Accessibility
  forcedColorAdjust,
  // Backgrounds
  bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage, bgGradient,
  gradientFrom, gradientVia, gradientTo,
}

/** Value-less utilities (no arguments) — mapped name → thunk or string */
const VALUELESS: Record<string, (() => StyleRule) | string> = {
  // Layout
  flex, flexCol, flexRow, flexWrap, inlineFlex,
  relative, absolute, fixed, sticky,
  static: static_,
  visible, invisible,
  collapse: collapse_,
  isolate, isolationAuto,
  container,
  flexRowReverse, flexColReverse, flexWrapReverse, flexNowrap,
  flex1, flexAuto, flexInitial, flexNone,
  // Typography
  antialiased, subpixelAntialiased,
  italic, notItalic, truncate,
  normalNums, ordinal, slashedZero, liningNums, oldstyleNums,
  proportionalNums, tabularNums, diagonalFractions, stackedFractions,
  // Borders
  ringInset, outlineNone,
  borderCollapse, borderSeparate,
  spaceXReverse, spaceYReverse, divideXReverse, divideYReverse,
  // Transforms
  transformGpu, transformNone,
  // Transitions
  transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone,
  // Accessibility
  srOnly, notSrOnly,
  // Raw class names
  group: 'group',
  peer: 'peer',
}

/** Simple modifiers (no arguments) — mapped name → Modifier */
const MODS: Record<string, Modifier> = {
  // Pseudo-classes
  hover, focus, active, disabled, focusVisible, focusWithin, firstChild, lastChild,
  visited, checked, indeterminate,
  default: default_, required: required_,
  valid, invalid,
  inRange, outOfRange, placeholderShown, autofill, readOnly, empty,
  even, odd, firstOfType, lastOfType, onlyChild, onlyOfType, target,
  open: open_,
  // Responsive
  sm, md, lg, xl, _2xl, maxSm, maxMd, maxLg, maxXl, max2xl,
  // Color scheme
  dark,
  // Media
  motionReduce, motionSafe,
  print: print_,
  portrait, landscape, contrastMore, contrastLess, forcedColors,
  // Pseudo-elements
  before, after,
  placeholder: placeholder_, file: file_,
  marker,
  selection: selection_,
  firstLine, firstLetter,
  backdropEl: backdrop_,
  // ARIA
  ariaChecked, ariaDisabled, ariaExpanded, ariaHidden, ariaPressed, ariaReadonly, ariaRequired, ariaSelected,
  // Group
  groupHover, groupFocus, groupActive, groupFocusVisible, groupFocusWithin,
  groupDisabled, groupChecked, groupEmpty, groupFirst, groupLast, groupOdd, groupEven,
  groupOpen, groupVisited,
  // Peer
  peerHover, peerFocus, peerActive, peerFocusVisible, peerDisabled,
  peerChecked, peerInvalid, peerRequired, peerPlaceholderShown,
  peerFocusWithin, peerEmpty, peerFirst, peerLast, peerOdd, peerEven, peerOpen, peerVisited,
  // Direction
  rtl, ltr,
}

/** Parameterized modifiers (take arguments, return Modifier) */
const PARAM_MODS: Record<string, (...args: any[]) => Modifier> = {
  has: has_,
  aria,
  data,
  supports,
  groupHas,
  peerHas,
}

// ---------------------------------------------------------------------------
// Internal TwChain marker
// ---------------------------------------------------------------------------

const TW_BRAND = Symbol.for('twc.chain')

/** @internal */
export function isTwChain(value: unknown): value is TwChain {
  return value != null && (typeof value === 'object' || typeof value === 'function') && (value as any)[TW_BRAND] === true
}

// ---------------------------------------------------------------------------
// TwChain type
// ---------------------------------------------------------------------------

/**
 * A chainable style builder created by the `tw` proxy.
 *
 * Every property access or method call returns a new `TwChain` with the
 * accumulated styles. When used in a string context (template literal,
 * `className=`, `String()`, etc.) it resolves to a class name string via `cx`.
 *
 * Modifiers can be used as properties for single-utility application
 * (`tw.hover.bg('red-500')`) or as functions accepting another chain
 * for multi-utility application (`tw.hover(tw.bg('red-500').textColor('white'))`).
 */
export interface TwChain {
  /** @internal Accumulated style rules */
  readonly _rules: readonly (StyleRule | string)[]
  /** @internal Brand marker */
  readonly [Symbol.toStringTag]: 'TwChain'
  /** Resolves the chain to a class name string */
  toString(): string
  /** Resolves the chain to a class name string */
  readonly value: string
  /** Resolves the chain to a class name string */
  readonly className: string
  /** Allow the chain to be called as a function (for parameterized modifiers) */
  (...args: any[]): TwChain
  /** Any property access returns TwChain (utilities, modifiers, value-less) */
  [key: string]: any
}

// ---------------------------------------------------------------------------
// Core proxy factory
// ---------------------------------------------------------------------------

function applyMods(rule: StyleRule, mods: Modifier[]): StyleRule {
  if (mods.length === 0) return rule
  return when(...mods)(rule)
}

function applyModsToRules(rules: (StyleRule | string)[], mods: Modifier[]): (StyleRule | string)[] {
  if (mods.length === 0) return rules
  return rules.map(r => typeof r === 'string' ? r : applyMods(r, mods))
}

function createChain(rules: (StyleRule | string)[], pendingMods: Modifier[]): TwChain {
  // The proxy target must be a function so `apply` trap works
  const target = function () {} as any

  return new Proxy(target, {
    get(_target, prop: string | symbol): any {
      // --- Brand / internal ---
      if (prop === TW_BRAND) return true
      if (prop === '_rules') return rules

      // --- String coercion ---
      if (prop === Symbol.toPrimitive || prop === 'toString' || prop === 'valueOf') {
        return () => cx(...rules)
      }
      if (prop === Symbol.toStringTag) return 'TwChain'
      if (prop === 'value' || prop === 'className') {
        return cx(...rules)
      }

      // --- Iterator support (for template literals) ---
      if (prop === Symbol.iterator) return undefined

      // --- Node.js inspect ---
      if (prop === 'inspect' || prop === Symbol.for('nodejs.util.inspect.custom')) {
        return () => `TwChain(${cx(...rules)})`
      }

      const name = prop as string

      // --- Parameterized modifiers (has, aria, data, supports, groupHas, peerHas) ---
      if (name in PARAM_MODS) {
        const paramModFn = PARAM_MODS[name]
        // Return a function that takes args and returns a new chain or modifier proxy
        return (...args: any[]) => {
          // If first arg is a TwChain, apply as grouped modifier
          if (args.length === 1 && isTwChain(args[0])) {
            const childRules = args[0]._rules as (StyleRule | string)[]
            const mod = paramModFn()  // parameterized modifiers need args...
            // Actually parameterized mods need the real args, not ().
            // This case doesn't apply — parameterized modifiers always need a string arg.
            // If someone passes a TwChain as the only arg, they probably mean to use it
            // as a modifier on a chain. But that's not how parameterized modifiers work.
            // Fall through to normal parameterized modifier usage.
          }
          const mod = paramModFn(...args)
          return createChain(rules, [...pendingMods, mod])
        }
      }

      // --- Simple modifiers ---
      if (name in MODS) {
        const mod = MODS[name]
        // Return a proxy that:
        // 1. As property chain: adds modifier to pending (get trap delegates)
        // 2. As function call with TwChain arg: applies modifier to group
        const innerChain = createChain(rules, [...pendingMods, mod])

        return new Proxy(function () {} as any, {
          get(_t, innerProp: string | symbol) {
            return (innerChain as any)[innerProp]
          },
          apply(_t, _this, args) {
            // hover(tw.bg('red').textColor('white')) — group modifier
            if (args.length > 0 && isTwChain(args[0])) {
              const childRules = args[0]._rules as (StyleRule | string)[]
              const modified = applyModsToRules(childRules, [...pendingMods, mod])
              return createChain([...rules, ...modified], [])
            }
            // hover(tw.bg('red'), tw.p(4)) — multiple chain args
            // Collect all TwChain args
            const allChildRules: (StyleRule | string)[] = []
            for (const arg of args) {
              if (isTwChain(arg)) {
                allChildRules.push(...(arg._rules as (StyleRule | string)[]))
              }
            }
            if (allChildRules.length > 0) {
              const modified = applyModsToRules(allChildRules, [...pendingMods, mod])
              return createChain([...rules, ...modified], [])
            }
            // Fallback: shouldn't normally happen
            return innerChain
          },
        })
      }

      // --- Value-less utilities ---
      if (name in VALUELESS) {
        const entry = VALUELESS[name]
        if (typeof entry === 'string') {
          // Raw class name like 'group' or 'peer'
          return createChain([...rules, entry], [])
        }
        // Thunk: call it to get StyleRule
        const rule = entry()
        const modified = applyMods(rule, pendingMods)
        return createChain([...rules, modified], [])
      }

      // --- Utilities with arguments ---
      if (name in UTILS) {
        const utilFn = UTILS[name]
        // Return a callable proxy: tw.bg('red') calls this
        return new Proxy(function () {} as any, {
          get(_t, innerProp: string | symbol) {
            // If someone chains without calling (e.g., tw.shadow.hover)
            // treat as calling with no args (for optional-arg utilities like shadow())
            const rule = utilFn()
            const modified = applyMods(rule, pendingMods)
            return (createChain([...rules, modified], []) as any)[innerProp]
          },
          apply(_t, _this, args) {
            const rule = utilFn(...args)
            const modified = applyMods(rule, pendingMods)
            return createChain([...rules, modified], [])
          },
        })
      }

      // --- Unknown prop: treat as raw class name ---
      return createChain([...rules, name], [])
    },

    apply(_target, _this, args) {
      // tw(...args) — behaves like cx, appending to accumulated rules
      const extra: (StyleRule | string)[] = []
      for (const arg of args) {
        if (isTwChain(arg)) {
          extra.push(...(arg._rules as (StyleRule | string)[]))
        } else {
          extra.push(arg)
        }
      }
      return createChain([...rules, ...extra], pendingMods)
    },
  }) as unknown as TwChain
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Proxy-based chainable style builder.
 *
 * An alternative to importing individual utility and modifier functions.
 * One import gives you access to every utility, modifier, and value-less
 * shorthand through a fluent, chainable API.
 *
 * @example Basic chaining — any order
 * ```ts
 * import { tw } from 'typewritingclass'
 *
 * const card = tw.bg('slate-50').rounded('xl').p(6).shadow('md')
 * ```
 *
 * @example Single-utility modifier (property syntax)
 * ```ts
 * const title = tw.textColor('slate-900').hover.textColor('blue-600')
 * ```
 *
 * @example Multi-utility modifier (function syntax)
 * ```ts
 * const card = tw
 *   .bg('slate-50')
 *   .rounded('xl')
 *   .p(6)
 *   .hover(tw.bg('slate-100').shadow('lg').scale(105))
 *   .focus(tw.ring(2).ringColor('blue-500'))
 * ```
 *
 * @example Value-less utilities
 * ```ts
 * const wrapper = tw.group.flex.flexCol.relative
 * ```
 *
 * @example Group/peer modifiers
 * ```ts
 * const icon = tw.opacity(0.5).groupHover.opacity(1)
 * ```
 *
 * @example Resolves to class string automatically
 * ```ts
 * <div className={tw.p(4).bg('blue-500')} />
 * <div className={`${tw.p(4)} extra-class`} />
 * const classes = tw.p(4).bg('blue-500').toString()
 * const classes = tw.p(4).bg('blue-500').value
 * ```
 */
export const tw: TwChain = createChain([], [])
