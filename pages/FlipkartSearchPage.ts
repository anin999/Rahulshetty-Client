import { Page, expect } from '@playwright/test';

export class FlipkartSearchPage {
  constructor(private page: Page) {}

  private product = this.page.getByRole('link', {
    name: 'Apple iPhone 16 Plus (Black, 128 GB) Add to Compare Apple iPhone 16 Plus (Black',
  });

  private async delay(ms = 2000) {
    await this.page.waitForTimeout(ms);
  }

  async verifySearchResultsPage() {
    console.log('Verify that Search Results page is loaded');

    await expect(this.page).toHaveURL(/search/);
  }

  async verifyProductVisible() {
    console.log('Verify that product iphone is visible');

    await expect(this.product).toBeVisible();
  }

  async openProduct() {
    console.log('Verify that user can click the product - iphone');

    const productPagePromise = this.page.waitForEvent('popup');

    await this.product.click();

    const productPage = await productPagePromise;

    console.log('Verify that product is opened in new tab');

    await productPage.waitForLoadState();

    await this.delay();

    return productPage;
  }
}