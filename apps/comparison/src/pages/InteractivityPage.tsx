import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { interactivityData } from '../data/index.ts'

export function InteractivityPage() {
  return <ComparisonPage category={interactivityData} />
}
