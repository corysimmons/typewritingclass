import type { ReactNode } from 'react'

export interface ComparisonExample {
  label: string
  twcCode: string
  twcElement: ReactNode
  tailwindCode: string
  tailwindElement: ReactNode
}

export interface ComparisonSection {
  title: string
  examples: ComparisonExample[]
}

export interface ComparisonCategory {
  title: string
  description: string
  sections: ComparisonSection[]
}
