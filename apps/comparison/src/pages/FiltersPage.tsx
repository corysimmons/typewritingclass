import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { filtersData } from '../data/index.ts'

export function FiltersPage() {
  return <ComparisonPage category={filtersData} />
}
