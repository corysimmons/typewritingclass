// Core API
export { cx } from './cx.ts'
export { dcx } from './dcx.ts'
export { when } from './when.ts'
export { css } from './css.ts'
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
} from './types.ts'
export type { DynamicValue } from './dynamic.ts'

// Theme creation & switching
export { createTheme } from './theme/createTheme.ts'
export type { ThemeConfig, ThemeResult, ThemeVars } from './theme/createTheme.ts'
export { injectTheme, setTheme } from './theme/inject-theme.ts'

// Utilities
export {
  // Spacing
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap, gapX, gapY,
  ps, pe, ms, me,
  spaceX, spaceY, spaceXReverse, spaceYReverse,
  // Colors
  bg, textColor, borderColor,
  // Typography
  text, font, tracking, leading, textAlign,
  fontFamily, antialiased, subpixelAntialiased,
  italic, notItalic, truncate,
  normalNums, ordinal, slashedZero, liningNums, oldstyleNums,
  proportionalNums, tabularNums, diagonalFractions, stackedFractions,
  lineClamp, listStyleImage, listStylePosition, listStyleType,
  textDecoration, textDecorationColor, textDecorationStyle, textDecorationThickness,
  textUnderlineOffset, textTransform, textOverflow, textWrap, textIndent,
  verticalAlign, whitespace, wordBreak, hyphens, content_,
  // Layout
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
  // Borders
  rounded, roundedT, roundedB, roundedL, roundedR,
  roundedTL, roundedTR, roundedBR, roundedBL,
  roundedSS, roundedSE, roundedEE, roundedES,
  border, borderT, borderR, borderB, borderL,
  borderX, borderY, borderS, borderE, borderStyle,
  ring, ringColor, ringOffsetWidth, ringOffsetColor, ringInset,
  outlineWidth, outlineColor, outlineStyle, outlineOffset, outline, outlineNone,
  divideX, divideY, divideColor, divideStyle, divideXReverse, divideYReverse,
  // Effects
  shadow, opacity, backdrop,
  shadowColor, mixBlendMode, bgBlendMode,
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
  // Backgrounds
  bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage, bgGradient,
  gradientFrom, gradientVia, gradientTo,
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
