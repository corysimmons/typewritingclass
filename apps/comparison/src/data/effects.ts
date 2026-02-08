import React from 'react'
import {
  cx, shadow, shadowColor, opacity, mixBlendMode, bgBlendMode,
  bg, p, w, h, flex, rounded, textColor, text, gap, ml,
} from 'typewritingclass'
import { xs } from 'typewritingclass/theme/typography'
import { sm as smShadow, md as mdShadow, lg as lgShadow, xl as xlShadow } from 'typewritingclass/theme/shadows'
import type { ComparisonCategory } from './types.ts'

export const effectsData: ComparisonCategory = {
  title: 'Effects',
  description: 'Box shadow, opacity, and blend mode utilities',
  sections: [
    {
      title: 'Box Shadow',
      examples: [
        {
          label: 'shadow-sm',
          twcCode: 'shadow(sm)',
          twcElement: React.createElement('div', { className: cx(shadow(smShadow), bg('#ffffff'), p(4), rounded("lg"), text(xs)) }, 'shadow-sm'),
          tailwindCode: 'shadow-sm',
          tailwindElement: React.createElement('div', { className: 'tw-shadow-sm tw-bg-white tw-p-4 tw-rounded-lg tw-text-xs' }, 'shadow-sm'),
        },
        {
          label: 'shadow',
          twcCode: 'shadow()',
          twcElement: React.createElement('div', { className: cx(shadow(), bg('#ffffff'), p(4), rounded("lg"), text(xs)) }, 'shadow'),
          tailwindCode: 'shadow',
          tailwindElement: React.createElement('div', { className: 'tw-shadow tw-bg-white tw-p-4 tw-rounded-lg tw-text-xs' }, 'shadow'),
        },
        {
          label: 'shadow-md',
          twcCode: 'shadow(md)',
          twcElement: React.createElement('div', { className: cx(shadow(mdShadow), bg('#ffffff'), p(4), rounded("lg"), text(xs)) }, 'shadow-md'),
          tailwindCode: 'shadow-md',
          tailwindElement: React.createElement('div', { className: 'tw-shadow-md tw-bg-white tw-p-4 tw-rounded-lg tw-text-xs' }, 'shadow-md'),
        },
        {
          label: 'shadow-lg',
          twcCode: 'shadow(lg)',
          twcElement: React.createElement('div', { className: cx(shadow(lgShadow), bg('#ffffff'), p(4), rounded("lg"), text(xs)) }, 'shadow-lg'),
          tailwindCode: 'shadow-lg',
          tailwindElement: React.createElement('div', { className: 'tw-shadow-lg tw-bg-white tw-p-4 tw-rounded-lg tw-text-xs' }, 'shadow-lg'),
        },
        {
          label: 'shadow-xl',
          twcCode: 'shadow(xl)',
          twcElement: React.createElement('div', { className: cx(shadow(xlShadow), bg('#ffffff'), p(4), rounded("lg"), text(xs)) }, 'shadow-xl'),
          tailwindCode: 'shadow-xl',
          tailwindElement: React.createElement('div', { className: 'tw-shadow-xl tw-bg-white tw-p-4 tw-rounded-lg tw-text-xs' }, 'shadow-xl'),
        },
      ],
    },
    {
      title: 'Opacity',
      examples: [
        {
          label: 'opacity-100',
          twcCode: 'opacity("1")',
          twcElement: React.createElement('div', { className: cx(opacity(1), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'opacity-100'),
          tailwindCode: 'opacity-100',
          tailwindElement: React.createElement('div', { className: 'tw-opacity-100 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'opacity-100'),
        },
        {
          label: 'opacity-75',
          twcCode: 'opacity("0.75")',
          twcElement: React.createElement('div', { className: cx(opacity(0.75), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'opacity-75'),
          tailwindCode: 'opacity-75',
          tailwindElement: React.createElement('div', { className: 'tw-opacity-75 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'opacity-75'),
        },
        {
          label: 'opacity-50',
          twcCode: 'opacity("0.5")',
          twcElement: React.createElement('div', { className: cx(opacity(0.5), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'opacity-50'),
          tailwindCode: 'opacity-50',
          tailwindElement: React.createElement('div', { className: 'tw-opacity-50 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'opacity-50'),
        },
        {
          label: 'opacity-25',
          twcCode: 'opacity("0.25")',
          twcElement: React.createElement('div', { className: cx(opacity(0.25), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'opacity-25'),
          tailwindCode: 'opacity-25',
          tailwindElement: React.createElement('div', { className: 'tw-opacity-25 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'opacity-25'),
        },
      ],
    },
    {
      title: 'Mix Blend Mode',
      examples: [
        {
          label: 'mix-blend-multiply',
          twcCode: 'mixBlendMode("multiply")',
          twcElement: React.createElement('div', { className: cx(flex(), gap(0), bg('#e0e7ff'), p(4), rounded("lg")) },
            React.createElement('div', { className: cx(w('5rem'), h('5rem'), bg('#3b82f6'), rounded("full"), opacity(0.75)) }),
            React.createElement('div', { className: cx(mixBlendMode('multiply'), w('5rem'), h('5rem'), bg('#ef4444'), rounded("full"), ml('-2rem'), opacity(0.75)) }),
          ),
          tailwindCode: 'mix-blend-multiply',
          tailwindElement: React.createElement('div', { className: 'tw-flex tw-bg-indigo-100 tw-p-4 tw-rounded-lg' },
            React.createElement('div', { className: 'tw-w-20 tw-h-20 tw-bg-blue-500 tw-rounded-full tw-opacity-75' }),
            React.createElement('div', { className: 'tw-mix-blend-multiply tw-w-20 tw-h-20 tw-bg-red-500 tw-rounded-full tw-opacity-75', style: { marginLeft: '-2rem' } }),
          ),
        },
      ],
    },
  ],
}
