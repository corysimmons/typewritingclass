import { cx, flexCol, flex, gap, p, bg, bgImage, textColor, text, font, rounded, shadow, w, h, items, justify, border, borderColor } from 'typewritingclass'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexCol(), gap(6), p(8))

// Override test: later utility wins
// bg(red) then bg(blue) → should be blue
const overrideBox = document.createElement('div')
overrideBox.className = cx(
  w(32), h(16), bg('#ef4444'), bg('#3b82f6'),
  rounded('lg'), flex(), items('center'), justify('center'),
  textColor('#ffffff'), text('base'), font('bold'),
)
overrideBox.textContent = 'Should be blue'
container.appendChild(overrideBox)

// Composition: card pattern
const card = document.createElement('div')
card.className = cx(
  bg('#ffffff'),
  rounded('lg'),
  shadow('md'),
  p(6),
  flex(), flexCol(),
  gap(3),
  border('1px'),
  borderColor('#e5e7eb'),
)
const cardTitle = document.createElement('h3')
cardTitle.className = cx(text('base'), font('semibold'), textColor('#111827'))
cardTitle.textContent = 'Card Title'
const cardBody = document.createElement('p')
cardBody.className = cx(text('base'), textColor('#6b7280'))
cardBody.textContent = 'Card body with composed styles'
card.append(cardTitle, cardBody)
container.appendChild(card)

// bgImage gradient
const customBox = document.createElement('div')
customBox.className = cx(
  w(32), h(16),
  rounded('lg'),
  flex(), items('center'), justify('center'),
  textColor('#ffffff'), text('base'), font('bold'),
  bgImage('linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
)
customBox.textContent = 'bgImage gradient'
container.appendChild(customBox)

app.appendChild(container)
