export interface TextSize {
  fontSize: string
  lineHeight: string
}

export const xs: TextSize = { fontSize: '0.75rem', lineHeight: '1rem' }
export const sm: TextSize = { fontSize: '0.875rem', lineHeight: '1.25rem' }
export const base: TextSize = { fontSize: '1rem', lineHeight: '1.5rem' }
export const lg: TextSize = { fontSize: '1.125rem', lineHeight: '1.75rem' }
export const xl: TextSize = { fontSize: '1.25rem', lineHeight: '1.75rem' }
export const _2xl: TextSize = { fontSize: '1.5rem', lineHeight: '2rem' }
export const _3xl: TextSize = { fontSize: '1.875rem', lineHeight: '2.25rem' }
export const _4xl: TextSize = { fontSize: '2.25rem', lineHeight: '2.5rem' }
export const _5xl: TextSize = { fontSize: '3rem', lineHeight: '1' }
export const _6xl: TextSize = { fontSize: '3.75rem', lineHeight: '1' }
export const _7xl: TextSize = { fontSize: '4.5rem', lineHeight: '1' }
export const _8xl: TextSize = { fontSize: '6rem', lineHeight: '1' }
export const _9xl: TextSize = { fontSize: '8rem', lineHeight: '1' }

export const thin = '100'
export const extralight = '200'
export const light = '300'
export const normal = '400'
export const medium = '500'
export const semibold = '600'
export const bold = '700'
export const extrabold = '800'
export const black_ = '900'

// ---------------------------------------------------------------------------
// Font families (Tailwind v3 defaults)
// ---------------------------------------------------------------------------

export const fontFamilies = {
  sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
} as const

// ---------------------------------------------------------------------------
// Letter spacing / tracking (Tailwind v3 defaults)
// ---------------------------------------------------------------------------

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// ---------------------------------------------------------------------------
// Line height / leading (Tailwind v3 defaults)
// ---------------------------------------------------------------------------

export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  '3': '.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
} as const
