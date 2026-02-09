import { cx, flex, flexWrap, gap, p, w, h, bg, rounded, border, borderColor, shadow, opacity } from 'typewritingclass'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexWrap(), gap(6), p(8))

// Border radius showcase
const radii = [
  { name: 'none', val: 'none' as const },
  { name: 'sm', val: 'sm' as const },
  { name: 'DEFAULT', val: 'DEFAULT' as const },
  { name: 'md', val: 'md' as const },
  { name: 'lg', val: 'lg' as const },
  { name: 'xl', val: 'xl' as const },
  { name: '2xl', val: '2xl' as const },
  { name: '3xl', val: '3xl' as const },
  { name: 'full', val: 'full' as const },
]
for (const { val } of radii) {
  const box = document.createElement('div')
  box.className = cx(w(16), h(16), bg('#3b82f6'), rounded(val))
  container.appendChild(box)
}

// Shadow showcase
const shadowVals = ['sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl'] as const
for (const val of shadowVals) {
  const box = document.createElement('div')
  box.className = cx(w(16), h(16), bg('#ffffff'), rounded('lg'), shadow(val))
  container.appendChild(box)
}

// Border + opacity
const bordered = document.createElement('div')
bordered.className = cx(w(16), h(16), bg('#fef3c7'), border('2px'), borderColor('#f59e0b'), rounded('lg'))
container.appendChild(bordered)

const faded = document.createElement('div')
faded.className = cx(w(16), h(16), bg('#3b82f6'), rounded('lg'), opacity(0.5))
container.appendChild(faded)

app.appendChild(container)
