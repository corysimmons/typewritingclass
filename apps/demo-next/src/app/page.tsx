import {
  cx, css,
  p, px, py, m, bg, textColor, text, font, rounded, shadow,
  w, h, flex, flexCol, flexRow, flexWrap, gap, items, justify,
  border, borderColor, grid, gridCols, opacity,
  bgGradient, gradientFrom, gradientVia, gradientTo,
  when, hover, transitionColors, duration,
} from 'typewritingclass'
import { blue, indigo, emerald, rose, amber, cyan, violet, purple, slate } from 'typewritingclass/theme/colors'
import { base, lg, xl, _2xl, bold, semibold, medium } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow, lg as lgShadow } from 'typewritingclass/theme/shadows'
import { ColorPickerDemo } from './color-picker'

export default function Home() {
  return (
    <div className={cx(
      css({ 'max-width': '800px', margin: '0 auto' }),
      p(8), flex(), flexCol(), gap(10),
    )}>
      <header className={cx(flex(), flexCol(), gap(2))}>
        <h1 className={cx(text(_2xl), font(bold), textColor(slate[900]))}>
          Typewriting Class — Next.js Demo
        </h1>
        <p className={cx(text(base), textColor(slate[500]))}>
          Server-rendered styles with App Router. This page is a React Server Component.
        </p>
      </header>

      {/* Static card grid — rendered on the server */}
      <section className={cx(flex(), flexCol(), gap(4))}>
        <h2 className={cx(text(xl), font(semibold), textColor(slate[800]))}>
          Server-Rendered Cards
        </h2>
        <div className={cx(grid(), gridCols(3), gap(4))}>
          {[
            { label: 'Sunset', from: rose[500], via: amber[400], to: '#fde68a' },
            { label: 'Ocean', from: blue[500], via: cyan[400], to: '#99f6e4' },
            { label: 'Twilight', from: purple[500], via: violet[400], to: indigo[300] },
          ].map(({ label, from, via, to }) => (
            <div key={label} className={cx(
              px(6), py(4),
              rounded(lgRadius), shadow(mdShadow),
              bgGradient('to right'),
              gradientFrom(from), gradientVia(via), gradientTo(to),
              textColor('#ffffff'), font(semibold),
              css({ 'text-align': 'center' }),
            )}>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className={cx(flex(), flexCol(), gap(4))}>
        <h2 className={cx(text(xl), font(semibold), textColor(slate[800]))}>
          Features
        </h2>
        <div className={cx(grid(), gridCols(2), gap(4))}>
          {[
            { title: 'Type-Safe', desc: 'Full TypeScript types for every utility, modifier, and theme token.' },
            { title: 'Zero Runtime', desc: 'Static extraction at build time — no CSS-in-JS overhead.' },
            { title: 'SSR Ready', desc: 'Works in React Server Components with no configuration.' },
            { title: 'Tailwind Parity', desc: '1:1 Tailwind CSS v3 utility and modifier coverage.' },
          ].map(({ title, desc }) => (
            <div key={title} className={cx(
              p(6), rounded(lgRadius),
              border('1px'), borderColor(slate[200]),
              flex(), flexCol(), gap(2),
              transitionColors(), duration(200),
              when(hover)(borderColor(blue[300]), shadow(lgShadow)),
            )}>
              <h3 className={cx(text(lg), font(semibold), textColor(slate[800]))}>
                {title}
              </h3>
              <p className={cx(text(base), textColor(slate[500]))}>
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
