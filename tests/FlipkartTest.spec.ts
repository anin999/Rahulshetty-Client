import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Flipkart - Search iPhone and Add to Compare', async ({ page }) => {

  const delay = async (ms = 2000) => {
    await page.waitForTimeout(ms);
  };

  console.log('==== Add to Compare button click  ===== ');

  console.log('Verify that flipkart URL is corectly loaded and opened');
  await page.goto('https://www.flipkart.com/');
  await page.waitForLoadState('domcontentloaded');
  await delay();


  const closeButton = page.getByRole('button', { name: '✕' });

  if (await closeButton.isVisible().catch(() => false)) {
    console.log('Verify that login page is popualed with close button');
    await closeButton.click();
    console.log('Verify that login page is closed');
    await delay();
  } else {
    console.log('Login popup not displayed.');
  }


  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands'
  });

  console.log('Verify that search box field is visible ');
  await expect(searchBox).toBeVisible();

  console.log('Verify that user can click the - search box field');
  await searchBox.click();

  const productName = 'Apple iPhone 16 Plus (Black, 128 GB)';

  console.log(`Entering Product Name : ${productName}`);
  await searchBox.fill(productName);
  await delay();

 
  const suggestion = page.getByRole('link', {
    name: 'apple iphone 16 plus black 128 gb',
    exact: true
  });

  console.log('Verify that user can see the product suggestions listed');
  await expect(suggestion).toBeVisible();

  console.log('Verify that user can click the iphone product from list');
  await suggestion.click();

  await delay(3000);

//  console.log('Search Results URL:');
//  console.log(await page.url());

  
  const compareLabel = page.locator('label').filter({
    hasText: 'Add to Compare'
  }).first();

  console.log('Verify that user can see the - Add to compare button');

  await expect(compareLabel).toBeVisible({ timeout: 15000 });

  console.log('Verify that Add to Compare button is implemeted and is clickable');

  await compareLabel.scrollIntoViewIfNeeded();

  console.log('Verify that user can click the add to compare button and respective selection is done');

  await compareLabel.click();

  console.log('Verify that - user has successfully clicked - Add to Compare button');

  await delay();
  await page.waitForTimeout(5000);
  console.log('==== Add to compare button clicked successfully =====');
  

});