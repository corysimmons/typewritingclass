import { generateCSS, onChange } from './registry.ts'

let styleEl: HTMLStyleElement | null = null
let pending = false

function flush(): void {
  pending = false
  if (!styleEl) return
  styleEl.textContent = generateCSS()
}

function scheduleUpdate(): void {
  if (pending) return
  pending = true
  queueMicrotask(flush)
}

function init(): void {
  if (typeof document === 'undefined') return
  if (styleEl) return

  styleEl = document.getElementById('twc') as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = 'twc'
    document.head.appendChild(styleEl)
  }

  onChange(scheduleUpdate)
  scheduleUpdate()
}

init()
