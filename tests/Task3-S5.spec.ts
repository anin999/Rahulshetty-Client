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

  console.log('Test Started');

  // --------------------------------------------------
  // Open Practice Page
  // --------------------------------------------------

  await humanDelay();

  console.log(
    'Verify that - Practice Page is opened successfully - https://rahulshettyacademy.com/AutomationPractice/'
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
  // Switch Tab Example Heading
  // --------------------------------------------------

  const switchTabHeading = page.getByText(
    'Switch Tab Example',
    { exact: true }
  );

  await expect(switchTabHeading).toBeVisible();

  console.log('Verify that - Switch Tab heading is visible');


  // --------------------------------------------------
  // Open Tab - First Time
  // --------------------------------------------------

  const openTab = page.getByRole('link', {
    name: 'Open Tab'
  });

  await expect(openTab).toBeVisible();

  console.log('Verify thatOpen Tab is visible');

  await humanDelay();

  console.log('Verify that user can click - Open Tab');

  const page3Promise = page.waitForEvent('popup');

  await openTab.click();

  const page3 = await page3Promise;

  console.log('New tab opened successfully');

  await page3.waitForLoadState();

  console.log(`Opened Tab URL: ${page3.url()}`);

  // --------------------------------------------------
  // Move back to Main URL
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can move back to Main URL');

  await page.bringToFront();

  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/'
  );

  console.log('Verify that - Main URL opened successfully');

  const openTabAgain = page.getByRole('link', {
    name: 'Open Tab'
  });

  await expect(openTabAgain).toBeVisible();

  console.log('Verify that - Open Tab is visible again');

  await humanDelay();

  console.log('Verify that - user can - Open Tab again');

  const page4Promise = page.waitForEvent('popup');

  await openTabAgain.click();

  const page4 = await page4Promise;

  console.log('Verify that - second new tab opened successfully');

  await page4.waitForLoadState();

  console.log(`Second Opened Tab URL: ${page4.url()}`);

  // --------------------------------------------------
  // Close opened tabs
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can close - first opened tab');
  await page3.close();
  console.log('Verify - opened tab closed');

  await humanDelay();

  console.log('Verify that user can close - 2nd opened tab');
  await page4.close();
  console.log('Verify - opened tab closed');

  console.log('Switch Tab Test Completed Successfully');

  await page.waitForTimeout(5000);
});