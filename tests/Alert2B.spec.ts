import { test, expect } from '@playwright/test';

test.setTimeout(300000);

test('Verify JavaScript Confirm Alert - Cancel Button', async ({ page }) => {

    // Human Delay
    const delay = async (ms: number = 3000) => {
        await page.waitForTimeout(ms);
    };

    console.log('========== Test Started ==========');

    // Open URL
    console.log('Verify that URL is correctly opened');
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await delay();

    // Verify Heading
    const heading = page.getByRole('heading', { name: 'JavaScript Alerts' });

    await expect(heading).toBeVisible();
    console.log('Verify that - correct heading is visible');
    await delay();

    // Locate JS Confirm button
    const jsConfirmButton = page.getByRole('button', {
        name: 'Click for JS Confirm'
    });

    // Verify button is visible
    await expect(jsConfirmButton).toBeVisible();
    console.log('Verify that - JS Confirm button is visible');
    await delay();

    // Verify button is enabled
    await expect(jsConfirmButton).toBeEnabled();
    console.log('Verify that - Confirm button is clickable');
    await delay();


    

    // Handle Alert
    page.once('dialog', async dialog => {

        console.log('\n=== ALERT POPUP ===');

        console.log(`Alert Type     : ${dialog.type()}`);
        console.log(`Alert Message  : ${dialog.message()}`);
        console.log('OK Button      : Implemented');
        console.log('Cancel Button  : Implemented');
        await delay();

        console.log('Verify that user can click Cancel button');
        await dialog.dismiss();

        console.log('Verify that user clicks Cancel button');
    

    });
    console.log('Verify that user clicks - JS Confirm button');
    await jsConfirmButton.click();
    await delay();
  
    // Verify Result
    const result = page.locator('#result');

    await expect(result).toHaveText('You clicked: Cancel');
    console.log('Verify that results shows : You clicked: Cancel');
    await delay();

});