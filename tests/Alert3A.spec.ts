import { test, expect} from '@playwright/test';

test.setTimeout(300000);

test('Verify JavaScript Prompt Alert', async ({ page }) => {

  // Human Delay Function
  const delay = async (ms: number = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log("========== Test Started  ==========");

  // Open URL
  console.log("Verify that URL is correctly opened");
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  await delay();

  // Verify page heading
  const heading = page.getByRole('heading', { name: 'JavaScript Alerts' });

  await expect(heading).toBeVisible();
  console.log("Verify that heading - JavaScript Alerts - is visible");
  await delay();

  // Verify JS Prompt button
  const jsPromptButton = page.getByRole('button', {
    name: 'Click for JS Prompt'
  });

  await expect(jsPromptButton).toBeVisible();
  console.log("Verify that - 'Click for JS Prompt' button is visible.");
  await delay();

  await expect(jsPromptButton).toBeEnabled();
  console.log("Verify that 'Click for JS Prompt' button is enabled and clickable.");
  await delay();

  // Handle JavaScript Prompt
  page.once('dialog', async (dialog) => {

    console.log("JS PROMPT OPENED");
    console.log(`Popup Type       : ${dialog.type()}`);
    console.log(`Popup Message    : ${dialog.message()}`);

    // Verify popup message
    expect(dialog.message()).toBe("I am a JS prompt");
    console.log("Verify that - Popup text: I am a JS prompt is populated");
    await page.waitForTimeout(3000);

    const inputValue = "test123";
    console.log(`Entering Value in prompt: ${inputValue}`);

    // Enter value and click OK
    await dialog.accept(inputValue);

    console.log("Verify that user clicked OK and prompt closed");
  });

  // Click JS Prompt button
  console.log("Verify that - 'Click for JS Prompt' button is clicked");
  await delay();
  await jsPromptButton.click();

  // Wait for result
  await delay();

  // Verify result
  const result = page.locator('#result');

  await expect(result).toHaveText('You entered: test123');

  console.log("Verify that - result is correctly displayed");
  console.log(`Result Text      : ${await result.textContent()}`);
  await delay();

});