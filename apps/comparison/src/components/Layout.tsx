import React from 'react'
import { Outlet } from 'react-router-dom'
import { tw } from 'typewritingclass'
import { Sidebar } from './Sidebar.tsx'

export function Layout() {
  return (
    <div className={tw.flex.minH('100vh')}>
      <Sidebar />
      <main className={tw.flex1.overflowY('auto').py(8).px(10)}>
        <Outlet />
      </main>
    </div>
  )
}
