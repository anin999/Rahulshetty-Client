import { test, expect } from '@playwright/test';

test.setTimeout(300000);

test('Verify JavaScript Prompt - Cancel Button', async ({ page }) => {

  // Human Delay
  const delay = async (ms: number = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log("TEST STARTED");

  // Open URL
  console.log("Verify that URL is correctly opened");
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  await delay();

  // Verify Heading
  const heading = page.getByRole('heading', { name: 'JavaScript Alerts' });

  await expect(heading).toBeVisible();
  console.log("Verift that - Heading: JavaScript Alerts is visible");
  await delay();

  // Verify JS Prompt Button
  const jsPromptButton = page.getByRole('button', {
    name: 'Click for JS Prompt'
  });

  await expect(jsPromptButton).toBeVisible();
  console.log("Verify that - JS Prompt Button is Visible");
  await delay();

  await expect(jsPromptButton).toBeEnabled();
  console.log("Verify that - JS Prompt Button is Clickable");
  await delay();

  // Handle Prompt
  page.once('dialog', async (dialog) => {

    console.log("Verify that - JS PROMPT OPENED is opened");

    console.log(`Popup Type    : ${dialog.type()}`);
    console.log(`Popup Message : ${dialog.message()}`);

    expect(dialog.message()).toBe("I am a JS prompt");
    console.log("Verify that Popup heading message is populated correctly");

    await page.waitForTimeout(3000);

    console.log("Verify that - user  - clicked : Cancel");

    // Click Cancel
    await dialog.dismiss();

    console.log("Verify that - js prompt is closed");
  });

  // Click Prompt Button
  console.log("Verify that 'Click for JS Prompt' is clicked");
  await jsPromptButton.click();

  await delay();

  // Verify Result
  const result = page.locator('#result');

  await expect(result).toHaveText('You entered: null');

  console.log("Verify that is verified");
  console.log(`Result Text : ${await result.textContent()}`);
  await delay();
});