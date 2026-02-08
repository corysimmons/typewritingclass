import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { tablesData } from '../data/index.ts'

export function TablesPage() {
  return <ComparisonPage category={tablesData} />
}
