import React from 'react'
import {
  cx, rounded, roundedT, roundedB, roundedL, roundedR, roundedTL, roundedTR, roundedBR, roundedBL,
  border, borderT, borderR, borderB, borderL, borderX, borderY, borderColor, borderStyle,
  ring, ringColor, ringOffsetWidth, ringOffsetColor,
  outlineWidth, outlineColor, outlineStyle, outlineOffset,
  divideX, divideY, divideColor, divideStyle,
  bg, p, w, h, flex, flexCol, textColor,
  items, justify, text,
} from 'typewritingclass'
import { xs } from 'typewritingclass/theme/typography'
import type { ComparisonCategory } from './types.ts'

export const bordersData: ComparisonCategory = {
  title: 'Borders',
  description: 'Border radius, width, color, style, divide, outline, and ring utilities',
  sections: [
    {
      title: 'Border Radius',
      examples: [
        {
          label: 'rounded (0.25rem)',
          twcCode: 'cx(rounded("0.25rem"))',
          twcElement: React.createElement('div', { className: cx(rounded('0.25rem'), bg('#818cf8'), p(4), textColor('#ffffff'), text(xs)) }, 'rounded'),
          tailwindCode: 'rounded',
          tailwindElement: React.createElement('div', { className: 'tw-rounded tw-bg-indigo-400 tw-p-4 tw-text-white tw-text-xs' }, 'rounded'),
        },
        {
          label: 'rounded-lg (0.5rem)',
          twcCode: 'cx(rounded("0.5rem"))',
          twcElement: React.createElement('div', { className: cx(rounded('0.5rem'), bg('#818cf8'), p(4), textColor('#ffffff'), text(xs)) }, 'rounded-lg'),
          tailwindCode: 'rounded-lg',
          tailwindElement: React.createElement('div', { className: 'tw-rounded-lg tw-bg-indigo-400 tw-p-4 tw-text-white tw-text-xs' }, 'rounded-lg'),
        },
        {
          label: 'rounded-full (9999px)',
          twcCode: 'cx(rounded("9999px"))',
          twcElement: React.createElement('div', { className: cx(rounded('9999px'), bg('#818cf8'), w('4rem'), h('4rem'), flex(), items('center'), justify('center'), textColor('#ffffff'), text(xs)) }, 'full'),
          tailwindCode: 'rounded-full',
          tailwindElement: React.createElement('div', { className: 'tw-rounded-full tw-bg-indigo-400 tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xs' }, 'full'),
        },
        {
          label: 'rounded-t-lg',
          twcCode: 'cx(roundedT("0.5rem"))',
          twcElement: React.createElement('div', { className: cx(roundedT('0.5rem'), bg('#818cf8'), p(4), textColor('#ffffff'), text(xs)) }, 'rounded-t-lg'),
          tailwindCode: 'rounded-t-lg',
          tailwindElement: React.createElement('div', { className: 'tw-rounded-t-lg tw-bg-indigo-400 tw-p-4 tw-text-white tw-text-xs' }, 'rounded-t-lg'),
        },
        {
          label: 'rounded-bl-xl',
          twcCode: 'cx(roundedBL("0.75rem"))',
          twcElement: React.createElement('div', { className: cx(roundedBL('0.75rem'), bg('#818cf8'), p(4), textColor('#ffffff'), text(xs)) }, 'rounded-bl-xl'),
          tailwindCode: 'rounded-bl-xl',
          tailwindElement: React.createElement('div', { className: 'tw-rounded-bl-xl tw-bg-indigo-400 tw-p-4 tw-text-white tw-text-xs' }, 'rounded-bl-xl'),
        },
      ],
    },
    {
      title: 'Border Width',
      examples: [
        {
          label: 'border (1px)',
          twcCode: 'cx(border("1px"), borderColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(border('1px'), borderColor('#818cf8'), p(4), rounded('4px'), text(xs)) }, 'border'),
          tailwindCode: 'border border-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-border tw-border-indigo-400 tw-p-4 tw-rounded tw-text-xs' }, 'border'),
        },
        {
          label: 'border-2',
          twcCode: 'cx(border("2px"), borderColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(border('2px'), borderColor('#818cf8'), p(4), rounded('4px'), text(xs)) }, 'border-2'),
          tailwindCode: 'border-2 border-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-border-2 tw-border-indigo-400 tw-p-4 tw-rounded tw-text-xs' }, 'border-2'),
        },
        {
          label: 'border-t-4',
          twcCode: 'cx(borderT("4px"), borderColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(borderT('4px'), borderColor('#818cf8'), p(4), bg('#f8fafc'), text(xs)) }, 'border-t-4'),
          tailwindCode: 'border-t-4 border-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-border-t-4 tw-border-indigo-400 tw-p-4 tw-bg-slate-50 tw-text-xs' }, 'border-t-4'),
        },
        {
          label: 'border-x-2',
          twcCode: 'cx(borderX("2px"), borderColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(borderX('2px'), borderColor('#818cf8'), p(4), text(xs)) }, 'border-x-2'),
          tailwindCode: 'border-x-2 border-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-border-x-2 tw-border-indigo-400 tw-p-4 tw-text-xs' }, 'border-x-2'),
        },
      ],
    },
    {
      title: 'Border Style',
      examples: [
        {
          label: 'border-dashed',
          twcCode: 'cx(border("2px"), borderStyle("dashed"), borderColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(border('2px'), borderStyle('dashed'), borderColor('#818cf8'), p(4), rounded('4px'), text(xs)) }, 'dashed'),
          tailwindCode: 'border-2 border-dashed border-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-border-2 tw-border-dashed tw-border-indigo-400 tw-p-4 tw-rounded tw-text-xs' }, 'dashed'),
        },
        {
          label: 'border-dotted',
          twcCode: 'cx(border("2px"), borderStyle("dotted"), borderColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(border('2px'), borderStyle('dotted'), borderColor('#818cf8'), p(4), rounded('4px'), text(xs)) }, 'dotted'),
          tailwindCode: 'border-2 border-dotted border-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-border-2 tw-border-dotted tw-border-indigo-400 tw-p-4 tw-rounded tw-text-xs' }, 'dotted'),
        },
      ],
    },
    {
      title: 'Divide',
      examples: [
        {
          label: 'divide-y',
          twcCode: 'cx(flexCol(), divideY("1px"), divideColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(flexCol(), divideY('1px'), divideColor('#818cf8')) },
            React.createElement('div', { className: cx(p(3), text(xs)) }, 'Item 1'),
            React.createElement('div', { className: cx(p(3), text(xs)) }, 'Item 2'),
            React.createElement('div', { className: cx(p(3), text(xs)) }, 'Item 3'),
          ),
          tailwindCode: 'divide-y divide-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-flex tw-flex-col tw-divide-y tw-divide-indigo-400' },
            React.createElement('div', { className: 'tw-p-3 tw-text-xs' }, 'Item 1'),
            React.createElement('div', { className: 'tw-p-3 tw-text-xs' }, 'Item 2'),
            React.createElement('div', { className: 'tw-p-3 tw-text-xs' }, 'Item 3'),
          ),
        },
        {
          label: 'divide-x-2',
          twcCode: 'cx(flex(), divideX("2px"), divideColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(flex(), divideX('2px'), divideColor('#818cf8')) },
            React.createElement('div', { className: cx(p(3), text(xs)) }, 'A'),
            React.createElement('div', { className: cx(p(3), text(xs)) }, 'B'),
            React.createElement('div', { className: cx(p(3), text(xs)) }, 'C'),
          ),
          tailwindCode: 'flex divide-x-2 divide-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-flex tw-divide-x-2 tw-divide-indigo-400' },
            React.createElement('div', { className: 'tw-p-3 tw-text-xs' }, 'A'),
            React.createElement('div', { className: 'tw-p-3 tw-text-xs' }, 'B'),
            React.createElement('div', { className: 'tw-p-3 tw-text-xs' }, 'C'),
          ),
        },
      ],
    },
    {
      title: 'Ring',
      examples: [
        {
          label: 'ring-2 ring-blue-500',
          twcCode: 'cx(ring("2px"), ringColor("#3b82f6"))',
          twcElement: React.createElement('div', { className: cx(ring('2px'), ringColor('#3b82f6'), p(4), rounded('4px'), text(xs)) }, 'ring-2'),
          tailwindCode: 'ring-2 ring-blue-500',
          tailwindElement: React.createElement('div', { className: 'tw-ring-2 tw-ring-blue-500 tw-p-4 tw-rounded tw-text-xs' }, 'ring-2'),
        },
        {
          label: 'ring-4 with offset',
          twcCode: 'cx(ring("4px"), ringColor("#818cf8"), ringOffsetWidth("2px"), ringOffsetColor("#ffffff"))',
          twcElement: React.createElement('div', { className: cx(ring('4px'), ringColor('#818cf8'), ringOffsetWidth('2px'), ringOffsetColor('#ffffff'), p(4), rounded('4px'), bg('#f8fafc'), text(xs)) }, 'ring + offset'),
          tailwindCode: 'ring-4 ring-indigo-400 ring-offset-2',
          tailwindElement: React.createElement('div', { className: 'tw-ring-4 tw-ring-indigo-400 tw-ring-offset-2 tw-p-4 tw-rounded tw-bg-slate-50 tw-text-xs' }, 'ring + offset'),
        },
      ],
    },
    {
      title: 'Outline',
      examples: [
        {
          label: 'outline-2 outline-dashed',
          twcCode: 'cx(outlineWidth("2px"), outlineStyle("dashed"), outlineColor("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(outlineWidth('2px'), outlineStyle('dashed'), outlineColor('#818cf8'), p(4), rounded('4px'), text(xs)) }, 'outline dashed'),
          tailwindCode: 'outline-2 outline-dashed outline-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-outline-2 tw-outline-dashed tw-outline-indigo-400 tw-p-4 tw-rounded tw-text-xs' }, 'outline dashed'),
        },
        {
          label: 'outline with offset',
          twcCode: 'cx(outlineWidth("2px"), outlineStyle("solid"), outlineColor("#818cf8"), outlineOffset("4px"))',
          twcElement: React.createElement('div', { className: cx(outlineWidth('2px'), outlineStyle('solid'), outlineColor('#818cf8'), outlineOffset('4px'), p(4), rounded('4px'), bg('#f8fafc'), text(xs)) }, 'outline + offset'),
          tailwindCode: 'outline-2 outline-offset-4 outline-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-outline-2 tw-outline-offset-4 tw-outline-indigo-400 tw-p-4 tw-rounded tw-bg-slate-50 tw-text-xs' }, 'outline + offset'),
        },
      ],
    },
  ],
}
