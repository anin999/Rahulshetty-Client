import { Page, expect } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';

export class AddToCartNegativePage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================
  // LOGIN LOCATORS
  // ============================================================

  private loginHeading = () =>
    this.page.getByRole('heading', {
      name: 'Log in'
    });

  private emailInput = () =>
    this.page.getByRole('textbox', {
      name: 'email@example.com'
    });

  private passwordInput = () =>
    this.page.getByRole('textbox', {
      name: 'enter your passsword'
    });

  private loginButton = () =>
    this.page.getByRole('button', {
      name: 'Login'
    });


  // ============================================================
  // PRODUCT LOCATORS
  // ============================================================

  private productCard = (productName: string) =>
    this.page
      .locator('.card')
      .filter({
        hasText: productName
      });

  private productName = (productName: string) =>
    this.productCard(productName)
      .getByText(productName, {
        exact: true
      });

  private addToCartButton = (productName: string) =>
    this.productCard(productName)
      .getByRole('button', {
        name: /Add To Cart/i
      });


  // ============================================================
  // CART LOCATORS
  // ============================================================

private cartButton = () =>
  this.page.locator('button[routerlink="/dashboard/cart"]');

  private cartProduct = (productName: string) =>
    this.page.getByRole('heading', {
      name: productName
    });

  private cartProductItems = (productName: string) =>
    this.page.getByRole('heading', {
      name: productName,
      exact: true
    });


  // ============================================================
  // NAVIGATION
  // ============================================================

  async navigateToLoginPage() {

    console.log(
      '\n[ACTION] Navigating to Login page'
    );

    const loginUrl =
      'https://rahulshettyacademy.com/client/#/auth/login';

    await this.page.goto(loginUrl, {
      waitUntil: 'domcontentloaded'
    });

    console.log(
      `[URL] Current URL: ${this.page.url()}`
    );

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Login page loaded'
    );
  }


  // ============================================================
  // LOGIN
  // ============================================================

  async verifyLoginHeading() {

    console.log(
      '[VALIDATION] Verifying Login heading'
    );

    await expect(
      this.loginHeading()
    ).toBeVisible();

    console.log(
      '[PASS] Login heading is visible'
    );

    await WaitUtils.delay(this.page);
  }


  async enterEmail(email: string) {

    console.log(
      `[ACTION] Entering email: ${email}`
    );

    await this.emailInput().fill(email);

    await WaitUtils.delay(this.page);
  }


  async enterPassword(password: string) {

    console.log(
      '[ACTION] Entering password'
    );

    await this.passwordInput().fill(password);

    await WaitUtils.delay(this.page);
  }


  async clickLogin() {

    console.log(
      '[CLICK] Login button'
    );

    await this.loginButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Login button clicked'
    );
  }


  async login(
    email: string,
    password: string
  ) {

    console.log(
      '\n========== LOGIN ==========\n'
    );

    await this.verifyLoginHeading();

    await this.enterEmail(email);

    await this.enterPassword(password);

    await this.clickLogin();

    console.log(
      '[PASS] User logged in successfully'
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // PRODUCT
  // ============================================================

  async verifyProduct(
    productName: string
  ) {

    console.log(
      `[VALIDATION] Verifying product: ${productName}`
    );

    await expect(
      this.productName(productName)
    ).toBeVisible();

    console.log(
      `[PASS] Product visible: ${productName}`
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // ADD TO CART MULTIPLE TIMES
  // ============================================================

  async clickAddToCartMultipleTimes(
    productName: string,
    numberOfClicks: number
  ) {

    console.log(
      `[ACTION] Clicking Add To Cart ${numberOfClicks} times for "${productName}"`
    );

    for (let i = 1; i <= numberOfClicks; i++) {

      console.log(
        `[CLICK ${i}] Add "${productName}" to cart`
      );

      await this.addToCartButton(productName).click();

      await WaitUtils.delay(this.page);

      console.log(
        `[PASS] Add To Cart click ${i} completed`
      );
    }
  }


  // ============================================================
  // OPEN CART
  // ============================================================

  async openCart() {

    console.log(
      '\n[CLICK] Cart button'
    );

    await this.cartButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Cart page opened'
    );
  }


  // ============================================================
  // VERIFY ONLY ONE PRODUCT IS ADDED
  // ============================================================

  async verifyProductAddedOnlyOnce(
    productName: string
  ) {

    console.log(
      `[VALIDATION] Checking "${productName}" is added only once`
    );

    await expect(
      this.cartProduct(productName)
    ).toBeVisible();

    const productCount =
      await this.cartProductItems(productName).count();

    console.log(
      `[VALIDATION] "${productName}" count in cart: ${productCount}`
    );

    expect(productCount).toBe(1);

    console.log(
      `[PASS] "${productName}" is added only once`
    );

    await WaitUtils.delay(this.page);
  }

}