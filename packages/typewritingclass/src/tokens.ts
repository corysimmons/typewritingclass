import type { TextSize } from './theme/typography.ts'
import {
  // Text sizes (aliased to avoid bundler conflicts with responsive modifier names)
  xs as _txXs, sm as _txSm, base as _txBase, lg as _txLg, xl as _txXl,
  _2xl as _tx2xl, _3xl as _tx3xl, _4xl as _tx4xl,
  _5xl as _tx5xl, _6xl as _tx6xl, _7xl as _tx7xl,
  _8xl as _tx8xl, _9xl as _tx9xl,
  // Font weights
  thin as _fwThin, extralight as _fwExtralight, light as _fwLight,
  normal as _fwNormal, medium as _fwMedium, semibold as _fwSemibold,
  bold as _fwBold, extrabold as _fwExtrabold, black_ as _fwBlack,
} from './theme/typography.ts'

// ---------------------------------------------------------------------------
// Color tokens: camelCase prop → utility arg string
// ---------------------------------------------------------------------------

const colorScaleNames = [
  'slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime',
  'green', 'emerald', 'teal', 'cyan', 'sky',
  'blue', 'indigo', 'violet', 'purple', 'fuchsia',
  'pink', 'rose',
] as const

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const

export const colorTokens: Record<string, string> = {}
for (const name of colorScaleNames) {
  for (const shade of shades) {
    colorTokens[`${name}${shade}`] = `${name}-${shade}`
  }
}
colorTokens['white'] = 'white'
colorTokens['black'] = 'black'
colorTokens['transparent'] = 'transparent'
colorTokens['current'] = 'current'

// ---------------------------------------------------------------------------
// Radius tokens
// ---------------------------------------------------------------------------

export const radiusTokens: Record<string, string> = {
  sm: 'sm', md: 'md', lg: 'lg', xl: 'xl',
  _2xl: '2xl', _3xl: '3xl', full: 'full', none: 'none',
}

// ---------------------------------------------------------------------------
// Shadow tokens
// ---------------------------------------------------------------------------

export const shadowTokens: Record<string, string> = {
  sm: 'sm', md: 'md', lg: 'lg', xl: 'xl',
  _2xl: '2xl', inner: 'inner', none: 'none',
}

// ---------------------------------------------------------------------------
// Text size tokens: camelCase prop → TextSize object
// ---------------------------------------------------------------------------

export const textSizeTokens: Record<string, TextSize> = {
  xs: _txXs, sm: _txSm, base: _txBase,
  lg: _txLg, xl: _txXl,
  _2xl: _tx2xl, _3xl: _tx3xl, _4xl: _tx4xl,
  _5xl: _tx5xl, _6xl: _tx6xl, _7xl: _tx7xl,
  _8xl: _tx8xl, _9xl: _tx9xl,
}

// ---------------------------------------------------------------------------
// Font weight tokens
// ---------------------------------------------------------------------------

export const fontWeightTokens: Record<string, string> = {
  thin: _fwThin,
  extralight: _fwExtralight,
  light: _fwLight,
  normal: _fwNormal,
  medium: _fwMedium,
  semibold: _fwSemibold,
  bold: _fwBold,
  extrabold: _fwExtrabold,
  black: _fwBlack,
}

// ---------------------------------------------------------------------------
// Tracking tokens (letter-spacing)
// ---------------------------------------------------------------------------

export const trackingTokens: Record<string, string> = {
  tighter: 'tighter', tight: 'tight', normal: 'normal',
  wide: 'wide', wider: 'wider', widest: 'widest',
}

// ---------------------------------------------------------------------------
// Leading tokens (line-height)
// ---------------------------------------------------------------------------

export const leadingTokens: Record<string, string> = {
  none: 'none', tight: 'tight', snug: 'snug', normal: 'normal',
  relaxed: 'relaxed', loose: 'loose',
  _3: '3', _4: '4', _5: '5', _6: '6',
  _7: '7', _8: '8', _9: '9', _10: '10',
}

// ---------------------------------------------------------------------------
// Font family tokens
// ---------------------------------------------------------------------------

export const fontFamilyTokens: Record<string, string> = {
  sans: 'sans', serif: 'serif', mono: 'mono',
}

// ---------------------------------------------------------------------------
// Layout enum tokens
// ---------------------------------------------------------------------------

export const alignItemsTokens: Record<string, string> = {
  center: 'center', start: 'flex-start', end: 'flex-end',
  baseline: 'baseline', stretch: 'stretch',
}

export const justifyTokens: Record<string, string> = {
  center: 'center', start: 'flex-start', end: 'flex-end',
  between: 'space-between', around: 'space-around', evenly: 'space-evenly',
  stretch: 'stretch',
}

export const displayTokens: Record<string, string> = {
  block: 'block', inline: 'inline', inlineBlock: 'inline-block',
  flex: 'flex', inlineFlex: 'inline-flex', grid: 'grid',
  inlineGrid: 'inline-grid', none: 'none', contents: 'contents',
  table: 'table', flowRoot: 'flow-root',
}

export const overflowTokens: Record<string, string> = {
  auto: 'auto', hidden: 'hidden', visible: 'visible',
  scroll: 'scroll', clip: 'clip',
}

export const cursorTokens: Record<string, string> = {
  auto: 'auto', default: 'default', pointer: 'pointer',
  wait: 'wait', text: 'text', move: 'move', help: 'help',
  notAllowed: 'not-allowed', none: 'none', progress: 'progress',
  cell: 'cell', crosshair: 'crosshair', grab: 'grab', grabbing: 'grabbing',
  colResize: 'col-resize', rowResize: 'row-resize',
  noDrop: 'no-drop', zoomIn: 'zoom-in', zoomOut: 'zoom-out',
}

export const textAlignTokens: Record<string, string> = {
  left: 'left', center: 'center', right: 'right',
  justify: 'justify', start: 'start', end: 'end',
}

export const objectFitTokens: Record<string, string> = {
  contain: 'contain', cover: 'cover', fill: 'fill',
  none: 'none', scaleDown: 'scale-down',
}

export const selfTokens: Record<string, string> = {
  auto: 'auto', start: 'flex-start', end: 'flex-end',
  center: 'center', stretch: 'stretch', baseline: 'baseline',
}

export const textWrapTokens: Record<string, string> = {
  wrap: 'wrap', nowrap: 'nowrap', balance: 'balance', pretty: 'pretty',
}

export const textOverflowTokens: Record<string, string> = {
  ellipsis: 'ellipsis', clip: 'clip',
}

export const textTransformTokens: Record<string, string> = {
  uppercase: 'uppercase', lowercase: 'lowercase',
  capitalize: 'capitalize', none: 'none',
}

export const gradientDirectionTokens: Record<string, string> = {
  toRight: 'to right',
  toLeft: 'to left',
  toTop: 'to top',
  toBottom: 'to bottom',
  toTopRight: 'to top right',
  toTopLeft: 'to top left',
  toBottomRight: 'to bottom right',
  toBottomLeft: 'to bottom left',
}

// ---------------------------------------------------------------------------
// Token configuration type + registry
// ---------------------------------------------------------------------------

export interface TokenConfig {
  tokens: Record<string, any>
  supportsOpacity?: boolean
}

/** Maps utility names (matching UTILS keys in tw.ts) to their token config. */
export const UTIL_TOKENS: Record<string, TokenConfig> = {
  // Color utilities
  bg: { tokens: colorTokens, supportsOpacity: true },
  textColor: { tokens: colorTokens, supportsOpacity: true },
  borderColor: { tokens: colorTokens, supportsOpacity: true },
  shadowColor: { tokens: colorTokens, supportsOpacity: true },
  ringColor: { tokens: colorTokens, supportsOpacity: true },
  outlineColor: { tokens: colorTokens, supportsOpacity: true },
  accentColor: { tokens: colorTokens, supportsOpacity: true },
  caretColor: { tokens: colorTokens, supportsOpacity: true },
  divideColor: { tokens: colorTokens, supportsOpacity: true },
  textDecorationColor: { tokens: colorTokens, supportsOpacity: true },
  gradientFrom: { tokens: colorTokens },
  gradientVia: { tokens: colorTokens },
  gradientTo: { tokens: colorTokens },
  // Radius utilities
  rounded: { tokens: radiusTokens },
  roundedT: { tokens: radiusTokens },
  roundedB: { tokens: radiusTokens },
  roundedL: { tokens: radiusTokens },
  roundedR: { tokens: radiusTokens },
  roundedTL: { tokens: radiusTokens },
  roundedTR: { tokens: radiusTokens },
  roundedBR: { tokens: radiusTokens },
  roundedBL: { tokens: radiusTokens },
  roundedSS: { tokens: radiusTokens },
  roundedSE: { tokens: radiusTokens },
  roundedEE: { tokens: radiusTokens },
  roundedES: { tokens: radiusTokens },
  // Shadow
  shadow: { tokens: shadowTokens },
  // Typography
  text: { tokens: textSizeTokens },
  font: { tokens: fontWeightTokens },
  tracking: { tokens: trackingTokens },
  leading: { tokens: leadingTokens },
  fontFamily: { tokens: fontFamilyTokens },
  // Layout enums
  items: { tokens: alignItemsTokens },
  justify: { tokens: justifyTokens },
  display: { tokens: displayTokens },
  overflow: { tokens: overflowTokens },
  overflowX: { tokens: overflowTokens },
  overflowY: { tokens: overflowTokens },
  cursor: { tokens: cursorTokens },
  textAlign: { tokens: textAlignTokens },
  objectFit: { tokens: objectFitTokens },
  self: { tokens: selfTokens },
  textWrap: { tokens: textWrapTokens },
  textOverflow: { tokens: textOverflowTokens },
  textTransform: { tokens: textTransformTokens },
  bgGradient: { tokens: gradientDirectionTokens },
}
