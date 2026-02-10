import { tw } from 'typewritingclass'

export default function Home() {
  return (
    <div className={tw.flex.flexCol.gap(8).p(8).items('center').justify('center').minH('100vh').value}>
      <h1 className={tw.text('lg').font('700').textColor('slate-900').value}>
        Typewriting Class + Next.js
      </h1>

      <div className={tw
        .p(6).bg('white').rounded('lg').shadow('md')
        .flex.flexCol.gap(4).items('center')
        .transitionAll.duration(200)
        .hover(tw.shadow('0 20px 25px -5px rgb(0 0 0 / 0.1)').bg('blue-50'))
        .value
      }>
        <p className={tw.textColor('slate-700').value}>
          Hover this card to see the effect.
        </p>
        <span className={tw
          .p(2).bg('blue-500').textColor('white').rounded('lg').font('700')
          .value
        }>
          Styled with Typewriting Class
        </span>
      </div>

      {/* Opacity demo */}
      <div className={tw.flex.flexRow.gap(4).value}>
        <div className={tw.bg('rgb(59 130 246 / 1)').rounded('lg').p(4).value}>
          <span className={tw.textColor('white').font('700').value}>100%</span>
        </div>
        <div className={tw.bg('rgb(59 130 246 / 0.75)').rounded('lg').p(4).value}>
          <span className={tw.textColor('white').font('700').value}>75%</span>
        </div>
        <div className={tw.bg('rgb(59 130 246 / 0.5)').rounded('lg').p(4).value}>
          <span className={tw.textColor('white').font('700').value}>50%</span>
        </div>
        <div className={tw.bg('rgb(59 130 246 / 0.25)').rounded('lg').p(4).value}>
          <span className={tw.textColor('white').font('700').value}>25%</span>
        </div>
      </div>

      {/* Gradient button with transition */}
      <button className={tw
        .px(6).py(3).rounded('lg')
        .bgGradient('to right').gradientFrom('indigo-500').gradientTo('purple-600')
        .textColor('white').font('600')
        .transitionAll.duration(200)
        .cursor('pointer').border(0).text('1rem')
        .hover(tw.opacity(0.9).shadow('0 10px 15px -3px rgb(0 0 0 / 0.2)'))
        .value
      }>
        Gradient Button
      </button>

      {/* Filter demo */}
      <div className={tw.flex.flexRow.gap(4).value}>
        <div className={tw
          .bg('emerald-400').p(4).rounded('lg')
          .textColor('white').font('700').text('0.875rem')
          .value
        }>
          Normal
        </div>
        <div className={tw
          .bg('emerald-400').blur('2px')
          .p(4).rounded('lg')
          .textColor('white').font('700').text('0.875rem')
          .value
        }>
          Blurred
        </div>
      </div>
    </div>
  )
}
