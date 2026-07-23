import { test, expect } from '@playwright/test';

test.setTimeout(3000_0000);

test('BlazeDemo Register with Logs', async ({ page }) => {

  const delay = async (ms = 3500) => {
    await page.waitForTimeout(ms);
  };

  console.log('========== BlazeDemo Registration Page - Test Case ==========');

  console.log('Opening BlazeDemo website');
  await page.goto('https://blazedemo.com/');
  await delay();

  console.log('Verify that Home button is implemented and clickable');
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'home' }).click();

  console.log('Verify that Register link is visible and is clickable');
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'Register' }).click();

  console.log('Verify that Register page is implemented and Register heading is visible');
  await expect(page.locator('div').filter({ hasText: /^Register$/ })).toBeVisible();
  await delay();
  await page.locator('div').filter({ hasText: /^Register$/ }).click();

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
  await page.getByRole('textbox', { name: 'Name' }).fill('Sam Mathew');
  console.log('Value - Sam Mathew - is entered into the Name textbox');

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
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('sam@gmail.com');
  console.log('Value - sam@gmail.com - is entered into the E-Mail Address textbox');

  console.log('Verify that Password heading is implemented');
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await delay();
  await page.getByText('Password', { exact: true }).click();

  console.log('Verify that Password textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();

  console.log('Verify that user can enter a valid Password');
  await delay();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Xminds@123');
  console.log('Value - Xminds@123 - is entered into the Password textbox');

  console.log('Verify that Confirm Password heading is implemented');
  await expect(page.getByText('Confirm Password')).toBeVisible();
  await delay();
  await page.getByText('Confirm Password').click();

  console.log('Verify that Confirm Password textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Confirm Password' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();

  console.log('Verify that user can enter the same Password in Confirm Password');
  await delay();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Xminds@123');
  console.log('Value - Xminds@123 - is entered into the Confirm Password textbox');

  console.log('Verify that Register button is implemented and clickable');
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await delay();
  await page.getByRole('button', { name: 'Register' }).click();

  console.log('Verify that registration is submitted successfully - but there the dummy page is populated');
  await delay();

  console.log('========== BlazeDemo Registration Test Completed ==========');

  // Wait 4 seconds before closing the browser
  await page.waitForTimeout(4000);
});