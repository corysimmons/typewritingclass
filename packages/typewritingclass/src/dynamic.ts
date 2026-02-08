export interface DynamicValue<T extends string | number = string | number> {
  _tag: 'DynamicValue'
  __value: T
  __id: string
}

let counter = 0

export function dynamic<T extends string | number>(value: T): DynamicValue<T> {
  return { _tag: 'DynamicValue', __value: value, __id: `--twc-d${counter++}` }
}

export function isDynamic(v: unknown): v is DynamicValue {
  return (
    typeof v === 'object' &&
    v !== null &&
    '_tag' in v &&
    (v as DynamicValue)._tag === 'DynamicValue'
  )
}

/** @internal — exposed for testing only */
export function _resetDynamicCounter(): void {
  counter = 0
}
