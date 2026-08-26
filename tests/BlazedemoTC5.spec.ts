import { test, expect } from '@playwright/test';

test.setTimeout(5000_0000);

test('BlazeDemo Forgot Password with Logs', async ({ page }) => {

  const delay = async (ms = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log('========== BlazeDemo Forgot Password - Test Case ==========');

  console.log('Opening BlazeDemo website');
  await page.goto('https://blazedemo.com/');
  await delay();

  console.log('Verify that Home button is implemeted and is clickable');
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'home' }).click();

  console.log('Verify that Forgot Your Password - button is implemented and is clickable');
  await expect(page.getByRole('link', { name: 'Forgot Your Password?' })).toBeVisible();
  await delay();
  await page.getByRole('link', { name: 'Forgot Your Password?' }).click();

  console.log('Verify that Reset Password heading is implemented');
  await expect(page.getByText('Reset Password')).toBeVisible();
  await delay();
  await page.getByText('Reset Password').click();

  console.log('Verify that E-Mail Address heading is implemented');
  await expect(page.getByText('E-Mail Address')).toBeVisible();
  await delay();
  await page.getByText('E-Mail Address').click();

  console.log('Verify that E-Mail Address textbox is implemented');
  await expect(page.getByRole('textbox', { name: 'E-Mail Address' })).toBeVisible();
  await delay();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();

  console.log('Verify that user can enter a valid email address');
  await delay();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('aninfletcherj@gmail.com');

  console.log('Value - aninfletcherj@gmail.com - is entered into the E-Mail Address textbox');

  console.log('Verify that Send Password Reset Link button is implemented and clickable');
  await expect(page.getByRole('button', { name: 'Send Password Reset Link' })).toBeVisible();
  await delay();
  await page.getByRole('button', { name: 'Send Password Reset Link' }).click();

  console.log('Verify that password reset request is submitted successfully - but here the user is redirected a dummy page');
  await delay();

  console.log('========== BlazeDemo Forgot Password Test Completed ==========');

  // Wait 4 seconds before closing the browser
  await page.waitForTimeout(4000);
});