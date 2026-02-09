import React from 'react'
import { tw } from 'typewritingclass'
import type { ComparisonCategory } from '../data/types.ts'
import { ComparisonRow } from './ComparisonRow.tsx'

export function ComparisonPage({ category }: { category: ComparisonCategory }) {
  const totalExamples = category.sections.reduce((sum, s) => sum + s.examples.length, 0)

  return (
    <div className={tw.flex.flexCol.gap(6).maxW('960px')}>
      <div>
        <h1 className={tw.text('2xl').font('700').textColor('#0f172a').mb(2)}>
          {category.title}
        </h1>
        <p className={tw.text('base').textColor('#64748b')}>
          {category.description} — {totalExamples} comparison{totalExamples !== 1 ? 's' : ''}
        </p>
      </div>
      {category.sections.map((section) => (
        <div key={section.title}>
          <h2 className={tw.text('lg').font('600').textColor('#1e293b').mb(3)}>
            {section.title}
          </h2>
          {section.examples.map((example) => (
            <ComparisonRow key={example.label} example={example} />
          ))}
        </div>
      ))}
    </div>
  )
}
