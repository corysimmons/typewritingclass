let globalLayer = 0

export function nextLayer(): number {
  return globalLayer++
}

/** @internal — exposed for testing only */
export function _resetLayer(): void {
  globalLayer = 0
}
