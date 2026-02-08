import { useMemo } from 'react'
import type { StyleRule, DynamicResult } from 'typewritingclass'
import { dcx } from 'typewritingclass'

export function useStyle(...args: (StyleRule | string)[]): DynamicResult {
  return useMemo(() => dcx(...args), args)
}
