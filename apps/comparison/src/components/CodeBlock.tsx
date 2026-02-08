import React from 'react'
import { cx, px, py, rounded, bg, textColor, text, css } from 'typewritingclass'
import { sm as smText, xs as xsText } from 'typewritingclass/theme/typography'
import { md as mdRadius } from 'typewritingclass/theme/borders'

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className={cx(
      px(3), py(2),
      rounded(mdRadius),
      bg('#1e293b'),
      textColor('#e2e8f0'),
      text(xsText),
      css({ fontFamily: "'JetBrains Mono', monospace", overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }),
    )}>
      <code>{code}</code>
    </pre>
  )
}
