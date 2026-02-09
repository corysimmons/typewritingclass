import React from 'react'
import { tw } from 'typewritingclass'
import { _2xl } from 'typewritingclass/theme/typography'
import { bold } from 'typewritingclass/theme/typography'
import type { ComparisonCategory } from './types.ts'

// Shared data URI SVGs used as background-image
const squareSvg = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'%3E%3Crect width=\'40\' height=\'40\' fill=\'%23818cf8\'/%3E%3C/svg%3E")'
const circleSvg = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'18\' fill=\'%23818cf8\'/%3E%3C/svg%3E")'
const checkerSvg = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Crect width=\'16\' height=\'16\' fill=\'%23818cf8\'/%3E%3Crect x=\'8\' width=\'8\' height=\'8\' fill=\'%23a5b4fc\'/%3E%3Crect y=\'8\' width=\'8\' height=\'8\' fill=\'%23a5b4fc\'/%3E%3C/svg%3E")'
const dotSvg = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Crect width=\'16\' height=\'16\' fill=\'%23818cf8\'/%3E%3C/svg%3E")'

export const backgroundsData: ComparisonCategory = {
  title: 'Backgrounds',
  description: 'Background color, gradients, attachment, clip, origin, position, repeat, and size',
  sections: [
    {
      title: 'Background Color',
      examples: [
        {
          label: 'bg-blue-500',
          twcCode: 'bg("blue-500")',
          twcElement: React.createElement('div', { className: tw.bg('blue-500').p(4).rounded.textColor('white') }, 'bg-blue-500'),
          tailwindCode: 'bg-blue-500',
          tailwindElement: React.createElement('div', { className: 'tw-bg-blue-500 tw-p-4 tw-rounded tw-text-white' }, 'bg-blue-500'),
        },
        {
          label: 'bg-emerald-400',
          twcCode: 'bg("emerald-400")',
          twcElement: React.createElement('div', { className: tw.bg('emerald-400').p(4).rounded.textColor('white') }, 'bg-emerald-400'),
          tailwindCode: 'bg-emerald-400',
          tailwindElement: React.createElement('div', { className: 'tw-bg-emerald-400 tw-p-4 tw-rounded tw-text-white' }, 'bg-emerald-400'),
        },
        {
          label: 'bg-rose-500',
          twcCode: 'bg("rose-500")',
          twcElement: React.createElement('div', { className: tw.bg('rose-500').p(4).rounded.textColor('white') }, 'bg-rose-500'),
          tailwindCode: 'bg-rose-500',
          tailwindElement: React.createElement('div', { className: 'tw-bg-rose-500 tw-p-4 tw-rounded tw-text-white' }, 'bg-rose-500'),
        },
        {
          label: 'bg-amber-300',
          twcCode: 'bg("amber-300")',
          twcElement: React.createElement('div', { className: tw.bg('amber-300').p(4).rounded }, 'bg-amber-300'),
          tailwindCode: 'bg-amber-300',
          tailwindElement: React.createElement('div', { className: 'tw-bg-amber-300 tw-p-4 tw-rounded' }, 'bg-amber-300'),
        },
      ],
    },
    {
      title: 'Gradients',
      examples: [
        {
          label: 'gradient to-right (blue to purple)',
          twcCode: 'bgGradient("to right"), gradientFrom("blue-500"), gradientTo("violet-500")',
          twcElement: React.createElement('div', { className: tw.bgGradient('to right').gradientFrom('blue-500').gradientTo('violet-500').p(4).rounded.textColor('white') }, 'to right'),
          tailwindCode: 'bg-gradient-to-r from-blue-500 to-violet-500',
          tailwindElement: React.createElement('div', { className: 'tw-bg-gradient-to-r tw-from-blue-500 tw-to-violet-500 tw-p-4 tw-rounded tw-text-white' }, 'to right'),
        },
        {
          label: 'gradient to-bottom-right with via',
          twcCode: 'bgGradient("to bottom right"), gradientFrom("rose-500"), gradientVia("amber-500"), gradientTo("emerald-500")',
          twcElement: React.createElement('div', { className: tw.bgGradient('to bottom right').gradientFrom('rose-500').gradientVia('amber-500').gradientTo('emerald-500').p(4).rounded.textColor('white') }, 'to bottom right'),
          tailwindCode: 'bg-gradient-to-br from-rose-500 via-amber-500 to-emerald-500',
          tailwindElement: React.createElement('div', { className: 'tw-bg-gradient-to-br tw-from-rose-500 tw-via-amber-500 tw-to-emerald-500 tw-p-4 tw-rounded tw-text-white' }, 'to bottom right'),
        },
        {
          label: 'gradient to-top (emerald to cyan)',
          twcCode: 'bgGradient("to top"), gradientFrom("emerald-500"), gradientTo("cyan-500")',
          twcElement: React.createElement('div', { className: tw.bgGradient('to top').gradientFrom('emerald-500').gradientTo('cyan-500').p(4).rounded.textColor('white') }, 'to top'),
          tailwindCode: 'bg-gradient-to-t from-emerald-500 to-cyan-500',
          tailwindElement: React.createElement('div', { className: 'tw-bg-gradient-to-t tw-from-emerald-500 tw-to-cyan-500 tw-p-4 tw-rounded tw-text-white' }, 'to top'),
        },
      ],
    },
    {
      title: 'Background Position',
      examples: [
        {
          label: 'bg-center',
          twcCode: 'bgPosition("center"), bgRepeat("no-repeat")',
          twcElement: React.createElement('div', { className: tw.bgPosition('center').bgRepeat('no-repeat').w(32).h(16).rounded.border.borderColor('indigo-200').bgImage(squareSvg) }),
          tailwindCode: 'bg-center bg-no-repeat',
          tailwindElement: React.createElement('div', { className: 'tw-bg-center tw-bg-no-repeat tw-w-32 tw-h-16 tw-rounded tw-border tw-border-indigo-200', style: { backgroundImage: squareSvg } }),
        },
      ],
    },
    {
      title: 'Background Size',
      examples: [
        {
          label: 'bg-cover',
          twcCode: 'bgSize("cover")',
          twcElement: React.createElement('div', { className: tw.bgSize('cover').w(32).h(16).rounded.bgImage(`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23818cf8'/%3E%3Cline x1='0' y1='20' x2='20' y2='0' stroke='%236366f1' stroke-width='3'/%3E%3C/svg%3E")`) }),
          tailwindCode: 'bg-cover',
          tailwindElement: React.createElement('div', { className: 'tw-bg-cover tw-w-32 tw-h-16 tw-rounded', style: { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23818cf8'/%3E%3Cline x1='0' y1='20' x2='20' y2='0' stroke='%236366f1' stroke-width='3'/%3E%3C/svg%3E")` } }),
        },
        {
          label: 'bg-contain',
          twcCode: 'bgSize("contain"), bgRepeat("no-repeat"), bgPosition("center")',
          twcElement: React.createElement('div', { className: tw.bgSize('contain').bgRepeat('no-repeat').bgPosition('center').w(32).h(16).rounded.border.borderColor('indigo-200').bgImage(circleSvg) }),
          tailwindCode: 'bg-contain bg-no-repeat bg-center',
          tailwindElement: React.createElement('div', { className: 'tw-bg-contain tw-bg-no-repeat tw-bg-center tw-w-32 tw-h-16 tw-rounded tw-border tw-border-indigo-200', style: { backgroundImage: circleSvg } }),
        },
      ],
    },
    {
      title: 'Background Repeat',
      examples: [
        {
          label: 'bg-repeat',
          twcCode: 'bgRepeat("repeat")',
          twcElement: React.createElement('div', { className: tw.bgRepeat('repeat').w(40).h(16).rounded.border.borderColor('indigo-200').bgImage(checkerSvg) }),
          tailwindCode: 'bg-repeat',
          tailwindElement: React.createElement('div', { className: 'tw-bg-repeat tw-w-40 tw-h-16 tw-rounded tw-border tw-border-indigo-200', style: { backgroundImage: checkerSvg } }),
        },
        {
          label: 'bg-no-repeat',
          twcCode: 'bgRepeat("no-repeat")',
          twcElement: React.createElement('div', { className: tw.bgRepeat('no-repeat').w(40).h(16).rounded.border.borderColor('indigo-200').bgImage(dotSvg) }),
          tailwindCode: 'bg-no-repeat',
          tailwindElement: React.createElement('div', { className: 'tw-bg-no-repeat tw-w-40 tw-h-16 tw-rounded tw-border tw-border-indigo-200', style: { backgroundImage: dotSvg } }),
        },
      ],
    },
    {
      title: 'Background Clip',
      examples: [
        {
          label: 'bg-clip-text (gradient text)',
          twcCode: 'bgClip("text"), bgGradient("to right"), gradientFrom("blue-500"), gradientTo("violet-500"), textColor("transparent")',
          twcElement: React.createElement('span', { className: tw.bgClip('text').text(_2xl).font(bold).bgGradient('to right').gradientFrom('blue-500').gradientTo('violet-500').textColor('transparent') }, 'Gradient Text'),
          tailwindCode: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500',
          tailwindElement: React.createElement('span', { className: 'tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-500 tw-to-violet-500 tw-text-2xl tw-font-bold' }, 'Gradient Text'),
        },
      ],
    },
  ],
}
