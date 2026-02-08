// Core API
export { cx } from './cx.ts'
export { dcx } from './dcx.ts'
export { when } from './when.ts'
export { css } from './css.ts'
export { dynamic, isDynamic } from './dynamic.ts'

// Types
export type { StyleRule, Utility, Modifier, DynamicResult } from './types.ts'
export type { DynamicValue } from './dynamic.ts'

// Theme creation & switching
export { createTheme } from './theme/createTheme.ts'
export type { ThemeConfig, ThemeResult, ThemeVars } from './theme/createTheme.ts'
export { injectTheme, setTheme } from './theme/inject-theme.ts'

// Utilities
export {
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap, gapX, gapY,
  bg, textColor, borderColor,
  text, font, tracking, leading, textAlign,
  flex, flexCol, flexRow, flexWrap, inlineFlex,
  grid, gridCols, gridRows,
  w, h, size, minW, minH, maxW, maxH,
  display, items, justify, self,
  overflow, overflowX, overflowY,
  relative, absolute, fixed, sticky,
  top, right, bottom, left, inset,
  z,
  rounded, roundedT, roundedB, roundedL, roundedR,
  border, borderT, borderR, borderB, borderL, ring,
  shadow, opacity, backdrop,
  cursor, select, pointerEvents,
} from './utilities/index.ts'

// Modifiers
export {
  hover, focus, active, disabled, focusVisible, focusWithin, firstChild, lastChild,
  sm, md, lg, xl, _2xl,
  dark,
} from './modifiers/index.ts'
