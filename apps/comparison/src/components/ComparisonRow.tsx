import React from 'react'
import {
  cx, p, px, py, mb, flexCol, flex, gap, text, font, textColor,
  rounded, bg, border, borderColor, grid, gridCols, w,
  overflow, minH, borderR, borderB, display, items, textTransform, tracking,
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
      overflow('hidden'),
    )}>
      <div className={cx(px(4), py(2), bg('#f8fafc'), borderB('1px'), borderColor('#e2e8f0'))}>
        <span className={cx(text(smText), font(semibold), textColor('#334155'))}>{example.label}</span>
      </div>
      <div className={cx(grid(), gridCols(2), minH(0))}>
        {/* TWC Column */}
        <div className={cx(p(4), flex(), flexCol(), gap(3), borderR('1px'), borderColor('#e2e8f0'))}>
          <div className={cx(text(xsText), font(medium), textColor('#6366f1'), textTransform('uppercase'), tracking('0.05em'))}>
            typewritingclass
          </div>
          <CodeBlock code={example.twcCode} />
          <div data-render="twc" className={cx(
            p(3), rounded(mdRadius), bg('#f8fafc'),
            border('1px'), borderColor('#e2e8f0'),
            minH('3rem'), flex(), items('center'),
          )}>
            {example.twcElement}
          </div>
        </div>
        {/* Tailwind Column */}
        <div className={cx(p(4), flex(), flexCol(), gap(3))}>
          <div className={cx(text(xsText), font(medium), textColor('#0ea5e9'), textTransform('uppercase'), tracking('0.05em'))}>
            Tailwind CSS
          </div>
          <CodeBlock code={example.tailwindCode} />
          <div data-render="tw" className={cx(
            p(3), rounded(mdRadius), bg('#f8fafc'),
            border('1px'), borderColor('#e2e8f0'),
            minH('3rem'), flex(), items('center'),
          )}>
            {example.tailwindElement}
          </div>
        </div>
      </div>
    </div>
  )
}
