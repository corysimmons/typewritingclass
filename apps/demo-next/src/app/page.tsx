import { tw } from 'typewritingclass'
import { ColorPickerDemo } from './color-picker'

export default function Home() {
  return (
    <div className={tw.maxW('800px').mx('auto').p(8).flex.flexCol.gap(10)}>
      <header className={tw.flex.flexCol.gap(2)}>
        <h1 className={tw.text('2xl').font('bold').textColor('slate-900')}>
          Typewriting Class — Next.js Demo
        </h1>
        <p className={tw.text('base').textColor('slate-500')}>
          Server-rendered styles with App Router. This page is a React Server Component.
        </p>
      </header>

      {/* Static card grid — all values are string literals for compile-time extraction */}
      <section className={tw.flex.flexCol.gap(4)}>
        <h2 className={tw.text('xl').font('600').textColor('slate-800')}>
          Server-Rendered Cards
        </h2>
        <div className={tw.grid.gridCols(3).gap(4)}>
          <div className={tw
            .px(6).py(4).rounded('lg').shadow('md')
            .bgGradient('to right').gradientFrom('#f43f5e').gradientVia('#fbbf24').gradientTo('#fde68a')
            .textColor('#ffffff').font('600').textAlign('center')
          }>
            Sunset
          </div>
          <div className={tw
            .px(6).py(4).rounded('lg').shadow('md')
            .bgGradient('to right').gradientFrom('#3b82f6').gradientVia('#22d3ee').gradientTo('#99f6e4')
            .textColor('#ffffff').font('600').textAlign('center')
          }>
            Ocean
          </div>
          <div className={tw
            .px(6).py(4).rounded('lg').shadow('md')
            .bgGradient('to right').gradientFrom('#a855f7').gradientVia('#a78bfa').gradientTo('#a5b4fc')
            .textColor('#ffffff').font('600').textAlign('center')
          }>
            Twilight
          </div>
        </div>
      </section>

      {/* Feature cards — static chains for compile-time extraction */}
      <section className={tw.flex.flexCol.gap(4)}>
        <h2 className={tw.text('xl').font('600').textColor('slate-800')}>
          Features
        </h2>
        <div className={tw.grid.gridCols(2).gap(4)}>
          <div className={tw
            .p(6).rounded('lg')
            .border('1px').borderColor('slate-200')
            .flex.flexCol.gap(2)
          }>
            <h3 className={tw.text('lg').font('600').textColor('slate-800')}>
              Type-Safe
            </h3>
            <p className={tw.text('base').textColor('slate-500')}>
              Full TypeScript types for every utility, modifier, and theme token.
            </p>
          </div>
          <div className={tw
            .p(6).rounded('lg')
            .border('1px').borderColor('slate-200')
            .flex.flexCol.gap(2)
          }>
            <h3 className={tw.text('lg').font('600').textColor('slate-800')}>
              Zero Runtime
            </h3>
            <p className={tw.text('base').textColor('slate-500')}>
              Static extraction at build time — no CSS-in-JS overhead.
            </p>
          </div>
          <div className={tw
            .p(6).rounded('lg')
            .border('1px').borderColor('slate-200')
            .flex.flexCol.gap(2)
          }>
            <h3 className={tw.text('lg').font('600').textColor('slate-800')}>
              SSR Ready
            </h3>
            <p className={tw.text('base').textColor('slate-500')}>
              Works in React Server Components with no configuration.
            </p>
          </div>
          <div className={tw
            .p(6).rounded('lg')
            .border('1px').borderColor('slate-200')
            .flex.flexCol.gap(2)
          }>
            <h3 className={tw.text('lg').font('600').textColor('slate-800')}>
              Tailwind Parity
            </h3>
            <p className={tw.text('base').textColor('slate-500')}>
              1:1 Tailwind CSS v3 utility and modifier coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Client component demo */}
      <ColorPickerDemo />
    </div>
  )
}
