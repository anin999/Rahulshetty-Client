import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Switch Tab - Practice Page', async ({ page }) => {

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

  console.log('Switch Tab - Test Started');

  await humanDelay();

  console.log(
    'Verify that page URL is correctly opened - https://rahulshettyacademy.com/AutomationPractice/'
  );
  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/'
  );

  console.log('Verify that - Practice Page is loaded successfully');

 const practicePageHeading = page.getByRole('heading', {
    name: 'Practice Page'
  });

  await expect(practicePageHeading).toBeVisible();

  console.log('Verify that - Practice Page heading is visible');

  await clickAndLog(
    practicePageHeading,
    'Practice Page heading'
  );

  const switchWindowHeading = page.getByText(
    'Switch Window Example',
    { exact: true }
  );

  await expect(switchWindowHeading).toBeVisible();

  console.log('Verify that - Switch Tab Example heading is visible');

  await clickAndLog(
    switchWindowHeading,
    'Switch Tab Example'
  );

  const openWindowButton = page.getByRole('button', {
    name: 'Open Window'
  });

  await expect(openWindowButton).toBeVisible();

  console.log('Verify that - Open Tab button is visible');

  await humanDelay();

  console.log('Verify that user can click: Open Tab');

  const page1Promise = page.waitForEvent('popup');

  await openWindowButton.click();

  const page1 = await page1Promise;

  console.log('Verify that user can click opne -  Open Tab');
  console.log('Verify that new tab is opened successfully');

  await page1.waitForLoadState();

  console.log(`New tab URL: ${page1.url()}`);

  // Close first tab
  await humanDelay();

  console.log('Verify that user can close - First opened tab');

  await page1.close();

  console.log('Verify that - opened tab can be closed successfully');

  await humanDelay();

  console.log('Verify that 2nd time - Open Tab is clicked');

  const page2Promise = page.waitForEvent('popup');

  await openWindowButton.click();

  const page2 = await page2Promise;

  console.log('Verify that - Second tab opened successfully');

  await page2.waitForLoadState();

  console.log(`Second tab URL: ${page2.url()}`);

  // Close second tab
  await humanDelay();
  console.log('Verify that user can close - second opened tab');
  await page2.close();

  console.log('Verify that - Second opened tab closed successfully');

  // --------------------------------------------------
  // Test Completed
  // --------------------------------------------------

  console.log('Switch Tab Test Completed Successfully');

  await page.waitForTimeout(5000);
});