import { dcx, dynamic, p, bg, textColor, text, font, rounded, shadow, w, h, flexCol, flex, gap, items, justify } from 'typewritingclass'
import { base, bold } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow } from 'typewritingclass/theme/shadows'

const app = document.getElementById('app')!
const container = document.createElement('div')

// Use dcx() for static container styling
const containerStyle = dcx(flex(), flexCol(), gap(6), p(8))
container.className = containerStyle.className
Object.assign(container.style, containerStyle.style)

// Dynamic box 1: red background via dynamic()
const box1 = document.createElement('div')
const box1Style = dcx(
  w(32), h(16),
  bg(dynamic('#ef4444')),
  rounded(lgRadius),
  shadow(mdShadow),
  flex(), items('center'), justify('center'),
  textColor('#ffffff'), text(base), font(bold),
)
box1.className = box1Style.className
Object.assign(box1.style, box1Style.style)
box1.textContent = 'Dynamic Red'
container.appendChild(box1)

// Dynamic box 2: blue background via dynamic()
const box2 = document.createElement('div')
const box2Style = dcx(
  w(32), h(16),
  bg(dynamic('#3b82f6')),
  rounded(lgRadius),
  shadow(mdShadow),
  flex(), items('center'), justify('center'),
  textColor('#ffffff'), text(base), font(bold),
)
box2.className = box2Style.className
Object.assign(box2.style, box2Style.style)
box2.textContent = 'Dynamic Blue'
container.appendChild(box2)

// Dynamic box 3: green background with dynamic width
const box3 = document.createElement('div')
const box3Style = dcx(
  w(dynamic('12rem')), h(16),
  bg(dynamic('#22c55e')),
  rounded(lgRadius),
  shadow(mdShadow),
  flex(), items('center'), justify('center'),
  textColor('#ffffff'), text(base), font(bold),
)
box3.className = box3Style.className
Object.assign(box3.style, box3Style.style)
box3.textContent = 'Dynamic Width'
container.appendChild(box3)

app.appendChild(container)
