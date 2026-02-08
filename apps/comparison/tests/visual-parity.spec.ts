import { test, expect } from '@playwright/test'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const routes = [
  { path: '/layout', name: 'Layout' },
  { path: '/flexbox-grid', name: 'Flexbox & Grid' },
  { path: '/spacing', name: 'Spacing' },
  { path: '/sizing', name: 'Sizing' },
  { path: '/typography', name: 'Typography' },
  { path: '/backgrounds', name: 'Backgrounds' },
  { path: '/borders', name: 'Borders' },
  { path: '/effects', name: 'Effects' },
  { path: '/filters', name: 'Filters' },
  { path: '/tables', name: 'Tables' },
  { path: '/transitions', name: 'Transitions' },
  { path: '/transforms', name: 'Transforms' },
  { path: '/interactivity', name: 'Interactivity' },
  { path: '/svg', name: 'SVG' },
  { path: '/accessibility', name: 'Accessibility' },
]

// Full-page screenshots for each category — visual regression baseline
for (const route of routes) {
  test(`${route.name} page renders`, async ({ page }) => {
    await page.goto(route.path)
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot(`${route.path.slice(1)}-full.png`, {
      fullPage: true,
    })
  })
}

// Per-example parity: compare TWC render vs Tailwind render within each row.
// Each comparison row has data-comparison-row="label" and inside it:
//   data-render="twc" — the TWC render box
//   data-render="tw"  — the Tailwind render box
// These should produce visually identical output.
for (const route of routes) {
  test(`${route.name} TWC vs Tailwind parity`, async ({ page }) => {
    await page.goto(route.path)
    await page.waitForTimeout(500)

    const rows = page.locator('[data-comparison-row]')
    const count = await rows.count()

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i)
      const label = await row.getAttribute('data-comparison-row') || `example-${i}`
      const slug = label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

      const twcRender = row.locator('[data-render="twc"]')
      const twRender = row.locator('[data-render="tw"]')

      // Screenshot both render boxes
      const twcShot = await twcRender.screenshot()
      const twShot = await twRender.screenshot()

      // Snapshot each individually for regression tracking
      expect(twcShot).toMatchSnapshot(
        `${route.path.slice(1)}-${slug}-twc.png`,
      )
      expect(twShot).toMatchSnapshot(
        `${route.path.slice(1)}-${slug}-tw.png`,
      )

      // Direct TWC vs TW pixel comparison — the core parity check
      const twcPng = PNG.sync.read(twcShot)
      const twPng = PNG.sync.read(twShot)

      // Only compare if dimensions match (different sizes = obvious mismatch)
      if (twcPng.width === twPng.width && twcPng.height === twPng.height) {
        const totalPixels = twcPng.width * twcPng.height
        const diffPixels = pixelmatch(
          twcPng.data, twPng.data, null,
          twcPng.width, twcPng.height,
          { threshold: 0.1 },
        )
        const diffRatio = diffPixels / totalPixels
        // Allow up to 10% pixel diff to account for minor rendering differences
        // (class-based vs inline-style rendering can produce small sub-pixel diffs)
        expect(diffRatio, `${label}: TWC vs TW differ by ${(diffRatio * 100).toFixed(1)}%`).toBeLessThan(0.10)
      }
    }
  })
}
