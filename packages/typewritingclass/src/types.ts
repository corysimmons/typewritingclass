export interface StyleRule {
  _tag: 'StyleRule'
  declarations: Record<string, string>
  selectors: string[]
  mediaQueries: string[]
}

export type Utility = (value: any) => StyleRule
export type Modifier = (rule: StyleRule) => StyleRule
