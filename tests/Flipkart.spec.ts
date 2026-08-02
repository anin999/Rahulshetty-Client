import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('Flipkart - Search Apple iPhone 16 Plus', async ({ page }) => {

  const delay = async (ms = 2000) => {
    await page.waitForTimeout(ms);
  };

  console.log('==== Flipkart Search for iPhone Test Started =====');

  console.log('Verify that - Flipkart website is successfully entered to open');
  await page.goto('https://www.flipkart.com/');
  await delay();

  console.log('Verify that Flipkart home page is successfully loaded');
  await expect(page).toHaveURL(/flipkart/);
  console.log(`Current URL : ${page.url()}`);

  console.log('Verify that login close button is visible');
  await expect(page.getByRole('button', { name: '✕' })).toBeVisible();

  console.log('Verify that login pop up can be closed by clicking the close button ');
  await page.getByRole('button', { name: '✕' }).click();
  await delay();

  console.log('Verify that Search textbox area is visible');
  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands'
  });
  await expect(searchBox).toBeVisible();

  console.log('Verify that user can click the search textbox to enter the data');
  await searchBox.click();
  await delay();

  const searchValue = 'Apple iPhone 16 Plus (Black, 128 GB)';

  console.log(`Verify that user can enter search data of iphone : ${searchValue}`);
  await searchBox.fill(searchValue);
  await delay();

  const enteredValue = await searchBox.inputValue();
  console.log(`Entered Value : ${enteredValue}`);

  console.log('Verify that search suggestion for product entered is visible');
  const suggestion = page.getByRole('link', {
    name: 'apple iphone 16 plus black 128 gb',
    exact: true
  });

  await expect(suggestion).toBeVisible();

  console.log('Verify that user can click searched iphone');
  console.log('apple iphone 16 plus black 128 gb');
  await suggestion.click();
  await delay();

  console.log('Verify that Search Results page is loaded');
  await expect(page).toHaveURL(/search/);
//  console.log(`Current URL : ${page.url()}`);

  const product = page.getByRole('link', {
    name: 'Apple iPhone 16 Plus (Black, 128 GB) Add to Compare Apple iPhone 16 Plus (Black'
  });

  console.log('Verify that product iphone is visible');
  await expect(product).toBeVisible();

//  const productText = await product.textContent();
 // console.log(`Product Visible : ${productText?.trim()}`);

  console.log('Verify that user can click the product - iphone');
  const page1Promise = page.waitForEvent('popup');
  await product.click();

  const page1 = await page1Promise;

  console.log('Verify that product is opened in new tab');
  await page1.waitForLoadState();

    console.log(`Page Title : ${await page1.title()}`);
 // console.log(`Product URL : ${page1.url()}`);

  console.log('Verify that product page loaded successfully');
  await expect(page1).toHaveURL(/flipkart/);
  await page.waitForTimeout(5000);

  console.log('==== Flipkart Search For iPhone is completed successfully =====');
});