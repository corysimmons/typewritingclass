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
  aspectRatio, columns, breakAfter, breakBefore, breakInside,
  boxSizing, float_, clear_, isolate, isolationAuto,
  objectFit, objectPosition, overscrollBehavior,
  static_, insetX, insetY, start, end,
  visible, invisible, collapse_,
  flexBasis, flexRowReverse, flexColReverse, flexWrapReverse, flexNowrap,
  flex1, flexAuto, flexInitial, flexNone,
  grow, shrink, order,
  colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd,
  gridFlow, autoCols, autoRows,
  justifyItems, justifySelf, alignContent, placeContent, placeItems, placeSelf,
  container,
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

  // --- New layout utilities ---

  it('aspectRatio sets aspect-ratio', () => {
    expect(aspectRatio('16 / 9').declarations).toEqual({ 'aspect-ratio': '16 / 9' })
  })

  it('columns sets columns', () => {
    expect(columns(3).declarations).toEqual({ columns: '3' })
  })

  it('breakAfter sets break-after', () => {
    expect(breakAfter('page').declarations).toEqual({ 'break-after': 'page' })
  })

  it('breakBefore sets break-before', () => {
    expect(breakBefore('column').declarations).toEqual({ 'break-before': 'column' })
  })

  it('breakInside sets break-inside', () => {
    expect(breakInside('avoid').declarations).toEqual({ 'break-inside': 'avoid' })
  })

  it('boxSizing sets box-sizing', () => {
    expect(boxSizing('border-box').declarations).toEqual({ 'box-sizing': 'border-box' })
  })

  it('float_ sets float', () => {
    expect(float_('left').declarations).toEqual({ float: 'left' })
  })

  it('clear_ sets clear', () => {
    expect(clear_('both').declarations).toEqual({ clear: 'both' })
  })

  it('isolate sets isolation: isolate', () => {
    expect(isolate().declarations).toEqual({ isolation: 'isolate' })
  })

  it('isolationAuto sets isolation: auto', () => {
    expect(isolationAuto().declarations).toEqual({ isolation: 'auto' })
  })

  it('objectFit sets object-fit', () => {
    expect(objectFit('cover').declarations).toEqual({ 'object-fit': 'cover' })
  })

  it('objectPosition sets object-position', () => {
    expect(objectPosition('center').declarations).toEqual({ 'object-position': 'center' })
  })

  it('overscrollBehavior sets overscroll-behavior', () => {
    expect(overscrollBehavior('contain').declarations).toEqual({ 'overscroll-behavior': 'contain' })
  })

  it('static_ sets position: static', () => {
    expect(static_().declarations).toEqual({ position: 'static' })
  })

  it('insetX sets left and right', () => {
    expect(insetX(0).declarations).toEqual({ left: '0px', right: '0px' })
  })

  it('insetY sets top and bottom', () => {
    expect(insetY(0).declarations).toEqual({ top: '0px', bottom: '0px' })
  })

  it('start sets inset-inline-start', () => {
    expect(start('1rem').declarations).toEqual({ 'inset-inline-start': '1rem' })
  })

  it('end sets inset-inline-end', () => {
    expect(end('1rem').declarations).toEqual({ 'inset-inline-end': '1rem' })
  })

  it('visible sets visibility: visible', () => {
    expect(visible().declarations).toEqual({ visibility: 'visible' })
  })

  it('invisible sets visibility: hidden', () => {
    expect(invisible().declarations).toEqual({ visibility: 'hidden' })
  })

  it('collapse_ sets visibility: collapse', () => {
    expect(collapse_().declarations).toEqual({ visibility: 'collapse' })
  })

  it('flexBasis sets flex-basis', () => {
    expect(flexBasis('50%').declarations).toEqual({ 'flex-basis': '50%' })
  })

  it('flexRowReverse sets flex row-reverse', () => {
    expect(flexRowReverse().declarations).toEqual({ display: 'flex', 'flex-direction': 'row-reverse' })
  })

  it('flexColReverse sets flex column-reverse', () => {
    expect(flexColReverse().declarations).toEqual({ display: 'flex', 'flex-direction': 'column-reverse' })
  })

  it('flexWrapReverse sets flex-wrap: wrap-reverse', () => {
    expect(flexWrapReverse().declarations).toEqual({ 'flex-wrap': 'wrap-reverse' })
  })

  it('flexNowrap sets flex-wrap: nowrap', () => {
    expect(flexNowrap().declarations).toEqual({ 'flex-wrap': 'nowrap' })
  })

  it('flex1 sets flex: 1 1 0%', () => {
    expect(flex1().declarations).toEqual({ flex: '1 1 0%' })
  })

  it('flexAuto sets flex: 1 1 auto', () => {
    expect(flexAuto().declarations).toEqual({ flex: '1 1 auto' })
  })

  it('flexInitial sets flex: 0 1 auto', () => {
    expect(flexInitial().declarations).toEqual({ flex: '0 1 auto' })
  })

  it('flexNone sets flex: none', () => {
    expect(flexNone().declarations).toEqual({ flex: 'none' })
  })

  it('grow sets flex-grow with default', () => {
    expect(grow().declarations).toEqual({ 'flex-grow': '1' })
  })

  it('grow accepts custom value', () => {
    expect(grow(0).declarations).toEqual({ 'flex-grow': '0' })
  })

  it('shrink sets flex-shrink with default', () => {
    expect(shrink().declarations).toEqual({ 'flex-shrink': '1' })
  })

  it('shrink accepts custom value', () => {
    expect(shrink(0).declarations).toEqual({ 'flex-shrink': '0' })
  })

  it('order sets order', () => {
    expect(order(1).declarations).toEqual({ order: '1' })
  })

  it('colSpan sets grid-column span', () => {
    expect(colSpan(2).declarations).toEqual({ 'grid-column': 'span 2 / span 2' })
  })

  it('colSpan full sets 1 / -1', () => {
    expect(colSpan('full').declarations).toEqual({ 'grid-column': '1 / -1' })
  })

  it('colStart sets grid-column-start', () => {
    expect(colStart(2).declarations).toEqual({ 'grid-column-start': '2' })
  })

  it('colEnd sets grid-column-end', () => {
    expect(colEnd(4).declarations).toEqual({ 'grid-column-end': '4' })
  })

  it('rowSpan sets grid-row span', () => {
    expect(rowSpan(3).declarations).toEqual({ 'grid-row': 'span 3 / span 3' })
  })

  it('rowStart sets grid-row-start', () => {
    expect(rowStart(1).declarations).toEqual({ 'grid-row-start': '1' })
  })

  it('rowEnd sets grid-row-end', () => {
    expect(rowEnd(3).declarations).toEqual({ 'grid-row-end': '3' })
  })

  it('gridFlow sets grid-auto-flow', () => {
    expect(gridFlow('row dense').declarations).toEqual({ 'grid-auto-flow': 'row dense' })
  })

  it('autoCols sets grid-auto-columns', () => {
    expect(autoCols('min-content').declarations).toEqual({ 'grid-auto-columns': 'min-content' })
  })

  it('autoRows sets grid-auto-rows', () => {
    expect(autoRows('auto').declarations).toEqual({ 'grid-auto-rows': 'auto' })
  })

  it('justifyItems sets justify-items', () => {
    expect(justifyItems('center').declarations).toEqual({ 'justify-items': 'center' })
  })

  it('justifySelf sets justify-self', () => {
    expect(justifySelf('end').declarations).toEqual({ 'justify-self': 'end' })
  })

  it('alignContent sets align-content', () => {
    expect(alignContent('center').declarations).toEqual({ 'align-content': 'center' })
  })

  it('placeContent sets place-content', () => {
    expect(placeContent('center').declarations).toEqual({ 'place-content': 'center' })
  })

  it('placeItems sets place-items', () => {
    expect(placeItems('center').declarations).toEqual({ 'place-items': 'center' })
  })

  it('placeSelf sets place-self', () => {
    expect(placeSelf('center').declarations).toEqual({ 'place-self': 'center' })
  })

  it('container sets width: 100%', () => {
    expect(container().declarations).toEqual({ width: '100%' })
  })
})
