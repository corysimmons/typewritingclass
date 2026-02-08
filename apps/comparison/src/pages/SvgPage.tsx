import React from 'react'
import { ComparisonPage } from '../components/ComparisonPage.tsx'
import { svgData } from '../data/index.ts'

export function SvgPage() {
  return <ComparisonPage category={svgData} />
}
