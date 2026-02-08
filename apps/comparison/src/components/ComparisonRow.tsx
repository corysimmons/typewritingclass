import React from 'react'
import {
  cx, p, px, py, mb, flexCol, flex, gap, text, font, textColor,
  rounded, bg, border, borderColor, css, grid, gridCols, w,
} from 'typewritingclass'
import { sm as smText, xs as xsText } from 'typewritingclass/theme/typography'
import { semibold, medium } from 'typewritingclass/theme/typography'
import { lg as lgRadius, md as mdRadius } from 'typewritingclass/theme/borders'
import type { ComparisonExample } from '../data/types.ts'
import { CodeBlock } from './CodeBlock.tsx'

export function ComparisonRow({ example }: { example: ComparisonExample }) {
  return (
    <div data-comparison-row={example.label} className={cx(
      mb(4),
      rounded(lgRadius),
      border('1px'), borderColor('#e2e8f0'),
      bg('#ffffff'),
      css({ overflow: 'hidden' }),
    )}>
      <div className={cx(px(4), py(2), bg('#f8fafc'), css({ borderBottom: '1px solid #e2e8f0' }))}>
        <span className={cx(text(smText), font(semibold), textColor('#334155'))}>{example.label}</span>
      </div>
      <div className={cx(grid(), gridCols(2), css({ minHeight: '0' }))}>
        {/* TWC Column */}
        <div className={cx(p(4), flexCol(), gap(3), css({ borderRight: '1px solid #e2e8f0', display: 'flex' }))}>
          <div className={cx(text(xsText), font(medium), textColor('#6366f1'), css({ textTransform: 'uppercase', letterSpacing: '0.05em' }))}>
            typewritingclass
          </div>
          <CodeBlock code={example.twcCode} />
          <div data-render="twc" className={cx(
            p(3), rounded(mdRadius), bg('#f8fafc'),
            border('1px'), borderColor('#e2e8f0'),
            css({ minHeight: '3rem', display: 'flex', alignItems: 'center' }),
          )}>
            {example.twcElement}
          </div>
        </div>
        {/* Tailwind Column */}
        <div className={cx(p(4), flexCol(), gap(3), css({ display: 'flex' }))}>
          <div className={cx(text(xsText), font(medium), textColor('#0ea5e9'), css({ textTransform: 'uppercase', letterSpacing: '0.05em' }))}>
            Tailwind CSS
          </div>
          <CodeBlock code={example.tailwindCode} />
          <div data-render="tw" className={cx(
            p(3), rounded(mdRadius), bg('#f8fafc'),
            border('1px'), borderColor('#e2e8f0'),
            css({ minHeight: '3rem', display: 'flex', alignItems: 'center' }),
          )}>
            {example.tailwindElement}
          </div>
        </div>
      </div>
    </div>
  )
}
