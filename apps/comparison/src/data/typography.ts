import React from 'react'
import {
  cx, text, font, textColor, textAlign, tracking, leading, fontFamily,
  antialiased, italic, notItalic,
  textDecoration, textDecorationColor, textDecorationStyle, textDecorationThickness,
  textTransform, textOverflow, textWrap, textIndent,
  whitespace, wordBreak, lineClamp, listStyleType, listStylePosition,
  verticalAlign, textUnderlineOffset,
  bg, p, w, flex, rounded, overflow,
} from 'typewritingclass'
import { xs, sm, base, lg, xl, _2xl, _3xl } from 'typewritingclass/theme/typography'
import { thin, light, normal, medium, semibold, bold, extrabold, black_ } from 'typewritingclass/theme/typography'
import { DEFAULT as defaultRadius } from 'typewritingclass/theme/borders'
import type { ComparisonCategory } from './types.ts'

export const typographyData: ComparisonCategory = {
  title: 'Typography',
  description: 'Font size, weight, family, alignment, decoration, transform, overflow, and more',
  sections: [
    {
      title: 'Font Size',
      examples: [
        {
          label: 'text-xs',
          twcCode: 'text(xs)',
          twcElement: React.createElement('span', { className: cx(text(xs)) }, 'The quick brown fox (xs)'),
          tailwindCode: 'text-xs',
          tailwindElement: React.createElement('span', { className: 'tw-text-xs' }, 'The quick brown fox (xs)'),
        },
        {
          label: 'text-base',
          twcCode: 'text(base)',
          twcElement: React.createElement('span', { className: cx(text(base)) }, 'The quick brown fox (base)'),
          tailwindCode: 'text-base',
          tailwindElement: React.createElement('span', { className: 'tw-text-base' }, 'The quick brown fox (base)'),
        },
        {
          label: 'text-xl',
          twcCode: 'text(xl)',
          twcElement: React.createElement('span', { className: cx(text(xl)) }, 'The quick brown fox (xl)'),
          tailwindCode: 'text-xl',
          tailwindElement: React.createElement('span', { className: 'tw-text-xl' }, 'The quick brown fox (xl)'),
        },
        {
          label: 'text-3xl',
          twcCode: 'text(_3xl)',
          twcElement: React.createElement('span', { className: cx(text(_3xl)) }, 'The quick brown fox (3xl)'),
          tailwindCode: 'text-3xl',
          tailwindElement: React.createElement('span', { className: 'tw-text-3xl' }, 'The quick brown fox (3xl)'),
        },
      ],
    },
    {
      title: 'Font Weight',
      examples: [
        {
          label: 'font-light (300)',
          twcCode: 'font(light)',
          twcElement: React.createElement('span', { className: cx(font(light), text(lg)) }, 'Light weight text'),
          tailwindCode: 'font-light',
          tailwindElement: React.createElement('span', { className: 'tw-font-light tw-text-lg' }, 'Light weight text'),
        },
        {
          label: 'font-semibold (600)',
          twcCode: 'font(semibold)',
          twcElement: React.createElement('span', { className: cx(font(semibold), text(lg)) }, 'Semibold weight text'),
          tailwindCode: 'font-semibold',
          tailwindElement: React.createElement('span', { className: 'tw-font-semibold tw-text-lg' }, 'Semibold weight text'),
        },
        {
          label: 'font-bold (700)',
          twcCode: 'font(bold)',
          twcElement: React.createElement('span', { className: cx(font(bold), text(lg)) }, 'Bold weight text'),
          tailwindCode: 'font-bold',
          tailwindElement: React.createElement('span', { className: 'tw-font-bold tw-text-lg' }, 'Bold weight text'),
        },
        {
          label: 'font-extrabold (800)',
          twcCode: 'font(extrabold)',
          twcElement: React.createElement('span', { className: cx(font(extrabold), text(lg)) }, 'Extrabold weight text'),
          tailwindCode: 'font-extrabold',
          tailwindElement: React.createElement('span', { className: 'tw-font-extrabold tw-text-lg' }, 'Extrabold weight text'),
        },
      ],
    },
    {
      title: 'Text Color',
      examples: [
        {
          label: 'text-blue-600',
          twcCode: 'textColor("#2563eb")',
          twcElement: React.createElement('span', { className: cx(textColor('#2563eb'), text(lg)) }, 'Blue text'),
          tailwindCode: 'text-blue-600',
          tailwindElement: React.createElement('span', { className: 'tw-text-blue-600 tw-text-lg' }, 'Blue text'),
        },
        {
          label: 'text-red-500',
          twcCode: 'textColor("#ef4444")',
          twcElement: React.createElement('span', { className: cx(textColor('#ef4444'), text(lg)) }, 'Red text'),
          tailwindCode: 'text-red-500',
          tailwindElement: React.createElement('span', { className: 'tw-text-red-500 tw-text-lg' }, 'Red text'),
        },
        {
          label: 'text-emerald-500',
          twcCode: 'textColor("#10b981")',
          twcElement: React.createElement('span', { className: cx(textColor('#10b981'), text(lg)) }, 'Emerald text'),
          tailwindCode: 'text-emerald-500',
          tailwindElement: React.createElement('span', { className: 'tw-text-emerald-500 tw-text-lg' }, 'Emerald text'),
        },
      ],
    },
    {
      title: 'Text Alignment',
      examples: [
        {
          label: 'text-center',
          twcCode: 'textAlign("center")',
          twcElement: React.createElement('div', { className: cx(textAlign('center'), bg('#e0e7ff'), p(2), rounded(defaultRadius)) }, 'Centered text'),
          tailwindCode: 'text-center',
          tailwindElement: React.createElement('div', { className: 'tw-text-center tw-bg-indigo-100 tw-p-2 tw-rounded' }, 'Centered text'),
        },
        {
          label: 'text-right',
          twcCode: 'textAlign("right")',
          twcElement: React.createElement('div', { className: cx(textAlign('right'), bg('#e0e7ff'), p(2), rounded(defaultRadius)) }, 'Right-aligned text'),
          tailwindCode: 'text-right',
          tailwindElement: React.createElement('div', { className: 'tw-text-right tw-bg-indigo-100 tw-p-2 tw-rounded' }, 'Right-aligned text'),
        },
      ],
    },
    {
      title: 'Letter Spacing & Line Height',
      examples: [
        {
          label: 'tracking-wide',
          twcCode: 'tracking("0.025em")',
          twcElement: React.createElement('span', { className: cx(tracking('0.025em'), text(lg)) }, 'Wide tracking'),
          tailwindCode: 'tracking-wide',
          tailwindElement: React.createElement('span', { className: 'tw-tracking-wide tw-text-lg' }, 'Wide tracking'),
        },
        {
          label: 'tracking-widest',
          twcCode: 'tracking("0.1em")',
          twcElement: React.createElement('span', { className: cx(tracking('0.1em'), text(lg)) }, 'Widest tracking'),
          tailwindCode: 'tracking-widest',
          tailwindElement: React.createElement('span', { className: 'tw-tracking-widest tw-text-lg' }, 'Widest tracking'),
        },
        {
          label: 'leading-loose (2)',
          twcCode: 'leading(2)',
          twcElement: React.createElement('p', { className: cx(text(sm), leading(2), bg('#e0e7ff'), p(2), rounded(defaultRadius), w('16rem')) }, 'This paragraph has loose line-height (2) which gives generous spacing between lines of text.'),
          tailwindCode: 'leading-loose',
          tailwindElement: React.createElement('p', { className: 'tw-leading-loose tw-bg-indigo-100 tw-p-2 tw-rounded tw-w-64 tw-text-sm' }, 'This paragraph has loose line-height (2) which gives generous spacing between lines of text.'),
        },
      ],
    },
    {
      title: 'Font Style',
      examples: [
        {
          label: 'italic',
          twcCode: 'italic()',
          twcElement: React.createElement('span', { className: cx(italic(), text(lg)) }, 'Italic text'),
          tailwindCode: 'italic',
          tailwindElement: React.createElement('span', { className: 'tw-italic tw-text-lg' }, 'Italic text'),
        },
        {
          label: 'not-italic',
          twcCode: 'notItalic()',
          twcElement: React.createElement('em', { className: cx(notItalic(), text(lg)) }, 'Not italic (overriding em)'),
          tailwindCode: 'not-italic',
          tailwindElement: React.createElement('em', { className: 'tw-not-italic tw-text-lg' }, 'Not italic (overriding em)'),
        },
      ],
    },
    {
      title: 'Text Decoration',
      examples: [
        {
          label: 'underline',
          twcCode: 'textDecoration("underline")',
          twcElement: React.createElement('span', { className: cx(textDecoration('underline'), text(lg)) }, 'Underlined text'),
          tailwindCode: 'underline',
          tailwindElement: React.createElement('span', { className: 'tw-underline tw-text-lg' }, 'Underlined text'),
        },
        {
          label: 'line-through',
          twcCode: 'textDecoration("line-through")',
          twcElement: React.createElement('span', { className: cx(textDecoration('line-through'), text(lg)) }, 'Strikethrough text'),
          tailwindCode: 'line-through',
          tailwindElement: React.createElement('span', { className: 'tw-line-through tw-text-lg' }, 'Strikethrough text'),
        },
        {
          label: 'underline with color',
          twcCode: 'textDecoration("underline"), textDecorationColor("#ef4444")',
          twcElement: React.createElement('span', { className: cx(textDecoration('underline'), textDecorationColor('#ef4444'), text(lg)) }, 'Red underline'),
          tailwindCode: 'underline decoration-red-500',
          tailwindElement: React.createElement('span', { className: 'tw-underline tw-decoration-red-500 tw-text-lg' }, 'Red underline'),
        },
      ],
    },
    {
      title: 'Text Transform',
      examples: [
        {
          label: 'uppercase',
          twcCode: 'textTransform("uppercase")',
          twcElement: React.createElement('span', { className: cx(textTransform('uppercase'), text(lg)) }, 'uppercase text'),
          tailwindCode: 'uppercase',
          tailwindElement: React.createElement('span', { className: 'tw-uppercase tw-text-lg' }, 'uppercase text'),
        },
        {
          label: 'lowercase',
          twcCode: 'textTransform("lowercase")',
          twcElement: React.createElement('span', { className: cx(textTransform('lowercase'), text(lg)) }, 'LOWERCASE TEXT'),
          tailwindCode: 'lowercase',
          tailwindElement: React.createElement('span', { className: 'tw-lowercase tw-text-lg' }, 'LOWERCASE TEXT'),
        },
        {
          label: 'capitalize',
          twcCode: 'textTransform("capitalize")',
          twcElement: React.createElement('span', { className: cx(textTransform('capitalize'), text(lg)) }, 'capitalize each word'),
          tailwindCode: 'capitalize',
          tailwindElement: React.createElement('span', { className: 'tw-capitalize tw-text-lg' }, 'capitalize each word'),
        },
      ],
    },
    {
      title: 'Text Overflow & Wrap',
      examples: [
        {
          label: 'truncate',
          twcCode: 'textOverflow("ellipsis"), overflow("hidden"), whitespace("nowrap")',
          twcElement: React.createElement('div', { className: cx(textOverflow('ellipsis'), overflow('hidden'), whitespace('nowrap'), w('12rem'), bg('#e0e7ff'), p(2), rounded(defaultRadius), text(sm)) }, 'This is a very long text that should be truncated with an ellipsis'),
          tailwindCode: 'truncate',
          tailwindElement: React.createElement('div', { className: 'tw-truncate tw-w-48 tw-bg-indigo-100 tw-p-2 tw-rounded tw-text-sm' }, 'This is a very long text that should be truncated with an ellipsis'),
        },
        {
          label: 'line-clamp-2',
          twcCode: 'lineClamp(2)',
          twcElement: React.createElement('div', { className: cx(lineClamp(2), w('16rem'), bg('#e0e7ff'), p(2), rounded(defaultRadius), text(sm)) }, 'This is a longer text that should be clamped to two lines. Any additional content beyond the second line will be hidden with an ellipsis at the end.'),
          tailwindCode: 'line-clamp-2',
          tailwindElement: React.createElement('div', { className: 'tw-line-clamp-2 tw-w-64 tw-bg-indigo-100 tw-p-2 tw-rounded tw-text-sm' }, 'This is a longer text that should be clamped to two lines. Any additional content beyond the second line will be hidden with an ellipsis at the end.'),
        },
      ],
    },
    {
      title: 'List Style',
      examples: [
        {
          label: 'list-disc list-inside',
          twcCode: 'listStyleType("disc"), listStylePosition("inside")',
          twcElement: React.createElement('ul', { className: cx(listStyleType('disc'), listStylePosition('inside'), bg('#e0e7ff'), p(3), rounded(defaultRadius), text(sm)) },
            React.createElement('li', { key: 1 }, 'First item'),
            React.createElement('li', { key: 2 }, 'Second item'),
            React.createElement('li', { key: 3 }, 'Third item'),
          ),
          tailwindCode: 'list-disc list-inside',
          tailwindElement: React.createElement('ul', { className: 'tw-list-disc tw-list-inside tw-bg-indigo-100 tw-p-3 tw-rounded tw-text-sm' },
            React.createElement('li', { key: 1 }, 'First item'),
            React.createElement('li', { key: 2 }, 'Second item'),
            React.createElement('li', { key: 3 }, 'Third item'),
          ),
        },
        {
          label: 'list-decimal',
          twcCode: 'listStyleType("decimal"), listStylePosition("inside")',
          twcElement: React.createElement('ol', { className: cx(listStyleType('decimal'), listStylePosition('inside'), bg('#e0e7ff'), p(3), rounded(defaultRadius), text(sm)) },
            React.createElement('li', { key: 1 }, 'First item'),
            React.createElement('li', { key: 2 }, 'Second item'),
            React.createElement('li', { key: 3 }, 'Third item'),
          ),
          tailwindCode: 'list-decimal list-inside',
          tailwindElement: React.createElement('ol', { className: 'tw-list-decimal tw-list-inside tw-bg-indigo-100 tw-p-3 tw-rounded tw-text-sm' },
            React.createElement('li', { key: 1 }, 'First item'),
            React.createElement('li', { key: 2 }, 'Second item'),
            React.createElement('li', { key: 3 }, 'Third item'),
          ),
        },
      ],
    },
  ],
}
