import { cx, css, flexCol, flex, gap, p, bg, textColor, text, font, rounded, shadow, w, h, items, justify, border, borderColor } from 'typewritingclass'
import { base, bold, semibold } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow } from 'typewritingclass/theme/shadows'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexCol(), gap(6), p(8))

// Override test: later utility wins
// bg(red) then bg(blue) → should be blue
const overrideBox = document.createElement('div')
overrideBox.className = cx(
  w(32), h(16), bg('#ef4444'), bg('#3b82f6'),
  rounded(lgRadius), flex(), items('center'), justify('center'),
  textColor('#ffffff'), text(base), font(bold),
)
overrideBox.textContent = 'Should be blue'
container.appendChild(overrideBox)

// Composition: card pattern
const card = document.createElement('div')
card.className = cx(
  bg('#ffffff'),
  rounded(lgRadius),
  shadow(mdShadow),
  p(6),
  flex(), flexCol(),
  gap(3),
  border('1px'),
  borderColor('#e5e7eb'),
)
const cardTitle = document.createElement('h3')
cardTitle.className = cx(text(base), font(semibold), textColor('#111827'))
cardTitle.textContent = 'Card Title'
const cardBody = document.createElement('p')
cardBody.className = cx(text(base), textColor('#6b7280'))
cardBody.textContent = 'Card body with composed styles'
card.append(cardTitle, cardBody)
container.appendChild(card)

// css() escape hatch
const customBox = document.createElement('div')
customBox.className = cx(
  w(32), h(16),
  rounded(lgRadius),
  flex(), items('center'), justify('center'),
  textColor('#ffffff'), text(base), font(bold),
  css({
    'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  }),
)
customBox.textContent = 'css() gradient'
container.appendChild(customBox)

app.appendChild(container)
