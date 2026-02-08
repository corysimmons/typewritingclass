import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { transitionsData } from '../data/index.ts'

export function TransitionsPage() {
  return <ComparisonPage category={transitionsData} />
}
