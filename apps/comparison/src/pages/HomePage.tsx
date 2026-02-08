import React from 'react'
import { Link } from 'react-router-dom'
import {
  cx, flexCol, flex, flexWrap, gap, p, px, py, mb, bg, textColor, text, font, rounded, w, grid, gridCols,
  border, borderColor, shadow, maxW, ml, textDecoration, display, transition, h,
} from 'typewritingclass'
import { _2xl, _3xl, lg as lgText, base, sm as smText, xs as xsText } from 'typewritingclass/theme/typography'
import { bold, semibold, medium } from 'typewritingclass/theme/typography'
import { md as mdRadius, lg as lgRadius } from 'typewritingclass/theme/borders'
import {
  layoutData, flexboxGridData, spacingData, sizingData, typographyData,
  backgroundsData, bordersData, effectsData, filtersData, tablesData,
  transitionsData, transformsData, interactivityData, svgData, accessibilityData,
} from '../data/index.ts'
import type { ComparisonCategory } from '../data/types.ts'

const categories: Array<{ to: string; data: ComparisonCategory; color: string }> = [
  { to: '/layout', data: layoutData, color: '#818cf8' },
  { to: '/flexbox-grid', data: flexboxGridData, color: '#6366f1' },
  { to: '/spacing', data: spacingData, color: '#a78bfa' },
  { to: '/sizing', data: sizingData, color: '#8b5cf6' },
  { to: '/typography', data: typographyData, color: '#7c3aed' },
  { to: '/backgrounds', data: backgroundsData, color: '#2563eb' },
  { to: '/borders', data: bordersData, color: '#3b82f6' },
  { to: '/effects', data: effectsData, color: '#0ea5e9' },
  { to: '/filters', data: filtersData, color: '#06b6d4' },
  { to: '/tables', data: tablesData, color: '#14b8a6' },
  { to: '/transitions', data: transitionsData, color: '#10b981' },
  { to: '/transforms', data: transformsData, color: '#f59e0b' },
  { to: '/interactivity', data: interactivityData, color: '#f97316' },
  { to: '/svg', data: svgData, color: '#ef4444' },
  { to: '/accessibility', data: accessibilityData, color: '#ec4899' },
]

const totalExamples = categories.reduce(
  (sum, c) => sum + c.data.sections.reduce((s, sec) => s + sec.examples.length, 0),
  0,
)

export function HomePage() {
  return (
    <div className={cx(flex(), flexCol(), gap(8), maxW('960px'))}>
      <div>
        <h1 className={cx(text(_3xl), font(bold), textColor('#0f172a'), mb(2))}>
          typewritingclass vs Tailwind CSS
        </h1>
        <p className={cx(text(lgText), textColor('#64748b'), mb(4))}>
          Side-by-side visual comparison proving parity between typewritingclass utility functions and Tailwind CSS classes.
        </p>
        <div className={cx(flex(), gap(4), flexWrap())}>
          <div className={cx(bg('#eff6ff'), px(4), py(2), rounded(lgRadius))}>
            <span className={cx(text(_2xl), font(bold), textColor('#3b82f6'))}>{categories.length}</span>
            <span className={cx(text(smText), textColor('#64748b'), ml(2))}> categories</span>
          </div>
          <div className={cx(bg('#f0fdf4'), px(4), py(2), rounded(lgRadius))}>
            <span className={cx(text(_2xl), font(bold), textColor('#10b981'))}>{totalExamples}</span>
            <span className={cx(text(smText), textColor('#64748b'), ml(2))}> comparisons</span>
          </div>
          <div className={cx(bg('#faf5ff'), px(4), py(2), rounded(lgRadius))}>
            <span className={cx(text(_2xl), font(bold), textColor('#8b5cf6'))}>98%</span>
            <span className={cx(text(smText), textColor('#64748b'), ml(2))}> Tailwind coverage</span>
          </div>
        </div>
      </div>

      <div className={cx(grid(), gridCols(3), gap(4))}>
        {categories.map(({ to, data, color }) => {
          const count = data.sections.reduce((s, sec) => s + sec.examples.length, 0)
          return (
            <Link
              key={to}
              to={to}
              className={cx(
                p(5), rounded(lgRadius),
                bg('#ffffff'),
                border('1px'), borderColor('#e2e8f0'),
                shadow('0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'),
                flex(), flexCol(), gap(2),
                textDecoration('none'), transition(),
              )}
            >
              <div className={cx(w('2rem'), h('4px'), rounded('2px'), bg(color))} />
              <span className={cx(text(lgText), font(semibold), textColor('#1e293b'))}>{data.title}</span>
              <span className={cx(text(xsText), textColor('#64748b'))}>{data.description}</span>
              <span className={cx(text(xsText), font(medium), textColor(color))}>{count} examples</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
