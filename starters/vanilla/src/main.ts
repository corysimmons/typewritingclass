import 'virtual:twc.css'
import {
  cx, css, p, px, py, bg, textColor, text, font, rounded, shadow,
  flex, flexCol, flexRow, gap, items, justify, minH, when,
  bgGradient, gradientFrom, gradientTo,
  transitionAll, duration,
  opacity, blur,
} from 'typewritingclass'
import { hover } from 'typewritingclass'
import { blue, white, slate, indigo, purple, emerald } from 'typewritingclass/theme/colors'
import { bold, semibold, lg } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow } from 'typewritingclass/theme/shadows'

const app = document.getElementById('app')!

// Root layout
app.className = cx(
  flexCol(), gap(8), p(8),
  items('center'), justify('center'),
  minH('100vh'),
)

// Heading
const heading = document.createElement('h1')
heading.className = cx(text(lg), font(bold), textColor(slate[900]))
heading.textContent = 'typewritingclass + Vanilla TS'
app.appendChild(heading)

// Card with hover effect
const card = document.createElement('div')
card.className = cx(
  p(6),
  bg(white),
  rounded(lgRadius),
  shadow(mdShadow),
  flexCol(), gap(4), items('center'),
  css({ transition: 'all 200ms ease' }),
  when(hover)(shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)'), bg(blue[50])),
)

const cardText = document.createElement('p')
cardText.className = cx(textColor(slate[700]))
cardText.textContent = 'Hover this card to see the effect.'
card.appendChild(cardText)

const badge = document.createElement('span')
badge.className = cx(
  p(2),
  bg(blue[500]),
  textColor(white),
  rounded(lgRadius),
  font(bold),
)
badge.textContent = 'Styled with typewritingclass'
card.appendChild(badge)

app.appendChild(card)

// Gradient button with transition
const gradBtn = document.createElement('button')
gradBtn.textContent = 'Gradient Button'
gradBtn.className = cx(
  px(6), py(3),
  rounded(lgRadius),
  bgGradient('to right'),
  gradientFrom(indigo[500]),
  gradientTo(purple[600]),
  textColor(white),
  font(semibold),
  transitionAll(), duration(200),
  css({ border: 'none', cursor: 'pointer', 'font-size': '1rem' }),
  when(hover)(opacity(0.9), shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)')),
)
app.appendChild(gradBtn)

// Filter demo
const filterRow = document.createElement('div')
filterRow.className = cx(flexRow(), gap(4))

const normalBox = document.createElement('div')
normalBox.textContent = 'Normal'
normalBox.className = cx(
  bg(emerald[400]),
  p(4), rounded(lgRadius),
  textColor(white), font(bold),
  css({ 'font-size': '0.875rem' }),
)

const blurredBox = document.createElement('div')
blurredBox.textContent = 'Blurred'
blurredBox.className = cx(
  bg(emerald[400]),
  blur('2px'),
  p(4), rounded(lgRadius),
  textColor(white), font(bold),
  css({ 'font-size': '0.875rem' }),
)

filterRow.append(normalBox, blurredBox)
app.appendChild(filterRow)
