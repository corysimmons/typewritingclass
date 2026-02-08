import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { sizingData } from '../data/index.ts'

export function SizingPage() {
  return <ComparisonPage category={sizingData} />
}
