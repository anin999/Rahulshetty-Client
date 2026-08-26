import { test } from '@playwright/test';

import { FlipkartHomePage } from '../pages/FlipkartHomePage';
import { FlipkartSearchPage } from '../pages/FlipkartSearchPage';
import { FlipkartProductPage } from '../pages/FlipkartProductPage';

test.setTimeout(500000);

test('Flipkart - Search Apple iPhone 16 Plus', async ({ page }) => {

  console.log('==== Flipkart Search for iPhone Test Started =====');

  const flipkartHomePage = new FlipkartHomePage(page);
  const flipkartSearchPage = new FlipkartSearchPage(page);

  const searchValue = 'Apple iPhone 16 Plus (Black, 128 GB)';

  await flipkartHomePage.navigate('https://www.flipkart.com/');

  await flipkartHomePage.closeLoginPopup();

  await flipkartHomePage.verifySearchBoxVisible();

  await flipkartHomePage.searchProduct(searchValue);

  await flipkartHomePage.selectSearchSuggestion(
    'apple iphone 16 plus black 128 gb'
  );

  await flipkartSearchPage.verifySearchResultsPage();

  await flipkartSearchPage.verifyProductVisible();

  const productPage = await flipkartSearchPage.openProduct();

  const flipkartProductPage = new FlipkartProductPage(productPage);

  await flipkartProductPage.verifyProductPageLoaded();

  console.log(
    'Flipkart Search For iPhone is completed successfully'
  );
});