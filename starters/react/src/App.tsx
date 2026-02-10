import React from 'react'
import { tw, cx, bg, rounded, p } from 'typewritingclass'

export function App() {
  return (
    <div className={tw.flex.flexCol.gap(8).p(8).items.center.justify.center.minH('100vh')}>
      <h1 className={tw.text.lg.font.bold.textColor.slate900}>
        Typewriting Class + React
      </h1>

      <div className={tw
        .p(6).bg.white.rounded.lg.shadow.md
        .flex.flexCol.gap(4).items.center
        .transitionAll.duration(200)
        .hover(tw.shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)').bg('blue-50'))
      }>
        <p className={tw.textColor.slate700}>
          Hover this card to see the effect.
        </p>
        <span className={tw
          .p(2).bg.blue500.textColor.white.rounded.lg.font.bold
        }>
          Styled with Typewriting Class
        </span>
      </div>

      {/* Opacity demo — standalone bg with callable opacity */}
      <div className={tw.flex.flexRow.gap(4)}>
        {[100, 75, 50, 25].map(opacity => (
          <div key={opacity} className={cx(bg.blue500(opacity), rounded.lg, p(4))}>
            <span className={tw.textColor.white.font.bold}>{opacity}%</span>
          </div>
        ))}
      </div>

      {/* Gradient button with transition */}
      <button className={tw
        .px(6).py(3).rounded.lg
        .bgGradient('to right').gradientFrom('indigo-500').gradientTo('purple-600')
        .textColor.white.font.semibold
        .transitionAll.duration(200)
        .cursor.pointer.border(0).text('1rem')
        .hover(tw.opacity(0.9).shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)'))
      }>
        Gradient Button
      </button>

      {/* Filter demo */}
      <div className={tw.flex.flexRow.gap(4)}>
        <div className={tw
          .bg.emerald400.p(4).rounded.lg
          .textColor.white.font.bold.text.sm
        }>
          Normal
        </div>
        <div className={tw
          .bg.emerald400.blur('2px')
          .p(4).rounded.lg
          .textColor.white.font.bold.text.sm
        }>
          Blurred
        </div>
      </div>
    </div>
  )
}
