// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://randomizer-ui.s3-website.eu-central-1.amazonaws.com/');
});

test.describe('Open Randomizer UI', () => {
  test('should open landing page', async ({ page }) => {
    const logo = page.locator('.App-logo');
    await expect(logo).toBeVisible();
  });
});