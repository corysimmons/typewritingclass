import { cx, flexCol, gap, p, text, font, textColor, textAlign, tracking, leading } from 'typewritingclass'
import { xs, sm, base, lg, xl, _2xl, _3xl, _4xl } from 'typewritingclass/theme/typography'
import * as typo from 'typewritingclass/theme/typography'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flexCol(), gap(2), p(8))

const sizes = [
  { name: 'xs', token: xs },
  { name: 'sm', token: sm },
  { name: 'base', token: base },
  { name: 'lg', token: lg },
  { name: 'xl', token: xl },
  { name: '2xl', token: _2xl },
  { name: '3xl', token: _3xl },
  { name: '4xl', token: _4xl },
]

for (const { name, token } of sizes) {
  const el = document.createElement('p')
  el.className = cx(text(token), textColor('#111827'))
  el.textContent = `${name} — The quick brown fox`
  container.appendChild(el)
}

// Weight demo
const weightRow = document.createElement('div')
weightRow.className = cx(flexCol(), gap(1))
const weights = [
  { name: 'thin', val: typo.thin },
  { name: 'light', val: typo.light },
  { name: 'normal', val: typo.normal },
  { name: 'medium', val: typo.medium },
  { name: 'semibold', val: typo.semibold },
  { name: 'bold', val: typo.bold },
  { name: 'extrabold', val: typo.extrabold },
]
for (const { name, val } of weights) {
  const el = document.createElement('p')
  el.className = cx(text(base), font(val), textColor('#111827'))
  el.textContent = `${name} — The quick brown fox`
  weightRow.appendChild(el)
}
container.appendChild(weightRow)

app.appendChild(container)
