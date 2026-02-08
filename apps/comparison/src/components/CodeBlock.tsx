import React from 'react'
import { tw } from 'typewritingclass'
import { xs as xsText } from 'typewritingclass/theme/typography'

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className={`${tw
      .px(3).py(2)
      .rounded('md')
      .bg('#1e293b')
      .textColor('#e2e8f0')
      .text(xsText)
      .fontFamily("'JetBrains Mono', monospace").overflowX('auto').overflowY('hidden').whitespace('nowrap')
    }`}>
      <code>{code}</code>
    </pre>
  )
}
