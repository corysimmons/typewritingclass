import React from 'react'
import {
  cx, transition, transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone,
  duration, ease, delay, animate,
  bg, p, rounded, textColor, css, w, h, flex,
} from 'typewritingclass'
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
          twcCode: 'cx(transition(), duration(300))',
          twcElement: React.createElement('div', { className: cx(transition(), duration(300), bg('#818cf8'), p(4), rounded('0.5rem'), textColor('#ffffff'), css({ ':hover': { backgroundColor: '#6366f1' }, cursor: 'pointer' })), style: { fontSize: '12px' } }, 'Hover me (transition)'),
          tailwindCode: 'transition duration-300',
          tailwindElement: React.createElement('div', { className: 'tw-transition tw-duration-300 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs hover:tw-bg-indigo-500 tw-cursor-pointer' }, 'Hover me (transition)'),
        },
        {
          label: 'transition-all',
          twcCode: 'cx(transitionAll(), duration(500))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(500), bg('#818cf8'), p(4), rounded('0.5rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'transition-all'),
          tailwindCode: 'transition-all duration-500',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-500 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'transition-all'),
        },
        {
          label: 'transition-colors',
          twcCode: 'cx(transitionColors(), duration(200))',
          twcElement: React.createElement('div', { className: cx(transitionColors(), duration(200), bg('#818cf8'), p(4), rounded('0.5rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'transition-colors'),
          tailwindCode: 'transition-colors duration-200',
          tailwindElement: React.createElement('div', { className: 'tw-transition-colors tw-duration-200 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'transition-colors'),
        },
        {
          label: 'transition-opacity',
          twcCode: 'cx(transitionOpacity(), duration(300))',
          twcElement: React.createElement('div', { className: cx(transitionOpacity(), duration(300), bg('#818cf8'), p(4), rounded('0.5rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'transition-opacity'),
          tailwindCode: 'transition-opacity duration-300',
          tailwindElement: React.createElement('div', { className: 'tw-transition-opacity tw-duration-300 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'transition-opacity'),
        },
        {
          label: 'transition-transform',
          twcCode: 'cx(transitionTransform(), duration(300))',
          twcElement: React.createElement('div', { className: cx(transitionTransform(), duration(300), bg('#818cf8'), p(4), rounded('0.5rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'transition-transform'),
          tailwindCode: 'transition-transform duration-300',
          tailwindElement: React.createElement('div', { className: 'tw-transition-transform tw-duration-300 tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'transition-transform'),
        },
      ],
    },
    {
      title: 'Duration',
      examples: [
        {
          label: 'duration-75',
          twcCode: 'cx(duration(75))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(75), bg('#c7d2fe'), p(3), rounded('0.25rem')), style: { fontSize: '12px' } }, '75ms'),
          tailwindCode: 'duration-75',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-75 tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs' }, '75ms'),
        },
        {
          label: 'duration-300',
          twcCode: 'cx(duration(300))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), bg('#c7d2fe'), p(3), rounded('0.25rem')), style: { fontSize: '12px' } }, '300ms'),
          tailwindCode: 'duration-300',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs' }, '300ms'),
        },
        {
          label: 'duration-1000',
          twcCode: 'cx(duration(1000))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(1000), bg('#c7d2fe'), p(3), rounded('0.25rem')), style: { fontSize: '12px' } }, '1000ms'),
          tailwindCode: 'duration-1000',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-1000 tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs' }, '1000ms'),
        },
      ],
    },
    {
      title: 'Timing Function',
      examples: [
        {
          label: 'ease-in',
          twcCode: 'cx(ease("ease-in"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), ease('ease-in'), bg('#c7d2fe'), p(3), rounded('0.25rem')), style: { fontSize: '12px' } }, 'ease-in'),
          tailwindCode: 'ease-in',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-ease-in tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs' }, 'ease-in'),
        },
        {
          label: 'ease-out',
          twcCode: 'cx(ease("ease-out"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), ease('ease-out'), bg('#c7d2fe'), p(3), rounded('0.25rem')), style: { fontSize: '12px' } }, 'ease-out'),
          tailwindCode: 'ease-out',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-ease-out tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs' }, 'ease-out'),
        },
        {
          label: 'ease-in-out',
          twcCode: 'cx(ease("ease-in-out"))',
          twcElement: React.createElement('div', { className: cx(transitionAll(), duration(300), ease('ease-in-out'), bg('#c7d2fe'), p(3), rounded('0.25rem')), style: { fontSize: '12px' } }, 'ease-in-out'),
          tailwindCode: 'ease-in-out',
          tailwindElement: React.createElement('div', { className: 'tw-transition-all tw-duration-300 tw-ease-in-out tw-bg-indigo-200 tw-p-3 tw-rounded tw-text-xs' }, 'ease-in-out'),
        },
      ],
    },
    {
      title: 'Animation',
      examples: [
        {
          label: 'animate-spin',
          twcCode: 'cx(animate("spin 1s linear infinite"))',
          twcElement: React.createElement('div', { className: cx(animate('spin 1s linear infinite'), w('2rem'), h('2rem'), bg('#818cf8'), rounded('0.25rem')) }),
          tailwindCode: 'animate-spin',
          tailwindElement: React.createElement('div', { className: 'tw-animate-spin tw-w-8 tw-h-8 tw-bg-indigo-400 tw-rounded' }),
        },
        {
          label: 'animate-pulse',
          twcCode: 'cx(animate("pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"))',
          twcElement: React.createElement('div', { className: cx(animate('pulse 2s cubic-bezier(0.4,0,0.6,1) infinite'), bg('#818cf8'), p(4), rounded('0.5rem'), textColor('#ffffff')), style: { fontSize: '12px' } }, 'pulse'),
          tailwindCode: 'animate-pulse',
          tailwindElement: React.createElement('div', { className: 'tw-animate-pulse tw-bg-indigo-400 tw-p-4 tw-rounded-lg tw-text-white tw-text-xs' }, 'pulse'),
        },
        {
          label: 'animate-bounce',
          twcCode: 'cx(animate("bounce 1s infinite"))',
          twcElement: React.createElement('div', { className: cx(animate('bounce 1s infinite'), w('2rem'), h('2rem'), bg('#818cf8'), rounded('9999px')) }),
          tailwindCode: 'animate-bounce',
          tailwindElement: React.createElement('div', { className: 'tw-animate-bounce tw-w-8 tw-h-8 tw-bg-indigo-400 tw-rounded-full' }),
        },
      ],
    },
  ],
}
