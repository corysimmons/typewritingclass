import React from 'react'
import {
  cx, blur, brightness, contrast, grayscale, hueRotate, invert, saturate, sepia, dropShadow,
  backdropBlur, backdropBrightness, backdropContrast, backdropGrayscale,
  backdropInvert, backdropSaturate, backdropSepia,
  bg, bgImage, p, w, h, flex, rounded, textColor, text, textAlign,
  items, justify, relative, absolute, inset, overflow,
} from 'typewritingclass'
import { xs } from 'typewritingclass/theme/typography'
import type { ComparisonCategory } from './types.ts'

const sampleBoxClasses = cx(textColor('#ffffff'), text(xs), textAlign('center'), flex(), items('center'), justify('center'))

export const filtersData: ComparisonCategory = {
  title: 'Filters',
  description: 'Blur, brightness, contrast, grayscale, and backdrop filter utilities',
  sections: [
    {
      title: 'Blur',
      examples: [
        {
          label: 'blur-none',
          twcCode: 'blur("0")',
          twcElement: React.createElement('div', { className: cx(blur('0'), bg('#818cf8'), p(4), rounded("lg"), w(32), h(12), sampleBoxClasses) }, 'blur-none'),
          tailwindCode: 'blur-none',
          tailwindElement: React.createElement('div', { className: 'tw-blur-none tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-w-32 tw-h-12 tw-text-white tw-text-xs tw-flex tw-items-center tw-justify-center' }, 'blur-none'),
        },
        {
          label: 'blur-sm (4px)',
          twcCode: 'blur("4px")',
          twcElement: React.createElement('div', { className: cx(blur('4px'), bg('#818cf8'), p(4), rounded("lg"), w(32), h(12), sampleBoxClasses) }, 'blur-sm'),
          tailwindCode: 'blur-sm',
          tailwindElement: React.createElement('div', { className: 'tw-blur-sm tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-w-32 tw-h-12 tw-text-white tw-text-xs tw-flex tw-items-center tw-justify-center' }, 'blur-sm'),
        },
        {
          label: 'blur (8px)',
          twcCode: 'blur("8px")',
          twcElement: React.createElement('div', { className: cx(blur('8px'), bg('#818cf8'), p(4), rounded("lg"), w(32), h(12), sampleBoxClasses) }, 'blur'),
          tailwindCode: 'blur',
          tailwindElement: React.createElement('div', { className: 'tw-blur tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-w-32 tw-h-12 tw-text-white tw-text-xs tw-flex tw-items-center tw-justify-center' }, 'blur'),
        },
      ],
    },
    {
      title: 'Brightness',
      examples: [
        {
          label: 'brightness-50',
          twcCode: 'brightness("50%")',
          twcElement: React.createElement('div', { className: cx(brightness('50%'), bg('#818cf8'), p(4), rounded("lg"), sampleBoxClasses) }, 'brightness-50'),
          tailwindCode: 'brightness-50',
          tailwindElement: React.createElement('div', { className: 'tw-brightness-50 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs tw-text-center' }, 'brightness-50'),
        },
        {
          label: 'brightness-150',
          twcCode: 'brightness("150%")',
          twcElement: React.createElement('div', { className: cx(brightness('150%'), bg('#818cf8'), p(4), rounded("lg"), sampleBoxClasses) }, 'brightness-150'),
          tailwindCode: 'brightness-150',
          tailwindElement: React.createElement('div', { className: 'tw-brightness-150 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs tw-text-center' }, 'brightness-150'),
        },
      ],
    },
    {
      title: 'Contrast',
      examples: [
        {
          label: 'contrast-50',
          twcCode: 'contrast("50%")',
          twcElement: React.createElement('div', { className: cx(contrast('50%'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'contrast-50'),
          tailwindCode: 'contrast-50',
          tailwindElement: React.createElement('div', { className: 'tw-contrast-50 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'contrast-50'),
        },
        {
          label: 'contrast-200',
          twcCode: 'contrast("200%")',
          twcElement: React.createElement('div', { className: cx(contrast('200%'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'contrast-200'),
          tailwindCode: 'contrast-200',
          tailwindElement: React.createElement('div', { className: 'tw-contrast-200 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'contrast-200'),
        },
      ],
    },
    {
      title: 'Grayscale & Sepia',
      examples: [
        {
          label: 'grayscale',
          twcCode: 'grayscale("100%")',
          twcElement: React.createElement('div', { className: cx(grayscale('100%'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'grayscale'),
          tailwindCode: 'grayscale',
          tailwindElement: React.createElement('div', { className: 'tw-grayscale tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'grayscale'),
        },
        {
          label: 'sepia',
          twcCode: 'sepia("100%")',
          twcElement: React.createElement('div', { className: cx(sepia('100%'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'sepia'),
          tailwindCode: 'sepia',
          tailwindElement: React.createElement('div', { className: 'tw-sepia tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'sepia'),
        },
      ],
    },
    {
      title: 'Invert & Saturate',
      examples: [
        {
          label: 'invert',
          twcCode: 'invert("100%")',
          twcElement: React.createElement('div', { className: cx(invert('100%'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'invert'),
          tailwindCode: 'invert',
          tailwindElement: React.createElement('div', { className: 'tw-invert tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'invert'),
        },
        {
          label: 'saturate-200',
          twcCode: 'saturate("200%")',
          twcElement: React.createElement('div', { className: cx(saturate('200%'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'saturate-200'),
          tailwindCode: 'saturate-200',
          tailwindElement: React.createElement('div', { className: 'tw-saturate-200 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'saturate-200'),
        },
      ],
    },
    {
      title: 'Hue Rotate',
      examples: [
        {
          label: 'hue-rotate-90',
          twcCode: 'hueRotate("90deg")',
          twcElement: React.createElement('div', { className: cx(hueRotate('90deg'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'hue-rotate-90'),
          tailwindCode: 'hue-rotate-90',
          tailwindElement: React.createElement('div', { className: 'tw-hue-rotate-90 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'hue-rotate-90'),
        },
        {
          label: 'hue-rotate-180',
          twcCode: 'hueRotate("180deg")',
          twcElement: React.createElement('div', { className: cx(hueRotate('180deg'), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'hue-rotate-180'),
          tailwindCode: 'hue-rotate-180',
          tailwindElement: React.createElement('div', { className: 'tw-hue-rotate-180 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'hue-rotate-180'),
        },
      ],
    },
    {
      title: 'Backdrop Filters',
      examples: [
        {
          label: 'backdrop-blur-md',
          twcCode: 'backdropBlur("12px")',
          twcElement: React.createElement('div', { className: cx(relative(), w(48), h(20), bgImage('linear-gradient(135deg, #818cf8, #f43f5e)'), rounded("lg"), overflow('hidden')) },
            React.createElement('div', { className: cx(backdropBlur('12px'), absolute(), inset(4), rounded(), flex(), items('center'), justify('center'), bg('rgba(255,255,255,0.2)'), textColor('#ffffff'), text(xs)) }, 'backdrop-blur'),
          ),
          tailwindCode: 'backdrop-blur-md',
          tailwindElement: React.createElement('div', { className: 'tw-relative tw-w-48 tw-h-20 tw-rounded-lg tw-overflow-hidden', style: { background: 'linear-gradient(135deg, #818cf8, #f43f5e)' } },
            React.createElement('div', { className: 'tw-backdrop-blur-md tw-absolute tw-inset-4 tw-rounded tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xs', style: { background: 'rgba(255,255,255,0.2)' } }, 'backdrop-blur'),
          ),
        },
        {
          label: 'backdrop-grayscale',
          twcCode: 'backdropGrayscale("100%")',
          twcElement: React.createElement('div', { className: cx(relative(), w(48), h(20), bgImage('linear-gradient(135deg, #818cf8, #f43f5e)'), rounded("lg"), overflow('hidden')) },
            React.createElement('div', { className: cx(backdropGrayscale('100%'), absolute(), inset(4), rounded(), flex(), items('center'), justify('center'), bg('rgba(255,255,255,0.1)'), textColor('#ffffff'), text(xs)) }, 'backdrop-grayscale'),
          ),
          tailwindCode: 'backdrop-grayscale',
          tailwindElement: React.createElement('div', { className: 'tw-relative tw-w-48 tw-h-20 tw-rounded-lg tw-overflow-hidden', style: { background: 'linear-gradient(135deg, #818cf8, #f43f5e)' } },
            React.createElement('div', { className: 'tw-backdrop-grayscale tw-absolute tw-inset-4 tw-rounded tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xs', style: { background: 'rgba(255,255,255,0.1)' } }, 'backdrop-grayscale'),
          ),
        },
      ],
    },
  ],
}
