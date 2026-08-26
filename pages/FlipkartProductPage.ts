import { Page, expect } from '@playwright/test';

export class FlipkartProductPage {
  constructor(private page: Page) {}

  private async delay(ms = 2000) {
    await this.page.waitForTimeout(ms);
  }

  async verifyProductPageLoaded() {
    console.log(`Page Title : ${await this.page.title()}`);

    console.log('Verify that product page loaded successfully');

    await expect(this.page).toHaveURL(/flipkart/);

    await this.delay(5000);
  }
}