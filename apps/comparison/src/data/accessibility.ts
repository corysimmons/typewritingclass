import React from 'react'
import { tw } from 'typewritingclass'
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
          twcCode: 'srOnly()',
          twcElement: React.createElement('div', { className: tw.flex.gap(2).items('center') },
            React.createElement('div', { className: tw.bg('indigo-400').p(2).rounded.textColor('white').text('xs') }, 'Visible'),
            React.createElement('span', { className: tw.srOnly }, 'Screen reader only text'),
            React.createElement('span', { className: tw.text('xs').textColor('slate-500') }, '(hidden span with sr-only is here)'),
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
          twcCode: 'notSrOnly()',
          twcElement: React.createElement('div', { className: tw.notSrOnly.bg('indigo-200').p(4).rounded.text('xs') }, 'This reverses sr-only (not-sr-only)'),
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
          twcCode: 'forcedColorAdjust("auto")',
          twcElement: React.createElement('div', { className: tw.forcedColorAdjust('auto').bg('indigo-400').p(4).rounded.textColor('white').text('xs') }, 'forced-color-adjust: auto'),
          tailwindCode: 'forced-color-adjust-auto',
          tailwindElement: React.createElement('div', { className: 'tw-forced-color-adjust-auto tw-bg-indigo-400 tw-p-4 tw-rounded tw-text-white tw-text-xs' }, 'forced-color-adjust: auto'),
        },
        {
          label: 'forced-color-adjust-none',
          twcCode: 'forcedColorAdjust("none")',
          twcElement: React.createElement('div', { className: tw.forcedColorAdjust('none').bg('indigo-400').p(4).rounded.textColor('white').text('xs') }, 'forced-color-adjust: none'),
          tailwindCode: 'forced-color-adjust-none',
          tailwindElement: React.createElement('div', { className: 'tw-forced-color-adjust-none tw-bg-indigo-400 tw-p-4 tw-rounded tw-text-white tw-text-xs' }, 'forced-color-adjust: none'),
        },
      ],
    },
  ],
}
