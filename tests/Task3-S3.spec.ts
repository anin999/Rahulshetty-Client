import { test, expect } from '@playwright/test';
test.setTimeout(500000);

test('Checkbox Selection - Practice Page', async ({ page }) => {

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

  console.log(
    'Verify that practice page heading is correctly shown'
  );

  await clickAndLog(
    practicePageHeading,
    'Practice page heading'
  );

  // --------------------------------------------------
  // Checkbox Example heading
  // --------------------------------------------------

  const checkboxHeading = page.getByText('Checkbox Example', {
    exact: true
  });

  await expect(checkboxHeading).toBeVisible();

  console.log(
    'Verify that - Checkbox Example heading is visible'
  );

  await clickAndLog(
    checkboxHeading,
    'Checkbox Example'
  );

  // --------------------------------------------------
  // Checkbox locators
  // --------------------------------------------------

  const checkbox1 = page.locator('#checkBoxOption1');
  const checkbox2 = page.locator('#checkBoxOption2');
  const checkbox3 = page.locator('#checkBoxOption3');

  await expect(checkbox1).toBeVisible();
  await expect(checkbox2).toBeVisible();
  await expect(checkbox3).toBeVisible();

  console.log(
    'Verify that - checkbox options are implemented to do the operation'
  );


  await humanDelay();

  console.log('Verify that user can select - Option 1');

  await checkbox1.check();

  console.log('Verify that user has selected - Option 1');

  await expect(checkbox1).toBeChecked();

  console.log(
    `Verify that Checkbox Option 1 selected value is: ${await checkbox1.isChecked()}`
  );

  console.log(
    'Verify that user has selected - Checkbox Option 1 successfully'
  );

  // --------------------------------------------------


  await humanDelay();

  console.log('Verify that user can select - Option 2');

  await checkbox2.check();

  console.log('Verify that user has selected - Option 2');

  await expect(checkbox2).toBeChecked();

  console.log(
    `Verify that Checkbox Option 2 selected value is: ${await checkbox2.isChecked()}`
  );

  console.log(
    'Verify that user has selected - Checkbox Option 2 successfully'
  );

  // --------------------------------------------------
  // Select Checkbox Option 3
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can select - Option 3');

  await checkbox3.check();

  console.log('Verify that user has selected - Option 3');

  await expect(checkbox3).toBeChecked();

  console.log(
    `Verify that Checkbox Option 3 selected value is: ${await checkbox3.isChecked()}`
  );

  console.log(
    'Verify that user has selected - Checkbox Option 3 successfully'
  );

  // --------------------------------------------------
  // Verify all checkboxes are selected
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that all checkbox options are selected');

  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).toBeChecked();
  await expect(checkbox3).toBeChecked();

  console.log(
    `Checkbox Option 1: ${await checkbox1.isChecked()}`
  );

  console.log(
    `Checkbox Option 2: ${await checkbox2.isChecked()}`
  );

  console.log(
    `Checkbox Option 3: ${await checkbox3.isChecked()}`
  );

  console.log(
    'Verify that all checkbox options are selected successfully'
  );

  // --------------------------------------------------
  // Unselect Checkbox Option 1
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can unselect - Option 1');

  await checkbox1.uncheck();

  console.log('Verify that user has unselected - Option 1');

  await expect(checkbox1).not.toBeChecked();

  console.log(
    `Verify that Checkbox Option 1 selected value is: ${await checkbox1.isChecked()}`
  );

  console.log(
    'Verify that user has unselected - Checkbox Option 1 successfully'
  );

  // --------------------------------------------------
  // Unselect Checkbox Option 2
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can unselect - Option 2');

  await checkbox2.uncheck();

  console.log('Verify that user has unselected - Option 2');

  await expect(checkbox2).not.toBeChecked();

  console.log(
    `Verify that Checkbox Option 2 selected value is: ${await checkbox2.isChecked()}`
  );

  console.log(
    'Verify that user has unselected - Checkbox Option 2 successfully'
  );

  // --------------------------------------------------
  // Unselect Checkbox Option 3
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that user can unselect - Option 3');

  await checkbox3.uncheck();

  console.log('Verify that user has unselected - Option 3');

  await expect(checkbox3).not.toBeChecked();

  console.log(
    `Verify that Checkbox Option 3 selected value is: ${await checkbox3.isChecked()}`
  );

  console.log(
    'Verify that user has unselected - Checkbox Option 3 successfully'
  );

  // --------------------------------------------------
  // Final Verification
  // --------------------------------------------------

  await humanDelay();

  console.log('Verify that all checkbox options are unselected');

  await expect(checkbox1).not.toBeChecked();
  await expect(checkbox2).not.toBeChecked();
  await expect(checkbox3).not.toBeChecked();

  console.log('Checkbox Option 1: Unselected');
  console.log('Checkbox Option 2: Unselected');
  console.log('Checkbox Option 3: Unselected');

  console.log(
    'Verify that all checkbox options are unselected successfully'
  );

  console.log('Checkbox Test Completed Successfully');

  await page.waitForTimeout(5000);
});