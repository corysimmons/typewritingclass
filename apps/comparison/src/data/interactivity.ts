import React from 'react'
import {
  cx, cursor, select, pointerEvents,
  accentColor, appearance, caretColor, resize,
  scrollBehavior, scrollMargin, scrollPadding,
  snapAlign, snapType, touchAction, willChange,
  bg, p, w, h, flex, flexCol, rounded, textColor, border, borderColor, overflow,
  opacity, gap, items, text, textAlign, shrink, scrollPaddingL,
} from 'typewritingclass'
import { xs } from 'typewritingclass/theme/typography'
import type { ComparisonCategory } from './types.ts'

export const interactivityData: ComparisonCategory = {
  title: 'Interactivity',
  description: 'Cursor, user select, pointer events, scroll behavior, snap, resize, and more',
  sections: [
    {
      title: 'Cursor',
      examples: [
        {
          label: 'cursor-pointer',
          twcCode: 'cursor("pointer")',
          twcElement: React.createElement('div', { className: cx(cursor('pointer'), bg('#c7d2fe'), p(4), rounded(), text(xs)) }, 'Hover for pointer cursor'),
          tailwindCode: 'cursor-pointer',
          tailwindElement: React.createElement('div', { className: 'tw-cursor-pointer tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'Hover for pointer cursor'),
        },
        {
          label: 'cursor-wait',
          twcCode: 'cursor("wait")',
          twcElement: React.createElement('div', { className: cx(cursor('wait'), bg('#c7d2fe'), p(4), rounded(), text(xs)) }, 'Hover for wait cursor'),
          tailwindCode: 'cursor-wait',
          tailwindElement: React.createElement('div', { className: 'tw-cursor-wait tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'Hover for wait cursor'),
        },
        {
          label: 'cursor-not-allowed',
          twcCode: 'cursor("not-allowed")',
          twcElement: React.createElement('div', { className: cx(cursor('not-allowed'), bg('#c7d2fe'), p(4), rounded(), text(xs)) }, 'Hover for not-allowed cursor'),
          tailwindCode: 'cursor-not-allowed',
          tailwindElement: React.createElement('div', { className: 'tw-cursor-not-allowed tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'Hover for not-allowed cursor'),
        },
        {
          label: 'cursor-grab',
          twcCode: 'cursor("grab")',
          twcElement: React.createElement('div', { className: cx(cursor('grab'), bg('#c7d2fe'), p(4), rounded(), text(xs)) }, 'Hover for grab cursor'),
          tailwindCode: 'cursor-grab',
          tailwindElement: React.createElement('div', { className: 'tw-cursor-grab tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'Hover for grab cursor'),
        },
      ],
    },
    {
      title: 'User Select',
      examples: [
        {
          label: 'select-none',
          twcCode: 'select("none")',
          twcElement: React.createElement('div', { className: cx(select('none'), bg('#c7d2fe'), p(4), rounded(), text(xs)) }, 'Try to select this text (select-none)'),
          tailwindCode: 'select-none',
          tailwindElement: React.createElement('div', { className: 'tw-select-none tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'Try to select this text (select-none)'),
        },
        {
          label: 'select-all',
          twcCode: 'select("all")',
          twcElement: React.createElement('div', { className: cx(select('all'), bg('#c7d2fe'), p(4), rounded(), text(xs)) }, 'Click to select all text'),
          tailwindCode: 'select-all',
          tailwindElement: React.createElement('div', { className: 'tw-select-all tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs' }, 'Click to select all text'),
        },
      ],
    },
    {
      title: 'Pointer Events',
      examples: [
        {
          label: 'pointer-events-none',
          twcCode: 'pointerEvents("none")',
          twcElement: React.createElement('div', { className: cx(pointerEvents('none'), bg('#c7d2fe'), p(4), rounded(), opacity(0.5), text(xs)) }, 'Cannot interact (pointer-events-none)'),
          tailwindCode: 'pointer-events-none',
          tailwindElement: React.createElement('div', { className: 'tw-pointer-events-none tw-bg-indigo-200 tw-p-4 tw-rounded tw-text-xs tw-opacity-50' }, 'Cannot interact (pointer-events-none)'),
        },
      ],
    },
    {
      title: 'Resize',
      examples: [
        {
          label: 'resize',
          twcCode: 'resize("both"), overflow("auto")',
          twcElement: React.createElement('div', { className: cx(resize('both'), overflow('auto'), bg('#c7d2fe'), p(4), rounded(), border(), borderColor('#818cf8'), w('12rem'), h('4rem'), text(xs)) }, 'Resize me (both)'),
          tailwindCode: 'resize overflow-auto',
          tailwindElement: React.createElement('div', { className: 'tw-resize tw-overflow-auto tw-bg-indigo-200 tw-p-4 tw-rounded tw-border tw-border-indigo-400 tw-w-48 tw-h-16 tw-text-xs' }, 'Resize me (both)'),
        },
        {
          label: 'resize-y',
          twcCode: 'resize("vertical"), overflow("auto")',
          twcElement: React.createElement('div', { className: cx(resize('vertical'), overflow('auto'), bg('#c7d2fe'), p(4), rounded(), border(), borderColor('#818cf8'), w('12rem'), h('4rem'), text(xs)) }, 'Resize vertical'),
          tailwindCode: 'resize-y overflow-auto',
          tailwindElement: React.createElement('div', { className: 'tw-resize-y tw-overflow-auto tw-bg-indigo-200 tw-p-4 tw-rounded tw-border tw-border-indigo-400 tw-w-48 tw-h-16 tw-text-xs' }, 'Resize vertical'),
        },
      ],
    },
    {
      title: 'Accent & Caret Color',
      examples: [
        {
          label: 'accent-indigo-500',
          twcCode: 'accentColor("#6366f1")',
          twcElement: React.createElement('label', { className: cx(flex(), gap(2), items('center'), text(xs)) },
            React.createElement('input', { type: 'checkbox', className: cx(accentColor('#6366f1')), defaultChecked: true }),
            'Accent color checkbox',
          ),
          tailwindCode: 'accent-indigo-500',
          tailwindElement: React.createElement('label', { className: 'tw-flex tw-gap-2 tw-items-center tw-text-xs' },
            React.createElement('input', { type: 'checkbox', className: 'tw-accent-indigo-500', defaultChecked: true }),
            'Accent color checkbox',
          ),
        },
        {
          label: 'caret-red-500',
          twcCode: 'caretColor("#ef4444")',
          twcElement: React.createElement('input', { type: 'text', placeholder: 'Type here (red caret)', className: cx(caretColor('#ef4444'), p(2), border(), borderColor('#e2e8f0'), rounded(), w('12rem'), text(xs)) }),
          tailwindCode: 'caret-red-500',
          tailwindElement: React.createElement('input', { type: 'text', placeholder: 'Type here (red caret)', className: 'tw-caret-red-500 tw-p-2 tw-border tw-border-slate-200 tw-rounded tw-w-48 tw-text-xs' }),
        },
      ],
    },
    {
      title: 'Scroll Snap',
      examples: [
        {
          label: 'snap-x snap-mandatory + snap-start',
          twcCode: 'snapType("x mandatory") + snapAlign("start")',
          twcElement: React.createElement('div', { className: cx(snapType('x mandatory'), flex(), overflow('auto'), gap(2), scrollPaddingL('0.5rem'), w('14rem')) },
            ...[1,2,3,4,5].map(n => React.createElement('div', { key: n, className: cx(snapAlign('start'), bg('#818cf8'), p(4), rounded(), textColor('#ffffff'), shrink(0), w('6rem'), text(xs), textAlign('center')) }, `Snap ${n}`)),
          ),
          tailwindCode: 'snap-x snap-mandatory + snap-start',
          tailwindElement: React.createElement('div', { className: 'tw-snap-x tw-snap-mandatory tw-flex tw-overflow-auto tw-gap-2', style: { width: '14rem', scrollPaddingLeft: '0.5rem' } },
            ...[1,2,3,4,5].map(n => React.createElement('div', { key: n, className: 'tw-snap-start tw-bg-indigo-400 tw-p-4 tw-rounded tw-text-white tw-shrink-0 tw-w-24 tw-text-xs tw-text-center' }, `Snap ${n}`)),
          ),
        },
      ],
    },
    {
      title: 'Appearance',
      examples: [
        {
          label: 'appearance-none',
          twcCode: 'appearance("none")',
          twcElement: React.createElement('select', { className: cx(appearance('none'), p(2), border(), borderColor('#818cf8'), rounded(), bg('#ffffff'), w('10rem'), text(xs)) },
            React.createElement('option', null, 'appearance-none'),
            React.createElement('option', null, 'Option 2'),
          ),
          tailwindCode: 'appearance-none',
          tailwindElement: React.createElement('select', { className: 'tw-appearance-none tw-p-2 tw-border tw-border-indigo-400 tw-rounded tw-bg-white tw-w-40 tw-text-xs' },
            React.createElement('option', null, 'appearance-none'),
            React.createElement('option', null, 'Option 2'),
          ),
        },
      ],
    },
  ],
}
