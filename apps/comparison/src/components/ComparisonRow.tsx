import React from 'react'
import { tw } from 'typewritingclass'
import { sm as smText, xs as xsText } from 'typewritingclass/theme/typography'
import type { ComparisonExample } from '../data/types.ts'
import { CodeBlock } from './CodeBlock.tsx'

export function ComparisonRow({ example }: { example: ComparisonExample }) {
  return (
    <div data-comparison-row={example.label} className={`${tw
      .mb(4)
      .rounded('lg')
      .border('1px').borderColor('#e2e8f0')
      .bg('#ffffff')
      .overflow('hidden')
    }`}>
      <div className={`${tw.px(4).py(2).bg('#f8fafc').borderB('1px').borderColor('#e2e8f0')}`}>
        <span className={`${tw.text(smText).font('600').textColor('#334155')}`}>{example.label}</span>
      </div>
      <div className={`${tw.grid.gridCols(2).minH(0)}`}>
        {/* TWC Column */}
        <div className={`${tw.p(4).flex.flexCol.gap(3).borderR('1px').borderColor('#e2e8f0')}`}>
          <div className={`${tw.text(xsText).font('500').textColor('#6366f1').textTransform('uppercase').tracking('0.05em')}`}>
            typewritingclass
          </div>
          <CodeBlock code={example.twcCode} />
          <div data-render="twc" className={`${tw
            .p(3).rounded('md').bg('#f8fafc')
            .border('1px').borderColor('#e2e8f0')
            .minH('3rem').flex.items('center')
          }`}>
            {example.twcElement}
          </div>
        </div>
        {/* Tailwind Column */}
        <div className={`${tw.p(4).flex.flexCol.gap(3)}`}>
          <div className={`${tw.text(xsText).font('500').textColor('#0ea5e9').textTransform('uppercase').tracking('0.05em')}`}>
            Tailwind CSS
          </div>
          <CodeBlock code={example.tailwindCode} />
          <div data-render="tw" className={`${tw
            .p(3).rounded('md').bg('#f8fafc')
            .border('1px').borderColor('#e2e8f0')
            .minH('3rem').flex.items('center')
          }`}>
            {example.tailwindElement}
          </div>
        </div>
      </div>
    </div>
  )
}
