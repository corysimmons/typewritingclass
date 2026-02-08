import {
  cx, when, css,
  // Spacing
  p, px, py, mt, mb, gap,
  // Colors
  bg, textColor, borderColor,
  // Typography
  text, font, textAlign,
  // Layout
  flex, flexCol, flexRow, flexWrap, grid,
  w, h, maxW, minH, items, justify,
  relative,
  // Borders
  rounded, border, ring,
  // Effects
  shadow, opacity,
  // Interactivity
  cursor, select,
  // Modifiers
  hover, focus, active, disabled, dark,
  sm, md, lg,
} from 'typewritingclass'
import { blue, gray, white, red, green, slate, indigo } from 'typewritingclass/theme/colors'
import { lg as lgText, xl as xlText, _2xl, _3xl, base as baseText } from 'typewritingclass/theme/typography'
import * as typography from 'typewritingclass/theme/typography'
import { md as mdShadow, lg as lgShadow } from 'typewritingclass/theme/shadows'
import { lg as lgRadius, xl as xlRadius, full as fullRadius } from 'typewritingclass/theme/borders'

const app = document.getElementById('app')!

// --- Page container ---
app.className = cx(
  flexCol(),
  minH('100vh'),
  bg(gray[50]),
  textColor(gray[900]),
  when(dark)(bg(slate[900]), textColor(gray[100])),
)

// --- Header ---
const header = document.createElement('header')
header.className = cx(
  w('100%'),
  bg(white),
  shadow(mdShadow),
  px(8),
  py(4),
  flex(),
  items('center'),
  justify('space-between'),
  when(dark)(bg(slate[800])),
)
header.innerHTML = `<h1 class="${cx(text(_2xl), font(typography.bold), textColor(indigo[600]), when(dark)(textColor(indigo[400])))}">typewritingclass</h1>
<span class="${cx(text(baseText), textColor(gray[500]))}">CSS-in-TypeScript framework</span>`
app.appendChild(header)

// --- Main content ---
const main = document.createElement('main')
main.className = cx(
  flexCol(),
  gap(8),
  p(8),
  maxW('80rem'),
  w('100%'),
  css({ 'margin-left': 'auto', 'margin-right': 'auto' }),
)
app.appendChild(main)

// --- Button showcase ---
const buttonSection = document.createElement('section')
buttonSection.innerHTML = `<h2 class="${cx(text(xlText), font(typography.semibold), mb(4))}">Buttons</h2>`
const buttonRow = document.createElement('div')
buttonRow.className = cx(flex(), flexWrap(), gap(4), items('center'))

function createButton(label: string, ...styles: Parameters<typeof cx>) {
  const btn = document.createElement('button')
  btn.textContent = label
  btn.className = cx(
    px(6), py(2),
    rounded(lgRadius),
    font(typography.medium),
    text(baseText),
    cursor('pointer'),
    border('0'),
    css({ transition: 'all 150ms ease' }),
    ...styles,
  )
  return btn
}

const primaryBtn = createButton('Primary',
  bg(blue[600]), textColor(white),
  when(hover)(bg(blue[700])),
  when(active)(bg(blue[800])),
  when(focus)(ring('3px', blue[300])),
)

const dangerBtn = createButton('Danger',
  bg(red[600]), textColor(white),
  when(hover)(bg(red[700])),
  when(active)(bg(red[800])),
  when(focus)(ring('3px', red[300])),
)

const ghostBtn = createButton('Ghost',
  bg('transparent'), textColor(gray[700]),
  border('1px'), borderColor(gray[300]),
  when(hover)(bg(gray[100])),
  when(active)(bg(gray[200])),
  when(dark)(textColor(gray[300]), borderColor(gray[600])),
  when(dark, hover)(bg(slate[700])),
)

const disabledBtn = createButton('Disabled',
  bg(gray[300]), textColor(gray[500]),
  when(disabled)(opacity(0.6), cursor('not-allowed')),
)
disabledBtn.disabled = true

buttonRow.append(primaryBtn, dangerBtn, ghostBtn, disabledBtn)
buttonSection.appendChild(buttonRow)
main.appendChild(buttonSection)

// --- Card showcase ---
const cardSection = document.createElement('section')
cardSection.innerHTML = `<h2 class="${cx(text(xlText), font(typography.semibold), mb(4))}">Cards</h2>`
const cardGrid = document.createElement('div')
cardGrid.className = cx(
  grid(1),
  gap(6),
  when(sm)(grid(2)),
  when(lg)(grid(3)),
)

for (let i = 1; i <= 3; i++) {
  const card = document.createElement('div')
  card.className = cx(
    bg(white),
    rounded(xlRadius),
    shadow(mdShadow),
    p(6),
    flexCol(),
    gap(3),
    css({ transition: 'box-shadow 200ms ease' }),
    when(hover)(shadow(lgShadow)),
    when(dark)(bg(slate[800])),
  )
  card.innerHTML = `
    <h3 class="${cx(text(lgText), font(typography.semibold))}">Card ${i}</h3>
    <p class="${cx(text(baseText), textColor(gray[600]), when(dark)(textColor(gray[400])))}">
      This card demonstrates padding, rounded corners, shadows, and hover effects using typewritingclass utilities.
    </p>
  `
  cardGrid.appendChild(card)
}
cardSection.appendChild(cardGrid)
main.appendChild(cardSection)

// --- Typography showcase ---
const typoSection = document.createElement('section')
typoSection.innerHTML = `<h2 class="${cx(text(xlText), font(typography.semibold), mb(4))}">Typography</h2>`
const typoBox = document.createElement('div')
typoBox.className = cx(flexCol(), gap(3), bg(white), rounded(xlRadius), p(6), shadow(), when(dark)(bg(slate[800])))

const sizes = [
  { name: '_3xl', token: _3xl },
  { name: '_2xl', token: _2xl },
  { name: 'xl', token: xlText },
  { name: 'lg', token: lgText },
  { name: 'base', token: baseText },
]
for (const s of sizes) {
  const line = document.createElement('p')
  line.className = cx(text(s.token))
  line.textContent = `${s.name} — The quick brown fox jumps over the lazy dog`
  typoBox.appendChild(line)
}

typoSection.appendChild(typoBox)
main.appendChild(typoSection)

// --- Spacing showcase ---
const spacingSection = document.createElement('section')
spacingSection.innerHTML = `<h2 class="${cx(text(xlText), font(typography.semibold), mb(4))}">Spacing Scale</h2>`
const spacingRow = document.createElement('div')
spacingRow.className = cx(flex(), flexWrap(), gap(2), items('flex-end'))

for (const val of [1, 2, 3, 4, 6, 8, 12, 16]) {
  const box = document.createElement('div')
  box.className = cx(w(val), h(val), bg(indigo[500]), rounded())
  box.title = `${val} (${val * 0.25}rem)`
  spacingRow.appendChild(box)
}
spacingSection.appendChild(spacingRow)
main.appendChild(spacingSection)

// --- Responsive demo ---
const responsiveSection = document.createElement('section')
responsiveSection.innerHTML = `<h2 class="${cx(text(xlText), font(typography.semibold), mb(4))}">Responsive</h2>`
const responsiveBox = document.createElement('div')
responsiveBox.className = cx(
  p(4),
  bg(green[100]),
  textColor(green[800]),
  rounded(lgRadius),
  textAlign('center'),
  font(typography.medium),
  when(sm)(bg(blue[100]), textColor(blue[800])),
  when(md)(bg(indigo[100]), textColor(indigo[800])),
  when(lg)(bg(purple[100]), textColor(purple[800])),
)

import { purple } from 'typewritingclass/theme/colors'
responsiveBox.textContent = 'Resize the window — this box changes color at sm / md / lg breakpoints'
responsiveSection.appendChild(responsiveBox)
main.appendChild(responsiveSection)

// --- Footer ---
const footer = document.createElement('footer')
footer.className = cx(
  mt(8), py(6), px(8),
  textAlign('center'),
  textColor(gray[400]),
  text(baseText),
  when(dark)(textColor(gray[600])),
)
footer.textContent = 'typewritingclass — Phase 1 demo'
app.appendChild(footer)
