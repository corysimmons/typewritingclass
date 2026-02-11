import { tw } from 'typewritingclass'

export function App() {
  return (
    <div class={tw.flex.flexCol.gap(8).p(8).items.center.justify.center.minH('100vh')}>
      <h1 class={tw.text.lg.font.bold.textColor.slate900}>
        Typewriting Class + Solid
      </h1>

      <div class={tw
        .p(6).bg.white.rounded.lg.shadow.md
        .flex.flexCol.gap(4).items.center
        .transitionAll.duration(200)
        .hover(tw.shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)').bg('blue-50'))
      }>
        <p class={tw.textColor.slate700}>
          Hover this card to see the effect.
        </p>
        <span class={tw.p(2).bg.blue500.textColor.white.rounded.lg.font.bold}>
          Styled with Typewriting Class
        </span>
      </div>

      <div class={tw.flex.flexRow.gap(4)}>
        <div class={tw.bg.blue500.rounded.lg.p(4).textColor.white.font.bold}>100%</div>
        <div class={tw.bg.blue500(75).rounded.lg.p(4).textColor.white.font.bold}>75%</div>
        <div class={tw.bg.blue500(50).rounded.lg.p(4).textColor.white.font.bold}>50%</div>
        <div class={tw.bg.blue500(25).rounded.lg.p(4).textColor.white.font.bold}>25%</div>
      </div>

      <button class={tw
        .px(6).py(3).rounded.lg
        .bgGradient.toRight.gradientFrom('indigo-500').gradientTo('purple-600')
        .textColor.white.font.semibold
        .transitionAll.duration(200)
        .cursor.pointer.border(0).text('1rem')
        .hover(tw.opacity(0.9).shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)'))
      }>
        Gradient Button
      </button>

      <div class={tw.flex.flexRow.gap(4)}>
        <div class={tw.bg.emerald400.p(4).rounded.lg.textColor.white.font.bold.text.sm}>
          Normal
        </div>
        <div class={tw.bg.emerald400.blur('2px').p(4).rounded.lg.textColor.white.font.bold.text.sm}>
          Blurred
        </div>
      </div>
    </div>
  )
}
