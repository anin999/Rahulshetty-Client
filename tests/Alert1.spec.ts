import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Verify JavaScript Alert functionality', async ({ page }) => {

  // Human Delay
  const delay = async (ms: number = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log('========== Test Started ==========');

  // Open URL
  console.log('Verify that URL is correctly opened');
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  await delay();

  // Verify page heading
  const heading = page.getByRole('heading', { name: 'JavaScript Alerts' });
  console.log('Verify that user can see the heading - JavaScript Alerts');
  await expect(heading).toBeVisible();
  console.log('Verify that heading is correctly implemented');
  await delay();

  // Locate JS Alert button
  const jsAlertButton = page.getByRole('button', {
    name: 'Click for JS Alert'
  });

  console.log('Verify that button - Click for JS alert is implemented');
  await expect(jsAlertButton).toBeVisible();
  console.log('Verify that button - Click for JS alert button is visble');
  await delay();

  console.log('Verify that button - Click for JS alert button is enabled');
  await expect(jsAlertButton).toBeEnabled();
  console.log('Verify that button - Click for JS alert button is clickable');
  await delay();

  // Result element
  const result = page.locator('#result');

  console.log('Verify that result menu is implemented');
  await expect(result).toHaveText('');
  console.log('Verify that intially the data is empty for result');
  await delay();

  // Handle alert
  page.on('dialog', async dialog => {
    console.log('Verify that alert opens when button is clicked');
    console.log(`Alert Type 1  : ${dialog.type()}`);
    console.log(`Alert Message : ${dialog.message()}`);

    await delay();

    console.log('Verify that user can click OK to close the pop up');
    await dialog.accept();

    console.log('Verify that input is accepted');
    await delay();
  });

  // Click JS Alert button
  console.log('Verify that user can click the pop up button and it closes');
  await jsAlertButton.click();
  console.log('Verify that user click the OK button');
  await delay();

  // Verify success message
  console.log('Verify that result details menu is implemented');
  await expect(result).toHaveText(
    'You successfully clicked an alert'
  );

  console.log('Verifiy that success message is populated as expected');
  console.log(`Displayed Result: "${await result.textContent()}"`);
  await delay();

  console.log('Test Completed Successfully for Alert 1');

});