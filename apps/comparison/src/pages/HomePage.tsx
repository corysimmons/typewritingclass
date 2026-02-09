import React from 'react'
import { Link } from 'react-router-dom'
import { tw } from 'typewritingclass'
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
    <div className={`${tw.flex.flexCol.gap(8).maxW('960px')}`}>
      <div>
        <img src="/logo.svg" alt="Typewriting Class" style={{ width: '240px', marginBottom: '12px' }} />
        <h1 className={`${tw.text('3xl').font('700').textColor('#0f172a').mb(2)}`}>
          Typewriting Class vs Tailwind CSS
        </h1>
        <p className={`${tw.text('lg').textColor('#64748b').mb(4)}`}>
          Side-by-side visual comparison proving parity between Typewriting Class utility functions and Tailwind CSS classes.
        </p>
        <div className={`${tw.flex.gap(4).flexWrap}`}>
          <div className={`${tw.bg('#eff6ff').px(4).py(2).rounded('lg')}`}>
            <span className={`${tw.text('2xl').font('700').textColor('#3b82f6')}`}>{categories.length}</span>
            <span className={`${tw.text('sm').textColor('#64748b').ml(2)}`}> categories</span>
          </div>
          <div className={`${tw.bg('#f0fdf4').px(4).py(2).rounded('lg')}`}>
            <span className={`${tw.text('2xl').font('700').textColor('#10b981')}`}>{totalExamples}</span>
            <span className={`${tw.text('sm').textColor('#64748b').ml(2)}`}> comparisons</span>
          </div>
          <div className={`${tw.bg('#faf5ff').px(4).py(2).rounded('lg')}`}>
            <span className={`${tw.text('2xl').font('700').textColor('#8b5cf6')}`}>98%</span>
            <span className={`${tw.text('sm').textColor('#64748b').ml(2)}`}> Tailwind coverage</span>
          </div>
        </div>
      </div>

      <div className={`${tw.grid.gridCols(3).gap(4)}`}>
        {categories.map(({ to, data, color }) => {
          const count = data.sections.reduce((s, sec) => s + sec.examples.length, 0)
          return (
            <Link
              key={to}
              to={to}
              className={`${tw
                .p(5).rounded('lg')
                .bg('#ffffff')
                .border('1px').borderColor('#e2e8f0')
                .shadow('0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)')
                .flex.flexCol.gap(2)
                .textDecoration('none').transition
              }`}
            >
              <div className={`${tw.w('2rem').h('4px').rounded('2px').bg(color)}`} />
              <span className={`${tw.text('lg').font('600').textColor('#1e293b')}`}>{data.title}</span>
              <span className={`${tw.text('xs').textColor('#64748b')}`}>{data.description}</span>
              <span className={`${tw.text('xs').font('500').textColor(color)}`}>{count} examples</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
