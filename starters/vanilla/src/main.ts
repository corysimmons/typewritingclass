import 'typewritingclass/preflight.css'
import { tw } from 'typewritingclass'

const app = document.getElementById('app')!

app.className = tw.flex.flexCol.gap(8).p(8).items.center.justify.center.minH('100vh')

const heading = document.createElement('h1')
heading.className = tw.text.lg.font.bold.textColor.slate900
heading.textContent = 'Typewriting Class + Vanilla TS'
app.appendChild(heading)

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
badge.className = tw.p(2).bg.blue500.textColor.white.rounded.lg.font.bold
badge.textContent = 'Styled with Typewriting Class'
card.appendChild(badge)

app.appendChild(card)

const opacityRow = document.createElement('div')
opacityRow.className = tw.flex.flexRow.gap(4)

const box100 = document.createElement('div')
box100.className = tw.bg.blue500.rounded.lg.p(4).textColor.white.font.bold
box100.textContent = '100%'
opacityRow.appendChild(box100)

const box75 = document.createElement('div')
box75.className = tw.bg.blue500(75).rounded.lg.p(4).textColor.white.font.bold
box75.textContent = '75%'
opacityRow.appendChild(box75)

const box50 = document.createElement('div')
box50.className = tw.bg.blue500(50).rounded.lg.p(4).textColor.white.font.bold
box50.textContent = '50%'
opacityRow.appendChild(box50)

const box25 = document.createElement('div')
box25.className = tw.bg.blue500(25).rounded.lg.p(4).textColor.white.font.bold
box25.textContent = '25%'
opacityRow.appendChild(box25)

app.appendChild(opacityRow)

const gradBtn = document.createElement('button')
gradBtn.textContent = 'Gradient Button'
gradBtn.className = tw
  .px(6).py(3).rounded.lg
  .bgGradient.toRight.gradientFrom('indigo-500').gradientTo('purple-600')
  .textColor.white.font.semibold
  .transitionAll.duration(200)
  .cursor.pointer.border(0).text('1rem')
  .hover(tw.opacity(0.9).shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)'))
app.appendChild(gradBtn)

const filterRow = document.createElement('div')
filterRow.className = tw.flex.flexRow.gap(4)

const normalBox = document.createElement('div')
normalBox.textContent = 'Normal'
normalBox.className = tw.bg.emerald400.p(4).rounded.lg.textColor.white.font.bold.text.sm

const blurredBox = document.createElement('div')
blurredBox.textContent = 'Blurred'
blurredBox.className = tw.bg.emerald400.blur('2px').p(4).rounded.lg.textColor.white.font.bold.text.sm

filterRow.append(normalBox, blurredBox)
app.appendChild(filterRow)
