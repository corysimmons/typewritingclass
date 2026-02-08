import { describe, it, expect } from 'vitest'
import {
  flex, flexCol, flexRow, flexWrap, inlineFlex,
  grid, gridCols, gridRows,
  w, h, size, minW, minH, maxW, maxH,
  display, items, justify, self,
  overflow, overflowX, overflowY,
  relative, absolute, fixed, sticky,
  top, right, bottom, left, inset,
  z,
} from '../../src/utilities/layout.ts'

describe('layout utilities', () => {
  it('flex sets display: flex', () => {
    expect(flex().declarations).toEqual({ display: 'flex' })
  })

  it('flexCol sets flex column', () => {
    expect(flexCol().declarations).toEqual({ display: 'flex', 'flex-direction': 'column' })
  })

  it('flexRow sets flex row', () => {
    expect(flexRow().declarations).toEqual({ display: 'flex', 'flex-direction': 'row' })
  })

  it('flexWrap sets flex-wrap', () => {
    expect(flexWrap().declarations).toEqual({ 'flex-wrap': 'wrap' })
  })

  it('inlineFlex sets display: inline-flex', () => {
    expect(inlineFlex().declarations).toEqual({ display: 'inline-flex' })
  })

  it('grid sets display: grid', () => {
    expect(grid().declarations).toEqual({ display: 'grid' })
  })

  it('grid with cols sets grid-template-columns', () => {
    expect(grid(3).declarations).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(3, minmax(0, 1fr))',
    })
  })

  it('gridCols sets grid-template-columns', () => {
    expect(gridCols(4).declarations).toEqual({
      'grid-template-columns': 'repeat(4, minmax(0, 1fr))',
    })
  })

  it('gridRows sets grid-template-rows', () => {
    expect(gridRows(2).declarations).toEqual({
      'grid-template-rows': 'repeat(2, minmax(0, 1fr))',
    })
  })

  it('w resolves spacing scale', () => {
    expect(w(4).declarations).toEqual({ width: '1rem' })
  })

  it('w passes through strings', () => {
    expect(w('100%').declarations).toEqual({ width: '100%' })
  })

  it('h resolves spacing scale', () => {
    expect(h(8).declarations).toEqual({ height: '2rem' })
  })

  it('size sets width and height', () => {
    expect(size(4).declarations).toEqual({ width: '1rem', height: '1rem' })
  })

  it('minW sets min-width', () => {
    expect(minW('320px').declarations).toEqual({ 'min-width': '320px' })
  })

  it('minH sets min-height', () => {
    expect(minH('100vh').declarations).toEqual({ 'min-height': '100vh' })
  })

  it('maxW sets max-width', () => {
    expect(maxW('80rem').declarations).toEqual({ 'max-width': '80rem' })
  })

  it('maxH sets max-height', () => {
    expect(maxH('50vh').declarations).toEqual({ 'max-height': '50vh' })
  })

  it('display sets display', () => {
    expect(display('block').declarations).toEqual({ display: 'block' })
  })

  it('items sets align-items', () => {
    expect(items('center').declarations).toEqual({ 'align-items': 'center' })
  })

  it('justify sets justify-content', () => {
    expect(justify('space-between').declarations).toEqual({ 'justify-content': 'space-between' })
  })

  it('self sets align-self', () => {
    expect(self('stretch').declarations).toEqual({ 'align-self': 'stretch' })
  })

  it('overflow sets overflow', () => {
    expect(overflow('hidden').declarations).toEqual({ overflow: 'hidden' })
  })

  it('overflowX sets overflow-x', () => {
    expect(overflowX('auto').declarations).toEqual({ 'overflow-x': 'auto' })
  })

  it('overflowY sets overflow-y', () => {
    expect(overflowY('scroll').declarations).toEqual({ 'overflow-y': 'scroll' })
  })

  it('relative sets position: relative', () => {
    expect(relative().declarations).toEqual({ position: 'relative' })
  })

  it('absolute sets position: absolute', () => {
    expect(absolute().declarations).toEqual({ position: 'absolute' })
  })

  it('fixed sets position: fixed', () => {
    expect(fixed().declarations).toEqual({ position: 'fixed' })
  })

  it('sticky sets position: sticky', () => {
    expect(sticky().declarations).toEqual({ position: 'sticky' })
  })

  it('top sets top', () => {
    expect(top(0).declarations).toEqual({ top: '0px' })
  })

  it('right sets right', () => {
    expect(right('1rem').declarations).toEqual({ right: '1rem' })
  })

  it('bottom sets bottom', () => {
    expect(bottom(4).declarations).toEqual({ bottom: '1rem' })
  })

  it('left sets left', () => {
    expect(left(0).declarations).toEqual({ left: '0px' })
  })

  it('inset sets inset', () => {
    expect(inset(0).declarations).toEqual({ inset: '0px' })
  })

  it('z sets z-index', () => {
    expect(z(10).declarations).toEqual({ 'z-index': '10' })
  })

  it('z with string', () => {
    expect(z('auto').declarations).toEqual({ 'z-index': 'auto' })
  })
})
