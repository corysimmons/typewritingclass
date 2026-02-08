import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  cx, py, px, flexCol, gap, text, font, textColor, rounded, bg, css, w,
} from 'typewritingclass'
import { sm as smText, xs as xsText, lg as lgText } from 'typewritingclass/theme/typography'
import { semibold, medium, bold } from 'typewritingclass/theme/typography'
import { md as mdRadius } from 'typewritingclass/theme/borders'

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
    <nav className={cx(
      w('16rem'),
      flexCol(), gap(1),
      py(6), px(4),
      css({ flexShrink: '0', borderRight: '1px solid #e2e8f0', height: '100vh', overflowY: 'auto', position: 'sticky', top: '0' }),
    )}>
      <div className={cx(px(3), py(2), text(lgText), font(bold), textColor('#0f172a'))}>
        TWC vs Tailwind
      </div>
      <div className={cx(px(3), py(1), text(xsText), textColor('#94a3b8'), css({ marginBottom: '0.5rem' }))}>
        Visual Comparison
      </div>
      {categories.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => cx(
            px(3), py(1.5),
            rounded(mdRadius),
            text(smText), font(medium),
            textColor(isActive ? '#1d4ed8' : '#475569'),
            bg(isActive ? '#eff6ff' : 'transparent'),
            css({ textDecoration: 'none', display: 'block' }),
          )}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
