import { test, expect } from '@playwright/test';
test.setTimeout(500000);

test('Radio Button Example - Practice Page', async ({ page }) => {

  // 3-second human delay
  const humanDelay = async () => {
    await page.waitForTimeout(3000);
  };

  // Helper for logging clicks
  const clickAndLog = async (locator: any, name: string) => {
    await humanDelay();
    console.log(`Clicking: ${name}`);
    await locator.click();
    console.log(`Clicked: ${name}`);
  };

  console.log('🚀 Test Started');

  // Open website
  await humanDelay();
  console.log('Verifiy user can access - https://rahulshettyacademy.com/AutomationPractice/');
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  console.log('Verfiy that page URL is correctly loaded');

  // Verify page title
  console.log(`Verify that Page Title is correctly loaded: ${await page.title()}`);

  // Verify Practice Page heading
  const practicePageHeading = page.getByText(' Practice Page', { exact: true });

  await expect(practicePageHeading).toBeVisible();
  console.log('Verify that heading - Practice Page is correctly loaded');

  // Radio Button Example heading
  const radioButtonHeading = page.getByText('Radio Button Example', {
    exact: true
  });

  await expect(radioButtonHeading).toBeVisible();
  console.log('Verify that Radio Button Example heading is visble ');

  // Radio 1
  const radio1 = page
    .locator('label')
    .filter({ hasText: 'Radio1' })
    .getByRole('radio');

  await expect(radio1).toBeVisible();

  await humanDelay();
  console.log('Verify that user is selecting Radio1');
  await radio1.check();
  console.log(`Radio1 selected: ${await radio1.isChecked()}`);

  // Radio 2
  const radio2 = page
    .locator('label')
    .filter({ hasText: 'Radio2' })
    .getByRole('radio');

  await expect(radio2).toBeVisible();

  await humanDelay();
  console.log('Verify that user is selecting Radio2');
  await radio2.check();
  console.log(`Radio2 selected: ${await radio2.isChecked()}`);

  // Radio 3
  const radio3 = page
    .locator('label')
    .filter({ hasText: 'Radio3' })
    .getByRole('radio');

  await expect(radio3).toBeVisible();

  await humanDelay();
  console.log('Verify that user is Selecting Radio3');
  await radio3.check();
  console.log(`Radio3 selected: ${await radio3.isChecked()}`);

  
await expect(radio3).toBeChecked();

  console.log('Radio Button Selection Done');

    await page.waitForTimeout(5000);
});