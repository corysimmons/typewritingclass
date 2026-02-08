import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { effectsData } from '../data/index.ts'

export function EffectsPage() {
  return <ComparisonPage category={effectsData} />
}
