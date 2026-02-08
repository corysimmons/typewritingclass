import {
  cx, when, css,
  p, px, py, pt, pb, mt, mb, mx, ml, gap, gapX, gapY,
  bg, textColor, borderColor,
  text, font, tracking, leading, textAlign,
  flex, flexCol, flexRow, flexWrap, inlineFlex, grid, gridCols,
  w, h, size, minW, minH, maxW, maxH,
  display, items, justify, self,
  overflow, overflowX, overflowY,
  relative, absolute, fixed, sticky,
  top, right, bottom, left, inset, z,
  rounded, roundedT, roundedB, border, borderB, borderL, ring,
  shadow, opacity, backdrop,
  cursor, select, pointerEvents,
  hover, focus, active, disabled, focusVisible, dark,
  sm, md, lg, xl,
  blur, brightness, grayscale, saturate,
  scale, rotate, translateX, translateY, transformOrigin, skewX,
  transition, transitionAll, transitionColors, duration, ease, delay,
  bgGradient, gradientFrom, gradientVia, gradientTo,
  before, after,
  groupHover,
  checked, focusWithin, firstChild, lastChild, even, odd, placeholderShown,
  maxSm, maxMd,
  motionReduce, motionSafe,
  pl,
} from 'typewritingclass'
import {
  slate, gray, zinc, stone, red, orange, amber, yellow, lime,
  green, emerald, teal, cyan, sky, blue, indigo, violet, purple,
  fuchsia, pink, rose, white, black, transparent,
} from 'typewritingclass/theme/colors'
import * as typo from 'typewritingclass/theme/typography'
import { xs, sm as smText, base, lg as lgText, xl as xlText, _2xl, _3xl, _4xl, _5xl, _6xl } from 'typewritingclass/theme/typography'
import { sm as smShadow, md as mdShadow, lg as lgShadow, xl as xlShadow, _2xl as _2xlShadow } from 'typewritingclass/theme/shadows'
import { sm as smRadius, md as mdRadius, lg as lgRadius, xl as xlRadius, _2xl as _2xlRadius, _3xl as _3xlRadius, full as fullRadius } from 'typewritingclass/theme/borders'

const app = document.getElementById('app')!

// ─── Globals ───────────────────────────────────────────────
const mono = "'DM Mono', monospace"
const serif = "'Instrument Serif', Georgia, serif"
const sans = "'Geist', system-ui, sans-serif"

const cream = '#faf9f6'
const inkLight = '#e8e4de'

// ─── Root ──────────────────────────────────────────────────
app.className = cx(
  flex(), flexCol(),
  minH('100vh'),
  css({ 'font-family': sans, background: cream, '-webkit-font-smoothing': 'antialiased' }),
  textColor(slate[800]),
  when(dark)(css({ background: slate[950] }), textColor(slate[200])),
)

// ─── Hero ──────────────────────────────────────────────────
const hero = document.createElement('section')
hero.className = cx(
  relative(),
  flex(), flexCol(),
  items('center'),
  justify('center'),
  px(6),
  pt(24),
  pb(20),
  when(md)(pt(32), pb(28)),
  overflow('hidden'),
)

// Decorative grid lines in background
const gridBg = document.createElement('div')
gridBg.className = cx(
  absolute(),
  inset(0),
  opacity(0.04),
  css({
    'background-image': `
      linear-gradient(${slate[400]} 1px, transparent 1px),
      linear-gradient(90deg, ${slate[400]} 1px, transparent 1px)
    `,
    'background-size': '60px 60px',
  }),
  pointerEvents('none'),
)
hero.appendChild(gridBg)

// Logo
const logo = document.createElement('img')
logo.src = '/logo.svg'
logo.alt = 'Typewriting Class'
logo.className = cx(w('280px'), mb(10), relative())
hero.appendChild(logo)

// Accent line
const accentLine = document.createElement('div')
accentLine.className = cx(
  w(16), h('3px'), mb(8),
  css({ background: indigo[500] }),
  relative(),
)
hero.appendChild(accentLine)

// Title
const title = document.createElement('h1')
title.className = cx(
  css({ 'font-family': serif, 'font-style': 'italic', 'letter-spacing': '-0.03em' }),
  text(_6xl),
  when(md)(css({ 'font-size': '5rem', 'line-height': '1' })),
  textColor(slate[900]),
  textAlign('center'),
  relative(),
  when(dark)(textColor(white)),
)
title.textContent = 'Typewriting Class'
hero.appendChild(title)

// Subtitle
const subtitle = document.createElement('p')
subtitle.className = cx(
  mt(6),
  text(xlText),
  textColor(slate[500]),
  textAlign('center'),
  maxW('36rem'),
  leading('1.7'),
  css({ 'font-family': mono, 'font-weight': '300' }),
  when(dark)(textColor(slate[400])),
)
subtitle.textContent = 'CSS-in-TypeScript. Static extraction. Zero runtime.'
hero.appendChild(subtitle)

// CTA row
const ctaRow = document.createElement('div')
ctaRow.className = cx(flex(), gap(4), mt(10), items('center'))

const primaryCta = document.createElement('a')
primaryCta.href = '#showcase'
primaryCta.textContent = 'See it in action'
primaryCta.className = cx(
  px(7), py(3),
  bg(slate[900]),
  textColor(white),
  css({ 'font-family': mono, 'font-size': '0.875rem', 'text-decoration': 'none', 'transition': 'all 200ms ease' }),
  rounded(xlRadius),
  cursor('pointer'),
  when(hover)(bg(indigo[600])),
  when(dark)(bg(white), textColor(slate[900])),
  when(dark, hover)(bg(indigo[400])),
)

const ghostCta = document.createElement('a')
ghostCta.href = '#code'
ghostCta.textContent = 'View code'
ghostCta.className = cx(
  px(7), py(3),
  bg(transparent),
  textColor(slate[600]),
  border('1px'), borderColor(slate[300]),
  css({ 'font-family': mono, 'font-size': '0.875rem', 'text-decoration': 'none', 'transition': 'all 200ms ease' }),
  rounded(xlRadius),
  cursor('pointer'),
  when(hover)(bg(slate[100]), borderColor(slate[400])),
  when(dark)(textColor(slate[400]), borderColor(slate[600])),
  when(dark, hover)(bg(slate[800])),
)

ctaRow.append(primaryCta, ghostCta)
hero.appendChild(ctaRow)
app.appendChild(hero)

// ─── Divider ───────────────────────────────────────────────
function createDivider() {
  const div = document.createElement('div')
  div.className = cx(
    w('100%'), maxW('72rem'),
    css({ margin: '0 auto', height: '1px', background: inkLight }),
    when(dark)(css({ background: slate[800] })),
  )
  return div
}

// ─── Showcase ──────────────────────────────────────────────
const showcase = document.createElement('section')
showcase.id = 'showcase'
showcase.className = cx(
  flex(), flexCol(), gap(20),
  px(6), py(20),
  maxW('72rem'),
  css({ margin: '0 auto' }),
  w('100%'),
)
app.appendChild(createDivider())
app.appendChild(showcase)

// ─── Section helper ────────────────────────────────────────
function section(label: string, heading: string, children: HTMLElement[]) {
  const el = document.createElement('div')
  el.className = cx(flex(), flexCol(), gap(8))

  const labelEl = document.createElement('span')
  labelEl.className = cx(
    css({ 'font-family': mono, 'font-size': '0.75rem', 'text-transform': 'uppercase', 'letter-spacing': '0.1em' }),
    textColor(indigo[500]),
    font(typo.medium),
  )
  labelEl.textContent = label

  const headingEl = document.createElement('h2')
  headingEl.className = cx(
    css({ 'font-family': serif, 'font-style': 'italic', 'letter-spacing': '-0.02em' }),
    text(_3xl),
    textColor(slate[900]),
    when(dark)(textColor(white)),
  )
  headingEl.textContent = heading

  const headerGroup = document.createElement('div')
  headerGroup.className = cx(flex(), flexCol(), gap(2))
  headerGroup.append(labelEl, headingEl)

  el.appendChild(headerGroup)
  children.forEach(c => el.appendChild(c))
  return el
}

// ─── 1. Buttons ────────────────────────────────────────────
function btn(label: string, ...styles: Parameters<typeof cx>) {
  const b = document.createElement('button')
  b.textContent = label
  b.className = cx(
    px(5), py(2.5),
    rounded(lgRadius),
    font(typo.medium),
    css({ 'font-family': sans, 'font-size': '0.875rem', 'transition': 'all 150ms ease', border: 'none' }),
    cursor('pointer'),
    ...styles,
  )
  return b
}

const btnRow = document.createElement('div')
btnRow.className = cx(flex(), flexWrap(), gap(3), items('center'))

btnRow.append(
  btn('Primary',
    bg(slate[900]), textColor(white),
    when(hover)(bg(indigo[600])),
    when(active)(bg(indigo[700])),
    when(focus)(ring('2px', indigo[400])),
    when(dark)(bg(white), textColor(slate[900])),
    when(dark, hover)(bg(indigo[300])),
  ),
  btn('Secondary',
    bg(slate[100]), textColor(slate[700]),
    when(hover)(bg(slate[200])),
    when(active)(bg(slate[300])),
    when(dark)(bg(slate[800]), textColor(slate[300])),
    when(dark, hover)(bg(slate[700])),
  ),
  btn('Accent',
    bg(indigo[600]), textColor(white),
    when(hover)(bg(indigo[500])),
    when(active)(bg(indigo[700])),
    when(focus)(ring('2px', indigo[300])),
  ),
  btn('Ghost',
    bg(transparent), textColor(slate[600]),
    css({ border: `1px solid ${slate[300]}` }),
    when(hover)(bg(slate[50]), borderColor(slate[400])),
    when(dark)(textColor(slate[400]), css({ 'border-color': slate[600] })),
    when(dark, hover)(bg(slate[800])),
  ),
  btn('Danger',
    bg(red[600]), textColor(white),
    when(hover)(bg(red[500])),
    when(active)(bg(red[700])),
    when(focus)(ring('2px', red[300])),
  ),
  (() => {
    const b = btn('Disabled',
      bg(slate[100]), textColor(slate[400]),
      when(disabled)(opacity(0.5), cursor('not-allowed')),
    )
    b.disabled = true
    return b
  })(),
)

showcase.appendChild(section('01', 'Buttons', [btnRow]))

// ─── 2. Cards ──────────────────────────────────────────────
const cardGrid = document.createElement('div')
cardGrid.className = cx(
  grid(1), gap(6),
  when(md)(gridCols(3)),
)

const cardData = [
  { icon: '/', title: 'Static Extraction', desc: 'The Rust compiler parses your cx() calls at build time. No runtime overhead for static styles.' },
  { icon: '{}', title: 'Type-Safe Tokens', desc: 'Theme values are TypeScript objects. Autocomplete guides every color, spacing, and typography choice.' },
  { icon: '~', title: 'Composable API', desc: 'Stack utilities with cx(), apply modifiers with when(). Later values override earlier — predictable cascade.' },
]

for (const { icon, title: t, desc } of cardData) {
  const card = document.createElement('div')
  card.className = cx(
    flex(), flexCol(), gap(4), p(6),
    bg(white),
    border('1px'), borderColor(slate[200]),
    rounded(_2xlRadius),
    css({ transition: 'all 250ms ease' }),
    when(hover)(shadow(lgShadow), css({ transform: 'translateY(-2px)', 'border-color': indigo[200] })),
    when(dark)(bg(slate[900]), borderColor(slate[700])),
    when(dark, hover)(css({ 'border-color': indigo[500] })),
  )

  const iconEl = document.createElement('div')
  iconEl.className = cx(
    flex(), items('center'), justify('center'),
    size(10),
    rounded(lgRadius),
    bg(slate[100]),
    textColor(indigo[600]),
    css({ 'font-family': mono, 'font-weight': '500', 'font-size': '1.125rem' }),
    when(dark)(bg(slate[800]),  textColor(indigo[400])),
  )
  iconEl.textContent = icon

  const titleEl = document.createElement('h3')
  titleEl.className = cx(
    text(lgText), font(typo.semibold),
    textColor(slate[900]),
    when(dark)(textColor(white)),
  )
  titleEl.textContent = t

  const descEl = document.createElement('p')
  descEl.className = cx(
    text(smText), leading('1.6'),
    textColor(slate[500]),
    when(dark)(textColor(slate[400])),
  )
  descEl.textContent = desc

  card.append(iconEl, titleEl, descEl)
  cardGrid.appendChild(card)
}

showcase.appendChild(section('02', 'Cards', [cardGrid]))

// ─── 3. Typography ─────────────────────────────────────────
const typoDemo = document.createElement('div')
typoDemo.className = cx(
  flex(), flexCol(), gap(6), p(8),
  bg(white), border('1px'), borderColor(slate[200]),
  rounded(_2xlRadius),
  when(dark)(bg(slate[900]), borderColor(slate[700])),
)

const typoSamples: [string, typeof _5xl, string][] = [
  ['Display', _5xl, serif],
  ['Heading', _3xl, sans],
  ['Subhead', xlText, sans],
  ['Body', base, sans],
  ['Caption', xs, mono],
]

for (const [label, sz, family] of typoSamples) {
  const row = document.createElement('div')
  row.className = cx(flex(), items('baseline'), gap(4))

  const labelEl = document.createElement('span')
  labelEl.className = cx(
    w(20),
    css({ 'font-family': mono, 'font-size': '0.7rem', 'text-transform': 'uppercase', 'letter-spacing': '0.08em', 'flex-shrink': '0' }),
    textColor(slate[400]),
  )
  labelEl.textContent = label

  const textEl = document.createElement('span')
  textEl.className = cx(
    text(sz),
    css({ 'font-family': family }),
    textColor(slate[800]),
    when(dark)(textColor(slate[200])),
  )
  textEl.textContent = family === serif ? 'The art of the written word' : family === mono ? 'const style = cx(p(4), bg(white))' : 'The quick brown fox jumps over the lazy dog'

  row.append(labelEl, textEl)
  typoDemo.appendChild(row)
}

showcase.appendChild(section('03', 'Typography', [typoDemo]))

// ─── 4. Color Palette ──────────────────────────────────────
const paletteWrap = document.createElement('div')
paletteWrap.className = cx(flex(), flexCol(), gap(4))

const palettes: [string, typeof slate][] = [
  ['slate', slate], ['indigo', indigo], ['emerald', emerald],
  ['amber', amber], ['rose', rose], ['violet', violet],
]

for (const [name, scale] of palettes) {
  const row = document.createElement('div')
  row.className = cx(flex(), items('center'), gap(2))

  const label = document.createElement('span')
  label.className = cx(
    w(16),
    css({ 'font-family': mono, 'font-size': '0.7rem', 'flex-shrink': '0' }),
    textColor(slate[400]),
  )
  label.textContent = name

  const swatches = document.createElement('div')
  swatches.className = cx(flex(), gap(1), css({ flex: '1' }))

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
  for (const shade of shades) {
    const swatch = document.createElement('div')
    swatch.className = cx(
      css({ flex: '1', 'aspect-ratio': '1' }),
      bg(scale[shade]),
      rounded(mdRadius),
      css({ transition: 'transform 150ms ease' }),
      when(hover)(css({ transform: 'scale(1.15)' })),
    )
    swatch.title = `${name}-${shade}`
    swatches.appendChild(swatch)
  }

  row.append(label, swatches)
  paletteWrap.appendChild(row)
}

showcase.appendChild(section('04', 'Colors', [paletteWrap]))

// ─── 5. Spacing Scale ──────────────────────────────────────
const spacingDemo = document.createElement('div')
spacingDemo.className = cx(flex(), flexCol(), gap(3))

const spacingValues = [0.5, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const
for (const val of spacingValues) {
  const row = document.createElement('div')
  row.className = cx(flex(), items('center'), gap(3))

  const label = document.createElement('span')
  label.className = cx(
    w(10),
    css({ 'font-family': mono, 'font-size': '0.7rem', 'text-align': 'right', 'flex-shrink': '0' }),
    textColor(slate[400]),
  )
  label.textContent = String(val)

  const bar = document.createElement('div')
  bar.className = cx(
    h(2),
    w(val),
    bg(indigo[400]),
    rounded(fullRadius),
    css({ transition: 'width 300ms ease' }),
    when(dark)(bg(indigo[500])),
  )

  row.append(label, bar)
  spacingDemo.appendChild(row)
}

showcase.appendChild(section('05', 'Spacing', [spacingDemo]))

// ─── 6. Interactive States ─────────────────────────────────
const statesDemo = document.createElement('div')
statesDemo.className = cx(flex(), flexCol(), gap(4))

const stateExamples = [
  { label: 'Hover me', styles: [bg(slate[100]), when(hover)(bg(indigo[100]), textColor(indigo[700]))] },
  { label: 'Focus me', styles: [bg(slate[100]), css({ outline: 'none' }), when(focus)(ring('2px', indigo[400]), bg(indigo[50]))] },
  { label: 'Press me', styles: [bg(slate[100]), when(active)(bg(slate[300]), css({ transform: 'scale(0.97)' }))] },
]

for (const { label, styles } of stateExamples) {
  const el = document.createElement('button')
  el.textContent = label
  el.className = cx(
    px(5), py(3),
    rounded(lgRadius),
    textAlign('left'),
    textColor(slate[700]),
    css({ 'font-family': mono, 'font-size': '0.875rem', border: 'none', transition: 'all 150ms ease', cursor: 'pointer' }),
    when(dark)(bg(slate[800]), textColor(slate[300])),
    ...styles,
  )
  statesDemo.appendChild(el)
}

showcase.appendChild(section('06', 'States', [statesDemo]))

// ─── 7. Responsive ─────────────────────────────────────────
const responsiveDemo = document.createElement('div')
responsiveDemo.className = cx(
  p(6),
  rounded(_2xlRadius),
  border('1px'), borderColor(slate[200]),
  textAlign('center'),
  css({ 'font-family': mono, 'font-size': '0.875rem', transition: 'all 300ms ease' }),
  bg(emerald[50]), textColor(emerald[700]), borderColor(emerald[200]),
  when(sm)(bg(sky[50]), textColor(sky[700]), borderColor(sky[200])),
  when(md)(bg(violet[50]), textColor(violet[700]), borderColor(violet[200])),
  when(lg)(bg(amber[50]), textColor(amber[700]), borderColor(amber[200])),
  when(xl)(bg(rose[50]), textColor(rose[700]), borderColor(rose[200])),
  when(dark)(
    bg(emerald[950]), textColor(emerald[300]), borderColor(emerald[800]),
  ),
)
responsiveDemo.textContent = 'Resize your browser — this changes at sm / md / lg / xl'

showcase.appendChild(section('07', 'Responsive', [responsiveDemo]))

// ─── 8. Code Example ──────────────────────────────────────
const codeSection = document.createElement('div')
codeSection.id = 'code'
codeSection.className = cx(flex(), flexCol(), gap(4))

const codeBlock = document.createElement('pre')
codeBlock.className = cx(
  p(6),
  rounded(_2xlRadius),
  bg(slate[900]),
  textColor(slate[300]),
  css({ 'font-family': mono, 'font-size': '0.8rem', 'line-height': '1.7', 'overflow-x': 'auto', 'white-space': 'pre' }),
  when(dark)(bg(slate[950]), border('1px'), borderColor(slate[700])),
)
codeBlock.textContent = `import { cx, when, bg, p, rounded, shadow, textColor, hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

const card = cx(
  bg(white),
  p(6),
  rounded('0.75rem'),
  shadow(),
  when(hover)(
    bg(blue[50]),
    shadow('0 10px 15px -3px rgb(0 0 0 / 0.1)'),
  ),
)

document.getElementById('card')!.className = card`

showcase.appendChild(section('08', 'Usage', [codeBlock]))

// ─── 9. Filters ──────────────────────────────────────────
const filtersDemo = document.createElement('div')
filtersDemo.className = cx(flex(), flexWrap(), gap(4))

const filterExamples: [string, ...Parameters<typeof cx>][] = [
  ['Blur', blur('8px'), bg(indigo[200]), size(20), rounded(xlRadius), flex(), items('center'), justify('center'), textColor(indigo[700]), css({ 'font-family': mono, 'font-size': '0.75rem' })],
  ['Grayscale', grayscale('100%'), bg(emerald[400]), size(20), rounded(xlRadius), flex(), items('center'), justify('center'), textColor(white), css({ 'font-family': mono, 'font-size': '0.75rem' })],
  ['Brightness', brightness('150%'), bg(amber[400]), size(20), rounded(xlRadius), flex(), items('center'), justify('center'), textColor(amber[900]), css({ 'font-family': mono, 'font-size': '0.75rem' })],
  ['Saturate', saturate('200%'), bg(rose[400]), size(20), rounded(xlRadius), flex(), items('center'), justify('center'), textColor(white), css({ 'font-family': mono, 'font-size': '0.75rem' })],
]

for (const [label, ...styles] of filterExamples) {
  const el = document.createElement('div')
  el.textContent = label
  el.className = cx(...styles)
  filtersDemo.appendChild(el)
}

showcase.appendChild(section('09', 'Filters', [filtersDemo]))

// ─── 10. Transforms ──────────────────────────────────────
const transformsDemo = document.createElement('div')
transformsDemo.className = cx(flex(), gap(6), items('end'), flexWrap())

const transformExamples: [string, ...Parameters<typeof cx>][] = [
  ['Scale 1.2', scale(120), bg(violet[200]), size(16), rounded(lgRadius), flex(), items('center'), justify('center'), textColor(violet[800]), css({ 'font-family': mono, 'font-size': '0.7rem', transition: 'transform 200ms ease' })],
  ['Rotate 12\u00B0', rotate('12deg'), bg(sky[200]), size(16), rounded(lgRadius), flex(), items('center'), justify('center'), textColor(sky[800]), css({ 'font-family': mono, 'font-size': '0.7rem' })],
  ['Skew X', skewX('6deg'), bg(pink[200]), px(6), py(4), rounded(lgRadius), flex(), items('center'), justify('center'), textColor(pink[800]), css({ 'font-family': mono, 'font-size': '0.7rem' })],
  ['Translate', translateX('0.5rem'), translateY('-0.25rem'), bg(teal[200]), size(16), rounded(lgRadius), flex(), items('center'), justify('center'), textColor(teal[800]), css({ 'font-family': mono, 'font-size': '0.7rem' })],
]

for (const [label, ...styles] of transformExamples) {
  const el = document.createElement('div')
  el.textContent = label
  el.className = cx(...styles)
  transformsDemo.appendChild(el)
}

showcase.appendChild(section('10', 'Transforms', [transformsDemo]))

// ─── 11. Transitions ──────────────────────────────────────
const transitionsDemo = document.createElement('div')
transitionsDemo.className = cx(flex(), gap(4), flexWrap())

const transBtn = (label: string, ...extra: Parameters<typeof cx>) => {
  const b = document.createElement('button')
  b.textContent = label
  b.className = cx(
    px(5), py(3),
    rounded(lgRadius),
    bg(slate[100]),
    textColor(slate[700]),
    css({ border: 'none', 'font-family': mono, 'font-size': '0.8rem', cursor: 'pointer' }),
    ...extra,
  )
  return b
}

transitionsDemo.append(
  transBtn('Colors 300ms',
    transitionColors(), duration(300),
    when(hover)(bg(indigo[500]), textColor(white)),
  ),
  transBtn('All 500ms ease-out',
    transitionAll(), duration(500), ease('ease-out'),
    when(hover)(bg(emerald[500]), textColor(white), shadow(lgShadow), css({ transform: 'translateY(-2px)' })),
  ),
  transBtn('Delayed 200ms',
    transitionColors(), duration(300), delay(200),
    when(hover)(bg(rose[500]), textColor(white)),
  ),
)

showcase.appendChild(section('11', 'Transitions', [transitionsDemo]))

// ─── 12. Gradients ──────────────────────────────────────
const gradientsDemo = document.createElement('div')
gradientsDemo.className = cx(flex(), gap(4), flexWrap())

const gradientCards: [string, string, string, string][] = [
  ['Sunset', rose[500], amber[400], yellow[300]],
  ['Ocean', blue[600], cyan[400], teal[300]],
  ['Forest', emerald[700], green[500], lime[400]],
  ['Twilight', purple[700], violet[500], indigo[400]],
]

for (const [label, from, via, to] of gradientCards) {
  const el = document.createElement('div')
  el.className = cx(
    px(6), py(8),
    rounded(_2xlRadius),
    bgGradient('to right'),
    gradientFrom(from),
    gradientVia(via),
    gradientTo(to),
    textColor(white),
    font(typo.semibold),
    css({ 'font-family': sans, 'font-size': '0.875rem', 'min-width': '10rem', 'text-align': 'center' }),
  )
  el.textContent = label
  gradientsDemo.appendChild(el)
}

showcase.appendChild(section('12', 'Gradients', [gradientsDemo]))

// ─── 13. Before & After ──────────────────────────────────
const pseudoDemo = document.createElement('div')
pseudoDemo.className = cx(flex(), flexCol(), gap(6))

const quotedText = document.createElement('blockquote')
quotedText.className = cx(
  relative(),
  pl(10), py(4),
  css({ 'font-family': serif, 'font-size': '1.25rem', 'font-style': 'italic' }),
  textColor(slate[600]),
  borderL('4px'), borderColor(indigo[400]),
  when(dark)(textColor(slate[300])),
)
quotedText.textContent = 'CSS-in-TypeScript is not the future \u2014 it is the present.'

const decorLine = document.createElement('div')
decorLine.className = cx(
  relative(),
  h('2px'),
  css({
    background: `linear-gradient(to right, ${indigo[500]}, ${violet[500]}, ${rose[500]})`,
  }),
  rounded(fullRadius),
)

pseudoDemo.append(quotedText, decorLine)
showcase.appendChild(section('13', 'Decorative Elements', [pseudoDemo]))

// ─── Footer ───────────────────────────────────────────────
app.appendChild(createDivider())

const footer = document.createElement('footer')
footer.className = cx(
  flex(), items('center'), justify('center'),
  py(12), px(6),
  css({ 'font-family': mono, 'font-size': '0.75rem' }),
  textColor(slate[400]),
  when(dark)(textColor(slate[600])),
)
footer.textContent = 'Typewriting Class — css-in-typescript'
app.appendChild(footer)
