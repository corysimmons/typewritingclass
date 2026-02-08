import { performance } from 'node:perf_hooks'
import { cx } from '../src/cx.ts'
import { dcx } from '../src/dcx.ts'
import { createRule } from '../src/rule.ts'
import { generateCSS, clearRegistry } from '../src/registry.ts'
import { generateHash } from '../src/hash.ts'
import { dynamic } from '../src/dynamic.ts'
import { _resetLayer } from '../src/layer.ts'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ITERATIONS = parseInt(process.env.BENCH_N ?? '10000', 10)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface BenchResult {
  name: string
  opsPerSec: number
  avgNs: number
  totalMs: number
  iterations: number
}

/**
 * Run `fn` for `n` iterations, returning timing statistics.
 * A warmup phase of 100 calls (or n if n < 100) is executed first and discarded.
 */
function bench(name: string, n: number, setup: () => void, fn: () => void): BenchResult {
  // Warmup
  const warmup = Math.min(100, n)
  setup()
  for (let i = 0; i < warmup; i++) fn()

  // Measured run
  setup()
  const start = performance.now()
  for (let i = 0; i < n; i++) fn()
  const end = performance.now()

  const totalMs = end - start
  const avgNs = (totalMs / n) * 1e6
  const opsPerSec = n / (totalMs / 1000)

  return { name, opsPerSec, avgNs, totalMs, iterations: n }
}

function resetAll(): void {
  clearRegistry()
  _resetLayer()
}

// ---------------------------------------------------------------------------
// Pre-built fixtures
// ---------------------------------------------------------------------------

function makeRules(count: number) {
  const props = [
    'color', 'background-color', 'padding', 'margin', 'border',
    'font-size', 'line-height', 'display', 'position', 'z-index',
    'width', 'height', 'min-width', 'min-height', 'max-width',
    'max-height', 'top', 'right', 'bottom', 'left', 'overflow',
    'text-align', 'font-weight', 'letter-spacing', 'border-radius',
    'box-shadow', 'opacity', 'cursor', 'flex', 'gap',
    'grid-template-columns', 'grid-template-rows', 'align-items',
    'justify-content', 'text-decoration', 'white-space', 'word-break',
    'transition', 'transform', 'visibility', 'outline',
    'backdrop-filter', 'filter', 'object-fit', 'object-position',
    'user-select', 'pointer-events', 'resize', 'appearance',
    'clip-path', 'fill', 'stroke',
  ]

  const values = [
    'red', '#3b82f6', '1rem', '0', '1px solid black',
    '16px', '1.5', 'flex', 'relative', '10',
    '100%', '200px', '0px', '50px', '500px',
    '300px', '0', '0', '0', '0', 'hidden',
    'center', '700', '0.05em', '8px',
    '0 4px 6px rgba(0,0,0,0.1)', '0.9', 'pointer', '1', '1rem',
    'repeat(3, 1fr)', 'repeat(2, 1fr)', 'center',
    'space-between', 'underline', 'nowrap', 'break-word',
    'all 0.2s ease', 'translateX(0)', 'visible', 'none',
    'blur(4px)', 'grayscale(50%)', 'cover', 'center',
    'none', 'none', 'none', 'none',
    'circle(50%)', 'currentColor', '#000',
  ]

  const rules = []
  for (let i = 0; i < count; i++) {
    const idx = i % props.length
    rules.push(createRule({ [props[idx]]: values[idx] }))
  }
  return rules
}

function makeDynamicRules(count: number) {
  const props = [
    'color', 'background-color', 'padding', 'margin', 'border-radius',
    'font-size', 'width', 'height', 'gap', 'opacity',
    'top', 'right', 'bottom', 'left', 'max-width',
    'max-height', 'min-width', 'min-height', 'line-height', 'letter-spacing',
    'border-width', 'outline-offset', 'flex-basis', 'grid-gap', 'text-indent',
    'transform', 'box-shadow', 'border-color', 'fill', 'stroke',
    'stroke-width', 'clip-path', 'filter', 'backdrop-filter', 'perspective',
    'word-spacing', 'tab-size', 'column-gap', 'row-gap', 'scroll-margin',
    'scroll-padding', 'inset', 'block-size', 'inline-size', 'aspect-ratio',
    'flex-grow', 'flex-shrink', 'order', 'z-index', 'font-weight',
  ]

  const rules = []
  for (let i = 0; i < count; i++) {
    const idx = i % props.length
    const dyn = dynamic(`bench-val-${i}`)
    rules.push({
      _tag: 'StyleRule' as const,
      declarations: { [props[idx]]: `var(${dyn.__id})` },
      selectors: [] as string[],
      mediaQueries: [] as string[],
      dynamicBindings: { [dyn.__id]: dyn.__value as string },
    })
  }
  return rules
}

// ---------------------------------------------------------------------------
// Benchmark suite
// ---------------------------------------------------------------------------

const results: BenchResult[] = []

function section(title: string): void {
  results.push({ name: `--- ${title} ---`, opsPerSec: 0, avgNs: 0, totalMs: 0, iterations: 0 })
}

// ---- createRule() ----
section('createRule()')

results.push(
  bench('createRule  1 prop', ITERATIONS, resetAll, () => {
    createRule({ color: 'red' })
  }),
)

results.push(
  bench('createRule  5 props', ITERATIONS, resetAll, () => {
    createRule({
      color: 'red', padding: '1rem', margin: '0',
      display: 'flex', 'font-size': '16px',
    })
  }),
)

results.push(
  bench('createRule 10 props', ITERATIONS, resetAll, () => {
    createRule({
      color: 'red', padding: '1rem', margin: '0',
      display: 'flex', 'font-size': '16px', 'line-height': '1.5',
      position: 'relative', 'z-index': '10', width: '100%', height: '200px',
    })
  }),
)

// ---- generateHash() ----
section('generateHash()')

const hashRule1 = createRule({ color: 'red' })
const hashRule5 = createRule({
  color: 'red', padding: '1rem', margin: '0',
  display: 'flex', 'font-size': '16px',
})
const hashRule10 = createRule({
  color: 'red', padding: '1rem', margin: '0',
  display: 'flex', 'font-size': '16px', 'line-height': '1.5',
  position: 'relative', 'z-index': '10', width: '100%', height: '200px',
})

results.push(
  bench('hash  1-prop rule', ITERATIONS, resetAll, () => {
    generateHash(hashRule1, 0)
  }),
)

results.push(
  bench('hash  5-prop rule', ITERATIONS, resetAll, () => {
    generateHash(hashRule5, 0)
  }),
)

results.push(
  bench('hash 10-prop rule', ITERATIONS, resetAll, () => {
    generateHash(hashRule10, 0)
  }),
)

// ---- cx() composition ----
section('cx() composition')

const cxRules1 = makeRules(1)
const cxRules5 = makeRules(5)
const cxRules10 = makeRules(10)
const cxRules50 = makeRules(50)

results.push(
  bench('cx   1 rule', ITERATIONS, resetAll, () => {
    cx(...cxRules1)
  }),
)

results.push(
  bench('cx   5 rules', ITERATIONS, resetAll, () => {
    cx(...cxRules5)
  }),
)

results.push(
  bench('cx  10 rules', ITERATIONS, resetAll, () => {
    cx(...cxRules10)
  }),
)

results.push(
  bench('cx  50 rules', ITERATIONS, resetAll, () => {
    cx(...cxRules50)
  }),
)

// ---- dcx() composition ----
section('dcx() composition')

const dcxRules1 = makeDynamicRules(1)
const dcxRules5 = makeDynamicRules(5)
const dcxRules10 = makeDynamicRules(10)
const dcxRules50 = makeDynamicRules(50)

results.push(
  bench('dcx   1 rule', ITERATIONS, resetAll, () => {
    dcx(...dcxRules1)
  }),
)

results.push(
  bench('dcx   5 rules', ITERATIONS, resetAll, () => {
    dcx(...dcxRules5)
  }),
)

results.push(
  bench('dcx  10 rules', ITERATIONS, resetAll, () => {
    dcx(...dcxRules10)
  }),
)

results.push(
  bench('dcx  50 rules', ITERATIONS, resetAll, () => {
    dcx(...dcxRules50)
  }),
)

// ---- generateCSS() ----
section('generateCSS()')

function populateRegistry(count: number): void {
  resetAll()
  const rules = makeRules(count)
  cx(...rules)
}

results.push(
  bench('generateCSS   10 rules', ITERATIONS, () => populateRegistry(10), () => {
    generateCSS()
  }),
)

results.push(
  bench('generateCSS   50 rules', ITERATIONS, () => populateRegistry(50), () => {
    generateCSS()
  }),
)

results.push(
  bench('generateCSS  100 rules', Math.min(ITERATIONS, 5000), () => populateRegistry(100), () => {
    generateCSS()
  }),
)

results.push(
  bench('generateCSS  500 rules', Math.min(ITERATIONS, 1000), () => populateRegistry(500), () => {
    generateCSS()
  }),
)

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const COL_NAME = 30
const COL_OPS = 18
const COL_AVG = 18
const COL_TOTAL = 14
const COL_ITER = 12

function pad(str: string, len: number): string {
  return str.length >= len ? str : str + ' '.repeat(len - str.length)
}

function padLeft(str: string, len: number): string {
  return str.length >= len ? str : ' '.repeat(len - str.length) + str
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatDecimal(n: number, digits: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

const divider = '-'.repeat(COL_NAME + COL_OPS + COL_AVG + COL_TOTAL + COL_ITER + 8)

console.log('')
console.log('  typewritingclass  Performance Benchmarks')
console.log(`  ${formatNumber(ITERATIONS)} iterations per benchmark (set BENCH_N to override)`)
console.log('')
console.log(
  '  ' +
  pad('Benchmark', COL_NAME) + '  ' +
  padLeft('ops/sec', COL_OPS) + '  ' +
  padLeft('avg (ns)', COL_AVG) + '  ' +
  padLeft('total (ms)', COL_TOTAL) + '  ' +
  padLeft('iterations', COL_ITER),
)
console.log('  ' + divider)

for (const r of results) {
  if (r.iterations === 0) {
    // Section header
    console.log('')
    console.log(`  ${r.name}`)
    console.log('')
    continue
  }

  console.log(
    '  ' +
    pad(r.name, COL_NAME) + '  ' +
    padLeft(formatNumber(r.opsPerSec), COL_OPS) + '  ' +
    padLeft(formatDecimal(r.avgNs, 1), COL_AVG) + '  ' +
    padLeft(formatDecimal(r.totalMs, 2), COL_TOTAL) + '  ' +
    padLeft(formatNumber(r.iterations), COL_ITER),
  )
}

console.log('')
console.log('  ' + divider)
console.log('  Done.')
console.log('')
