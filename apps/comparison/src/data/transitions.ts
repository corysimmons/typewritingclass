import React from 'react'
import {
  cx, transition, transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone,
  duration, ease, delay, animate,
  bg, p, rounded, textColor, cursor, text, w, h, flex, opacity, scale,
  when, hover,
} from 'typewritingclass'
import { xs } from 'typewritingclass/theme/typography'
import type { ComparisonCategory } from './types.ts'

export const transitionsData: ComparisonCategory = {
  title: 'Transitions & Animation',
  description: 'Transition property, duration, timing function, delay, and animation',
  sections: [
    {
      title: 'Transition Property',
      examples: [
        {
          label: 'transition (default properties)',
          twcCode: 'transition(), duration(300), when(hover)(bg("#6366f1"))',
          twcElement: React.createElement('div', { className: cx(transition(), duration(300), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), cursor('pointer'), text(xs), when(hover)(bg('#6366f1'))) }, 'Hover me'),
          tailwindCode: 'transition duration-300 hover:bg-indigo-500',
          tailwindElement: React.createElement('div', { className: 'tw-transition tw-duration-300 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs hover:tw-bg-indigo-500 tw-cursor-pointer' }, 'Hover me'),
        },
        {
          label: 'transition-all',
          twcCode: 'transitionAll(), duration(500), when(hover)(bg("#6366f1"), scale(105))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(500), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), cursor('pointer'), text(xs), when(hover)(bg('#6366f1'), scale(105))) }, 'Hover me'),
          tailwindCode: 'transition-all duration-500 hover:bg-indigo-500 hover:scale-105',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-500 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs hover:tw-bg-indigo-500 hover:tw-scale-105 tw-cursor-pointer' }, 'Hover me'),
        },
        {
          label: 'transition-colors',
          twcCode: 'transitionColors(), duration(200), when(hover)(bg("#6366f1"))',
          twcElement: React.createElement('div', { className: cx(transitionColors(), duration(200), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), cursor('pointer'), text(xs), when(hover)(bg('#6366f1'))) }, 'Hover me'),
          tailwindCode: 'transition-colors duration-200 hover:bg-indigo-500',
          tailwindElement: React.createElement('div', { className: 'tw-transition-colors tw-duration-200 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs hover:tw-bg-indigo-500 tw-cursor-pointer' }, 'Hover me'),
        },
        {
          label: 'transition-opacity',
          twcCode: 'transitionOpacity(), duration(300), when(hover)(opacity(0.5))',
          twcElement: React.createElement('div', { className: cx(transitionOpacity(), duration(300), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), cursor('pointer'), text(xs), when(hover)(opacity(0.5))) }, 'Hover me'),
          tailwindCode: 'transition-opacity duration-300 hover:opacity-50',
          tailwindElement: React.createElement('div', { className: 'tw-transition-opacity tw-duration-300 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs hover:tw-opacity-50 tw-cursor-pointer' }, 'Hover me'),
        },
        {
          label: 'transition-transform',
          twcCode: 'transitionTransform(), duration(300), when(hover)(scale(110))',
          twcElement: React.createElement('div', { className: cx(transitionTransform(), duration(300), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), cursor('pointer'), text(xs), when(hover)(scale(110))) }, 'Hover me'),
          tailwindCode: 'transition-transform duration-300 hover:scale-110',
          tailwindElement: React.createElement('div', { className: 'tw-transition-transform tw-duration-300 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs hover:tw-scale-110 tw-cursor-pointer' }, 'Hover me'),
        },
      ],
    },
    {
      title: 'Duration',
      examples: [
        {
          label: 'duration-75',
          twcCode: 'transitionAll(), duration(75), when(hover)(bg("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(75), bg('#c7d2fe'), p(3), rounded(), cursor('pointer'), text(xs), when(hover)(bg('#818cf8'))) }, '75ms'),
          tailwindCode: 'transition-all duration-75 hover:bg-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-75 tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs hover:tw-bg-indigo-400 tw-cursor-pointer' }, '75ms'),
        },
        {
          label: 'duration-300',
          twcCode: 'transitionAll(), duration(300), when(hover)(bg("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), bg('#c7d2fe'), p(3), rounded(), cursor('pointer'), text(xs), when(hover)(bg('#818cf8'))) }, '300ms'),
          tailwindCode: 'transition-all duration-300 hover:bg-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs hover:tw-bg-indigo-400 tw-cursor-pointer' }, '300ms'),
        },
        {
          label: 'duration-1000',
          twcCode: 'transitionAll(), duration(1000), when(hover)(bg("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(1000), bg('#c7d2fe'), p(3), rounded(), cursor('pointer'), text(xs), when(hover)(bg('#818cf8'))) }, '1000ms'),
          tailwindCode: 'transition-all duration-1000 hover:bg-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-1000 tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs hover:tw-bg-indigo-400 tw-cursor-pointer' }, '1000ms'),
        },
      ],
    },
    {
      title: 'Timing Function',
      examples: [
        {
          label: 'ease-in',
          twcCode: 'transitionAll(), duration(300), ease("ease-in"), when(hover)(bg("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), ease('ease-in'), bg('#c7d2fe'), p(3), rounded(), cursor('pointer'), text(xs), when(hover)(bg('#818cf8'))) }, 'ease-in'),
          tailwindCode: 'transition-all duration-300 ease-in hover:bg-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-ease-in tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs hover:tw-bg-indigo-400 tw-cursor-pointer' }, 'ease-in'),
        },
        {
          label: 'ease-out',
          twcCode: 'transitionAll(), duration(300), ease("ease-out"), when(hover)(bg("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), ease('ease-out'), bg('#c7d2fe'), p(3), rounded(), cursor('pointer'), text(xs), when(hover)(bg('#818cf8'))) }, 'ease-out'),
          tailwindCode: 'transition-all duration-300 ease-out hover:bg-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-ease-out tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs hover:tw-bg-indigo-400 tw-cursor-pointer' }, 'ease-out'),
        },
        {
          label: 'ease-in-out',
          twcCode: 'transitionAll(), duration(300), ease("ease-in-out"), when(hover)(bg("#818cf8"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), ease('ease-in-out'), bg('#c7d2fe'), p(3), rounded(), cursor('pointer'), text(xs), when(hover)(bg('#818cf8'))) }, 'ease-in-out'),
          tailwindCode: 'transition-all duration-300 ease-in-out hover:bg-indigo-400',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-ease-in-out tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs hover:tw-bg-indigo-400 tw-cursor-pointer' }, 'ease-in-out'),
        },
      ],
    },
    {
      title: 'Animation',
      examples: [
        {
          label: 'animate-spin',
          twcCode: 'animate("spin")',
          twcElement: React.createElement('div', { className: cx(animate("spin"), w('2rem'), h('2rem'), bg('#818cf8'), rounded()) }),
          tailwindCode: 'animate-spin',
          tailwindElement: React.createElement('div', { className: 'tw-animate-spin tw-w-8 tw-h-8 tw-bg-indigo-400 tw-rounded' }),
        },
        {
          label: 'animate-ping',
          twcCode: 'animate("ping")',
          twcElement: React.createElement('div', { className: cx(animate("ping"), w('2rem'), h('2rem'), bg('#818cf8'), rounded("full")) }),
          tailwindCode: 'animate-ping',
          tailwindElement: React.createElement('div', { className: 'tw-animate-ping tw-w-8 tw-h-8 tw-bg-indigo-400 tw-rounded-full' }),
        },
        {
          label: 'animate-pulse',
          twcCode: 'animate("pulse")',
          twcElement: React.createElement('div', { className: cx(animate("pulse"), bg('#818cf8'), p(4), rounded("lg"), textColor('#ffffff'), text(xs)) }, 'pulse'),
          tailwindCode: 'animate-pulse',
          tailwindElement: React.createElement('div', { className: 'tw-animate-pulse tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'pulse'),
        },
        {
          label: 'animate-bounce',
          twcCode: 'animate("bounce")',
          twcElement: React.createElement('div', { className: cx(animate("bounce"), w('2rem'), h('2rem'), bg('#818cf8'), rounded("full")) }),
          tailwindCode: 'animate-bounce',
          tailwindElement: React.createElement('div', { className: 'tw-animate-bounce tw-w-8 tw-h-8 tw-bg-indigo-400 tw-rounded-full' }),
        },
      ],
    },
  ],
}
