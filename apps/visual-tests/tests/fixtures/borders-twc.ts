import { cx, flex, flexWrap, gap, p, w, h, bg, rounded, border, borderColor, shadow, opacity } from 'typewritingclass'
import * as borders from 'typewritingclass/theme/borders'
import * as shadows from 'typewritingclass/theme/shadows'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexWrap(), gap(6), p(8))

// Border radius showcase
const radii = [
  { name: 'none', val: borders.none },
  { name: 'sm', val: borders.sm },
  { name: 'DEFAULT', val: borders.DEFAULT },
  { name: 'md', val: borders.md },
  { name: 'lg', val: borders.lg },
  { name: 'xl', val: borders.xl },
  { name: '2xl', val: borders._2xl },
  { name: '3xl', val: borders._3xl },
  { name: 'full', val: borders.full },
]
for (const { val } of radii) {
  const box = document.createElement('div')
  box.className = cx(w(16), h(16), bg('#3b82f6'), rounded(val))
  container.appendChild(box)
}

// Shadow showcase
const shadowVals = [
  shadows.sm,
  shadows.DEFAULT,
  shadows.md,
  shadows.lg,
  shadows.xl,
  shadows._2xl,
]
for (const val of shadowVals) {
  const box = document.createElement('div')
  box.className = cx(w(16), h(16), bg('#ffffff'), rounded(borders.lg), shadow(val))
  container.appendChild(box)
}

// Border + opacity
const bordered = document.createElement('div')
bordered.className = cx(w(16), h(16), bg('#fef3c7'), border('2px'), borderColor('#f59e0b'), rounded(borders.lg))
container.appendChild(bordered)

const faded = document.createElement('div')
faded.className = cx(w(16), h(16), bg('#3b82f6'), rounded(borders.lg), opacity(0.5))
container.appendChild(faded)

app.appendChild(container)
