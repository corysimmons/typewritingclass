import { test, expect } from '@playwright/test'

const fixtures = ['spacing', 'colors', 'typography', 'layout', 'borders', 'composition'] as const

for (const fixture of fixtures) {
  test(`${fixture}: TWC matches reference`, async ({ page }) => {
    // Screenshot the TWC version
    await page.goto(`/tests/fixtures/${fixture}-twc.html`)
    await page.waitForLoadState('networkidle')
    // Let microtask batching flush styles
    await page.waitForTimeout(100)
    const twcScreenshot = await page.locator('#app').screenshot()

    // Screenshot the reference version
    await page.goto(`/tests/fixtures/${fixture}-ref.html`)
    await page.waitForLoadState('networkidle')
    const refScreenshot = await page.locator('#app').screenshot()

    // Both must produce the same visual output
    // Use toMatchSnapshot to compare TWC against a stored baseline
    expect(twcScreenshot).toMatchSnapshot(`${fixture}-twc.png`)
    // Reference also must match the same baseline
    expect(refScreenshot).toMatchSnapshot(`${fixture}-ref.png`)
  })
}
