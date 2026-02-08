import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { typographyData } from '../data/index.ts'

export function TypographyPage() {
  return <ComparisonPage category={typographyData} />
}
