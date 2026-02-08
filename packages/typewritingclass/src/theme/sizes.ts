export const full = '100%'
export const screen = '100vw'
export const screenH = '100vh'
export const min = 'min-content'
export const max = 'max-content'
export const fit = 'fit-content'
export const auto = 'auto'

// ---------------------------------------------------------------------------
// Max-width scale (Tailwind v3 defaults)
// ---------------------------------------------------------------------------

export const maxWidths = {
  none: 'none',
  0: '0rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
  prose: '65ch',
  screenSm: '640px',
  screenMd: '768px',
  screenLg: '1024px',
  screenXl: '1280px',
  screen2xl: '1536px',
} as const
