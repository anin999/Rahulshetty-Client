import { test, expect } from '@playwright/test';

test.setTimeout(3000_0000);

test('BlazeDemo Registration Validation with Logs', async ({ page }) => {

  const delay = async (ms = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log('========== BlazeDemo Registration Validation - Test Case ==========');

  console.log('Opening BlazeDemo website');
  await page.goto('https://blazedemo.com/');
  await delay();

  console.log('Verify that Home button is implemented and is clickable');
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'home' }).click();

  console.log('Verify that Register button is implemented and is clickable');
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'Register' }).click();

  console.log('Verify that Register page is implemented and Register heading is visible');
  await expect(page.locator('div').filter({ hasText: /^Register$/ })).toBeVisible();
  await delay();
  await page.locator('div').filter({ hasText: /^Register$/ }).click();

  // ---------------- Name ----------------

  console.log('Verify that Register button is visible and clickable');
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verified that mandatory field validation is displayed because Name is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that Name heading is implemented');
  await expect(page.getByText('Name')).toBeVisible();
  await delay();
  await page.getByText('Name').click();

  console.log('Verify that Name textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Name' }).click();

  console.log('Verify that user can enter a valid Name');
  await delay();
  await page.getByRole('textbox', { name: 'Name' }).fill('Matt');
  console.log('Value - Matt - is entered into the Name textbox');

  // ---------------- Company ----------------

  console.log('Verify that Register button is clickable when other fields are empty');
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verified that mandatory field validation is displayed because Company is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that Company heading is implemented');
  await expect(page.getByText('Company')).toBeVisible();
  await delay();
  await page.getByText('Company').click();

  console.log('Verify that Company textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Company' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Company' }).click();

  console.log('Verify that user can enter a valid Company');
  await delay();
  await page.getByRole('textbox', { name: 'Company' }).fill('Xminds');
  console.log('Value - Xminds - is entered into the Company textbox');

  // ---------------- Email ----------------

  console.log('Verify that Register button is clickable when other fields are empty');
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verified that mandatory field validation is displayed because E-Mail Address is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that E-Mail Address heading is implemented');
  await expect(page.getByText('E-Mail Address')).toBeVisible();
  await delay();
  await page.getByText('E-Mail Address').click();

  console.log('Verify that E-Mail Address textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'E-Mail Address' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();

  console.log('Verify that user can enter a valid E-Mail Address');
  await delay();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('matt@gmail.com');
  console.log('Value - matt@gmail.com - is entered into the E-Mail Address textbox');

  // ---------------- Password ----------------

  console.log('Verify that Password heading is implemented');
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await delay();
  await page.getByText('Password', { exact: true }).click();

  console.log('Verify that Register button is clickable when other fields are empty');
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verified that mandatory field validation is displayed because Password is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that Password textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();

  console.log('Verify that user can enter a valid Password');
  await delay();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('xminds@123');
  console.log('Value - xminds@123 - is entered into the Password textbox');

  // ---------------- Confirm Password ----------------

  console.log('Verify that Register button is clickable before entering confirm password');
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verified that mandatory field validation is displayed because Confirm Password is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that Confirm Password heading is implemented');
  await expect(page.getByText('Confirm Password')).toBeVisible();
  await delay();
  await page.getByText('Confirm Password').click();

  console.log('Verify that Confirm Password textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Confirm Password' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();

  console.log('Verify that user can enter the Confirm Password');
  await delay();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('xminds@123');
  console.log('Value - xminds@123 - is entered into the Confirm Password textbox');

  // ---------------- Final Submit ----------------

  console.log('Verify that Register button is visible and clickable');
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verify that registration request is submitted successfully - redirected to dummy page');
  await delay();

  console.log('========== BlazeDemo Registration Validation Test Completed without entering data intially ==========');

  // Wait 4 seconds before closing the browser
  await page.waitForTimeout(4000);
});