import React from 'react'
import { TWCStyles } from 'typewritingclass-next'
import { TWCInject } from './twc-inject'

export const metadata = {
  title: 'Typewriting Class — Next.js Demo',
  description: 'A demo of typewritingclass with Next.js App Router',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <TWCStyles />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <TWCInject />
        {children}
      </body>
    </html>
  )
}
