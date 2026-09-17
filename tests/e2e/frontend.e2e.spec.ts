import { test, expect, Page } from '@playwright/test'
import { startMongoContainer } from '@/utilities/test/mongodb-container'

test.describe('Frontend', () => {
  let page: Page
  let mongoUri: string

  test.beforeAll(async ({ browser }, testInfo) => {
    // Start MongoDB container for E2E tests
    mongoUri = await startMongoContainer()
    process.env.DATABASE_URL = mongoUri

    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Payload Website Template/)
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Payload Website Template')
  })
})