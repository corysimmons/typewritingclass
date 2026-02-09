import { tw, css } from 'typewritingclass'
import { ColorPickerDemo } from './color-picker'

export default function Home() {
  return (
    <div className={`${tw(css({ 'max-width': '800px', margin: '0 auto' })).p(8).flex.flexCol.gap(10)}`}>
      <header className={`${tw.flex.flexCol.gap(2)}`}>
        <h1 className={`${tw.text('2xl').font('bold').textColor('slate-900')}`}>
          Typewriting Class — Next.js Demo
        </h1>
        <p className={`${tw.text('base').textColor('slate-500')}`}>
          Server-rendered styles with App Router. This page is a React Server Component.
        </p>
      </header>

      {/* Static card grid — rendered on the server */}
      <section className={`${tw.flex.flexCol.gap(4)}`}>
        <h2 className={`${tw.text('xl').font('600').textColor('slate-800')}`}>
          Server-Rendered Cards
        </h2>
        <div className={`${tw.grid.gridCols(3).gap(4)}`}>
          {[
            { label: 'Sunset', from: '#f43f5e', via: '#fbbf24', to: '#fde68a' },
            { label: 'Ocean', from: '#3b82f6', via: '#22d3ee', to: '#99f6e4' },
            { label: 'Twilight', from: '#a855f7', via: '#a78bfa', to: '#a5b4fc' },
          ].map(({ label, from, via, to }) => (
            <div key={label} className={`${tw
              .px(6).py(4)
              .rounded('lg').shadow('md')
              .bgGradient('to right')
              .gradientFrom(from).gradientVia(via).gradientTo(to)
              .textColor('#ffffff').font('600')
              (css({ 'text-align': 'center' }))
            }`}>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className={`${tw.flex.flexCol.gap(4)}`}>
        <h2 className={`${tw.text('xl').font('600').textColor('slate-800')}`}>
          Features
        </h2>
        <div className={`${tw.grid.gridCols(2).gap(4)}`}>
          {[
            { title: 'Type-Safe', desc: 'Full TypeScript types for every utility, modifier, and theme token.' },
            { title: 'Zero Runtime', desc: 'Static extraction at build time — no CSS-in-JS overhead.' },
            { title: 'SSR Ready', desc: 'Works in React Server Components with no configuration.' },
            { title: 'Tailwind Parity', desc: '1:1 Tailwind CSS v3 utility and modifier coverage.' },
          ].map(({ title, desc }) => (
            <div key={title} className={`${tw
              .p(6).rounded('lg')
              .border('1px').borderColor('slate-200')
              .flex.flexCol.gap(2)
              .transitionColors.duration(200)
              .hover(tw.borderColor('blue-300').shadow('lg'))
            }`}>
              <h3 className={`${tw.text('lg').font('600').textColor('slate-800')}`}>
                {title}
              </h3>
              <p className={`${tw.text('base').textColor('slate-500')}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Client component demo */}
      <ColorPickerDemo />
    </div>
  )
}
