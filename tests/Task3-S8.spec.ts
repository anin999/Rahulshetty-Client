import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Mouse Hover - Practice Page', async ({ page }) => {

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
    'Verify that - Opening Practice Page - https://rahulshettyacademy.com/AutomationPractice/'
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
  // Mouse Hover Example Heading
  // --------------------------------------------------

  const mouseHoverHeading = page.getByText(
    'Mouse Hover Example',
    { exact: true }
  );

  await expect(mouseHoverHeading).toBeVisible();

  console.log('Mouse Hover Example heading is visible');

  await clickAndLog(
    mouseHoverHeading,
    'Mouse Hover Example'
  );


  const mouseHoverButton = page.getByRole('button', {
    name: 'Mouse Hover'
  });

  await expect(mouseHoverButton).toBeVisible();

  // First Hover
  await humanDelay();

  console.log('Hovering on: Mouse Hover');
  await mouseHoverButton.hover();
  console.log('Hovered on: Mouse Hover');



  const topOption = page.getByText('Top', {
    exact: true
  });

  await expect(topOption).toBeVisible();

  await clickAndLog(
    topOption,
    'Top'
  );

  // --------------------------------------------------
  // Hover Again
  // --------------------------------------------------

  await humanDelay();

  console.log('Hovering again on: Mouse Hover');

  await mouseHoverButton.hover();

  console.log('Hovered again on: Mouse Hover');

  // --------------------------------------------------
  // Click Reload
  // --------------------------------------------------

  const reloadOption = page.getByText('Reload', {
    exact: true
  });

  await expect(reloadOption).toBeVisible();

  await clickAndLog(
    reloadOption,
    'Reload'
  );

  console.log('Verify that - Page reload done');

  await page.waitForLoadState('domcontentloaded');

  console.log('Verify that - Page reloaded successfully');

  console.log('Mouse Hover Test Completed Successfully');

  await page.waitForTimeout(5000);
});