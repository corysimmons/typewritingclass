'use client'

import { useState } from 'react'
import {
  tw, css, dynamic,
  w, h, bg, textColor, font, rounded, shadow,
  flex, items, justify,
} from 'typewritingclass'
import { useStyle } from 'typewritingclass-react'

export function ColorPickerDemo() {
  const [color, setColor] = useState('#3b82f6')

  // useStyle + dynamic() requires HOF syntax for runtime CSS variable binding
  const boxProps = useStyle(
    w('8rem'), h('8rem'),
    bg(dynamic(color)),
    rounded('lg'),
    shadow('md'),
    flex(), items('center'), justify('center'),
    textColor('#ffffff'), font('bold'),
  )

  return (
    <section className={tw.flex.flexCol.gap(4)}>
      <h2 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Client Component — Dynamic Color Picker
      </h2>
      <p className={tw.text('base').textColor('#64748b')}>
        This component uses useStyle() with dynamic() for runtime color changes.
      </p>
      <div className={tw.flex.flexRow.gap(4).items('center')}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={tw.w('3rem').h('3rem').rounded('lg')(css({ cursor: 'pointer' }))}
        />
        <div {...boxProps}>{color}</div>
      </div>
    </section>
  )
}
