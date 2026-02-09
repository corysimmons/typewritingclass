import { describe, it, expect } from 'vitest'
import {
  generateUtilityDeclarations,
  generateUtilityPreview,
  generateCxDeclarations,
  generateCxPreview,
  generateWhenDeclarations,
  generateWhenPreview,
  parseFunctionCalls,
  isKnownUtility,
  isKnownModifier,
  getKnownUtilities,
  getKnownModifiers,
} from '../src/css-preview.ts'

// ---------------------------------------------------------------------------
// Spacing utilities
// ---------------------------------------------------------------------------
describe('spacing utilities', () => {
  it('p() resolves spacing scale values', () => {
    expect(generateUtilityDeclarations('p', '4')).toEqual({ padding: '1rem' })
    expect(generateUtilityDeclarations('p', '0')).toEqual({ padding: '0px' })
    expect(generateUtilityDeclarations('p', '8')).toEqual({ padding: '2rem' })
  })

  it('px() sets padding-left and padding-right', () => {
    expect(generateUtilityDeclarations('px', '4')).toEqual({
      'padding-left': '1rem',
      'padding-right': '1rem',
    })
  })

  it('py() sets padding-top and padding-bottom', () => {
    expect(generateUtilityDeclarations('py', '4')).toEqual({
      'padding-top': '1rem',
      'padding-bottom': '1rem',
    })
  })

  it('pt(), pr(), pb(), pl() set individual paddings', () => {
    expect(generateUtilityDeclarations('pt', '2')).toEqual({ 'padding-top': '0.5rem' })
    expect(generateUtilityDeclarations('pr', '2')).toEqual({ 'padding-right': '0.5rem' })
    expect(generateUtilityDeclarations('pb', '2')).toEqual({ 'padding-bottom': '0.5rem' })
    expect(generateUtilityDeclarations('pl', '2')).toEqual({ 'padding-left': '0.5rem' })
  })

  it('m() resolves spacing', () => {
    expect(generateUtilityDeclarations('m', '4')).toEqual({ margin: '1rem' })
  })

  it('mx() and my() set appropriate margins', () => {
    expect(generateUtilityDeclarations('mx', '4')).toEqual({
      'margin-left': '1rem',
      'margin-right': '1rem',
    })
    expect(generateUtilityDeclarations('my', '4')).toEqual({
      'margin-top': '1rem',
      'margin-bottom': '1rem',
    })
  })

  it('mt(), mr(), mb(), ml() set individual margins', () => {
    expect(generateUtilityDeclarations('mt', '6')).toEqual({ 'margin-top': '1.5rem' })
    expect(generateUtilityDeclarations('mr', '6')).toEqual({ 'margin-right': '1.5rem' })
    expect(generateUtilityDeclarations('mb', '6')).toEqual({ 'margin-bottom': '1.5rem' })
    expect(generateUtilityDeclarations('ml', '6')).toEqual({ 'margin-left': '1.5rem' })
  })

  it('gap(), gapX(), gapY()', () => {
    expect(generateUtilityDeclarations('gap', '4')).toEqual({ gap: '1rem' })
    expect(generateUtilityDeclarations('gapX', '4')).toEqual({ 'column-gap': '1rem' })
    expect(generateUtilityDeclarations('gapY', '4')).toEqual({ 'row-gap': '1rem' })
  })

  it('handles raw CSS values for spacing', () => {
    expect(generateUtilityDeclarations('p', "'2rem'")).toEqual({ padding: '2rem' })
  })

  it('handles non-scale spacing numbers with formula', () => {
    expect(generateUtilityDeclarations('p', '13')).toEqual({ padding: '3.25rem' })
  })
})

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------
describe('color utilities', () => {
  it('bg() resolves named colors to their values', () => {
    expect(generateUtilityDeclarations('bg', "'white'")).toEqual({
      'background-color': '#ffffff',
    })
    expect(generateUtilityDeclarations('bg', "'black'")).toEqual({
      'background-color': '#000000',
    })
    expect(generateUtilityDeclarations('bg', "'transparent'")).toEqual({
      'background-color': 'transparent',
    })
  })

  it('bg() resolves hex colors', () => {
    expect(generateUtilityDeclarations('bg', "'#3b82f6'")).toEqual({
      'background-color': '#3b82f6',
    })
  })

  it('bg() resolves rgb colors', () => {
    expect(generateUtilityDeclarations('bg', "'rgb(255, 0, 0)'")).toEqual({
      'background-color': 'rgb(255, 0, 0)',
    })
  })

  it('textColor() sets color property', () => {
    expect(generateUtilityDeclarations('textColor', "'#ff0000'")).toEqual({
      color: '#ff0000',
    })
  })

  it('borderColor() sets border-color property', () => {
    expect(generateUtilityDeclarations('borderColor', "'#ccc'")).toEqual({
      'border-color': '#ccc',
    })
  })
})

// ---------------------------------------------------------------------------
// Typography utilities
// ---------------------------------------------------------------------------
describe('typography utilities', () => {
  it('text() resolves size presets', () => {
    const result = generateUtilityDeclarations('text', "'lg'")
    expect(result).toEqual({
      'font-size': '1.125rem',
      'line-height': '1.75rem',
    })
  })

  it('text() resolves all standard sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
    for (const size of sizes) {
      const result = generateUtilityDeclarations('text', `'${size}'`)
      expect(result).toBeDefined()
      expect(result).toHaveProperty('font-size')
    }
  })

  it('text() passes through raw CSS values', () => {
    expect(generateUtilityDeclarations('text', "'1.5rem'")).toEqual({
      'font-size': '1.5rem',
    })
  })

  it('font() resolves weight presets', () => {
    expect(generateUtilityDeclarations('font', "'bold'")).toEqual({
      'font-weight': '700',
    })
    expect(generateUtilityDeclarations('font', "'semibold'")).toEqual({
      'font-weight': '600',
    })
    expect(generateUtilityDeclarations('font', "'normal'")).toEqual({
      'font-weight': '400',
    })
  })

  it('tracking() sets letter-spacing', () => {
    expect(generateUtilityDeclarations('tracking', "'0.05em'")).toEqual({
      'letter-spacing': '0.05em',
    })
  })

  it('leading() sets line-height', () => {
    expect(generateUtilityDeclarations('leading', "'1.5'")).toEqual({
      'line-height': '1.5',
    })
  })

  it('textAlign() sets text-align', () => {
    expect(generateUtilityDeclarations('textAlign', "'center'")).toEqual({
      'text-align': 'center',
    })
  })
})

// ---------------------------------------------------------------------------
// Layout utilities
// ---------------------------------------------------------------------------
describe('layout utilities', () => {
  it('flex() sets display: flex', () => {
    expect(generateUtilityDeclarations('flex', '')).toEqual({
      display: 'flex',
    })
  })

  it('flexCol() sets flex-direction: column', () => {
    expect(generateUtilityDeclarations('flexCol', '')).toEqual({
      'flex-direction': 'column',
    })
  })

  it('flexRow() sets flex-direction: row', () => {
    expect(generateUtilityDeclarations('flexRow', '')).toEqual({
      'flex-direction': 'row',
    })
  })

  it('flexWrap() sets flex-wrap: wrap', () => {
    expect(generateUtilityDeclarations('flexWrap', '')).toEqual({
      'flex-wrap': 'wrap',
    })
  })

  it('inlineFlex() sets display: inline-flex', () => {
    expect(generateUtilityDeclarations('inlineFlex', '')).toEqual({
      display: 'inline-flex',
    })
  })

  it('grid() sets display: grid', () => {
    const result = generateUtilityDeclarations('grid', '')
    expect(result).toHaveProperty('display', 'grid')
  })

  it('grid() with numeric arg sets template columns', () => {
    const result = generateUtilityDeclarations('grid', '3')
    expect(result).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(3, minmax(0, 1fr))',
    })
  })

  it('gridCols() sets grid-template-columns', () => {
    expect(generateUtilityDeclarations('gridCols', '4')).toEqual({
      'grid-template-columns': 'repeat(4, minmax(0, 1fr))',
    })
  })

  it('gridRows() sets grid-template-rows', () => {
    expect(generateUtilityDeclarations('gridRows', '2')).toEqual({
      'grid-template-rows': 'repeat(2, minmax(0, 1fr))',
    })
  })

  it('w(), h(), size() set sizing', () => {
    expect(generateUtilityDeclarations('w', '16')).toEqual({ width: '4rem' })
    expect(generateUtilityDeclarations('h', '16')).toEqual({ height: '4rem' })
    expect(generateUtilityDeclarations('size', '8')).toEqual({ width: '2rem', height: '2rem' })
  })

  it('minW(), minH(), maxW(), maxH() set constraints', () => {
    expect(generateUtilityDeclarations('minW', '0')).toEqual({ 'min-width': '0px' })
    expect(generateUtilityDeclarations('minH', '0')).toEqual({ 'min-height': '0px' })
    expect(generateUtilityDeclarations('maxW', '20')).toEqual({ 'max-width': '5rem' })
    expect(generateUtilityDeclarations('maxH', '20')).toEqual({ 'max-height': '5rem' })
  })

  it('display() passes through', () => {
    expect(generateUtilityDeclarations('display', "'block'")).toEqual({
      display: 'block',
    })
  })

  it('items() sets align-items', () => {
    expect(generateUtilityDeclarations('items', "'center'")).toEqual({
      'align-items': 'center',
    })
  })

  it('justify() sets justify-content', () => {
    expect(generateUtilityDeclarations('justify', "'between'")).toEqual({
      'justify-content': 'between',
    })
  })

  it('self() sets align-self', () => {
    expect(generateUtilityDeclarations('self', "'end'")).toEqual({
      'align-self': 'end',
    })
  })

  it('overflow utilities', () => {
    expect(generateUtilityDeclarations('overflow', "'hidden'")).toEqual({ overflow: 'hidden' })
    expect(generateUtilityDeclarations('overflowX', "'auto'")).toEqual({ 'overflow-x': 'auto' })
    expect(generateUtilityDeclarations('overflowY', "'scroll'")).toEqual({ 'overflow-y': 'scroll' })
  })

  it('positioning utilities', () => {
    expect(generateUtilityDeclarations('relative', '')).toEqual({ position: 'relative' })
    expect(generateUtilityDeclarations('absolute', '')).toEqual({ position: 'absolute' })
    expect(generateUtilityDeclarations('fixed', '')).toEqual({ position: 'fixed' })
    expect(generateUtilityDeclarations('sticky', '')).toEqual({ position: 'sticky' })
  })

  it('top/right/bottom/left/inset resolve spacing', () => {
    expect(generateUtilityDeclarations('top', '4')).toEqual({ top: '1rem' })
    expect(generateUtilityDeclarations('right', '4')).toEqual({ right: '1rem' })
    expect(generateUtilityDeclarations('bottom', '4')).toEqual({ bottom: '1rem' })
    expect(generateUtilityDeclarations('left', '4')).toEqual({ left: '1rem' })
    expect(generateUtilityDeclarations('inset', '0')).toEqual({ inset: '0px' })
  })

  it('z() sets z-index', () => {
    expect(generateUtilityDeclarations('z', '10')).toEqual({ 'z-index': '10' })
    expect(generateUtilityDeclarations('z', '50')).toEqual({ 'z-index': '50' })
  })
})

// ---------------------------------------------------------------------------
// Border utilities
// ---------------------------------------------------------------------------
describe('border utilities', () => {
  it('rounded() uses border-radius presets', () => {
    expect(generateUtilityDeclarations('rounded', "'lg'")).toEqual({
      'border-radius': '0.5rem',
    })
    expect(generateUtilityDeclarations('rounded', "'full'")).toEqual({
      'border-radius': '9999px',
    })
    expect(generateUtilityDeclarations('rounded', "'none'")).toEqual({
      'border-radius': '0px',
    })
  })

  it('rounded() with no arg uses DEFAULT', () => {
    expect(generateUtilityDeclarations('rounded', '')).toEqual({
      'border-radius': '0.25rem',
    })
  })

  it('roundedT() sets top corners', () => {
    const result = generateUtilityDeclarations('roundedT', "'lg'")
    expect(result).toEqual({
      'border-top-left-radius': '0.5rem',
      'border-top-right-radius': '0.5rem',
    })
  })

  it('roundedB() sets bottom corners', () => {
    const result = generateUtilityDeclarations('roundedB', "'lg'")
    expect(result).toEqual({
      'border-bottom-left-radius': '0.5rem',
      'border-bottom-right-radius': '0.5rem',
    })
  })

  it('roundedL() sets left corners', () => {
    const result = generateUtilityDeclarations('roundedL', "'md'")
    expect(result).toEqual({
      'border-top-left-radius': '0.375rem',
      'border-bottom-left-radius': '0.375rem',
    })
  })

  it('roundedR() sets right corners', () => {
    const result = generateUtilityDeclarations('roundedR', "'md'")
    expect(result).toEqual({
      'border-top-right-radius': '0.375rem',
      'border-bottom-right-radius': '0.375rem',
    })
  })

  it('border() with no arg defaults to 1px', () => {
    expect(generateUtilityDeclarations('border', '')).toEqual({
      'border-width': '1px',
      'border-style': 'solid',
    })
  })

  it('border() with arg uses the value', () => {
    expect(generateUtilityDeclarations('border', "'2px'")).toEqual({
      'border-width': '2px',
      'border-style': 'solid',
    })
  })

  it('borderT/R/B/L set individual sides', () => {
    expect(generateUtilityDeclarations('borderT', '')).toEqual({
      'border-top-width': '1px',
      'border-style': 'solid',
    })
    expect(generateUtilityDeclarations('borderR', '')).toEqual({
      'border-right-width': '1px',
      'border-style': 'solid',
    })
    expect(generateUtilityDeclarations('borderB', '')).toEqual({
      'border-bottom-width': '1px',
      'border-style': 'solid',
    })
    expect(generateUtilityDeclarations('borderL', '')).toEqual({
      'border-left-width': '1px',
      'border-style': 'solid',
    })
  })

  it('ring() generates box-shadow', () => {
    const result = generateUtilityDeclarations('ring', '2')
    expect(result).toHaveProperty('box-shadow')
    expect(result!['box-shadow']).toContain('0 0 0')
  })
})

// ---------------------------------------------------------------------------
// Effects utilities
// ---------------------------------------------------------------------------
describe('effects utilities', () => {
  it('shadow() resolves presets', () => {
    expect(generateUtilityDeclarations('shadow', "'lg'")).toEqual({
      'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    })
    expect(generateUtilityDeclarations('shadow', "'none'")).toEqual({
      'box-shadow': '0 0 #0000',
    })
  })

  it('shadow() with no arg uses DEFAULT', () => {
    expect(generateUtilityDeclarations('shadow', '')).toEqual({
      'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    })
  })

  it('opacity() sets opacity', () => {
    expect(generateUtilityDeclarations('opacity', '0.5')).toEqual({
      opacity: '0.5',
    })
  })

  it('opacity() with empty arg returns undefined', () => {
    expect(generateUtilityDeclarations('opacity', '')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// Interactivity utilities
// ---------------------------------------------------------------------------
describe('interactivity utilities', () => {
  it('cursor() sets cursor', () => {
    expect(generateUtilityDeclarations('cursor', "'pointer'")).toEqual({
      cursor: 'pointer',
    })
  })

  it('select() sets user-select', () => {
    expect(generateUtilityDeclarations('select', "'none'")).toEqual({
      'user-select': 'none',
    })
  })

  it('pointerEvents() sets pointer-events', () => {
    expect(generateUtilityDeclarations('pointerEvents', "'none'")).toEqual({
      'pointer-events': 'none',
    })
  })
})

// ---------------------------------------------------------------------------
// generateUtilityPreview
// ---------------------------------------------------------------------------
describe('generateUtilityPreview', () => {
  it('returns formatted CSS for known utility', () => {
    const result = generateUtilityPreview('p', '4')
    expect(result).toBe('padding: 1rem;')
  })

  it('returns undefined for unknown utility', () => {
    expect(generateUtilityPreview('nonexistent', '4')).toBeUndefined()
  })

  it('handles multi-declaration utilities', () => {
    const result = generateUtilityPreview('px', '4')
    expect(result).toContain('padding-left: 1rem;')
    expect(result).toContain('padding-right: 1rem;')
  })
})

// ---------------------------------------------------------------------------
// generateCxDeclarations / generateCxPreview
// ---------------------------------------------------------------------------
describe('cx preview', () => {
  it('generateCxDeclarations composes multiple utilities', () => {
    const result = generateCxDeclarations("p(4), bg('#ff0000')")
    expect(result).toHaveProperty('padding', '1rem')
    expect(result).toHaveProperty('background-color', '#ff0000')
  })

  it('generateCxDeclarations returns undefined for empty input', () => {
    expect(generateCxDeclarations('')).toBeUndefined()
  })

  it('generateCxPreview returns formatted output', () => {
    const result = generateCxPreview("p(4), m(2)")
    expect(result).toContain('/* cx(...) combined output */')
    expect(result).toContain('.className')
    expect(result).toContain('padding: 1rem')
    expect(result).toContain('margin: 0.5rem')
  })

  it('generateCxPreview returns undefined for no valid utilities', () => {
    expect(generateCxPreview('unknown()')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// generateWhenDeclarations / generateWhenPreview
// ---------------------------------------------------------------------------
describe('when preview', () => {
  it('generateWhenDeclarations extracts utility declarations', () => {
    const result = generateWhenDeclarations("p(4), bg('#fff')")
    expect(result).toHaveProperty('padding', '1rem')
    expect(result).toHaveProperty('background-color', '#fff')
  })

  it('generateWhenDeclarations returns undefined for no valid utilities', () => {
    expect(generateWhenDeclarations('')).toBeUndefined()
  })

  it('generateWhenPreview wraps in selector', () => {
    const result = generateWhenPreview('hover', "p(4)")
    expect(result).toContain('/* when(hover)(...) */')
    expect(result).toContain('.className:hover')
    expect(result).toContain('padding: 1rem')
  })

  it('generateWhenPreview wraps in media query', () => {
    const result = generateWhenPreview('md', "p(8)")
    expect(result).toContain('@media (min-width: 768px)')
    expect(result).toContain('padding: 2rem')
  })

  it('generateWhenPreview combines selector and media query', () => {
    const result = generateWhenPreview('hover, md', "p(4)")
    expect(result).toContain(':hover')
    expect(result).toContain('@media (min-width: 768px)')
  })

  it('generateWhenPreview returns undefined when no valid utilities', () => {
    expect(generateWhenPreview('hover', '')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// parseFunctionCalls
// ---------------------------------------------------------------------------
describe('parseFunctionCalls', () => {
  it('parses single function call', () => {
    const result = parseFunctionCalls('p(4)')
    expect(result).toEqual([{ name: 'p', args: '4' }])
  })

  it('parses multiple function calls', () => {
    const result = parseFunctionCalls("p(4), bg('#ff0000'), flex()")
    expect(result).toEqual([
      { name: 'p', args: '4' },
      { name: 'bg', args: "'#ff0000'" },
      { name: 'flex', args: '' },
    ])
  })

  it('returns empty array for empty input', () => {
    expect(parseFunctionCalls('')).toEqual([])
  })

  it('handles nested parentheses', () => {
    const result = parseFunctionCalls("bg('rgb(255, 0, 0)')")
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('bg')
  })
})

// ---------------------------------------------------------------------------
// isKnownUtility / isKnownModifier
// ---------------------------------------------------------------------------
describe('isKnownUtility', () => {
  it('returns true for known utilities', () => {
    expect(isKnownUtility('p')).toBe(true)
    expect(isKnownUtility('bg')).toBe(true)
    expect(isKnownUtility('flex')).toBe(true)
    expect(isKnownUtility('shadow')).toBe(true)
    expect(isKnownUtility('rounded')).toBe(true)
  })

  it('returns false for unknown names', () => {
    expect(isKnownUtility('fakeUtility')).toBe(false)
    expect(isKnownUtility('')).toBe(false)
  })
})

describe('isKnownModifier', () => {
  it('returns true for known modifiers', () => {
    expect(isKnownModifier('hover')).toBe(true)
    expect(isKnownModifier('focus')).toBe(true)
    expect(isKnownModifier('dark')).toBe(true)
    expect(isKnownModifier('md')).toBe(true)
    expect(isKnownModifier('sm')).toBe(true)
  })

  it('returns false for unknown modifiers', () => {
    expect(isKnownModifier('fakeModifier')).toBe(false)
    expect(isKnownModifier('')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// getKnownUtilities / getKnownModifiers
// ---------------------------------------------------------------------------
describe('getKnownUtilities', () => {
  it('returns an array of strings', () => {
    const utils = getKnownUtilities()
    expect(Array.isArray(utils)).toBe(true)
    expect(utils.length).toBeGreaterThan(0)
    for (const u of utils) {
      expect(typeof u).toBe('string')
    }
  })

  it('includes core utilities', () => {
    const utils = getKnownUtilities()
    expect(utils).toContain('p')
    expect(utils).toContain('bg')
    expect(utils).toContain('flex')
    expect(utils).toContain('rounded')
  })
})

describe('getKnownModifiers', () => {
  it('returns an array of strings', () => {
    const mods = getKnownModifiers()
    expect(Array.isArray(mods)).toBe(true)
    expect(mods.length).toBeGreaterThan(0)
  })

  it('includes core modifiers', () => {
    const mods = getKnownModifiers()
    expect(mods).toContain('hover')
    expect(mods).toContain('dark')
    expect(mods).toContain('md')
  })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe('edge cases', () => {
  it('returns undefined for unknown utility name', () => {
    expect(generateUtilityDeclarations('nonexistent', '4')).toBeUndefined()
  })

  it('handles empty string args gracefully', () => {
    // Spacing with empty arg
    expect(generateUtilityDeclarations('p', '')).toBeUndefined()
    // Color with empty arg
    expect(generateUtilityDeclarations('bg', '')).toBeUndefined()
  })

  it('handles quoted string arguments', () => {
    expect(generateUtilityDeclarations('p', "'1.5rem'")).toEqual({
      padding: '1.5rem',
    })
  })

  it('handles double-quoted arguments', () => {
    expect(generateUtilityDeclarations('p', '"2rem"')).toEqual({
      padding: '2rem',
    })
  })
})
