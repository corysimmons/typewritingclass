// Core API
export { cx } from './cx.ts'
export { dcx } from './dcx.ts'
export { when } from './when.ts'
export { dynamic, isDynamic } from './dynamic.ts'
export { layer } from './layer.ts'
export { generateCSS } from './registry.ts'
export { tw } from './tw.ts'

// Types
export type { StyleRule, Utility, Modifier, DynamicResult } from './types.ts'
export type { TwChain } from './tw.ts'
export type {
  Brand, CSSColor, CSSLength, CSSShadow, CSSFontWeight,
  ColorInput, SpacingInput, SizeInput, RadiusInput, ShadowInput,
  ColorTokenKey, RadiusTokens, ShadowTokens, TextSizeTokens, FontWeightTokens,
  TrackingTokens, LeadingTokens, FontFamilyTokens, AlignItemsTokens, JustifyTokens,
  DisplayTokens, OverflowTokens, CursorTokens, TextAlignTokens, ObjectFitTokens,
  SelfTokens, TextWrapTokens, TextOverflowTokens, TextTransformTokens,
} from './types.ts'
export type { DynamicValue } from './dynamic.ts'

// Plugins
export { googleFonts } from './plugins/googleFonts.ts'

// Theme creation & switching
export { createTheme } from './theme/createTheme.ts'
export type { ThemeConfig, ThemeResult, ThemeVars } from './theme/createTheme.ts'
export { injectTheme, setTheme } from './theme/inject-theme.ts'

// ---------------------------------------------------------------------------
// Utilities — token-aware (wrapped with standalone proxy)
// ---------------------------------------------------------------------------

import {
  // Color utilities
  bg as _bg, textColor as _textColor, borderColor as _borderColor,
  shadowColor as _shadowColor, ringColor as _ringColor, outlineColor as _outlineColor,
  accentColor as _accentColor, caretColor as _caretColor,
  divideColor as _divideColor, textDecorationColor as _textDecorationColor,
  gradientFrom as _gradientFrom, gradientVia as _gradientVia, gradientTo as _gradientTo,
  // Radius utilities
  rounded as _rounded, roundedT as _roundedT, roundedB as _roundedB,
  roundedL as _roundedL, roundedR as _roundedR,
  roundedTL as _roundedTL, roundedTR as _roundedTR, roundedBR as _roundedBR, roundedBL as _roundedBL,
  roundedSS as _roundedSS, roundedSE as _roundedSE, roundedEE as _roundedEE, roundedES as _roundedES,
  // Shadow
  shadow as _shadow,
  // Typography
  text as _text, font as _font, tracking as _tracking, leading as _leading,
  fontFamily as _fontFamily, textAlign as _textAlign,
  textTransform as _textTransform, textOverflow as _textOverflow, textWrap as _textWrap,
  // Layout enums
  display as _display, items as _items, justify as _justify, self as _self,
  overflow as _overflow, overflowX as _overflowX, overflowY as _overflowY,
  cursor as _cursor, objectFit as _objectFit,
} from './utilities/index.ts'

import { createStandaloneProxy } from './standalone.ts'
import { UTIL_TOKENS } from './tokens.ts'

// Color utilities (with opacity support)
export const bg = createStandaloneProxy(_bg, UTIL_TOKENS.bg)
export const textColor = createStandaloneProxy(_textColor, UTIL_TOKENS.textColor)
export const borderColor = createStandaloneProxy(_borderColor, UTIL_TOKENS.borderColor)
export const shadowColor = createStandaloneProxy(_shadowColor, UTIL_TOKENS.shadowColor)
export const ringColor = createStandaloneProxy(_ringColor, UTIL_TOKENS.ringColor)
export const outlineColor = createStandaloneProxy(_outlineColor, UTIL_TOKENS.outlineColor)
export const accentColor = createStandaloneProxy(_accentColor, UTIL_TOKENS.accentColor)
export const caretColor = createStandaloneProxy(_caretColor, UTIL_TOKENS.caretColor)
export const divideColor = createStandaloneProxy(_divideColor, UTIL_TOKENS.divideColor)
export const textDecorationColor = createStandaloneProxy(_textDecorationColor, UTIL_TOKENS.textDecorationColor)
// Gradient color utilities (no opacity)
export const gradientFrom = createStandaloneProxy(_gradientFrom, UTIL_TOKENS.gradientFrom)
export const gradientVia = createStandaloneProxy(_gradientVia, UTIL_TOKENS.gradientVia)
export const gradientTo = createStandaloneProxy(_gradientTo, UTIL_TOKENS.gradientTo)
// Radius utilities
export const rounded = createStandaloneProxy(_rounded, UTIL_TOKENS.rounded)
export const roundedT = createStandaloneProxy(_roundedT, UTIL_TOKENS.roundedT)
export const roundedB = createStandaloneProxy(_roundedB, UTIL_TOKENS.roundedB)
export const roundedL = createStandaloneProxy(_roundedL, UTIL_TOKENS.roundedL)
export const roundedR = createStandaloneProxy(_roundedR, UTIL_TOKENS.roundedR)
export const roundedTL = createStandaloneProxy(_roundedTL, UTIL_TOKENS.roundedTL)
export const roundedTR = createStandaloneProxy(_roundedTR, UTIL_TOKENS.roundedTR)
export const roundedBR = createStandaloneProxy(_roundedBR, UTIL_TOKENS.roundedBR)
export const roundedBL = createStandaloneProxy(_roundedBL, UTIL_TOKENS.roundedBL)
export const roundedSS = createStandaloneProxy(_roundedSS, UTIL_TOKENS.roundedSS)
export const roundedSE = createStandaloneProxy(_roundedSE, UTIL_TOKENS.roundedSE)
export const roundedEE = createStandaloneProxy(_roundedEE, UTIL_TOKENS.roundedEE)
export const roundedES = createStandaloneProxy(_roundedES, UTIL_TOKENS.roundedES)
// Shadow
export const shadow = createStandaloneProxy(_shadow, UTIL_TOKENS.shadow)
// Typography
export const text = createStandaloneProxy(_text, UTIL_TOKENS.text)
export const font = createStandaloneProxy(_font, UTIL_TOKENS.font)
export const tracking = createStandaloneProxy(_tracking, UTIL_TOKENS.tracking)
export const leading = createStandaloneProxy(_leading, UTIL_TOKENS.leading)
export const fontFamily = createStandaloneProxy(_fontFamily, UTIL_TOKENS.fontFamily)
export const textAlign = createStandaloneProxy(_textAlign, UTIL_TOKENS.textAlign)
export const textTransform = createStandaloneProxy(_textTransform, UTIL_TOKENS.textTransform)
export const textOverflow = createStandaloneProxy(_textOverflow, UTIL_TOKENS.textOverflow)
export const textWrap = createStandaloneProxy(_textWrap, UTIL_TOKENS.textWrap)
// Layout enums
export const display = createStandaloneProxy(_display, UTIL_TOKENS.display)
export const items = createStandaloneProxy(_items, UTIL_TOKENS.items)
export const justify = createStandaloneProxy(_justify, UTIL_TOKENS.justify)
export const self = createStandaloneProxy(_self, UTIL_TOKENS.self)
export const overflow = createStandaloneProxy(_overflow, UTIL_TOKENS.overflow)
export const overflowX = createStandaloneProxy(_overflowX, UTIL_TOKENS.overflowX)
export const overflowY = createStandaloneProxy(_overflowY, UTIL_TOKENS.overflowY)
export const cursor = createStandaloneProxy(_cursor, UTIL_TOKENS.cursor)
export const objectFit = createStandaloneProxy(_objectFit, UTIL_TOKENS.objectFit)

// ---------------------------------------------------------------------------
// Utilities — direct exports (no token wrapping needed)
// ---------------------------------------------------------------------------

export {
  // Spacing
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap, gapX, gapY,
  ps, pe, ms, me,
  spaceX, spaceY, spaceXReverse, spaceYReverse,
  // Typography (non-token)
  antialiased, subpixelAntialiased,
  italic, notItalic, truncate,
  normalNums, ordinal, slashedZero, liningNums, oldstyleNums,
  proportionalNums, tabularNums, diagonalFractions, stackedFractions,
  lineClamp, listStyleImage, listStylePosition, listStyleType,
  textDecoration, textDecorationStyle, textDecorationThickness,
  textUnderlineOffset, textIndent,
  verticalAlign, whitespace, wordBreak, hyphens, content_,
  // Layout (non-token)
  flex, flexCol, flexRow, flexWrap, inlineFlex,
  grid, gridCols, gridRows,
  w, h, size, minW, minH, maxW, maxH,
  relative, absolute, fixed, sticky,
  top, right, bottom, left, inset,
  z,
  aspectRatio, columns, breakAfter, breakBefore, breakInside,
  boxDecorationBreak, boxSizing, float_, clear_, isolate, isolationAuto,
  objectPosition, overscrollBehavior, overscrollX, overscrollY,
  static_, insetX, insetY, start, end,
  visible, invisible, collapse_,
  flexBasis, flexRowReverse, flexColReverse, flexWrapReverse, flexNowrap,
  flex1, flexAuto, flexInitial, flexNone,
  grow, shrink, order,
  colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd,
  gridFlow, autoCols, autoRows,
  justifyItems, justifySelf, alignContent, placeContent, placeItems, placeSelf,
  container,
  // Borders (non-token)
  border, borderT, borderR, borderB, borderL,
  borderX, borderY, borderS, borderE, borderStyle,
  ring, ringOffsetWidth, ringOffsetColor, ringInset,
  outlineWidth, outlineStyle, outlineOffset, outline, outlineNone,
  divideX, divideY, divideStyle, divideXReverse, divideYReverse,
  // Effects (non-token)
  opacity, backdrop, mixBlendMode, bgBlendMode,
  // Interactivity (non-token)
  select, pointerEvents,
  appearance, resize,
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
  scale, scaleX, scaleY, rotate, translateX, translateY, skewX, skewY, transformOrigin, transformGpu, transformNone,
  // Transitions
  transition, transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone,
  duration, ease, delay, animate,
  // Tables
  borderCollapse, borderSeparate, borderSpacing, borderSpacingX, borderSpacingY, tableLayout, captionSide,
  // SVG
  fill, stroke, strokeWidth,
  // Accessibility
  srOnly, notSrOnly, forcedColorAdjust,
  // Backgrounds (non-token)
  bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage, bgGradient,
} from './utilities/index.ts'

// Modifiers
export {
  // Pseudo-classes
  hover, focus, active, disabled, focusVisible, focusWithin, firstChild, lastChild,
  visited, checked, indeterminate, default_, required_, valid, invalid,
  inRange, outOfRange, placeholderShown, autofill, readOnly, empty,
  even, odd, firstOfType, lastOfType, onlyChild, onlyOfType, target, open_,
  has_,
  // Responsive
  sm, md, lg, xl, _2xl,
  maxSm, maxMd, maxLg, maxXl, max2xl,
  // Color scheme
  dark,
  // Media
  motionReduce, motionSafe, print_, portrait, landscape, contrastMore, contrastLess, forcedColors,
  // Pseudo-elements
  before, after, placeholder_, file_, marker, selection_, firstLine, firstLetter, backdrop_,
  // ARIA
  ariaChecked, ariaDisabled, ariaExpanded, ariaHidden, ariaPressed, ariaReadonly, ariaRequired, ariaSelected, aria,
  // Data
  data,
  // Supports
  supports,
  // Group
  groupHover, groupFocus, groupActive, groupFocusVisible, groupFocusWithin,
  groupDisabled, groupChecked, groupEmpty, groupFirst, groupLast, groupOdd, groupEven,
  groupOpen, groupVisited, groupHas,
  // Peer
  peerHover, peerFocus, peerActive, peerFocusVisible, peerDisabled,
  peerChecked, peerInvalid, peerRequired, peerPlaceholderShown,
  peerFocusWithin, peerEmpty, peerFirst, peerLast, peerOdd, peerEven, peerOpen, peerVisited, peerHas,
  // Direction
  rtl, ltr,
} from './modifiers/index.ts'
