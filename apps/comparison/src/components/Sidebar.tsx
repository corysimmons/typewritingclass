import React from 'react'
import { NavLink } from 'react-router-dom'
import { tw } from 'typewritingclass'

const categories = [
  { to: '/', label: 'Home' },
  { to: '/layout', label: 'Layout' },
  { to: '/flexbox-grid', label: 'Flexbox & Grid' },
  { to: '/spacing', label: 'Spacing' },
  { to: '/sizing', label: 'Sizing' },
  { to: '/typography', label: 'Typography' },
  { to: '/backgrounds', label: 'Backgrounds' },
  { to: '/borders', label: 'Borders' },
  { to: '/effects', label: 'Effects' },
  { to: '/filters', label: 'Filters' },
  { to: '/tables', label: 'Tables' },
  { to: '/transitions', label: 'Transitions' },
  { to: '/transforms', label: 'Transforms' },
  { to: '/interactivity', label: 'Interactivity' },
  { to: '/svg', label: 'SVG' },
  { to: '/accessibility', label: 'Accessibility' },
]

export function Sidebar() {
  return (
    <nav className={tw
      .w('16rem')
      .flex.flexCol.gap(1)
      .py(6).px(4)
      .shrink(0).borderR('1px').borderColor('#e2e8f0').h('100vh').overflowY('auto').sticky.top(0)
    }>
      <div className={tw.px(3).py(2).text('lg').font('700').textColor('#0f172a')}>
        TWC vs Tailwind
      </div>
      <div className={tw.px(3).py(1).text('xs').textColor('#94a3b8').mb(2)}>
        Visual Comparison
      </div>
      {categories.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => tw
            .px(3).py(1.5).rounded('md').text('sm').font('500').textDecoration('none').display('block')
            .textColor(isActive ? '#1d4ed8' : '#475569')
            .bg(isActive ? '#eff6ff' : 'transparent')
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
