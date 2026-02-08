import 'virtual:twc.css'
import {
  cx, css, p, bg, textColor, text, font, rounded, shadow,
  flex, flexCol, gap, items, justify, minH, when,
} from 'typewritingclass'
import { hover } from 'typewritingclass'
import { blue, white, slate } from 'typewritingclass/theme/colors'
import { bold, lg } from 'typewritingclass/theme/typography'
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
