import React from 'react'
import { cx, fill, stroke, strokeWidth, css } from 'typewritingclass'
import type { ComparisonCategory } from './types.ts'

export const svgData: ComparisonCategory = {
  title: 'SVG',
  description: 'Fill, stroke, and stroke-width utilities for SVG elements',
  sections: [
    {
      title: 'Fill',
      examples: [
        {
          label: 'fill-blue-500',
          twcCode: 'cx(fill("#3b82f6"))',
          twcElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: cx(fill('#3b82f6')) },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
          ),
          tailwindCode: 'fill-blue-500',
          tailwindElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: 'tw-fill-blue-500' },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
          ),
        },
        {
          label: 'fill-emerald-500',
          twcCode: 'cx(fill("#10b981"))',
          twcElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: cx(fill('#10b981')) },
            React.createElement('rect', { x: 2, y: 2, width: 20, height: 20, rx: 3 }),
          ),
          tailwindCode: 'fill-emerald-500',
          tailwindElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: 'tw-fill-emerald-500' },
            React.createElement('rect', { x: 2, y: 2, width: 20, height: 20, rx: 3 }),
          ),
        },
      ],
    },
    {
      title: 'Stroke',
      examples: [
        {
          label: 'stroke-indigo-500 stroke-2',
          twcCode: 'cx(stroke("#6366f1"), strokeWidth("2"))',
          twcElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: cx(stroke('#6366f1'), strokeWidth('2'), fill('none')) },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
          ),
          tailwindCode: 'stroke-indigo-500 stroke-2',
          tailwindElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: 'tw-stroke-indigo-500 tw-stroke-2 tw-fill-none' },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
          ),
        },
        {
          label: 'stroke-rose-500 stroke-[3]',
          twcCode: 'cx(stroke("#f43f5e"), strokeWidth("3"))',
          twcElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: cx(stroke('#f43f5e'), strokeWidth('3'), fill('none')) },
            React.createElement('path', { d: 'M3 12h4l3-9 4 18 3-9h4', strokeLinecap: 'round', strokeLinejoin: 'round' }),
          ),
          tailwindCode: 'stroke-rose-500 stroke-[3]',
          tailwindElement: React.createElement('svg', { width: 48, height: 48, viewBox: '0 0 24 24', className: 'tw-stroke-rose-500 tw-stroke-[3] tw-fill-none' },
            React.createElement('path', { d: 'M3 12h4l3-9 4 18 3-9h4', strokeLinecap: 'round', strokeLinejoin: 'round' }),
          ),
        },
      ],
    },
  ],
}
