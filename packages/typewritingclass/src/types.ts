export interface StyleRule {
  _tag: 'StyleRule'
  declarations: Record<string, string>
  selectors: string[]
  mediaQueries: string[]
  dynamicBindings?: Record<string, string>
}

export type Utility = (value: any) => StyleRule
export type Modifier = (rule: StyleRule) => StyleRule

export interface DynamicResult {
  className: string
  style: Record<string, string>
}
