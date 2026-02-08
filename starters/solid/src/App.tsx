import {
  cx, css, p, bg, textColor, text, font, rounded, shadow,
  flex, flexCol, gap, items, justify, minH, when,
} from 'typewritingclass'
import { hover } from 'typewritingclass'
import { blue, white, slate } from 'typewritingclass/theme/colors'
import { bold, lg } from 'typewritingclass/theme/typography'
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
    </div>
  )
}
