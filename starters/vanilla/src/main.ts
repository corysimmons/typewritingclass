import 'typewritingclass/preflight.css'
import 'virtual:twc.css'
import { tw, cx, bg, rounded, p } from 'typewritingclass'

const app = document.getElementById('app')!

// Root layout — property-access tokens for items/justify
app.className = tw.flex.flexCol.gap(8).p(8).items.center.justify.center.minH('100vh')

// Heading — token API for text size and font weight
const heading = document.createElement('h1')
heading.className = tw.text.lg.font.bold.textColor.slate900
heading.textContent = 'Typewriting Class + Vanilla TS'
app.appendChild(heading)

// Card with hover effect — token API for bg, rounded, shadow
const card = document.createElement('div')
card.className = tw
  .p(6).bg.white.rounded.lg.shadow.md
  .flex.flexCol.gap(4).items.center
  .transitionAll.duration(200)
  .hover(tw.shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)').bg('blue-50'))

const cardText = document.createElement('p')
cardText.className = tw.textColor.slate700
cardText.textContent = 'Hover this card to see the effect.'
card.appendChild(cardText)

const badge = document.createElement('span')
badge.className = tw
  .p(2).bg.blue500.textColor.white.rounded.lg.font.bold
badge.textContent = 'Styled with Typewriting Class'
card.appendChild(badge)

app.appendChild(card)

// Opacity demo — standalone bg with callable opacity
const opacityRow = document.createElement('div')
opacityRow.className = tw.flex.flexRow.gap(4)

for (const opacity of [100, 75, 50, 25]) {
  const box = document.createElement('div')
  box.className = cx(bg.blue500(opacity), rounded.lg, p(4))
  box.textContent = `${opacity}%`
  box.style.color = 'white'
  box.style.fontWeight = '700'
  opacityRow.appendChild(box)
}
app.appendChild(opacityRow)

// Gradient button with transition
const gradBtn = document.createElement('button')
gradBtn.textContent = 'Gradient Button'
gradBtn.className = tw
  .px(6).py(3).rounded.lg
  .bgGradient('to right').gradientFrom('indigo-500').gradientTo('purple-600')
  .textColor.white.font.semibold
  .transitionAll.duration(200)
  .cursor.pointer.border(0).text('1rem')
  .hover(tw.opacity(0.9).shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)'))
app.appendChild(gradBtn)

// Filter demo
const filterRow = document.createElement('div')
filterRow.className = tw.flex.flexRow.gap(4)

const normalBox = document.createElement('div')
normalBox.textContent = 'Normal'
normalBox.className = tw
  .bg.emerald400.p(4).rounded.lg
  .textColor.white.font.bold.text.sm

const blurredBox = document.createElement('div')
blurredBox.textContent = 'Blurred'
blurredBox.className = tw
  .bg.emerald400.blur('2px')
  .p(4).rounded.lg
  .textColor.white.font.bold.text.sm

filterRow.append(normalBox, blurredBox)
app.appendChild(filterRow)
