// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Randomizer UI', () => {
  test('should show main randomizer container', async ({ page }) => {
    await expect(page.locator('.randomizer')).toBeVisible();
  });

  test('should display REORDER button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /reorder/i })).toBeVisible();
  });

  test('should display COPY LIST button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /copy list/i })).toBeVisible();
  });

  test('should display COPY NOTES button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /copy notes/i })).toBeVisible();
  });
});
