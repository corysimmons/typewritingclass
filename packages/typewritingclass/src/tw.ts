import type { StyleRule, Modifier } from './types.ts'
import { cx, _cxCore } from './cx.ts'
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
// TwChain type helpers
// ---------------------------------------------------------------------------

/** @internal A utility that accepts arguments and returns a chain. Also chainable without calling (for optional-arg utilities like `shadow`). */
/**
 * A TwChain that is also assignable to `string`, so it can be used directly
 * in `className={tw.p(4)}` without wrapping in a template literal.
 * At runtime, the Proxy's `toString()` is called when string coercion occurs.
 */
export type TwChainString = TwChain & string

type TwUtility = ((...args: any[]) => TwChainString) & TwChainString

/** @internal A modifier usable as a property (`tw.hover.bg(…)`) or function (`tw.hover(tw.bg(…))`). */
type TwModifier = TwChainString & ((...chains: (TwChain | string)[]) => TwChainString)

/** @internal A parameterized modifier that requires arguments before it becomes a modifier. */
type TwParamModifier = (...args: any[]) => TwChainString

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
 *
 * **Keep in sync with the UTILS, VALUELESS, MODS, and PARAM_MODS lookup tables.**
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
  /** Allow the chain to be called as a function */
  (...args: any[]): TwChainString

  // ---- Utilities (take arguments) — keep in sync with UTILS ----

  // Spacing
  readonly p: TwUtility
  readonly px: TwUtility
  readonly py: TwUtility
  readonly pt: TwUtility
  readonly pr: TwUtility
  readonly pb: TwUtility
  readonly pl: TwUtility
  readonly m: TwUtility
  readonly mx: TwUtility
  readonly my: TwUtility
  readonly mt: TwUtility
  readonly mr: TwUtility
  readonly mb: TwUtility
  readonly ml: TwUtility
  readonly gap: TwUtility
  readonly gapX: TwUtility
  readonly gapY: TwUtility
  readonly ps: TwUtility
  readonly pe: TwUtility
  readonly ms: TwUtility
  readonly me: TwUtility
  readonly spaceX: TwUtility
  readonly spaceY: TwUtility
  // Colors
  readonly bg: TwUtility
  readonly textColor: TwUtility
  readonly borderColor: TwUtility
  // Typography
  readonly text: TwUtility
  readonly font: TwUtility
  readonly tracking: TwUtility
  readonly leading: TwUtility
  readonly textAlign: TwUtility
  readonly fontFamily: TwUtility
  readonly lineClamp: TwUtility
  readonly listStyleImage: TwUtility
  readonly listStylePosition: TwUtility
  readonly listStyleType: TwUtility
  readonly textDecoration: TwUtility
  readonly textDecorationColor: TwUtility
  readonly textDecorationStyle: TwUtility
  readonly textDecorationThickness: TwUtility
  readonly textUnderlineOffset: TwUtility
  readonly textTransform: TwUtility
  readonly textOverflow: TwUtility
  readonly textWrap: TwUtility
  readonly textIndent: TwUtility
  readonly verticalAlign: TwUtility
  readonly whitespace: TwUtility
  readonly wordBreak: TwUtility
  readonly hyphens: TwUtility
  readonly content: TwUtility
  // Layout
  readonly grid: TwUtility
  readonly gridCols: TwUtility
  readonly gridRows: TwUtility
  readonly w: TwUtility
  readonly h: TwUtility
  readonly size: TwUtility
  readonly minW: TwUtility
  readonly minH: TwUtility
  readonly maxW: TwUtility
  readonly maxH: TwUtility
  readonly display: TwUtility
  readonly items: TwUtility
  readonly justify: TwUtility
  readonly self: TwUtility
  readonly overflow: TwUtility
  readonly overflowX: TwUtility
  readonly overflowY: TwUtility
  readonly top: TwUtility
  readonly right: TwUtility
  readonly bottom: TwUtility
  readonly left: TwUtility
  readonly inset: TwUtility
  readonly z: TwUtility
  readonly aspectRatio: TwUtility
  readonly columns: TwUtility
  readonly breakAfter: TwUtility
  readonly breakBefore: TwUtility
  readonly breakInside: TwUtility
  readonly boxDecorationBreak: TwUtility
  readonly boxSizing: TwUtility
  readonly float: TwUtility
  readonly clear: TwUtility
  readonly objectFit: TwUtility
  readonly objectPosition: TwUtility
  readonly overscrollBehavior: TwUtility
  readonly overscrollX: TwUtility
  readonly overscrollY: TwUtility
  readonly insetX: TwUtility
  readonly insetY: TwUtility
  readonly start: TwUtility
  readonly end: TwUtility
  readonly flexBasis: TwUtility
  readonly grow: TwUtility
  readonly shrink: TwUtility
  readonly order: TwUtility
  readonly colSpan: TwUtility
  readonly colStart: TwUtility
  readonly colEnd: TwUtility
  readonly rowSpan: TwUtility
  readonly rowStart: TwUtility
  readonly rowEnd: TwUtility
  readonly gridFlow: TwUtility
  readonly autoCols: TwUtility
  readonly autoRows: TwUtility
  readonly justifyItems: TwUtility
  readonly justifySelf: TwUtility
  readonly alignContent: TwUtility
  readonly placeContent: TwUtility
  readonly placeItems: TwUtility
  readonly placeSelf: TwUtility
  // Borders
  readonly rounded: TwUtility
  readonly roundedT: TwUtility
  readonly roundedB: TwUtility
  readonly roundedL: TwUtility
  readonly roundedR: TwUtility
  readonly roundedTL: TwUtility
  readonly roundedTR: TwUtility
  readonly roundedBR: TwUtility
  readonly roundedBL: TwUtility
  readonly roundedSS: TwUtility
  readonly roundedSE: TwUtility
  readonly roundedEE: TwUtility
  readonly roundedES: TwUtility
  readonly border: TwUtility
  readonly borderT: TwUtility
  readonly borderR: TwUtility
  readonly borderB: TwUtility
  readonly borderL: TwUtility
  readonly borderX: TwUtility
  readonly borderY: TwUtility
  readonly borderS: TwUtility
  readonly borderE: TwUtility
  readonly borderStyle: TwUtility
  readonly ring: TwUtility
  readonly ringColor: TwUtility
  readonly ringOffsetWidth: TwUtility
  readonly ringOffsetColor: TwUtility
  readonly outlineWidth: TwUtility
  readonly outlineColor: TwUtility
  readonly outlineStyle: TwUtility
  readonly outlineOffset: TwUtility
  readonly outline: TwUtility
  readonly divideX: TwUtility
  readonly divideY: TwUtility
  readonly divideColor: TwUtility
  readonly divideStyle: TwUtility
  // Effects
  readonly shadow: TwUtility
  readonly opacity: TwUtility
  readonly backdrop: TwUtility
  readonly shadowColor: TwUtility
  readonly mixBlendMode: TwUtility
  readonly bgBlendMode: TwUtility
  // Interactivity
  readonly cursor: TwUtility
  readonly select: TwUtility
  readonly pointerEvents: TwUtility
  readonly accentColor: TwUtility
  readonly appearance: TwUtility
  readonly caretColor: TwUtility
  readonly resize: TwUtility
  readonly scrollBehavior: TwUtility
  readonly scrollMargin: TwUtility
  readonly scrollMarginX: TwUtility
  readonly scrollMarginY: TwUtility
  readonly scrollMarginT: TwUtility
  readonly scrollMarginR: TwUtility
  readonly scrollMarginB: TwUtility
  readonly scrollMarginL: TwUtility
  readonly scrollPadding: TwUtility
  readonly scrollPaddingX: TwUtility
  readonly scrollPaddingY: TwUtility
  readonly scrollPaddingT: TwUtility
  readonly scrollPaddingR: TwUtility
  readonly scrollPaddingB: TwUtility
  readonly scrollPaddingL: TwUtility
  readonly snapAlign: TwUtility
  readonly snapStop: TwUtility
  readonly snapType: TwUtility
  readonly touchAction: TwUtility
  readonly willChange: TwUtility
  // Filters
  readonly blur: TwUtility
  readonly brightness: TwUtility
  readonly contrast: TwUtility
  readonly dropShadow: TwUtility
  readonly grayscale: TwUtility
  readonly hueRotate: TwUtility
  readonly invert: TwUtility
  readonly saturate: TwUtility
  readonly sepia: TwUtility
  readonly backdropBlur: TwUtility
  readonly backdropBrightness: TwUtility
  readonly backdropContrast: TwUtility
  readonly backdropGrayscale: TwUtility
  readonly backdropHueRotate: TwUtility
  readonly backdropInvert: TwUtility
  readonly backdropOpacity: TwUtility
  readonly backdropSaturate: TwUtility
  readonly backdropSepia: TwUtility
  // Transforms
  readonly scale: TwUtility
  readonly scaleX: TwUtility
  readonly scaleY: TwUtility
  readonly rotate: TwUtility
  readonly translateX: TwUtility
  readonly translateY: TwUtility
  readonly skewX: TwUtility
  readonly skewY: TwUtility
  readonly transformOrigin: TwUtility
  // Transitions
  readonly transition: TwUtility
  readonly duration: TwUtility
  readonly ease: TwUtility
  readonly delay: TwUtility
  readonly animate: TwUtility
  // Tables
  readonly borderSpacing: TwUtility
  readonly borderSpacingX: TwUtility
  readonly borderSpacingY: TwUtility
  readonly tableLayout: TwUtility
  readonly captionSide: TwUtility
  // SVG
  readonly fill: TwUtility
  readonly stroke: TwUtility
  readonly strokeWidth: TwUtility
  // Accessibility
  readonly forcedColorAdjust: TwUtility
  // Backgrounds
  readonly bgAttachment: TwUtility
  readonly bgClip: TwUtility
  readonly bgOrigin: TwUtility
  readonly bgPosition: TwUtility
  readonly bgRepeat: TwUtility
  readonly bgSize: TwUtility
  readonly bgImage: TwUtility
  readonly bgGradient: TwUtility
  readonly gradientFrom: TwUtility
  readonly gradientVia: TwUtility
  readonly gradientTo: TwUtility

  // ---- Value-less utilities (no arguments) — keep in sync with VALUELESS ----

  // Layout
  readonly flex: TwChainString
  readonly flexCol: TwChainString
  readonly flexRow: TwChainString
  readonly flexWrap: TwChainString
  readonly inlineFlex: TwChainString
  readonly relative: TwChainString
  readonly absolute: TwChainString
  readonly fixed: TwChainString
  readonly sticky: TwChainString
  readonly static: TwChainString
  readonly visible: TwChainString
  readonly invisible: TwChainString
  readonly collapse: TwChainString
  readonly isolate: TwChainString
  readonly isolationAuto: TwChainString
  readonly container: TwChainString
  readonly flexRowReverse: TwChainString
  readonly flexColReverse: TwChainString
  readonly flexWrapReverse: TwChainString
  readonly flexNowrap: TwChainString
  readonly flex1: TwChainString
  readonly flexAuto: TwChainString
  readonly flexInitial: TwChainString
  readonly flexNone: TwChainString
  // Typography
  readonly antialiased: TwChainString
  readonly subpixelAntialiased: TwChainString
  readonly italic: TwChainString
  readonly notItalic: TwChainString
  readonly truncate: TwChainString
  readonly normalNums: TwChainString
  readonly ordinal: TwChainString
  readonly slashedZero: TwChainString
  readonly liningNums: TwChainString
  readonly oldstyleNums: TwChainString
  readonly proportionalNums: TwChainString
  readonly tabularNums: TwChainString
  readonly diagonalFractions: TwChainString
  readonly stackedFractions: TwChainString
  // Borders
  readonly ringInset: TwChainString
  readonly outlineNone: TwChainString
  readonly borderCollapse: TwChainString
  readonly borderSeparate: TwChainString
  readonly spaceXReverse: TwChainString
  readonly spaceYReverse: TwChainString
  readonly divideXReverse: TwChainString
  readonly divideYReverse: TwChainString
  // Transforms
  readonly transformGpu: TwChainString
  readonly transformNone: TwChainString
  // Transitions
  readonly transitionAll: TwChainString
  readonly transitionColors: TwChainString
  readonly transitionOpacity: TwChainString
  readonly transitionShadow: TwChainString
  readonly transitionTransform: TwChainString
  readonly transitionNone: TwChainString
  // Accessibility
  readonly srOnly: TwChainString
  readonly notSrOnly: TwChainString
  // Raw class names
  readonly group: TwChainString
  readonly peer: TwChainString

  // ---- Simple modifiers (no arguments) — keep in sync with MODS ----

  // Pseudo-classes
  readonly hover: TwModifier
  readonly focus: TwModifier
  readonly active: TwModifier
  readonly disabled: TwModifier
  readonly focusVisible: TwModifier
  readonly focusWithin: TwModifier
  readonly firstChild: TwModifier
  readonly lastChild: TwModifier
  readonly visited: TwModifier
  readonly checked: TwModifier
  readonly indeterminate: TwModifier
  readonly default: TwModifier
  readonly required: TwModifier
  readonly valid: TwModifier
  readonly invalid: TwModifier
  readonly inRange: TwModifier
  readonly outOfRange: TwModifier
  readonly placeholderShown: TwModifier
  readonly autofill: TwModifier
  readonly readOnly: TwModifier
  readonly empty: TwModifier
  readonly even: TwModifier
  readonly odd: TwModifier
  readonly firstOfType: TwModifier
  readonly lastOfType: TwModifier
  readonly onlyChild: TwModifier
  readonly onlyOfType: TwModifier
  readonly target: TwModifier
  readonly open: TwModifier
  // Responsive
  readonly sm: TwModifier
  readonly md: TwModifier
  readonly lg: TwModifier
  readonly xl: TwModifier
  readonly _2xl: TwModifier
  readonly maxSm: TwModifier
  readonly maxMd: TwModifier
  readonly maxLg: TwModifier
  readonly maxXl: TwModifier
  readonly max2xl: TwModifier
  // Color scheme
  readonly dark: TwModifier
  // Media
  readonly motionReduce: TwModifier
  readonly motionSafe: TwModifier
  readonly print: TwModifier
  readonly portrait: TwModifier
  readonly landscape: TwModifier
  readonly contrastMore: TwModifier
  readonly contrastLess: TwModifier
  readonly forcedColors: TwModifier
  // Pseudo-elements
  readonly before: TwModifier
  readonly after: TwModifier
  readonly placeholder: TwModifier
  readonly file: TwModifier
  readonly marker: TwModifier
  readonly selection: TwModifier
  readonly firstLine: TwModifier
  readonly firstLetter: TwModifier
  readonly backdropEl: TwModifier
  // ARIA
  readonly ariaChecked: TwModifier
  readonly ariaDisabled: TwModifier
  readonly ariaExpanded: TwModifier
  readonly ariaHidden: TwModifier
  readonly ariaPressed: TwModifier
  readonly ariaReadonly: TwModifier
  readonly ariaRequired: TwModifier
  readonly ariaSelected: TwModifier
  // Group
  readonly groupHover: TwModifier
  readonly groupFocus: TwModifier
  readonly groupActive: TwModifier
  readonly groupFocusVisible: TwModifier
  readonly groupFocusWithin: TwModifier
  readonly groupDisabled: TwModifier
  readonly groupChecked: TwModifier
  readonly groupEmpty: TwModifier
  readonly groupFirst: TwModifier
  readonly groupLast: TwModifier
  readonly groupOdd: TwModifier
  readonly groupEven: TwModifier
  readonly groupOpen: TwModifier
  readonly groupVisited: TwModifier
  // Peer
  readonly peerHover: TwModifier
  readonly peerFocus: TwModifier
  readonly peerActive: TwModifier
  readonly peerFocusVisible: TwModifier
  readonly peerDisabled: TwModifier
  readonly peerChecked: TwModifier
  readonly peerInvalid: TwModifier
  readonly peerRequired: TwModifier
  readonly peerPlaceholderShown: TwModifier
  readonly peerFocusWithin: TwModifier
  readonly peerEmpty: TwModifier
  readonly peerFirst: TwModifier
  readonly peerLast: TwModifier
  readonly peerOdd: TwModifier
  readonly peerEven: TwModifier
  readonly peerOpen: TwModifier
  readonly peerVisited: TwModifier
  // Direction
  readonly rtl: TwModifier
  readonly ltr: TwModifier

  // ---- Parameterized modifiers — keep in sync with PARAM_MODS ----

  readonly has: TwParamModifier
  readonly aria: TwParamModifier
  readonly data: TwParamModifier
  readonly supports: TwParamModifier
  readonly groupHas: TwParamModifier
  readonly peerHas: TwParamModifier

  /** Fallback: unknown properties are treated as raw class names */
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
      if (prop === Symbol.toPrimitive || prop === 'toString' || prop === 'valueOf' || prop === 'toJSON') {
        return () => _cxCore(rules)
      }
      if (prop === Symbol.toStringTag) return 'TwChain'
      if (prop === 'value' || prop === 'className') {
        return _cxCore(rules)
      }

      // --- Iterator support (for template literals) ---
      if (prop === Symbol.iterator) return undefined

      // --- Node.js inspect ---
      if (prop === 'inspect' || prop === Symbol.for('nodejs.util.inspect.custom')) {
        return () => `TwChain(${_cxCore(rules)})`
      }

      const name = prop as string

      // --- Parameterized modifiers (has, aria, data, supports, groupHas, peerHas) ---
      if (name in PARAM_MODS) {
        const paramModFn = PARAM_MODS[name]
        // Return a function that takes args and returns a new chain or modifier proxy
        return (...args: any[]) => {
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
export const tw: TwChainString = createChain([], []) as TwChainString
