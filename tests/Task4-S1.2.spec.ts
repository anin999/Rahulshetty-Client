import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Radio Button Example - Practice Page', async ({ page }) => {

  // 3-second human delay
  const humanDelay = async () => {
    await page.waitForTimeout(3000);
  };

  console.log('Test Started');

  // --------------------------------------------------
  // Open website using BASE_URL from .env
  // --------------------------------------------------

  await humanDelay();

  console.log(
    `Verify user can access - ${process.env.BASE_URL}`
  );

  await page.goto(process.env.BASE_URL!);

  await page.waitForLoadState('domcontentloaded');

  console.log(`Current URL: ${page.url()}`);

  console.log(
    `Verify that Page Title is correctly loaded: ${await page.title()}`
  );

  console.log('Page loaded successfully');

  // --------------------------------------------------
  // Practice Page heading
  // --------------------------------------------------

  const practicePageHeading = page.getByRole('heading', {
    name: 'Practice Page'
  });

  await expect(practicePageHeading).toBeVisible();

  console.log(
    'Verify that heading - Practice Page is correctly loaded'
  );

  // --------------------------------------------------
  // Radio Button Example heading
  // --------------------------------------------------

  const radioButtonHeading = page.getByText(
    'Radio Button Example',
    {
      exact: true
    }
  );

  await expect(radioButtonHeading).toBeVisible();

  console.log(
    'Verify that Radio Button Example heading is visible'
  );

  // --------------------------------------------------
  // Radio 1
  // --------------------------------------------------

  const radio1 = page
    .locator('label')
    .filter({ hasText: 'Radio1' })
    .getByRole('radio');

  await expect(radio1).toBeVisible();

  await humanDelay();

  console.log('Verify that user is selecting Radio1');

  await radio1.check();

  await expect(radio1).toBeChecked();

  console.log('Radio1: Done');

  // --------------------------------------------------
  // Radio 2
  // --------------------------------------------------

  const radio2 = page
    .locator('label')
    .filter({ hasText: 'Radio2' })
    .getByRole('radio');

  await expect(radio2).toBeVisible();

  await humanDelay();

  console.log('Verify that user is selecting Radio2');

  await radio2.check();

  await expect(radio2).toBeChecked();

  console.log('Radio2: Done');

  // --------------------------------------------------
  // Radio 3
  // --------------------------------------------------

  const radio3 = page
    .locator('label')
    .filter({ hasText: 'Radio3' })
    .getByRole('radio');

  await expect(radio3).toBeVisible();

  await humanDelay();

  console.log('Verify that user is selecting Radio3');

  await radio3.check();

  await expect(radio3).toBeChecked();

  console.log('Radio3: Done');

  // --------------------------------------------------
  // Final Verification
  // --------------------------------------------------

  await humanDelay();

  await expect(radio3).toBeChecked();

  console.log('Radio Button Selection Done');

  await page.waitForTimeout(5000);
});