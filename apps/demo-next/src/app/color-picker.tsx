'use client'

import { useState } from 'react'
import {
  cx, css, dynamic,
  p, px, py, bg, textColor, text, font, rounded, shadow,
  w, h, flex, flexCol, flexRow, gap, items, justify,
} from 'typewritingclass'
import { useStyle } from 'typewritingclass-react'
import { lg, base, semibold, bold } from 'typewritingclass/theme/typography'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
import { md as mdShadow } from 'typewritingclass/theme/shadows'

export function ColorPickerDemo() {
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
    <section className={cx(flex(), flexCol(), gap(4))}>
      <h2 className={cx(text(lg), font(semibold), textColor('#1e293b'))}>
        Client Component — Dynamic Color Picker
      </h2>
      <p className={cx(text(base), textColor('#64748b'))}>
        This component uses useStyle() with dynamic() for runtime color changes.
      </p>
      <div className={cx(flex(), flexRow(), gap(4), items('center'))}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={cx(w('3rem'), h('3rem'), rounded(lgRadius), css({ cursor: 'pointer' }))}
        />
        <div {...boxProps}>{color}</div>
      </div>
    </section>
  )
}
