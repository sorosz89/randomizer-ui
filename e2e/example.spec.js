// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://randomizer-ui.s3-website.eu-central-1.amazonaws.com/');
});

test.describe('Randomizer UI', () => {
  test('should open landing page', async ({ page }) => {
    const logo = page.locator('.App-logo');
    await expect(logo).toBeVisible();
  });

  test('should display the Reorder button', async ({ page }) => {
    const reorderButton = page.locator('text=Reorder');
    await expect(reorderButton).toBeVisible();
  });
});