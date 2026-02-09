import { tw } from 'typewritingclass'
import { lg } from 'typewritingclass/theme/typography'

export function App() {
  return (
    <div class={tw.flex.flexCol.gap(8).p(8).items('center').justify('center').minH('100vh')}>
      <h1 class={tw.text(lg).font('700').textColor('slate-900')}>
        Typewriting Class + Solid
      </h1>

      <div class={tw
        .p(6).bg('white').rounded('lg').shadow('md')
        .flex.flexCol.gap(4).items('center')
        .transitionAll.duration(200)
        .hover(tw.shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)').bg('blue-50'))
      }>
        <p class={tw.textColor('slate-700')}>
          Hover this card to see the effect.
        </p>
        <span class={tw
          .p(2).bg('blue-500').textColor('white').rounded('lg').font('700')
        }>
          Styled with Typewriting Class
        </span>
      </div>

      {/* Gradient button with transition */}
      <button class={tw
        .px(6).py(3).rounded('lg')
        .bgGradient('to right').gradientFrom('indigo-500').gradientTo('purple-600')
        .textColor('white').font('600')
        .transitionAll.duration(200)
        .cursor('pointer').border(0).text('1rem')
        .hover(tw.opacity(0.9).shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)'))
      }>
        Gradient Button
      </button>

      {/* Filter demo */}
      <div class={tw.flex.flexRow.gap(4)}>
        <div class={tw
          .bg('emerald-400').p(4).rounded('lg')
          .textColor('white').font('700').text('0.875rem')
        }>
          Normal
        </div>
        <div class={tw
          .bg('emerald-400').blur('2px')
          .p(4).rounded('lg')
          .textColor('white').font('700').text('0.875rem')
        }>
          Blurred
        </div>
      </div>
    </div>
  )
}
