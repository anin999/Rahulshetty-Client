import { Page, expect } from '@playwright/test';

export class FlipkartHomePage {
  constructor(private page: Page) {}

  private closeLoginButton = this.page.getByRole('button', { name: '✕' });

  private searchBox = this.page.getByRole('textbox', {
    name: 'Search for Products, Brands',
  });

  private searchSuggestion = (productName: string) =>
    this.page.getByRole('link', {
      name: productName.toLowerCase(),
      exact: true,
    });

  private async delay(ms = 2000) {
    await this.page.waitForTimeout(ms);
  }

  async navigate(url: string) {
    console.log('Verify that Flipkart website is successfully entered to open');

    await this.page.goto(url);
    await this.delay();

    console.log('Verify that Flipkart home page is successfully loaded');

    await expect(this.page).toHaveURL(/flipkart/);

    console.log(`Current URL : ${this.page.url()}`);
  }

  async closeLoginPopup() {
    console.log('Verify that login close button is visible');

    await expect(this.closeLoginButton).toBeVisible();

    console.log(
      'Verify that login pop up can be closed by clicking the close button'
    );

    await this.closeLoginButton.click();
    await this.delay();
  }

  async verifySearchBoxVisible() {
    console.log('Verify that Search textbox area is visible');

    await expect(this.searchBox).toBeVisible();
  }

  async searchProduct(productName: string) {
    console.log('Verify that user can click the search textbox to enter the data');

    await this.searchBox.click();
    await this.delay();

    console.log(
      `Verify that user can enter search data of iphone : ${productName}`
    );

    await this.searchBox.fill(productName);
    await this.delay();

    const enteredValue = await this.searchBox.inputValue();

    console.log(`Entered Value : ${enteredValue}`);

    await expect(this.searchBox).toHaveValue(productName);
  }

  async selectSearchSuggestion(productName: string) {
    console.log(
      'Verify that search suggestion for product entered is visible'
    );

    const suggestion = this.searchSuggestion(productName);

    await expect(suggestion).toBeVisible();

    console.log('Verify that user can click searched iphone');
    console.log(productName);

    await suggestion.click();
    await this.delay();
  }
}