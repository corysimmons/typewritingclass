import {
  cx, css, p, px, py, bg, textColor, text, font, rounded, shadow,
  flex, flexCol, flexRow, gap, items, justify, minH, when,
  bgGradient, gradientFrom, gradientTo,
  transitionAll, duration,
  opacity, blur,
} from 'typewritingclass'
import { hover } from 'typewritingclass'
import { blue, white, slate, indigo, purple, emerald } from 'typewritingclass/theme/colors'
import { bold, semibold, lg } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow } from 'typewritingclass/theme/shadows'

export function App() {
  return (
    <div class={cx(
      flexCol(), gap(8), p(8),
      items('center'), justify('center'),
      minH('100vh'),
    )}>
      <h1 class={cx(text(lg), font(bold), textColor(slate[900]))}>
        typewritingclass + Solid
      </h1>

      <div class={cx(
        p(6),
        bg(white),
        rounded(lgRadius),
        shadow(mdShadow),
        flexCol(), gap(4), items('center'),
        css({ transition: 'all 200ms ease' }),
        when(hover)(shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)'), bg(blue[50])),
      )}>
        <p class={cx(textColor(slate[700]))}>
          Hover this card to see the effect.
        </p>
        <span class={cx(
          p(2),
          bg(blue[500]),
          textColor(white),
          rounded(lgRadius),
          font(bold),
        )}>
          Styled with typewritingclass
        </span>
      </div>

      {/* Gradient button with transition */}
      <button class={cx(
        px(6), py(3),
        rounded(lgRadius),
        bgGradient('to right'),
        gradientFrom(indigo[500]),
        gradientTo(purple[600]),
        textColor(white),
        font(semibold),
        transitionAll(), duration(200),
        css({ border: 'none', cursor: 'pointer', 'font-size': '1rem' }),
        when(hover)(opacity(0.9), shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)')),
      )}>
        Gradient Button
      </button>

      {/* Filter demo */}
      <div class={cx(flexRow(), gap(4))}>
        <div class={cx(
          bg(emerald[400]),
          p(4), rounded(lgRadius),
          textColor(white), font(bold),
          css({ 'font-size': '0.875rem' }),
        )}>
          Normal
        </div>
        <div class={cx(
          bg(emerald[400]),
          blur('2px'),
          p(4), rounded(lgRadius),
          textColor(white), font(bold),
          css({ 'font-size': '0.875rem' }),
        )}>
          Blurred
        </div>
      </div>
    </div>
  )
}
