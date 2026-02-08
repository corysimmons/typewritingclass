import React from 'react'
import { cx, srOnly, notSrOnly, forcedColorAdjust, bg, p, rounded, textColor, flex, css } from 'typewritingclass'
import type { ComparisonCategory } from './types.ts'

export const accessibilityData: ComparisonCategory = {
  title: 'Accessibility',
  description: 'Screen reader only, not screen reader only, and forced color adjust',
  sections: [
    {
      title: 'Screen Reader',
      examples: [
        {
          label: 'sr-only',
          twcCode: 'cx(srOnly())',
          twcElement: React.createElement('div', { className: cx(flex(), css({ gap: '0.5rem', 'align-items': 'center' })) },
            React.createElement('div', { className: cx(bg('#818cf8'), p(2), rounded('0.25rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'Visible'),
            React.createElement('span', { className: cx(srOnly()) }, 'Screen reader only text'),
            React.createElement('span', { style: { fontSize: '12px', color: '#64748b' } }, '(hidden span with sr-only is here)'),
          ),
          tailwindCode: 'sr-only',
          tailwindElement: React.createElement('div', { className: 'tw-flex tw-gap-2 tw-items-center' },
            React.createElement('div', { className: 'tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs' }, 'Visible'),
            React.createElement('span', { className: 'tw-sr-only' }, 'Screen reader only text'),
            React.createElement('span', { className: 'tw-text-xs tw-text-slate-500' }, '(hidden span with sr-only is here)'),
          ),
        },
        {
          label: 'not-sr-only',
          twcCode: 'cx(notSrOnly())',
          twcElement: React.createElement('div', { className: cx(notSrOnly(), bg('#c7d2fe'), p(4), rounded('0.25rem')), style: { fontSize: '12px' } }, 'This reverses sr-only (not-sr-only)'),
          tailwindCode: 'not-sr-only',
          tailwindElement: React.createElement('div', { className: 'tw-not-sr-only tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'This reverses sr-only (not-sr-only)'),
        },
      ],
    },
    {
      title: 'Forced Color Adjust',
      examples: [
        {
          label: 'forced-color-adjust-auto',
          twcCode: 'cx(forcedColorAdjust("auto"))',
          twcElement: React.createElement('div', { className: cx(forcedColorAdjust('auto'), bg('#818cf8'), p(4), rounded('0.25rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'forced-color-adjust: auto'),
          tailwindCode: 'forced-color-adjust-auto',
          tailwindElement: React.createElement('div', { className: 'tw-forced-color-adjust-auto tw-bg-indigo-400 tw-p-4 tw-rounded tw-text-white tw-text-xs' }, 'forced-color-adjust: auto'),
        },
        {
          label: 'forced-color-adjust-none',
          twcCode: 'cx(forcedColorAdjust("none"))',
          twcElement: React.createElement('div', { className: cx(forcedColorAdjust('none'), bg('#818cf8'), p(4), rounded('0.25rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'forced-color-adjust: none'),
          tailwindCode: 'forced-color-adjust-none',
          tailwindElement: React.createElement('div', { className: 'tw-forced-color-adjust-none tw-bg-indigo-400 tw-p-4 tw-rounded tw-text-white tw-text-xs' }, 'forced-color-adjust: none'),
        },
      ],
    },
  ],
}
