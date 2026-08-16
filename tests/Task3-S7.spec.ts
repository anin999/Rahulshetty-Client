import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Confirm Alert - Practice Page', async ({ page }) => {

  // 3-second human delay
  const humanDelay = async () => {
    await page.waitForTimeout(3000);
  };

  // Click helper with logging
  const clickAndLog = async (locator: any, name: string) => {
    await humanDelay();
    console.log(`Clicking: ${name}`);
    await locator.click();
    console.log(`Clicked: ${name}`);
  };

  console.log('Test Started');

  // --------------------------------------------------
  // Open Practice Page
  // --------------------------------------------------

  await humanDelay();

  console.log(
    'Verify that - Practice Page - https://rahulshettyacademy.com/AutomationPractice/'
  );

  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/'
  );

  console.log('Verify that - Practice Page loaded successfully');

  // --------------------------------------------------
  // Practice Page Heading
  // --------------------------------------------------

  const practicePageHeading = page.getByRole('heading', {
    name: 'Practice Page'
  });

  await expect(practicePageHeading).toBeVisible();

  console.log('Verify that - Practice Page heading is visible');

  // --------------------------------------------------
  // Switch To Alert Example Heading
  // --------------------------------------------------

  const alertHeading = page.getByText(
    'Switch To Alert Example',
    { exact: true }
  );

  await expect(alertHeading).toBeVisible();

  console.log('Verify that - Switch To Alert Example heading is visible');

  // --------------------------------------------------
  // Enter Name
  // --------------------------------------------------

  const nameTextbox = page.getByRole('textbox', {
    name: 'Enter Your Name'
  });

  await expect(nameTextbox).toBeVisible();

  await clickAndLog(
    nameTextbox,
    'Enter Your Name textbox'
  );

  await humanDelay();

  console.log('Entering name: Fletcher');

  await nameTextbox.fill('Fletcher');

  console.log('Verify that - Name entered successfully: Fletcher');

  // --------------------------------------------------
  // Confirm Button
  // --------------------------------------------------

  const confirmButton = page.getByRole('button', {
    name: 'Confirm'
  });

  await expect(confirmButton).toBeVisible();
await page.waitForTimeout(1000);
  // Handle Confirm popup before clicking Confirm
  page.once('dialog', async dialog => {

    console.log(`Confirm popup message: ${dialog.message()}`);
await page.waitForTimeout(1000);
    // Verify Anin is mentioned in the popup
    expect(dialog.message()).toContain('Fletcher');

    console.log('Verified: Confirm popup contains name Anin');
await page.waitForTimeout(1000);
    await dialog.accept();

    console.log('Verify that - Confirm popup accepted successfully');
  });
await page.waitForTimeout(1000);
  await clickAndLog(
    confirmButton,
    'Confirm button'
  );

  console.log('Confirm Alert Test Completed Successfully');

  await page.waitForTimeout(4000);
});