import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { transformsData } from '../data/index.ts'

export function TransformsPage() {
  return <ComparisonPage category={transformsData} />
}
