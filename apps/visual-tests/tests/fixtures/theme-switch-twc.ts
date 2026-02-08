import { cx, p, bg, textColor, text, font, rounded, shadow, flexCol, gap } from 'typewritingclass'
import { createTheme, injectTheme, setTheme } from 'typewritingclass'
import { base, lg, bold, semibold } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { lg as lgShadow } from 'typewritingclass/theme/shadows'

// Create and inject a custom theme
const customTheme = createTheme({
  name: 'custom',
  colors: {
    primary: { 500: '#8b5cf6' },
    surface: { 50: '#faf5ff' },
    text: { 900: '#581c87', 500: '#7c3aed' },
  },
})

injectTheme(customTheme.cssText)
setTheme('custom')

const app = document.getElementById('app')!
const container = document.createElement('div')
container.className = cx(flexCol(), gap(6), p(8))

// Use the theme vars in a card
const card = document.createElement('div')
card.className = cx(
  bg(customTheme.vars.colors.surface[50]),
  rounded(lgRadius),
  shadow(lgShadow),
  p(6),
  flexCol(),
  gap(3),
)

const title = document.createElement('h3')
title.className = cx(text(lg), font(bold), textColor(customTheme.vars.colors.text[900]))
title.textContent = 'Custom Theme Card'

const body = document.createElement('p')
body.className = cx(text(base), textColor(customTheme.vars.colors.text[500]))
body.textContent = 'This card uses custom theme variables via createTheme()'

const badge = document.createElement('span')
badge.className = cx(
  bg(customTheme.vars.colors.primary[500]),
  textColor('#ffffff'),
  text(base),
  font(semibold),
  rounded(lgRadius),
  p(2),
)
badge.textContent = 'Custom Theme Active'

card.append(title, body, badge)
container.appendChild(card)
app.appendChild(container)
