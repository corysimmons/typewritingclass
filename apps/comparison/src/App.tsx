import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { LayoutPage } from './pages/LayoutPage.tsx'
import { FlexboxGridPage } from './pages/FlexboxGridPage.tsx'
import { SpacingPage } from './pages/SpacingPage.tsx'
import { SizingPage } from './pages/SizingPage.tsx'
import { TypographyPage } from './pages/TypographyPage.tsx'
import { BackgroundsPage } from './pages/BackgroundsPage.tsx'
import { BordersPage } from './pages/BordersPage.tsx'
import { EffectsPage } from './pages/EffectsPage.tsx'
import { FiltersPage } from './pages/FiltersPage.tsx'
import { TablesPage } from './pages/TablesPage.tsx'
import { TransitionsPage } from './pages/TransitionsPage.tsx'
import { TransformsPage } from './pages/TransformsPage.tsx'
import { InteractivityPage } from './pages/InteractivityPage.tsx'
import { SvgPage } from './pages/SvgPage.tsx'
import { AccessibilityPage } from './pages/AccessibilityPage.tsx'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="layout" element={<LayoutPage />} />
        <Route path="flexbox-grid" element={<FlexboxGridPage />} />
        <Route path="spacing" element={<SpacingPage />} />
        <Route path="sizing" element={<SizingPage />} />
        <Route path="typography" element={<TypographyPage />} />
        <Route path="backgrounds" element={<BackgroundsPage />} />
        <Route path="borders" element={<BordersPage />} />
        <Route path="effects" element={<EffectsPage />} />
        <Route path="filters" element={<FiltersPage />} />
        <Route path="tables" element={<TablesPage />} />
        <Route path="transitions" element={<TransitionsPage />} />
        <Route path="transforms" element={<TransformsPage />} />
        <Route path="interactivity" element={<InteractivityPage />} />
        <Route path="svg" element={<SvgPage />} />
        <Route path="accessibility" element={<AccessibilityPage />} />
      </Route>
    </Routes>
  )
}
