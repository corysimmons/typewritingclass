import {
  cx,
  w, bg, textColor,
  text, size, rounded,
  blur, brightness, grayscale, saturate,
  scale, rotate, translateX, translateY, skewX,
  tw,
  gradientFrom, gradientVia, gradientTo,
  fontFamily, antialiased, italic, tracking, leading, font,
  transitionAll, duration, ease,
  textDecoration, textTransform,
  shrink, flex1, aspectRatio,
  mx, h, borderStyle, borderColor,
  bgImage, bgSize,
  minW, textAlign, cursor,
} from 'typewritingclass'

const app = document.getElementById('app')!

// ─── Globals ───────────────────────────────────────────────
const mono = "'DM Mono', monospace"
const serif = "'Instrument Serif', Georgia, serif"
const sans = "'Geist', system-ui, sans-serif"

const cream = '#faf9f6'
const inkLight = '#e8e4de'

// ─── Root ──────────────────────────────────────────────────
app.className = tw.flex.flexCol.minH('100vh')
  .textColor('slate-800')
  (fontFamily(sans), bg(cream), antialiased())
  .dark(tw.textColor('slate-200')(bg('#020617')))


// ─── Hero ──────────────────────────────────────────────────
const hero = document.createElement('section')
hero.className = tw.relative.flex.flexCol
  .items('center').justify('center')
  .px(6).pt(24).pb(20)
  .md(tw.pt(32).pb(28))
  .overflow('hidden')


// Decorative grid lines in background
const gridBg = document.createElement('div')
gridBg.className = tw.absolute.inset(0).opacity(0.04).pointerEvents('none')
  (bgImage(`
      linear-gradient(#94a3b8 1px, transparent 1px),
      linear-gradient(90deg, #94a3b8 1px, transparent 1px)
    `), bgSize('60px 60px'))
hero.appendChild(gridBg)

// Logo
const logo = document.createElement('img')
logo.src = '/logo.svg'
logo.alt = 'Typewriting Class'
logo.className = tw.w('280px').mb(10).relative
hero.appendChild(logo)

// Accent line
const accentLine = document.createElement('div')
accentLine.className = tw.w(16).h('3px').mb(8).relative
  (bg('#6366f1'))

hero.appendChild(accentLine)

// Title
const title = document.createElement('h1')
title.className = tw.relative
  .text('6xl')
  .textColor('slate-900')
  .textAlign('center')
  (fontFamily(serif), italic(), tracking('-0.03em'))
  .md(tw(text('5rem'), leading('1')))
  .dark.textColor('white')

title.textContent = 'Typewriting Class'
hero.appendChild(title)

// Subtitle
const subtitle = document.createElement('p')
subtitle.className = tw.mt(6)
  .text('xl')
  .textColor('slate-500')
  .textAlign('center')
  .maxW('36rem')
  .leading('1.7')
  (fontFamily(mono), font('300'))
  .dark.textColor('slate-400')

subtitle.textContent = 'CSS-in-TypeScript. Static extraction. Zero runtime.'
hero.appendChild(subtitle)

// CTA row
const ctaRow = document.createElement('div')
ctaRow.className = tw.flex.gap(4).mt(10).items('center')

const primaryCta = document.createElement('a')
primaryCta.href = '#showcase'
primaryCta.textContent = 'See it in action'
primaryCta.className = tw.px(7).py(3)
  .bg('slate-900').textColor('white')
  .rounded('xl')
  .cursor('pointer')
  (fontFamily(mono), text('0.875rem'), textDecoration('none'), transitionAll(), duration(200), ease('ease'))
  .hover.bg('indigo-600')
  .dark(tw.bg('white').textColor('slate-900'))
  .dark.hover.bg('indigo-400')


const ghostCta = document.createElement('a')
ghostCta.href = '#code'
ghostCta.textContent = 'View code'
ghostCta.className = tw.px(7).py(3)
  .bg('transparent').textColor('slate-600')
  .border('1px').borderColor('slate-300')
  .rounded('xl')
  .cursor('pointer')
  (fontFamily(mono), text('0.875rem'), textDecoration('none'), transitionAll(), duration(200), ease('ease'))
  .hover(tw.bg('slate-100').borderColor('slate-400'))
  .dark(tw.textColor('slate-400').borderColor('slate-600'))
  .dark.hover.bg('slate-800')


ctaRow.append(primaryCta, ghostCta)
hero.appendChild(ctaRow)
app.appendChild(hero)

// ─── Divider ───────────────────────────────────────────────
function createDivider() {
  const div = document.createElement('div')
  div.className = tw.w('100%').maxW('72rem')
    (mx('auto'), h('1px'), bg(inkLight))
    .dark(tw(bg('#1e293b')))

  return div
}

// ─── Showcase ──────────────────────────────────────────────
const showcase = document.createElement('section')
showcase.id = 'showcase'
showcase.className = tw.flex.flexCol.gap(20)
  .px(6).py(20)
  .maxW('72rem').w('100%')
  (mx('auto'))

app.appendChild(createDivider())
app.appendChild(showcase)

// ─── Section helper ────────────────────────────────────────
function section(label: string, heading: string, children: HTMLElement[]) {
  const el = document.createElement('div')
  el.className = tw.flex.flexCol.gap(8)

  const labelEl = document.createElement('span')
  labelEl.className = tw.textColor('indigo-500').font('500')
    (fontFamily(mono), text('0.75rem'), textTransform('uppercase'), tracking('0.1em'))

  labelEl.textContent = label

  const headingEl = document.createElement('h2')
  headingEl.className = tw.text('3xl').textColor('slate-900')
    (fontFamily(serif), italic(), tracking('-0.02em'))
    .dark.textColor('white')

  headingEl.textContent = heading

  const headerGroup = document.createElement('div')
  headerGroup.className = tw.flex.flexCol.gap(2)
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
    tw.px(5).py(2.5).rounded('lg').font('500').cursor('pointer'),
    fontFamily(sans), text('0.875rem'), transitionAll(), duration(150), ease('ease'), borderStyle('none'),
    ...styles,
  )
  return b
}

const btnRow = document.createElement('div')
btnRow.className = tw.flex.flexWrap.gap(3).items('center')

btnRow.append(
  btn('Primary',
    tw.bg('slate-900').textColor('#ffffff')
      .hover.bg('indigo-600')
      .active.bg('indigo-700')
      .focus(tw.ring('2px', 'indigo-400'))
      .dark(tw.bg('#ffffff').textColor('slate-900'))
      .dark.hover.bg('indigo-300')
    ,
  ),
  btn('Secondary',
    tw.bg('slate-100').textColor('slate-700')
      .hover.bg('slate-200')
      .active.bg('slate-300')
      .dark(tw.bg('slate-800').textColor('slate-300'))
      .dark.hover.bg('slate-700')
    ,
  ),
  btn('Accent',
    tw.bg('indigo-600').textColor('#ffffff')
      .hover.bg('indigo-500')
      .active.bg('indigo-700')
      .focus(tw.ring('2px', 'indigo-300'))
    ,
  ),
  btn('Ghost',
    tw.bg('transparent').textColor('slate-600')
      .border('1px').borderStyle('solid').borderColor('#cbd5e1')
      .hover(tw.bg('slate-50').borderColor('slate-400'))
      .dark(tw.textColor('slate-400').borderColor('#475569'))
      .dark.hover.bg('slate-800')
    ,
  ),
  btn('Danger',
    tw.bg('red-600').textColor('#ffffff')
      .hover.bg('red-500')
      .active.bg('red-700')
      .focus(tw.ring('2px', 'red-300'))
    ,
  ),
  (() => {
    const b = btn('Disabled',
      tw.bg('slate-100').textColor('slate-400')
        .disabled.opacity(0.5)
      ,
    )
    b.disabled = true
    return b
  })(),
)

showcase.appendChild(section('01', 'Buttons', [btnRow]))

// ─── 2. Cards ──────────────────────────────────────────────
const cardGrid = document.createElement('div')
cardGrid.className = tw.grid(1).gap(6).md.gridCols(3)

const cardData = [
  { icon: '/', title: 'Static Extraction', desc: 'The Rust compiler parses your cx() calls at build time. No runtime overhead for static styles.' },
  { icon: '{}', title: 'Type-Safe Tokens', desc: 'Theme values are TypeScript objects. Autocomplete guides every color, spacing, and typography choice.' },
  { icon: '~', title: 'Composable API', desc: 'Chain utilities with tw, compose with cx(). Later values override earlier — predictable cascade.' },
]

for (const { icon, title: t, desc } of cardData) {
  const card = document.createElement('div')
  card.className = tw.flex.flexCol.gap(4).p(6)
    .bg('white')
    .border('1px').borderColor('slate-200')
    .rounded('2xl')
    .transitionAll.duration(250).ease('ease')
    .hover(tw.shadow('lg')(translateY('-2px'), borderColor('#c7d2fe')))
    .dark(tw.bg('slate-900').borderColor('slate-700'))
    .dark.hover(tw(borderColor('#6366f1')))


  const iconEl = document.createElement('div')
  iconEl.className = tw.flex.items('center').justify('center')
    .size(10).rounded('lg')
    .bg('slate-100').textColor('indigo-600')
    (fontFamily(mono), font('500'), text('1.125rem'))
    .dark(tw.bg('slate-800').textColor('indigo-400'))

  iconEl.textContent = icon

  const titleEl = document.createElement('h3')
  titleEl.className = tw.text('lg').font('600')
    .textColor('slate-900')
    .dark.textColor('white')

  titleEl.textContent = t

  const descEl = document.createElement('p')
  descEl.className = tw.text('sm').leading('1.6')
    .textColor('slate-500')
    .dark.textColor('slate-400')

  descEl.textContent = desc

  card.append(iconEl, titleEl, descEl)
  cardGrid.appendChild(card)
}

showcase.appendChild(section('02', 'Cards', [cardGrid]))

// ─── 3. Typography ─────────────────────────────────────────
const typoDemo = document.createElement('div')
typoDemo.className = tw.flex.flexCol.gap(6).p(8)
  .bg('white').border('1px').borderColor('slate-200')
  .rounded('2xl')
  .dark(tw.bg('slate-900').borderColor('slate-700'))


const typoSamples: [string, string, string][] = [
  ['Display', '5xl', serif],
  ['Heading', '3xl', sans],
  ['Subhead', 'xl', sans],
  ['Body', 'base', sans],
  ['Caption', 'xs', mono],
]

for (const [label, sz, family] of typoSamples) {
  const row = document.createElement('div')
  row.className = tw.flex.items('baseline').gap(4)

  const labelEl = document.createElement('span')
  labelEl.className = cx(
    tw.w(20).textColor('slate-400'),
    fontFamily(mono), text('0.7rem'), textTransform('uppercase'), tracking('0.08em'), shrink(0),
  )
  labelEl.textContent = label

  const textEl = document.createElement('span')
  textEl.className = cx(
    text(sz),
    fontFamily(family),
    textColor('slate-800'),
    tw.dark.textColor('slate-200'),
  )
  textEl.textContent = family === serif ? 'The art of the written word' : family === mono ? 'const style = cx(p(4), bg(white))' : 'The quick brown fox jumps over the lazy dog'

  row.append(labelEl, textEl)
  typoDemo.appendChild(row)
}

showcase.appendChild(section('03', 'Typography', [typoDemo]))

// ─── 4. Color Palette ──────────────────────────────────────
const paletteWrap = document.createElement('div')
paletteWrap.className = tw.flex.flexCol.gap(4)

const paletteNames = ['slate', 'indigo', 'emerald', 'amber', 'rose', 'violet']

for (const name of paletteNames) {
  const row = document.createElement('div')
  row.className = tw.flex.items('center').gap(2)

  const label = document.createElement('span')
  label.className = cx(
    tw.w(16).textColor('slate-400'),
    fontFamily(mono), text('0.7rem'), shrink(0),
  )
  label.textContent = name

  const swatches = document.createElement('div')
  swatches.className = cx(
    tw.flex.gap(1),
    flex1(),
  )

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
  for (const shade of shades) {
    const swatch = document.createElement('div')
    swatch.className = cx(
      flex1(), aspectRatio('1'),
      bg(`${name}-${shade}`),
      rounded('md'),
      transitionAll(), duration(150), ease('ease'),
      tw.hover(tw(scale(115))),
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
spacingDemo.className = tw.flex.flexCol.gap(3)

const spacingValues = [0.5, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const
for (const val of spacingValues) {
  const row = document.createElement('div')
  row.className = tw.flex.items('center').gap(3)

  const label = document.createElement('span')
  label.className = cx(
    tw.w(10).textColor('slate-400'),
    fontFamily(mono), text('0.7rem'), textAlign('right'), shrink(0),
  )
  label.textContent = String(val)

  const bar = document.createElement('div')
  bar.className = cx(
    tw.h(2).rounded('full').dark.bg('indigo-500'),
    w(val),
    bg('indigo-400'),
    transitionAll(), duration(300), ease('ease'),
  )

  row.append(label, bar)
  spacingDemo.appendChild(row)
}

showcase.appendChild(section('05', 'Spacing', [spacingDemo]))

// ─── 6. Interactive States ─────────────────────────────────
const statesDemo = document.createElement('div')
statesDemo.className = tw.flex.flexCol.gap(4)

const stateExamples = [
  { label: 'Hover me', styles: tw.bg('slate-100').hover(tw.bg('indigo-100').textColor('indigo-700')) },
  { label: 'Focus me', styles: tw.bg('slate-100').outlineNone.focus(tw.ring('2px', 'indigo-400').bg('indigo-50')) },
  { label: 'Press me', styles: tw.bg('slate-100').active(tw.bg('slate-300')(scale(97))) },
]

for (const { label, styles } of stateExamples) {
  const el = document.createElement('button')
  el.textContent = label
  el.className = cx(
    tw.px(5).py(3).rounded('lg').textAlign('left').textColor('slate-700')
      .dark(tw.bg('slate-800').textColor('slate-300')),
    fontFamily(mono), text('0.875rem'), borderStyle('none'), transitionAll(), duration(150), ease('ease'), cursor('pointer'),
    styles,
  )
  statesDemo.appendChild(el)
}

showcase.appendChild(section('06', 'States', [statesDemo]))

// ─── 7. Responsive ─────────────────────────────────────────
const responsiveDemo = document.createElement('div')
responsiveDemo.className = tw.p(6).rounded('2xl')
  .border('1px').borderColor('slate-200')
  .textAlign('center')
  .fontFamily(mono).text('0.875rem').transitionAll.duration(300).ease('ease')
  .bg('emerald-50').textColor('emerald-700').borderColor('emerald-200')
  .sm(tw.bg('sky-50').textColor('sky-700').borderColor('sky-200'))
  .md(tw.bg('violet-50').textColor('violet-700').borderColor('violet-200'))
  .lg(tw.bg('amber-50').textColor('amber-700').borderColor('amber-200'))
  .xl(tw.bg('rose-50').textColor('rose-700').borderColor('rose-200'))
  .dark(tw.bg('emerald-950').textColor('emerald-300').borderColor('emerald-800'))

responsiveDemo.textContent = 'Resize your browser — this changes at sm / md / lg / xl'

showcase.appendChild(section('07', 'Responsive', [responsiveDemo]))

// ─── 8. Code Example ──────────────────────────────────────
const codeSection = document.createElement('div')
codeSection.id = 'code'
codeSection.className = tw.flex.flexCol.gap(4)

const codeBlock = document.createElement('pre')
codeBlock.className = tw.p(6).rounded('2xl')
  .bg('slate-900').textColor('slate-300')
  .fontFamily(mono).text('0.8rem').leading('1.7').overflowX('auto').whitespace('pre')
  .dark(tw.bg('slate-950').border('1px').borderColor('slate-700'))

codeBlock.textContent = `import { tw } from 'typewritingclass'

const card = tw
  .bg('white')
  .p(6)
  .rounded('0.75rem')
  .shadow()
  .hover(tw
    .bg('blue-50')
    .shadow('0 10px 15px -3px rgb(0 0 0 / 0.1)')
  )

document.getElementById('card')!.className = \`\${card}\``

showcase.appendChild(section('08', 'Usage', [codeBlock]))

// ─── 9. Filters ──────────────────────────────────────────
const filtersDemo = document.createElement('div')
filtersDemo.className = tw.flex.flexWrap.gap(4)

const filterExamples: [string, ...Parameters<typeof cx>][] = [
  ['Blur', blur('8px'), bg('indigo-200'), size(20), rounded('xl'), ...tw.flex.items('center').justify('center')._rules, textColor('indigo-700'), fontFamily(mono), text('0.75rem')],
  ['Grayscale', grayscale('100%'), bg('emerald-400'), size(20), rounded('xl'), ...tw.flex.items('center').justify('center')._rules, textColor('#ffffff'), fontFamily(mono), text('0.75rem')],
  ['Brightness', brightness('150%'), bg('amber-400'), size(20), rounded('xl'), ...tw.flex.items('center').justify('center')._rules, textColor('amber-900'), fontFamily(mono), text('0.75rem')],
  ['Saturate', saturate('200%'), bg('rose-400'), size(20), rounded('xl'), ...tw.flex.items('center').justify('center')._rules, textColor('#ffffff'), fontFamily(mono), text('0.75rem')],
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
transformsDemo.className = tw.flex.gap(6).items('end').flexWrap

const transformExamples: [string, ...Parameters<typeof cx>][] = [
  ['Scale 1.2', scale(120), bg('violet-200'), size(16), rounded('lg'), ...tw.flex.items('center').justify('center')._rules, textColor('violet-800'), fontFamily(mono), text('0.7rem'), transitionAll(), duration(200), ease('ease')],
  ['Rotate 12\u00B0', rotate('12deg'), bg('sky-200'), size(16), rounded('lg'), ...tw.flex.items('center').justify('center')._rules, textColor('sky-800'), fontFamily(mono), text('0.7rem')],
  ['Skew X', skewX('6deg'), bg('pink-200'), ...tw.px(6).py(4).rounded('lg').flex.items('center').justify('center')._rules, textColor('pink-800'), fontFamily(mono), text('0.7rem')],
  ['Translate', translateX('0.5rem'), translateY('-0.25rem'), bg('teal-200'), size(16), rounded('lg'), ...tw.flex.items('center').justify('center')._rules, textColor('teal-800'), fontFamily(mono), text('0.7rem')],
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
transitionsDemo.className = tw.flex.gap(4).flexWrap

const transBtn = (label: string, ...extra: Parameters<typeof cx>) => {
  const b = document.createElement('button')
  b.textContent = label
  b.className = cx(
    tw.px(5).py(3).rounded('lg').bg('slate-100').textColor('slate-700'),
    borderStyle('none'), fontFamily(mono), text('0.8rem'), cursor('pointer'),
    ...extra,
  )
  return b
}

transitionsDemo.append(
  transBtn('Colors 300ms',
    ...tw.transitionColors.duration(300)
      .hover(tw.bg('indigo-500').textColor('white'))._rules,
  ),
  transBtn('All 500ms ease-out',
    ...tw.transitionAll.duration(500).ease('ease-out')
      .hover(tw.bg('emerald-500').textColor('white').shadow('lg')(translateY('-2px')))._rules,
  ),
  transBtn('Delayed 200ms',
    ...tw.transitionColors.duration(300).delay(200)
      .hover(tw.bg('rose-500').textColor('white'))._rules,
  ),
)

showcase.appendChild(section('11', 'Transitions', [transitionsDemo]))

// ─── 12. Gradients ──────────────────────────────────────
const gradientsDemo = document.createElement('div')
gradientsDemo.className = tw.flex.gap(4).flexWrap

const gradientCards: [string, string, string, string][] = [
  ['Sunset', 'rose-500', 'amber-400', 'yellow-300'],
  ['Ocean', 'blue-600', 'cyan-400', 'teal-300'],
  ['Forest', 'emerald-700', 'green-500', 'lime-400'],
  ['Twilight', 'purple-700', 'violet-500', 'indigo-400'],
]

for (const [label, from, via, to] of gradientCards) {
  const el = document.createElement('div')
  el.className = cx(
    tw.px(6).py(8).rounded('2xl')
      .bgGradient('to right').textColor('white').font('600'),
    gradientFrom(from),
    gradientVia(via),
    gradientTo(to),
    fontFamily(sans), text('0.875rem'), minW('10rem'), textAlign('center'),
  )
  el.textContent = label
  gradientsDemo.appendChild(el)
}

showcase.appendChild(section('12', 'Gradients', [gradientsDemo]))

// ─── 13. Before & After ──────────────────────────────────
const pseudoDemo = document.createElement('div')
pseudoDemo.className = tw.flex.flexCol.gap(6)

const quotedText = document.createElement('blockquote')
quotedText.className = tw.relative
  .pl(10).py(4)
  .textColor('slate-600')
  .borderL('4px').borderColor('indigo-400')
  .fontFamily(serif).text('1.25rem').italic
  .dark.textColor('slate-300')

quotedText.textContent = 'CSS-in-TypeScript is not the future \u2014 it is the present.'

const decorLine = document.createElement('div')
decorLine.className = tw.relative.h('2px').rounded('full')
  (bgImage('linear-gradient(to right, #6366f1, #8b5cf6, #f43f5e)'))

pseudoDemo.append(quotedText, decorLine)
showcase.appendChild(section('13', 'Decorative Elements', [pseudoDemo]))

// ─── Footer ───────────────────────────────────────────────
app.appendChild(createDivider())

const footer = document.createElement('footer')
footer.className = tw.flex.items('center').justify('center')
  .py(12).px(6)
  .textColor('slate-400')
  .fontFamily(mono).text('0.75rem')
  .dark.textColor('slate-600')

footer.textContent = 'Typewriting Class — css-in-typescript'
app.appendChild(footer)
