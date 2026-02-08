import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { spacingData } from '../data/index.ts'

export function SpacingPage() {
  return <ComparisonPage category={spacingData} />
}
