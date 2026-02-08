import { cx, flex, flexWrap, gap, p, w, h, bg, textColor, rounded, text, font, items, justify } from 'typewritingclass'
import { blue, red, green, amber, indigo, slate } from 'typewritingclass/theme/colors'
import { base, bold } from 'typewritingclass/theme/typography'

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flex(), flexWrap(), gap(4), p(8))

const palette = [
  { name: 'Blue', shades: blue },
  { name: 'Red', shades: red },
  { name: 'Green', shades: green },
  { name: 'Amber', shades: amber },
  { name: 'Indigo', shades: indigo },
  { name: 'Slate', shades: slate },
]

for (const { name, shades } of palette) {
  const row = document.createElement('div')
  row.className = cx(flex(), gap(1))

  for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const) {
    const swatch = document.createElement('div')
    swatch.className = cx(
      w(10), h(10),
      bg(shades[shade]),
      rounded(),
      flex(), items('center'), justify('center'),
      textColor(shade >= 500 ? '#ffffff' : '#000000'),
      text(base), font(bold),
    )
    swatch.textContent = String(shade)
    row.appendChild(swatch)
  }
  container.appendChild(row)
}

app.appendChild(container)
