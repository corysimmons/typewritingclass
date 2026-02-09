import { cx, flex, flexCol, gap, p, text, font, textColor, textAlign, tracking, leading } from 'typewritingclass'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexCol(), gap(2), p(8))

const sizes = [
  { name: 'xs', token: 'xs' as const },
  { name: 'sm', token: 'sm' as const },
  { name: 'base', token: 'base' as const },
  { name: 'lg', token: 'lg' as const },
  { name: 'xl', token: 'xl' as const },
  { name: '2xl', token: '2xl' as const },
  { name: '3xl', token: '3xl' as const },
  { name: '4xl', token: '4xl' as const },
]

for (const { name, token } of sizes) {
  const el = document.createElement('p')
  el.className = cx(text(token), textColor('#111827'))
  el.textContent = `${name} — The quick brown fox`
  container.appendChild(el)
}

// Weight demo
const weightRow = document.createElement('div')
weightRow.className = cx(flex(), flexCol(), gap(1))
const weights = [
  { name: 'thin', val: 'thin' as const },
  { name: 'light', val: 'light' as const },
  { name: 'normal', val: 'normal' as const },
  { name: 'medium', val: 'medium' as const },
  { name: 'semibold', val: 'semibold' as const },
  { name: 'bold', val: 'bold' as const },
  { name: 'extrabold', val: 'extrabold' as const },
]
for (const { name, val } of weights) {
  const el = document.createElement('p')
  el.className = cx(text('base'), font(val), textColor('#111827'))
  el.textContent = `${name} — The quick brown fox`
  weightRow.appendChild(el)
}
container.appendChild(weightRow)

app.appendChild(container)
