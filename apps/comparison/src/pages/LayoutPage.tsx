import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { layoutData } from '../data/index.ts'

export function LayoutPage() {
  return <ComparisonPage category={layoutData} />
}
