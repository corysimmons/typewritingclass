import {
  cx, flex, flexCol, flexRow, grid, gridCols, gap,
  p, w, h, bg, rounded, items, justify, textColor, text, font,
} from 'typewritingclass'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexCol(), gap(8), p(8))

// Flex row
const flexSection = document.createElement('div')
flexSection.className = cx(flex(), gap(4), items('center'))
for (let i = 0; i < 4; i++) {
  const box = document.createElement('div')
  box.className = cx(w(16), h(16), bg('#3b82f6'), rounded(), flex(), items('center'), justify('center'), textColor('#ffffff'), text('base'), font('bold'))
  box.textContent = String(i + 1)
  flexSection.appendChild(box)
}
container.appendChild(flexSection)

// Grid
const gridSection = document.createElement('div')
gridSection.className = cx(grid(3), gap(4))
for (let i = 0; i < 6; i++) {
  const box = document.createElement('div')
  box.className = cx(h(16), bg('#8b5cf6'), rounded(), flex(), items('center'), justify('center'), textColor('#ffffff'), text('base'), font('bold'))
  box.textContent = String(i + 1)
  gridSection.appendChild(box)
}
container.appendChild(gridSection)

// Flex col
const colSection = document.createElement('div')
colSection.className = cx(flex(), flexCol(), gap(2), w(64))
for (let i = 0; i < 3; i++) {
  const box = document.createElement('div')
  box.className = cx(h(10), bg('#10b981'), rounded(), flex(), items('center'), justify('center'), textColor('#ffffff'), text('base'), font('bold'))
  box.textContent = `Row ${i + 1}`
  colSection.appendChild(box)
}
container.appendChild(colSection)

app.appendChild(container)
