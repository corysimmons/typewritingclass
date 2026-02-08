import React from 'react'
import { Outlet } from 'react-router-dom'
import { cx, flex, flex1, minH, overflowY, px, py } from 'typewritingclass'
import { Sidebar } from './Sidebar.tsx'

export function Layout() {
  return (
    <div className={cx(flex(), minH('100vh'))}>
      <Sidebar />
      <main className={cx(flex1(), overflowY('auto'), py(8), px(10))}>
        <Outlet />
      </main>
    </div>
  )
}
