'use client'

import { useState } from 'react'
import { tw } from 'typewritingclass'

export function ColorPickerDemo() {
  const [color, setColor] = useState('#3b82f6')

  return (
    <section className={tw.flex.flexCol.gap(4)}>
      <h2 className={tw.text('lg').font('600').textColor('#1e293b')}>
        Client Component — Dynamic Color Picker
      </h2>
      <p className={tw.text('base').textColor('#64748b')}>
        Pick a color to see it update in real time. Static styles are compiled,
        dynamic background uses inline style.
      </p>
      <div className={tw.flex.flexRow.gap(4).items('center')}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={tw.w('3rem').h('3rem').rounded('lg').cursor('pointer')}
        />
        <div
          className={tw
            .w('8rem').h('8rem')
            .rounded('lg').shadow('md')
            .flex.items('center').justify('center')
            .textColor('#ffffff').font('bold')
          }
          style={{ backgroundColor: color }}
        >
          {color}
        </div>
      </div>
    </section>
  )
}
