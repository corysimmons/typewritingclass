// ---------------------------------------------------------------------------
// Token maps — mirrors the UTIL_TOKENS registry from the library's tokens.ts.
// Provides lookup functions for the devtools hover provider to resolve
// chain-centric token access like `tw.bg.blue500` into utility arguments.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Color tokens: camelCase prop -> utility arg string  (e.g. blue500 -> 'blue-500')
// ---------------------------------------------------------------------------

const colorScaleNames = [
  'slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime',
  'green', 'emerald', 'teal', 'cyan', 'sky',
  'blue', 'indigo', 'violet', 'purple', 'fuchsia',
  'pink', 'rose',
] as const;

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

export const colorTokens: Record<string, string> = {};
for (const name of colorScaleNames) {
  for (const shade of shades) {
    colorTokens[`${name}${shade}`] = `${name}-${shade}`;
  }
}
colorTokens['white'] = 'white';
colorTokens['black'] = 'black';
colorTokens['transparent'] = 'transparent';
colorTokens['current'] = 'current';

// ---------------------------------------------------------------------------
// Radius tokens
// ---------------------------------------------------------------------------

export const radiusTokens: Record<string, string> = {
  sm: 'sm', md: 'md', lg: 'lg', xl: 'xl',
  _2xl: '2xl', _3xl: '3xl', full: 'full', none: 'none',
};

// ---------------------------------------------------------------------------
// Shadow tokens
// ---------------------------------------------------------------------------

export const shadowTokens: Record<string, string> = {
  sm: 'sm', md: 'md', lg: 'lg', xl: 'xl',
  _2xl: '2xl', inner: 'inner', none: 'none',
};

// ---------------------------------------------------------------------------
// Text size tokens
// ---------------------------------------------------------------------------

export const textSizeTokens: Record<string, string> = {
  xs: 'xs', sm: 'sm', base: 'base',
  lg: 'lg', xl: 'xl',
  _2xl: '2xl', _3xl: '3xl', _4xl: '4xl',
  _5xl: '5xl', _6xl: '6xl', _7xl: '7xl',
  _8xl: '8xl', _9xl: '9xl',
};

// ---------------------------------------------------------------------------
// Font weight tokens
// ---------------------------------------------------------------------------

export const fontWeightTokens: Record<string, string> = {
  thin: 'thin', extralight: 'extralight', light: 'light',
  normal: 'normal', medium: 'medium', semibold: 'semibold',
  bold: 'bold', extrabold: 'extrabold', black: 'black_',
};

// ---------------------------------------------------------------------------
// Tracking tokens (letter-spacing)
// ---------------------------------------------------------------------------

export const trackingTokens: Record<string, string> = {
  tighter: 'tighter', tight: 'tight', normal: 'normal',
  wide: 'wide', wider: 'wider', widest: 'widest',
};

// ---------------------------------------------------------------------------
// Leading tokens (line-height)
// ---------------------------------------------------------------------------

export const leadingTokens: Record<string, string> = {
  none: 'none', tight: 'tight', snug: 'snug', normal: 'normal',
  relaxed: 'relaxed', loose: 'loose',
  _3: '3', _4: '4', _5: '5', _6: '6',
  _7: '7', _8: '8', _9: '9', _10: '10',
};

// ---------------------------------------------------------------------------
// Font family tokens
// ---------------------------------------------------------------------------

export const fontFamilyTokens: Record<string, string> = {
  sans: 'sans', serif: 'serif', mono: 'mono',
};

// ---------------------------------------------------------------------------
// Layout enum tokens
// ---------------------------------------------------------------------------

export const alignItemsTokens: Record<string, string> = {
  center: 'center', start: 'flex-start', end: 'flex-end',
  baseline: 'baseline', stretch: 'stretch',
};

export const justifyTokens: Record<string, string> = {
  center: 'center', start: 'flex-start', end: 'flex-end',
  between: 'space-between', around: 'space-around', evenly: 'space-evenly',
  stretch: 'stretch',
};

export const displayTokens: Record<string, string> = {
  block: 'block', inline: 'inline', inlineBlock: 'inline-block',
  flex: 'flex', inlineFlex: 'inline-flex', grid: 'grid',
  inlineGrid: 'inline-grid', none: 'none', contents: 'contents',
  table: 'table', flowRoot: 'flow-root',
};

export const overflowTokens: Record<string, string> = {
  auto: 'auto', hidden: 'hidden', visible: 'visible',
  scroll: 'scroll', clip: 'clip',
};

export const cursorTokens: Record<string, string> = {
  auto: 'auto', default: 'default', pointer: 'pointer',
  wait: 'wait', text: 'text', move: 'move', help: 'help',
  notAllowed: 'not-allowed', none: 'none', progress: 'progress',
  cell: 'cell', crosshair: 'crosshair', grab: 'grab', grabbing: 'grabbing',
  colResize: 'col-resize', rowResize: 'row-resize',
  noDrop: 'no-drop', zoomIn: 'zoom-in', zoomOut: 'zoom-out',
};

export const textAlignTokens: Record<string, string> = {
  left: 'left', center: 'center', right: 'right',
  justify: 'justify', start: 'start', end: 'end',
};

export const objectFitTokens: Record<string, string> = {
  contain: 'contain', cover: 'cover', fill: 'fill',
  none: 'none', scaleDown: 'scale-down',
};

export const selfTokens: Record<string, string> = {
  auto: 'auto', start: 'flex-start', end: 'flex-end',
  center: 'center', stretch: 'stretch', baseline: 'baseline',
};

export const textWrapTokens: Record<string, string> = {
  wrap: 'wrap', nowrap: 'nowrap', balance: 'balance', pretty: 'pretty',
};

export const textOverflowTokens: Record<string, string> = {
  ellipsis: 'ellipsis', clip: 'clip',
};

export const textTransformTokens: Record<string, string> = {
  uppercase: 'uppercase', lowercase: 'lowercase',
  capitalize: 'capitalize', none: 'none',
};

export const gradientDirectionTokens: Record<string, string> = {
  toRight: 'to right', toLeft: 'to left',
  toTop: 'to top', toBottom: 'to bottom',
  toTopRight: 'to top right', toTopLeft: 'to top left',
  toBottomRight: 'to bottom right', toBottomLeft: 'to bottom left',
};

// ---------------------------------------------------------------------------
// Token config registry — maps utility name -> token map
// ---------------------------------------------------------------------------

interface TokenConfig {
  tokens: Record<string, string>;
  supportsOpacity?: boolean;
}

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
};

// ---------------------------------------------------------------------------
// Utility category sets
// ---------------------------------------------------------------------------

export const COLOR_UTILITIES = new Set([
  'bg', 'textColor', 'borderColor', 'shadowColor', 'ringColor',
  'outlineColor', 'accentColor', 'caretColor', 'divideColor',
  'textDecorationColor', 'gradientFrom', 'gradientVia', 'gradientTo',
]);

export const RADIUS_UTILITIES = new Set([
  'rounded', 'roundedT', 'roundedB', 'roundedL', 'roundedR',
  'roundedTL', 'roundedTR', 'roundedBR', 'roundedBL',
  'roundedSS', 'roundedSE', 'roundedEE', 'roundedES',
]);

export const TOKEN_AWARE_UTILITIES = new Set(Object.keys(UTIL_TOKENS));

// ---------------------------------------------------------------------------
// Modifier set (mirrors MODS from tw.ts)
// ---------------------------------------------------------------------------

export const MODIFIER_NAMES = new Set([
  // Pseudo-classes
  'hover', 'focus', 'active', 'disabled', 'focusVisible', 'focusWithin',
  'firstChild', 'lastChild', 'visited', 'checked', 'indeterminate',
  'default', 'required', 'valid', 'invalid',
  'inRange', 'outOfRange', 'placeholderShown', 'autofill', 'readOnly', 'empty',
  'even', 'odd', 'firstOfType', 'lastOfType', 'onlyChild', 'onlyOfType', 'target', 'open',
  // Responsive
  'sm', 'md', 'lg', 'xl', '_2xl', 'maxSm', 'maxMd', 'maxLg', 'maxXl', 'max2xl',
  // Color scheme
  'dark',
  // Media
  'motionReduce', 'motionSafe', 'print', 'portrait', 'landscape',
  'contrastMore', 'contrastLess', 'forcedColors',
  // Pseudo-elements
  'before', 'after', 'placeholder', 'file', 'marker', 'selection',
  'firstLine', 'firstLetter', 'backdropEl',
  // ARIA
  'ariaChecked', 'ariaDisabled', 'ariaExpanded', 'ariaHidden',
  'ariaPressed', 'ariaReadonly', 'ariaRequired', 'ariaSelected',
  // Group
  'groupHover', 'groupFocus', 'groupActive', 'groupFocusVisible', 'groupFocusWithin',
  'groupDisabled', 'groupChecked', 'groupEmpty', 'groupFirst', 'groupLast',
  'groupOdd', 'groupEven', 'groupOpen', 'groupVisited',
  // Peer
  'peerHover', 'peerFocus', 'peerActive', 'peerFocusVisible', 'peerDisabled',
  'peerChecked', 'peerInvalid', 'peerRequired', 'peerPlaceholderShown',
  'peerFocusWithin', 'peerEmpty', 'peerFirst', 'peerLast',
  'peerOdd', 'peerEven', 'peerOpen', 'peerVisited',
  // Direction
  'rtl', 'ltr',
]);

// ---------------------------------------------------------------------------
// Valueless utility set (mirrors VALUELESS from tw.ts)
// ---------------------------------------------------------------------------

export const VALUELESS_UTILITIES = new Set([
  // Layout
  'flex', 'flexCol', 'flexRow', 'flexWrap', 'inlineFlex',
  'relative', 'absolute', 'fixed', 'sticky',
  'static', 'visible', 'invisible', 'collapse',
  'isolate', 'isolationAuto', 'container',
  'flexRowReverse', 'flexColReverse', 'flexWrapReverse', 'flexNowrap',
  'flex1', 'flexAuto', 'flexInitial', 'flexNone',
  // Typography
  'antialiased', 'subpixelAntialiased',
  'italic', 'notItalic', 'truncate',
  'normalNums', 'ordinal', 'slashedZero', 'liningNums', 'oldstyleNums',
  'proportionalNums', 'tabularNums', 'diagonalFractions', 'stackedFractions',
  // Borders
  'ringInset', 'outlineNone',
  'borderCollapse', 'borderSeparate',
  'spaceXReverse', 'spaceYReverse', 'divideXReverse', 'divideYReverse',
  // Transforms
  'transformGpu', 'transformNone',
  // Transitions
  'transitionAll', 'transitionColors', 'transitionOpacity',
  'transitionShadow', 'transitionTransform', 'transitionNone',
  // Accessibility
  'srOnly', 'notSrOnly',
  // Raw class names
  'group', 'peer',
]);

// ---------------------------------------------------------------------------
// Arg-taking utility set (mirrors UTILS from tw.ts)
// ---------------------------------------------------------------------------

export const ARG_UTILITIES = new Set([
  // Spacing
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'gap', 'gapX', 'gapY',
  'ps', 'pe', 'ms', 'me',
  'spaceX', 'spaceY',
  // Colors
  'bg', 'textColor', 'borderColor',
  // Typography
  'text', 'font', 'tracking', 'leading', 'textAlign',
  'fontFamily',
  'lineClamp', 'listStyleImage', 'listStylePosition', 'listStyleType',
  'textDecoration', 'textDecorationColor', 'textDecorationStyle', 'textDecorationThickness',
  'textUnderlineOffset', 'textTransform', 'textOverflow', 'textWrap', 'textIndent',
  'verticalAlign', 'whitespace', 'wordBreak', 'hyphens', 'content',
  // Layout
  'grid', 'gridCols', 'gridRows',
  'w', 'h', 'size', 'minW', 'minH', 'maxW', 'maxH',
  'display', 'items', 'justify', 'self',
  'overflow', 'overflowX', 'overflowY',
  'top', 'right', 'bottom', 'left', 'inset',
  'z',
  'aspectRatio', 'columns', 'breakAfter', 'breakBefore', 'breakInside',
  'boxDecorationBreak', 'boxSizing',
  'float', 'clear',
  'objectFit', 'objectPosition', 'overscrollBehavior', 'overscrollX', 'overscrollY',
  'insetX', 'insetY', 'start', 'end',
  'flexBasis',
  'grow', 'shrink', 'order',
  'colSpan', 'colStart', 'colEnd', 'rowSpan', 'rowStart', 'rowEnd',
  'gridFlow', 'autoCols', 'autoRows',
  'justifyItems', 'justifySelf', 'alignContent', 'placeContent', 'placeItems', 'placeSelf',
  // Borders
  'rounded', 'roundedT', 'roundedB', 'roundedL', 'roundedR',
  'roundedTL', 'roundedTR', 'roundedBR', 'roundedBL',
  'roundedSS', 'roundedSE', 'roundedEE', 'roundedES',
  'border', 'borderT', 'borderR', 'borderB', 'borderL',
  'borderX', 'borderY', 'borderS', 'borderE', 'borderStyle',
  'ring', 'ringColor', 'ringOffsetWidth', 'ringOffsetColor',
  'outlineWidth', 'outlineColor', 'outlineStyle', 'outlineOffset', 'outline',
  'divideX', 'divideY', 'divideColor', 'divideStyle',
  // Effects
  'shadow', 'opacity', 'backdrop', 'shadowColor', 'mixBlendMode', 'bgBlendMode',
  // Interactivity
  'cursor', 'select', 'pointerEvents',
  'accentColor', 'appearance', 'caretColor', 'resize',
  'scrollBehavior', 'scrollMargin', 'scrollMarginX', 'scrollMarginY',
  'scrollMarginT', 'scrollMarginR', 'scrollMarginB', 'scrollMarginL',
  'scrollPadding', 'scrollPaddingX', 'scrollPaddingY',
  'scrollPaddingT', 'scrollPaddingR', 'scrollPaddingB', 'scrollPaddingL',
  'snapAlign', 'snapStop', 'snapType', 'touchAction', 'willChange',
  // Filters
  'blur', 'brightness', 'contrast', 'dropShadow', 'grayscale', 'hueRotate', 'invert', 'saturate', 'sepia',
  'backdropBlur', 'backdropBrightness', 'backdropContrast', 'backdropGrayscale', 'backdropHueRotate',
  'backdropInvert', 'backdropOpacity', 'backdropSaturate', 'backdropSepia',
  // Transforms
  'scale', 'scaleX', 'scaleY', 'rotate', 'translateX', 'translateY', 'skewX', 'skewY', 'transformOrigin',
  // Transitions
  'transition', 'duration', 'ease', 'delay', 'animate',
  // Tables
  'borderSpacing', 'borderSpacingX', 'borderSpacingY', 'tableLayout', 'captionSide',
  // SVG
  'fill', 'stroke', 'strokeWidth',
  // Accessibility
  'forcedColorAdjust',
  // Backgrounds
  'bgAttachment', 'bgClip', 'bgOrigin', 'bgPosition', 'bgRepeat', 'bgSize', 'bgImage', 'bgGradient',
  'gradientFrom', 'gradientVia', 'gradientTo',
]);

// ---------------------------------------------------------------------------
// Lookup functions
// ---------------------------------------------------------------------------

/** Check whether a utility name supports token-aware property access. */
export function isTokenAwareUtility(name: string): boolean {
  return TOKEN_AWARE_UTILITIES.has(name);
}

/** Check whether `tokenName` is a valid token for `utilityName`. */
export function isTokenForUtility(utilityName: string, tokenName: string): boolean {
  const config = UTIL_TOKENS[utilityName];
  if (!config) return false;
  return tokenName in config.tokens;
}

/** Resolve a token to its argument string for a given utility. */
export function resolveTokenArg(utilityName: string, tokenName: string): string | undefined {
  const config = UTIL_TOKENS[utilityName];
  if (!config) return undefined;
  const value = config.tokens[tokenName];
  return value !== undefined ? String(value) : undefined;
}

/** Check whether a utility name is a color utility. */
export function isColorUtility(name: string): boolean {
  return COLOR_UTILITIES.has(name);
}

// ---------------------------------------------------------------------------
// Color hex resolution (for color underlines)
// ---------------------------------------------------------------------------

const colorScales: Record<string, Record<number, string>> = {
  slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
  gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
  zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
  neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
  stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
  red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
  amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
  yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
  lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
  green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
  teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
  cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
  sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
  blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
  indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
  violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
  purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
  fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
  pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
  rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
};

const namedColorHex: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
};

/**
 * Resolve a color token name (e.g. 'blue500') to its hex value.
 * Returns undefined for non-hex colors (transparent, current) or unknown tokens.
 */
export function resolveColorTokenToHex(tokenName: string): string | undefined {
  // Look up in colorTokens to get the dash-separated form
  const dashForm = colorTokens[tokenName];
  if (!dashForm) return undefined;

  // Named colors
  if (namedColorHex[dashForm]) return namedColorHex[dashForm];

  // Parse dash-separated form: 'blue-500' -> colorScales['blue'][500]
  const dashMatch = dashForm.match(/^(\w+)-(\d+)$/);
  if (dashMatch) {
    const [, name, shade] = dashMatch;
    const scale = colorScales[name];
    if (scale) {
      return scale[Number(shade)];
    }
  }

  return undefined;
}
