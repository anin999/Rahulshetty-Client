import { test, expect } from '@playwright/test';
test.setTimeout(500000);

test('Dropdown Selection - Practice Page', async ({ page }) => {

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
  // Navigate to Practice Page
  // --------------------------------------------------

  await humanDelay();

  console.log(
    'Verify that page URL is correctly opened - https://rahulshettyacademy.com/AutomationPractice/'
  );

  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/'
  );

  console.log('Verify that page URL is correctly loaded');
  console.log(`Page Title is correctly shown: ${await page.title()}`);

  // --------------------------------------------------
  // Practice Page heading
  // --------------------------------------------------

  const practicePageHeading = page.getByRole('heading', {
    name: 'Practice Page'
  });

  await expect(practicePageHeading).toBeVisible();

  console.log('Verify that practice page heading is correctly shown');

  await clickAndLog(
    practicePageHeading,
    'Practice page heading'
  );

  // --------------------------------------------------
  // Dropdown Example heading
  // --------------------------------------------------

  const dropdownHeading = page.getByText('Dropdown Example', {
    exact: true
  });

  await expect(dropdownHeading).toBeVisible();

  console.log('Verify that - Dropdown Example heading is visible');

  await clickAndLog(
    dropdownHeading,
    'Dropdown Example'
  );

  // --------------------------------------------------
  // Dropdown locator
  // --------------------------------------------------

  const dropdown = page.locator('#dropdown-class-example');

  await expect(dropdown).toBeVisible();

  console.log('Verify that - dropdown option is implemented to do the operation');

  // --------------------------------------------------
  // Select Option 1
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can select - Option 1');
  await dropdown.selectOption('option1');
  const selectedOption1 = await dropdown.inputValue();

  console.log(`Verify that user has Selected value: ${selectedOption1}`);
  await expect(dropdown).toHaveValue('option1');

  console.log('Verify that user has selected - value matches Option 1');

  // --------------------------------------------------
  // Select Option 2
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can select - Option 2');
  await dropdown.selectOption('option2');
  const selectedOption2 = await dropdown.inputValue();
  console.log(`Verify that user has Selected value: ${selectedOption2}`);
  // Playwright verification
  await expect(dropdown).toHaveValue('option2');

  console.log('Verify that user has selected - value matches Option 2');

  // --------------------------------------------------
  // Select Option 3
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can select - Option 2');
  await dropdown.selectOption('option3');

  const selectedOption3 = await dropdown.inputValue();

  console.log(`Verify that user has Selected value: ${selectedOption3}`);

  // Playwright verification
  await expect(dropdown).toHaveValue('option3');

  console.log('Verify that user has selected - value matches Option 3');


  console.log('Dropdown Test Completed Successfully');
  await page.waitForTimeout(5000);

});