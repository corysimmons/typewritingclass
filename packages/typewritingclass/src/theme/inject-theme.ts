let themeStyleEl: HTMLStyleElement | null = null

export function injectTheme(cssText: string): void {
  if (typeof document === 'undefined') return

  if (!themeStyleEl) {
    themeStyleEl = document.createElement('style')
    themeStyleEl.id = 'twc-theme'
    document.head.appendChild(themeStyleEl)
  }

  // Append to existing theme styles
  themeStyleEl.textContent += (themeStyleEl.textContent ? '\n' : '') + cssText
}

export function setTheme(name: string): void {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', name)
}
