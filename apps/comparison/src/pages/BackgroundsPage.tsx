import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { backgroundsData } from '../data/index.ts'

export function BackgroundsPage() {
  return <ComparisonPage category={backgroundsData} />
}
