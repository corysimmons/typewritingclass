import React, { useState } from 'react'
import {
  tw, cx, dynamic,
  w, h, bg, textColor, font, text, rounded, shadow,
  flex, items, justify,
  blur, brightness, grayscale, saturate,
  cursor, textAlign, minW, maxW, mx, borderStyle,
  transitionAll, duration, ease,
  createTheme, injectTheme, setTheme,
} from 'typewritingclass'
import { useStyle } from 'typewritingclass-react'

// --- Theme definitions ---
const lightTheme = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 50: '#ffffff', 100: '#f8fafc' },
    text: { 900: '#0f172a', 500: '#64748b' },
  },
})

const darkTheme = createTheme({
  name: 'dark',
  colors: {
    primary: { 500: '#818cf8', 600: '#6366f1' },
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

  // useStyle + dynamic() requires HOF syntax for runtime CSS variable binding
  const boxProps = useStyle(
    w('8rem'), h('8rem'),
    bg(dynamic(color)),
    rounded('lg'),
    shadow('md'),
    flex(), items('center'), justify('center'),
    textColor('#ffffff'), font('700'),
  )

  return (
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Color Picker with dynamic()
      </h3>
      <div className={tw.flex.flexRow.gap(4).items('center')}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={cx(tw.w('3rem').h('3rem').rounded('lg'), cursor('pointer'))}
        />
        <div {...boxProps}>{color}</div>
      </div>
    </div>
  )
}

// --- Progress Bar Demo ---
function ProgressBarDemo() {
  const [progress, setProgress] = useState(65)

  // useStyle + dynamic() requires HOF syntax
  const barProps = useStyle(
    h('1.5rem'),
    w(dynamic(`${progress}%`)),
    bg('emerald-500'),
    rounded('9999px'),
    transitionAll(), duration(300), ease('ease'),
  )

  return (
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Dynamic Progress Bar
      </h3>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className={tw.w('100%')}
      />
      <div className={tw.w('100%').h('1.5rem').bg('#e2e8f0').rounded('9999px')}>
        <div {...barProps} />
      </div>
      <span className={tw.text('base').textColor('#64748b')}>{progress}%</span>
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
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Theme Switcher
      </h3>
      <div className={tw.flex.flexRow.gap(3)}>
        <button
          onClick={() => switchTheme('light')}
          className={cx(
            tw.px(4).py(2).rounded('lg').font('500').text('base')
              .bg(theme === 'light' ? '#3b82f6' : '#e2e8f0')
              .textColor(theme === 'light' ? '#ffffff' : '#475569'),
            cursor('pointer'), borderStyle('none'),
          )}
        >
          Light
        </button>
        <button
          onClick={() => switchTheme('dark')}
          className={cx(
            tw.px(4).py(2).rounded('lg').font('500').text('base')
              .bg(theme === 'dark' ? '#6366f1' : '#e2e8f0')
              .textColor(theme === 'dark' ? '#ffffff' : '#475569'),
            cursor('pointer'), borderStyle('none'),
          )}
        >
          Dark
        </button>
      </div>
      <div className={tw
        .p(6).rounded('lg').shadow('lg').flex.flexCol.gap(3)
        .bg(theme === 'dark' ? '#1e293b' : '#ffffff')
        .border('1px').borderColor(theme === 'dark' ? '#334155' : '#e2e8f0')
      }>
        <h4 className={tw
          .text('lg').font('700')
          .textColor(theme === 'dark' ? '#f1f5f9' : '#0f172a')
        }>
          Theme Preview
        </h4>
        <p className={tw
          .text('base')
          .textColor(theme === 'dark' ? '#94a3b8' : '#64748b')
        }>
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
  const [bgColor, setBgColor] = useState('#f43f5e')

  // useStyle + dynamic() requires HOF syntax
  const shapeProps = useStyle(
    w(dynamic(`${size}px`)),
    h(dynamic(`${size}px`)),
    bg(dynamic(bgColor)),
    rounded(dynamic(`${borderRadius}px`)),
    shadow('md'),
    transitionAll(), duration(200), ease('ease'),
  )

  return (
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Multi-Property Dynamic
      </h3>
      <div className={tw.flex.flexCol.gap(2)}>
        <label className={tw.text('base').textColor('#475569')}>
          Size: {size}px
          <input type="range" min="40" max="200" value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className={tw.w('100%')} />
        </label>
        <label className={tw.text('base').textColor('#475569')}>
          Border Radius: {borderRadius}px
          <input type="range" min="0" max="100" value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            className={tw.w('100%')} />
        </label>
        <label className={tw.text('base').textColor('#475569')}>
          Color:
          <input type="color" value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className={tw.w('3rem').h('2rem').rounded('lg').m(2)} />
        </label>
      </div>
      <div {...shapeProps} />
    </div>
  )
}

// --- Filters Demo ---
function FiltersDemo() {
  return (
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Filters
      </h3>
      <div className={tw.flex.flexRow.gap(4).flexWrap}>
        {[
          { label: 'Blur', filter: blur('8px'), bgColor: 'indigo-200' },
          { label: 'Grayscale', filter: grayscale('100%'), bgColor: 'emerald-400' },
          { label: 'Bright', filter: brightness('150%'), bgColor: 'amber-400' },
          { label: 'Saturate', filter: saturate('200%'), bgColor: 'rose-400' },
        ].map(({ label, filter, bgColor }) => (
          <div key={label} className={cx(
            filter, bg(bgColor),
            tw.w('5rem').h('5rem').rounded('lg')
              .flex.items('center').justify('center')
              .textColor('#ffffff'),
            text('0.75rem'),
          )}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Transitions Demo ---
function TransitionsDemo() {
  return (
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Transitions
      </h3>
      <div className={tw.flex.flexRow.gap(3)}>
        <button className={cx(
          tw.px(5).py(2.5).rounded('lg')
            .bg('#e2e8f0').textColor('#475569')
            .font('500')
            .transitionColors.duration(300)
            .hover(tw.bg('indigo-500').textColor('#ffffff')),
          borderStyle('none'), cursor('pointer'), text('0.875rem'),
        )}>
          Hover me (300ms)
        </button>
      </div>
    </div>
  )
}

// --- Gradients Demo ---
function GradientsDemo() {
  return (
    <div className={tw.flex.flexCol.gap(4)}>
      <h3 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Gradients
      </h3>
      <div className={tw.flex.flexRow.gap(4).flexWrap}>
        {[
          { label: 'Sunset', from: 'rose-500', via: 'amber-400', to: '#fde68a' },
          { label: 'Ocean', from: 'blue-500', via: 'cyan-400', to: '#99f6e4' },
          { label: 'Twilight', from: 'purple-500', via: 'violet-400', to: 'indigo-300' },
        ].map(({ label, from, via, to }) => (
          <div key={label} className={cx(
            tw.px(6).py(4).rounded('lg')
              .bgGradient('to right')
              .gradientFrom(from).gradientVia(via).gradientTo(to)
              .textColor('#ffffff').font('600'),
            minW('8rem'), textAlign('center'),
          )}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// --- App ---
export function App() {
  return (
    <div className={cx(tw.p(8).flex.flexCol.gap(10), maxW('800px'), mx('auto'))}>
      <img src="/logo.svg" alt="Typewriting Class" style={{ width: '240px' }} />
      <h1 className={tw.text('2xl').font('700').textColor('#0f172a')}>
        Typewriting Class — React Demo
      </h1>
      <p className={tw.text('base').textColor('#64748b')}>
        Phase 3: Filters, transforms, transitions, gradients + all Phase 2 features
      </p>

      <ColorPickerDemo />
      <ProgressBarDemo />
      <ThemeSwitcherDemo />
      <MultiPropertyDemo />
      <FiltersDemo />
      <TransitionsDemo />
      <GradientsDemo />
    </div>
  )
}
