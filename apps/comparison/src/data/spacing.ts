import React from 'react'
import { cx, p, px, py, pt, pr, pb, pl, ps, pe, m, mx, my, mt, mr, mb, ml, ms, me, spaceX, spaceY, bg, w, h, flex, gap, flexCol, textColor, textAlign, text } from 'typewritingclass'
import { xs } from 'typewritingclass/theme/typography'
import type { ComparisonCategory } from './types.ts'

export const spacingData: ComparisonCategory = {
  title: 'Spacing',
  description: 'Padding, margin, and space-between utilities',
  sections: [
    {
      title: 'Padding',
      examples: [
        {
          label: 'p-4 (1rem all sides)',
          twcCode: 'p(4)',
          twcElement: React.createElement('div', { className: cx(p(4), bg('#c7d2fe')) }, 'p-4'),
          tailwindCode: 'p-4',
          tailwindElement: React.createElement('div', { className: 'tw-p-4 tw-bg-indigo-200' }, 'p-4'),
        },
        {
          label: 'px-6 (1.5rem horizontal)',
          twcCode: 'px(6)',
          twcElement: React.createElement('div', { className: cx(px(6), bg('#c7d2fe')) }, 'px-6'),
          tailwindCode: 'px-6',
          tailwindElement: React.createElement('div', { className: 'tw-px-6 tw-bg-indigo-200' }, 'px-6'),
        },
        {
          label: 'py-3 (0.75rem vertical)',
          twcCode: 'py(3)',
          twcElement: React.createElement('div', { className: cx(py(3), bg('#c7d2fe')) }, 'py-3'),
          tailwindCode: 'py-3',
          tailwindElement: React.createElement('div', { className: 'tw-py-3 tw-bg-indigo-200' }, 'py-3'),
        },
        {
          label: 'pt-8 (2rem top)',
          twcCode: 'pt(8)',
          twcElement: React.createElement('div', { className: cx(pt(8), bg('#c7d2fe')) }, 'pt-8'),
          tailwindCode: 'pt-8',
          tailwindElement: React.createElement('div', { className: 'tw-pt-8 tw-bg-indigo-200' }, 'pt-8'),
        },
        {
          label: 'pr-2 (0.5rem right)',
          twcCode: 'pr(2)',
          twcElement: React.createElement('div', { className: cx(pr(2), bg('#c7d2fe')) }, 'pr-2'),
          tailwindCode: 'pr-2',
          tailwindElement: React.createElement('div', { className: 'tw-pr-2 tw-bg-indigo-200' }, 'pr-2'),
        },
        {
          label: 'pb-5 (1.25rem bottom)',
          twcCode: 'pb(5)',
          twcElement: React.createElement('div', { className: cx(pb(5), bg('#c7d2fe')) }, 'pb-5'),
          tailwindCode: 'pb-5',
          tailwindElement: React.createElement('div', { className: 'tw-pb-5 tw-bg-indigo-200' }, 'pb-5'),
        },
        {
          label: 'pl-10 (2.5rem left)',
          twcCode: 'pl(10)',
          twcElement: React.createElement('div', { className: cx(pl(10), bg('#c7d2fe')) }, 'pl-10'),
          tailwindCode: 'pl-10',
          tailwindElement: React.createElement('div', { className: 'tw-pl-10 tw-bg-indigo-200' }, 'pl-10'),
        },
      ],
    },
    {
      title: 'Margin',
      examples: [
        {
          label: 'm-4 (1rem all sides)',
          twcCode: 'm(4)',
          twcElement: React.createElement('div', { className: cx(bg('#e0e7ff')) },
            React.createElement('div', { className: cx(m(4), bg('#818cf8'), textColor('#ffffff'), p(1)) }, 'm-4')
          ),
          tailwindCode: 'm-4',
          tailwindElement: React.createElement('div', { className: 'tw-bg-indigo-100' },
            React.createElement('div', { className: 'tw-m-4 tw-bg-indigo-400 tw-text-white tw-p-1' }, 'm-4')
          ),
        },
        {
          label: 'mx-auto (center horizontally)',
          twcCode: 'mx("auto"), w(32)',
          twcElement: React.createElement('div', { className: cx(bg('#e0e7ff')) },
            React.createElement('div', { className: cx(mx('auto'), w(32), bg('#818cf8'), textColor('#ffffff'), p(1), textAlign('center')) }, 'mx-auto')
          ),
          tailwindCode: 'mx-auto w-32',
          tailwindElement: React.createElement('div', { className: 'tw-bg-indigo-100' },
            React.createElement('div', { className: 'tw-mx-auto tw-w-32 tw-bg-indigo-400 tw-text-white tw-p-1 tw-text-center' }, 'mx-auto')
          ),
        },
        {
          label: 'my-6 (1.5rem vertical)',
          twcCode: 'my(6)',
          twcElement: React.createElement('div', { className: cx(bg('#e0e7ff')) },
            React.createElement('div', { className: cx(my(6), bg('#818cf8'), textColor('#ffffff'), p(1)) }, 'my-6')
          ),
          tailwindCode: 'my-6',
          tailwindElement: React.createElement('div', { className: 'tw-bg-indigo-100' },
            React.createElement('div', { className: 'tw-my-6 tw-bg-indigo-400 tw-text-white tw-p-1' }, 'my-6')
          ),
        },
      ],
    },
    {
      title: 'Space Between',
      examples: [
        {
          label: 'space-x-4 (1rem horizontal gap)',
          twcCode: 'flex(), spaceX(4)',
          twcElement: React.createElement('div', { className: cx(flex(), spaceX(4)) },
            React.createElement('div', { className: cx(p(2), bg('#818cf8'), textColor('#ffffff')) }, '1'),
            React.createElement('div', { className: cx(p(2), bg('#818cf8'), textColor('#ffffff')) }, '2'),
            React.createElement('div', { className: cx(p(2), bg('#818cf8'), textColor('#ffffff')) }, '3'),
          ),
          tailwindCode: 'flex space-x-4',
          tailwindElement: React.createElement('div', { className: 'tw-flex tw-space-x-4' },
            React.createElement('div', { className: 'tw-p-2 tw-bg-indigo-400 tw-text-white' }, '1'),
            React.createElement('div', { className: 'tw-p-2 tw-bg-indigo-400 tw-text-white' }, '2'),
            React.createElement('div', { className: 'tw-p-2 tw-bg-indigo-400 tw-text-white' }, '3'),
          ),
        },
        {
          label: 'space-y-3 (0.75rem vertical gap)',
          twcCode: 'flex(), flexCol(), spaceY(3)',
          twcElement: React.createElement('div', { className: cx(flex(), flexCol(), spaceY(3)) },
            React.createElement('div', { className: cx(p(2), bg('#818cf8'), textColor('#ffffff')) }, 'A'),
            React.createElement('div', { className: cx(p(2), bg('#818cf8'), textColor('#ffffff')) }, 'B'),
            React.createElement('div', { className: cx(p(2), bg('#818cf8'), textColor('#ffffff')) }, 'C'),
          ),
          tailwindCode: 'flex flex-col space-y-3',
          tailwindElement: React.createElement('div', { className: 'tw-flex tw-flex-col tw-space-y-3' },
            React.createElement('div', { className: 'tw-p-2 tw-bg-indigo-400 tw-text-white' }, 'A'),
            React.createElement('div', { className: 'tw-p-2 tw-bg-indigo-400 tw-text-white' }, 'B'),
            React.createElement('div', { className: 'tw-p-2 tw-bg-indigo-400 tw-text-white' }, 'C'),
          ),
        },
      ],
    },
  ],
}
