import React from 'react'
import { Outlet } from 'react-router-dom'
import { cx, flex, css } from 'typewritingclass'
import { Sidebar } from './Sidebar.tsx'

export function Layout() {
  return (
    <div className={cx(flex(), css({ minHeight: '100vh' }))}>
      <Sidebar />
      <main className={cx(css({ flex: '1', overflowY: 'auto', padding: '2rem 2.5rem' }))}>
        <Outlet />
      </main>
    </div>
  )
}
