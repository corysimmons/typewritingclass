import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { bordersData } from '../data/index.ts'

export function BordersPage() {
  return <ComparisonPage category={bordersData} />
}
