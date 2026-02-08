import { createSignal } from 'solid-js'
import {
  cx, dcx, dynamic, css,
  p, px, py, m, bg, textColor, text, font, rounded, shadow,
  w, h, flex, flexCol, flexRow, gap, items, justify,
  border, borderColor,
  createTheme, injectTheme, setTheme,
  blur, brightness, grayscale, saturate,
  transitionColors, duration,
  bgGradient, gradientFrom, gradientVia, gradientTo,
  opacity, flexWrap, when, hover,
} from 'typewritingclass'
import { blue, indigo, emerald, rose, amber, cyan, violet, purple } from 'typewritingclass/theme/colors'
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
  const [color, setColor] = createSignal('#3b82f6')

  // dcx() is called inside a reactive getter so Solid tracks the signal
  const boxProps = () => dcx(
    w('8rem'), h('8rem'),
    bg(dynamic(color())),
    rounded(lgRadius),
    shadow(mdShadow),
    flex(), items('center'), justify('center'),
    textColor('#ffffff'), font(bold),
  )

  return (
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Color Picker with dynamic()
      </h3>
      <div class={cx(flex(), flexRow(), gap(4), items('center'))}>
        <input
          type="color"
          value={color()}
          onInput={(e) => setColor(e.currentTarget.value)}
          class={cx(w('3rem'), h('3rem'), rounded(lgRadius), css({ cursor: 'pointer' }))}
        />
        <div class={boxProps().className} style={boxProps().style}>
          {color()}
        </div>
      </div>
    </div>
  )
}

// --- Progress Bar Demo ---
function ProgressBarDemo() {
  const [progress, setProgress] = createSignal(65)

  const barProps = () => dcx(
    h('1.5rem'),
    w(dynamic(`${progress()}%`)),
    bg(emerald[500]),
    rounded('9999px'),
    css`transition: width 0.3s ease`,
  )

  return (
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Dynamic Progress Bar
      </h3>
      <input
        type="range"
        min="0"
        max="100"
        value={progress()}
        onInput={(e) => setProgress(Number(e.currentTarget.value))}
        class={cx(w('100%'))}
      />
      <div class={cx(w('100%'), h('1.5rem'), bg('#e2e8f0'), rounded('9999px'))}>
        <div class={barProps().className} style={barProps().style} />
      </div>
      <span class={cx(text(base), textColor('#64748b'))}>{progress()}%</span>
    </div>
  )
}

// --- Theme Switcher Demo ---
function ThemeSwitcherDemo() {
  const [theme, setCurrentTheme] = createSignal<'light' | 'dark'>('light')

  const switchTheme = (name: 'light' | 'dark') => {
    setCurrentTheme(name)
    setTheme(name)
  }

  return (
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Theme Switcher
      </h3>
      <div class={cx(flex(), flexRow(), gap(3))}>
        <button
          onClick={() => switchTheme('light')}
          class={cx(
            px(4), py(2), rounded(lgRadius), font(medium), text(base),
            bg(theme() === 'light' ? blue[500] : '#e2e8f0'),
            textColor(theme() === 'light' ? '#ffffff' : '#475569'),
            css({ cursor: 'pointer', border: 'none' }),
          )}
        >
          Light
        </button>
        <button
          onClick={() => switchTheme('dark')}
          class={cx(
            px(4), py(2), rounded(lgRadius), font(medium), text(base),
            bg(theme() === 'dark' ? indigo[500] : '#e2e8f0'),
            textColor(theme() === 'dark' ? '#ffffff' : '#475569'),
            css({ cursor: 'pointer', border: 'none' }),
          )}
        >
          Dark
        </button>
      </div>
      <div class={cx(
        p(6), rounded(lgRadius), shadow(lgShadow),
        bg(theme() === 'dark' ? '#1e293b' : '#ffffff'),
        border('1px'), borderColor(theme() === 'dark' ? '#334155' : '#e2e8f0'),
        flex(), flexCol(), gap(3),
      )}>
        <h4 class={cx(
          text(lg), font(bold),
          textColor(theme() === 'dark' ? '#f1f5f9' : '#0f172a'),
        )}>
          Theme Preview
        </h4>
        <p class={cx(
          text(base),
          textColor(theme() === 'dark' ? '#94a3b8' : '#64748b'),
        )}>
          This card responds to the selected theme.
        </p>
      </div>
    </div>
  )
}

// --- Multi-Property Dynamic Demo ---
function MultiPropertyDemo() {
  const [size, setSize] = createSignal(100)
  const [borderRadius, setBorderRadius] = createSignal(8)
  const [bgColor, setBgColor] = createSignal(rose[500])

  const shapeProps = () => dcx(
    w(dynamic(`${size()}px`)),
    h(dynamic(`${size()}px`)),
    bg(dynamic(bgColor())),
    rounded(dynamic(`${borderRadius()}px`)),
    shadow(mdShadow),
    css`transition: all 0.2s ease`,
  )

  return (
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Multi-Property Dynamic
      </h3>
      <div class={cx(flex(), flexCol(), gap(2))}>
        <label class={cx(text(base), textColor('#475569'))}>
          Size: {size()}px
          <input type="range" min="40" max="200" value={size()}
            onInput={(e) => setSize(Number(e.currentTarget.value))}
            class={cx(w('100%'))} />
        </label>
        <label class={cx(text(base), textColor('#475569'))}>
          Border Radius: {borderRadius()}px
          <input type="range" min="0" max="100" value={borderRadius()}
            onInput={(e) => setBorderRadius(Number(e.currentTarget.value))}
            class={cx(w('100%'))} />
        </label>
        <label class={cx(text(base), textColor('#475569'))}>
          Color:
          <input type="color" value={bgColor()}
            onInput={(e) => setBgColor(e.currentTarget.value)}
            class={cx(w('3rem'), h('2rem'), rounded(lgRadius), m(2))} />
        </label>
      </div>
      <div class={shapeProps().className} style={shapeProps().style} />
    </div>
  )
}

// --- Filters Demo ---
function FiltersDemo() {
  const filterExamples = [
    { label: 'Blur', filter: blur('8px'), bgColor: indigo[200] },
    { label: 'Grayscale', filter: grayscale('100%'), bgColor: emerald[400] },
    { label: 'Bright', filter: brightness('150%'), bgColor: amber[400] },
    { label: 'Saturate', filter: saturate('200%'), bgColor: rose[400] },
  ]

  return (
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Filters
      </h3>
      <div class={cx(flex(), flexRow(), gap(4), flexWrap())}>
        {filterExamples.map(({ label, filter, bgColor }) => (
          <div class={cx(
            filter, bg(bgColor),
            w('5rem'), h('5rem'),
            rounded(lgRadius),
            flex(), items('center'), justify('center'),
            textColor('#ffffff'), css({ 'font-size': '0.75rem' }),
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
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Transitions
      </h3>
      <div class={cx(flex(), flexRow(), gap(3))}>
        <button class={cx(
          px(5), py(2.5), rounded(lgRadius),
          bg('#e2e8f0'), textColor('#475569'),
          font(medium),
          transitionColors(), duration(300),
          css({ border: 'none', cursor: 'pointer', 'font-size': '0.875rem' }),
          when(hover)(bg(indigo[500]), textColor('#ffffff')),
        )}>
          Hover me (300ms)
        </button>
      </div>
    </div>
  )
}

// --- Gradients Demo ---
function GradientsDemo() {
  const gradients = [
    { label: 'Sunset', from: rose[500], via: amber[400], to: '#fde68a' },
    { label: 'Ocean', from: blue[500], via: cyan[400], to: '#99f6e4' },
    { label: 'Twilight', from: purple[500], via: violet[400], to: indigo[300] },
  ]

  return (
    <div class={cx(flex(), flexCol(), gap(4))}>
      <h3 class={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Gradients
      </h3>
      <div class={cx(flex(), flexRow(), gap(4), flexWrap())}>
        {gradients.map(({ label, from, via, to }) => (
          <div class={cx(
            px(6), py(4),
            rounded(lgRadius),
            bgGradient('to right'),
            gradientFrom(from),
            gradientVia(via),
            gradientTo(to),
            textColor('#ffffff'),
            font(semibold),
            css({ 'min-width': '8rem', 'text-align': 'center' }),
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
    <div class={cx(
      css({ 'max-width': '800px', margin: '0 auto' }),
      p(8), flex(), flexCol(), gap(10),
    )}>
      <h1 class={cx(text(_2xl), font(bold), textColor('#0f172a'))}>
        Typewriting Class — Solid Demo
      </h1>
      <p class={cx(text(base), textColor('#64748b'))}>
        Solid.js: Filters, transitions, gradients + dynamic(), dcx(), createTheme()
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
