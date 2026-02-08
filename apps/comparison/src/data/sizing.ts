import React from 'react'
import { cx, w, h, size, minW, minH, maxW, maxH, bg, p, flex, rounded, css } from 'typewritingclass'
import type { ComparisonCategory } from './types.ts'

export const sizingData: ComparisonCategory = {
  title: 'Sizing',
  description: 'Width, height, size, and min/max constraints',
  sections: [
    {
      title: 'Width',
      examples: [
        {
          label: 'w-32 (8rem)',
          twcCode: 'cx(w(32))',
          twcElement: React.createElement('div', { className: cx(w(32), bg('#818cf8'), p(2), rounded('4px')), style: { color: 'white', fontSize: '12px' } }, 'w-32'),
          tailwindCode: 'w-32',
          tailwindElement: React.createElement('div', { className: 'tw-w-32 tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs' }, 'w-32'),
        },
        {
          label: 'w-full (100%)',
          twcCode: 'cx(w("100%"))',
          twcElement: React.createElement('div', { className: cx(w('100%'), bg('#818cf8'), p(2), rounded('4px')), style: { color: 'white', fontSize: '12px' } }, 'w-full'),
          tailwindCode: 'w-full',
          tailwindElement: React.createElement('div', { className: 'tw-w-full tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs' }, 'w-full'),
        },
        {
          label: 'w-1/2 (50%)',
          twcCode: 'cx(w("50%"))',
          twcElement: React.createElement('div', { className: cx(w('50%'), bg('#818cf8'), p(2), rounded('4px')), style: { color: 'white', fontSize: '12px' } }, 'w-1/2'),
          tailwindCode: 'w-1/2',
          tailwindElement: React.createElement('div', { className: 'tw-w-1/2 tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs' }, 'w-1/2'),
        },
      ],
    },
    {
      title: 'Height',
      examples: [
        {
          label: 'h-16 (4rem)',
          twcCode: 'cx(h(16))',
          twcElement: React.createElement('div', { className: cx(h(16), w(16), bg('#818cf8'), rounded('4px'), flex(), css({ 'align-items': 'center', 'justify-content': 'center' })), style: { color: 'white', fontSize: '12px' } }, 'h-16'),
          tailwindCode: 'h-16',
          tailwindElement: React.createElement('div', { className: 'tw-h-16 tw-w-16 tw-bg-indigo-400 tw-rounded tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xs' }, 'h-16'),
        },
        {
          label: 'h-screen (100vh)',
          twcCode: 'cx(h("100vh")) — shown with max-height',
          twcElement: React.createElement('div', { className: cx(bg('#818cf8'), p(2), rounded('4px')), style: { color: 'white', fontSize: '12px', maxHeight: '3rem', overflow: 'hidden' } }, 'h-screen (100vh — capped for display)'),
          tailwindCode: 'h-screen',
          tailwindElement: React.createElement('div', { className: 'tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs', style: { maxHeight: '3rem', overflow: 'hidden' } }, 'h-screen (100vh — capped for display)'),
        },
      ],
    },
    {
      title: 'Size (w + h)',
      examples: [
        {
          label: 'size-12 (3rem × 3rem)',
          twcCode: 'cx(size(12))',
          twcElement: React.createElement('div', { className: cx(size(12), bg('#818cf8'), rounded('4px'), flex(), css({ 'align-items': 'center', 'justify-content': 'center' })), style: { color: 'white', fontSize: '12px' } }, '12'),
          tailwindCode: 'size-12',
          tailwindElement: React.createElement('div', { className: 'tw-size-12 tw-bg-indigo-400 tw-rounded tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xs' }, '12'),
        },
      ],
    },
    {
      title: 'Min / Max',
      examples: [
        {
          label: 'min-w-[8rem]',
          twcCode: 'cx(minW("8rem"))',
          twcElement: React.createElement('div', { className: cx(minW('8rem'), bg('#818cf8'), p(2), rounded('4px')), style: { color: 'white', fontSize: '12px', display: 'inline-block' } }, 'min-w'),
          tailwindCode: 'min-w-[8rem]',
          tailwindElement: React.createElement('div', { className: 'tw-min-w-[8rem] tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs tw-inline-block' }, 'min-w'),
        },
        {
          label: 'max-w-xs (20rem)',
          twcCode: 'cx(maxW("20rem"))',
          twcElement: React.createElement('div', { className: cx(maxW('20rem'), bg('#818cf8'), p(2), rounded('4px')), style: { color: 'white', fontSize: '12px' } }, 'This text is constrained to max-w-xs (20rem) and will wrap when it exceeds that width.'),
          tailwindCode: 'max-w-xs',
          tailwindElement: React.createElement('div', { className: 'tw-max-w-xs tw-bg-indigo-400 tw-p-2 tw-rounded tw-text-white tw-text-xs' }, 'This text is constrained to max-w-xs (20rem) and will wrap when it exceeds that width.'),
        },
        {
          label: 'min-h-[4rem]',
          twcCode: 'cx(minH("4rem"))',
          twcElement: React.createElement('div', { className: cx(minH('4rem'), w(24), bg('#818cf8'), p(2), rounded('4px'), flex(), css({ 'align-items': 'center' })), style: { color: 'white', fontSize: '12px' } }, 'min-h'),
          tailwindCode: 'min-h-[4rem]',
          tailwindElement: React.createElement('div', { className: 'tw-min-h-[4rem] tw-w-24 tw-bg-indigo-400 tw-p-2 tw-rounded tw-flex tw-items-center tw-text-white tw-text-xs' }, 'min-h'),
        },
        {
          label: 'max-h-20 (5rem)',
          twcCode: 'cx(maxH(20))',
          twcElement: React.createElement('div', { className: cx(maxH(20), w(24), bg('#818cf8'), p(2), rounded('4px'), css({ overflow: 'auto' })), style: { color: 'white', fontSize: '12px' } }, 'Content that is taller than max-h-20 will scroll because of overflow auto applied to this container.'),
          tailwindCode: 'max-h-20 overflow-auto',
          tailwindElement: React.createElement('div', { className: 'tw-max-h-20 tw-w-24 tw-bg-indigo-400 tw-p-2 tw-rounded tw-overflow-auto tw-text-white tw-text-xs' }, 'Content that is taller than max-h-20 will scroll because of overflow auto applied to this container.'),
        },
      ],
    },
  ],
}
