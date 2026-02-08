import React, { useState } from 'react'
import {
  cx, dcx, dynamic, css,
  p, px, py, m, bg, textColor, text, font, rounded, shadow,
  w, h, flex, flexCol, flexRow, gap, items, justify,
  border, borderColor,
  createTheme, injectTheme, setTheme,
} from 'typewritingclass'
import { useStyle } from 'typewritingclass-react'
import { blue, indigo, emerald, rose } from 'typewritingclass/theme/colors'
import { base, lg, xl, _2xl, bold, semibold, medium } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow, lg as lgShadow } from 'typewritingclass/theme/shadows'

// --- Theme definitions ---
const lightTheme = createTheme({
  name: 'light',
  colors: {
    primary: { 500: blue[500], 600: blue[600] },
    surface: { 50: '#ffffff', 100: '#f8fafc' },
    text: { 900: '#0f172a', 500: '#64748b' },
  },
})

const darkTheme = createTheme({
  name: 'dark',
  colors: {
    primary: { 500: indigo[400], 600: indigo[500] },
    surface: { 50: '#1e293b', 100: '#0f172a' },
    text: { 900: '#f1f5f9', 500: '#94a3b8' },
  },
})

// Inject themes on load
injectTheme(lightTheme.cssText)
injectTheme(darkTheme.cssText)

// --- Color Picker Demo ---
function ColorPickerDemo() {
  const [color, setColor] = useState('#3b82f6')

  const boxProps = useStyle(
    w('8rem'), h('8rem'),
    bg(dynamic(color)),
    rounded(lgRadius),
    shadow(mdShadow),
    flex(), items('center'), justify('center'),
    textColor('#ffffff'), font(bold),
  )

  return (
    <div className={cx(flexCol(), gap(4))}>
      <h3 className={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Color Picker with dynamic()
      </h3>
      <div className={cx(flexRow(), gap(4), items('center'))}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={cx(w('3rem'), h('3rem'), rounded(lgRadius), css({ cursor: 'pointer' }))}
        />
        <div {...boxProps}>{color}</div>
      </div>
    </div>
  )
}

// --- Progress Bar Demo ---
function ProgressBarDemo() {
  const [progress, setProgress] = useState(65)

  const barProps = useStyle(
    h('1.5rem'),
    w(dynamic(`${progress}%`)),
    bg(emerald[500]),
    rounded('9999px'),
    css`transition: width 0.3s ease`,
  )

  return (
    <div className={cx(flexCol(), gap(4))}>
      <h3 className={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Dynamic Progress Bar
      </h3>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className={cx(w('100%'))}
      />
      <div className={cx(w('100%'), h('1.5rem'), bg('#e2e8f0'), rounded('9999px'))}>
        <div {...barProps} />
      </div>
      <span className={cx(text(base), textColor('#64748b'))}>{progress}%</span>
    </div>
  )
}

// --- Theme Switcher Demo ---
function ThemeSwitcherDemo() {
  const [theme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  const switchTheme = (name: 'light' | 'dark') => {
    setCurrentTheme(name)
    setTheme(name)
  }

  return (
    <div className={cx(flexCol(), gap(4))}>
      <h3 className={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Theme Switcher
      </h3>
      <div className={cx(flexRow(), gap(3))}>
        <button
          onClick={() => switchTheme('light')}
          className={cx(
            px(4), py(2), rounded(lgRadius), font(medium), text(base),
            bg(theme === 'light' ? blue[500] : '#e2e8f0'),
            textColor(theme === 'light' ? '#ffffff' : '#475569'),
            css({ cursor: 'pointer', border: 'none' }),
          )}
        >
          Light
        </button>
        <button
          onClick={() => switchTheme('dark')}
          className={cx(
            px(4), py(2), rounded(lgRadius), font(medium), text(base),
            bg(theme === 'dark' ? indigo[500] : '#e2e8f0'),
            textColor(theme === 'dark' ? '#ffffff' : '#475569'),
            css({ cursor: 'pointer', border: 'none' }),
          )}
        >
          Dark
        </button>
      </div>
      <div className={cx(
        p(6), rounded(lgRadius), shadow(lgShadow),
        bg(theme === 'dark' ? '#1e293b' : '#ffffff'),
        border('1px'), borderColor(theme === 'dark' ? '#334155' : '#e2e8f0'),
        flexCol(), gap(3),
      )}>
        <h4 className={cx(
          text(lg), font(bold),
          textColor(theme === 'dark' ? '#f1f5f9' : '#0f172a'),
        )}>
          Theme Preview
        </h4>
        <p className={cx(
          text(base),
          textColor(theme === 'dark' ? '#94a3b8' : '#64748b'),
        )}>
          This card responds to the selected theme.
        </p>
      </div>
    </div>
  )
}

// --- Multi-Property Dynamic Demo ---
function MultiPropertyDemo() {
  const [size, setSize] = useState(100)
  const [borderRadius, setBorderRadius] = useState(8)
  const [bgColor, setBgColor] = useState(rose[500])

  const shapeProps = useStyle(
    w(dynamic(`${size}px`)),
    h(dynamic(`${size}px`)),
    bg(dynamic(bgColor)),
    rounded(dynamic(`${borderRadius}px`)),
    shadow(mdShadow),
    css`transition: all 0.2s ease`,
  )

  return (
    <div className={cx(flexCol(), gap(4))}>
      <h3 className={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Multi-Property Dynamic
      </h3>
      <div className={cx(flexCol(), gap(2))}>
        <label className={cx(text(base), textColor('#475569'))}>
          Size: {size}px
          <input type="range" min="40" max="200" value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className={cx(w('100%'))} />
        </label>
        <label className={cx(text(base), textColor('#475569'))}>
          Border Radius: {borderRadius}px
          <input type="range" min="0" max="100" value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            className={cx(w('100%'))} />
        </label>
        <label className={cx(text(base), textColor('#475569'))}>
          Color:
          <input type="color" value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className={cx(w('3rem'), h('2rem'), rounded(lgRadius), m(2))} />
        </label>
      </div>
      <div {...shapeProps} />
    </div>
  )
}

// --- App ---
export function App() {
  return (
    <div className={cx(
      css({ 'max-width': '800px', margin: '0 auto' }),
      p(8), flexCol(), gap(10),
    )}>
      <h1 className={cx(text(_2xl), font(bold), textColor('#0f172a'))}>
        typewritingclass — React Demo
      </h1>
      <p className={cx(text(base), textColor('#64748b'))}>
        Phase 2: dynamic(), dcx(), useStyle(), createTheme(), css tagged templates
      </p>

      <ColorPickerDemo />
      <ProgressBarDemo />
      <ThemeSwitcherDemo />
      <MultiPropertyDemo />
    </div>
  )
}
