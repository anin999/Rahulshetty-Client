import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Alert Handling - Practice Page', async ({ page }) => {

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

  console.log('🚀 Test Started');

  // --------------------------------------------------
  // Open Practice Page
  // --------------------------------------------------

  await humanDelay();

  console.log(
    'Verify that user opens Practice Page - https://rahulshettyacademy.com/AutomationPractice/'
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

  // --------------------------------------------------
  // Switch To Alert Example Heading
  // --------------------------------------------------

  const alertHeading = page.getByText(
    'Switch To Alert Example',
    { exact: true }
  );

  await expect(alertHeading).toBeVisible();

  console.log('Verify that Switch To Alert Example heading is visible');


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

  console.log('Verify that entering name: Anin is possible');

  await nameTextbox.fill('Anin');

  console.log('Verify that - entered successfully: Anin');

  // --------------------------------------------------
  // Alert Button
  // --------------------------------------------------
 await page.waitForTimeout(1000);
  page.once('dialog', async dialog => {

    console.log(`Alert message: ${dialog.message()}`);
 await page.waitForTimeout(1000);
    // Verify that Anin is mentioned in the alert
    expect(dialog.message()).toContain('Anin');

    console.log('Verified: Alert contains name Anin');

    await dialog.accept();

    console.log('Alert accepted successfully');
  });
 await page.waitForTimeout(1000);
  const alertButton = page.getByRole('button', {
    name: 'Alert'
  });
 await page.waitForTimeout(1000);
  await expect(alertButton).toBeVisible();

  await clickAndLog(
    alertButton,
    'Alert button'
  );
 await page.waitForTimeout(1000);
  console.log('Alert Test Completed Successfully');

  await page.waitForTimeout(4000);
});