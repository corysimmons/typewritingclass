import React from 'react'
import { TWCStyles } from 'typewritingclass-next'
import { TWCInject } from './twc-inject'

export const metadata = {
  title: 'Typewriting Class + Next.js',
  description: 'A starter template using typewritingclass with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <TWCStyles />
        <style dangerouslySetInnerHTML={{ __html: '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: system-ui, sans-serif; background: #f8fafc; }' }} />
      </head>
      <body>
        <TWCInject />
        {children}
      </body>
    </html>
  )
}
