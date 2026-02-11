import 'typewritingclass/preflight.css'
import React from 'react'
import { TWCStyles } from 'typewritingclass-next'

export const metadata = {
  title: 'Typewriting Class + Next.js RSC',
  description: 'Server Components with compile-time styles — zero client JS for styling',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <TWCStyles />
      </head>
      <body>{children}</body>
    </html>
  )
}
