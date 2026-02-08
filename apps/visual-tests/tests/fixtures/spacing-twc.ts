import { cx, p, px, py, m, gap, flex, flexWrap, bg, w, h, rounded } from 'typewritingclass'

const app = document.getElementById('app')!

const container = document.createElement('div')
container.className = cx(flex(), flexWrap(), gap(4), p(8))

const sizes = [1, 2, 4, 6, 8, 12, 16] as const
for (const s of sizes) {
  const box = document.createElement('div')
  box.className = cx(w(s), h(s), bg('#3b82f6'), rounded())
  container.appendChild(box)
}

// Padding demo
const padBox = document.createElement('div')
padBox.className = cx(p(8), bg('#e5e7eb'), m(4), rounded())
padBox.innerHTML = `<div class="${cx(bg('#3b82f6'), w('100%'), h(8), rounded())}"></div>`
container.appendChild(padBox)

// Asymmetric padding demo
const asymBox = document.createElement('div')
asymBox.className = cx(px(12), py(4), bg('#fecaca'), m(4), rounded())
asymBox.innerHTML = `<div class="${cx(bg('#ef4444'), w('100%'), h(8), rounded())}"></div>`
container.appendChild(asymBox)

app.appendChild(container)
