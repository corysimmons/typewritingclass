import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { accessibilityData } from '../data/index.ts'

export function AccessibilityPage() {
  return <ComparisonPage category={accessibilityData} />
}
