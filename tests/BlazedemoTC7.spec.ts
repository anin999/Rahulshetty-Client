import { test, expect } from '@playwright/test';

test.setTimeout(5000_0000);

test('BlazeDemo Login Validation with Logs', async ({ page }) => {

  const delay = async (ms = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log('========== BlazeDemo Login Validation - Test Case ==========');

  console.log('Opening BlazeDemo website');
  await page.goto('https://blazedemo.com/');
  await delay();

  console.log('Verify that Home button is implemented and clickable');
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'home' }).click();

  console.log('Verify that Login page is implemented and Login heading is visible');
  await expect(page.locator('div').filter({ hasText: /^Login$/ })).toBeVisible();
  await delay();
  await page.locator('div').filter({ hasText: /^Login$/ }).click();

  console.log('Verify that E-Mail Address heading is implemented');
  await expect(page.getByText('E-Mail Address')).toBeVisible();
  await delay();
  await page.getByText('E-Mail Address').click();

  console.log('Verify that Login button is implemeted and is clickable before entering email address');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await delay();
  await page.getByRole('button', { name: 'Login' }).click();

  console.log('Verified that mandatory field validation is displayed because E-Mail Address is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that E-Mail Address textbox is implemented to add valid data');
  await expect(page.getByRole('textbox', { name: 'E-Mail Address' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();

  console.log('Verify that user can enter a valid E-Mail Address');
  await delay();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('aninfletcherj@gmail.com');
  console.log('Value - aninfletcherj@gmail.com - is entered into the E-Mail Address textbox');

  console.log('Verify that Login button is visible and clickable even before password is entered');
  await delay();
  await page.getByRole('button', { name: 'Login' }).click();

  console.log('Verified that mandatory field validation is displayed because Password is not entered');
  console.log('Validation Message: "Please fill out this field."');
  await delay();

  console.log('Verify that Password heading is implemented');
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await delay();
  await page.getByText('Password', { exact: true }).click();

  console.log('Verify that Password textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'Password' }).click();

  console.log('Verify that user can enter a valid Password');
  await delay();
  await page.getByRole('textbox', { name: 'Password' }).fill('test@123');
  console.log('Value - test@123 - is entered into the Password textbox');

  console.log('Verify that Remember Me checkbox is implemented and is clickable');
  await expect(page.getByText('Remember Me')).toBeVisible();
  await delay();
  await page.getByText('Remember Me').click();

  console.log('Verify that Login button is visible and clickable to submit after giving all valid data');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await delay();
  await page.getByRole('button', { name: 'Login' }).click();

  console.log('Verify that login request is submitted successfully');
  await delay();

  console.log('========== BlazeDemo Login Validation Test without entering data intially is completed ==========');

  // Wait 4 seconds before closing the browser
  await page.waitForTimeout(4000);
});