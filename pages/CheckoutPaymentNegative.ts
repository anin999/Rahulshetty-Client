import { Page, expect } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';

export class CheckoutPaymentNegative {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================
  // LOGIN LOCATORS
  // ============================================================

  private loginHeading = () =>
    this.page.getByRole('heading', { name: 'Log in' });

  private emailInput = () =>
    this.page.getByRole('textbox', {
      name: 'email@example.com'
    });

  private passwordInput = () =>
    this.page.getByRole('textbox', {
      name: 'enter your passsword'
    });

  private loginButton = () =>
    this.page.getByRole('button', { name: 'Login' });


  // ============================================================
  // PRODUCT LOCATORS
  // ============================================================

  private addToCartButton = (productName: string) =>
    this.page
      .locator('.card')
      .filter({ hasText: productName })
      .getByRole('button', { name: /Add To Cart/i });


  // ============================================================
  // CART LOCATORS
  // ============================================================

  private cartButton = () =>
    this.page.getByRole('button', { name: '   Cart' });

  private cartProduct = (productName: string) =>
    this.page.getByRole('heading', { name: productName });

  private checkoutButton = () =>
    this.page.getByRole('button', { name: /Checkout/i });


  // ============================================================
  // CHECKOUT LOCATORS
  // ============================================================

  private placeOrderButton = () =>
    this.page.getByText('Place Order', { exact: true });

  private validationMessages = () =>
    this.page.locator('.invalid-feedback');


  // ============================================================
  // NAVIGATION
  // ============================================================

  async navigateToLoginPage() {

    console.log('\n[ACTION] Navigating to Login page');

    const loginUrl =
      'https://rahulshettyacademy.com/client/#/auth/login';

    console.log(`[URL] ${loginUrl}`);

    await this.page.goto(loginUrl, {
      waitUntil: 'domcontentloaded'
    });

    console.log(`[URL] Current URL: ${this.page.url()}`);

    await WaitUtils.delay(this.page);

    console.log('[PASS] Login page loaded');
  }


  // ============================================================
  // LOGIN
  // ============================================================

  async verifyLoginHeading() {

    console.log('[HEADING] Verifying "Log in" heading');

    await expect(
      this.loginHeading()
    ).toBeVisible();

    console.log('[PASS] "Log in" heading is visible');

    await WaitUtils.delay(this.page);
  }


  async enterEmail(email: string) {

    console.log(`[ACTION] Entering email: ${email}`);

    await this.emailInput().fill(email);

    await WaitUtils.delay(this.page);
  }


  async enterPassword(password: string) {

    console.log('[ACTION] Entering password');

    await this.passwordInput().fill(password);

    await WaitUtils.delay(this.page);
  }


  async clickLogin() {

    console.log('[CLICK] Login button');

    await this.loginButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Login button clicked');
  }


  async login(email: string, password: string) {

    console.log('\n========== LOGIN ==========\n');

    await this.verifyLoginHeading();

    await this.enterEmail(email);

    await this.enterPassword(password);

    await this.clickLogin();

    console.log('[PASS] User logged in successfully');

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // PRODUCT
  // ============================================================

  async verifyProduct(productName: string) {

    console.log(
      `[VALIDATION] Verifying product: ${productName}`
    );

    const product =
      this.page.getByText(productName).first();

    await expect(product).toBeVisible();

    console.log(
      `[PASS] Product visible: ${productName}`
    );

    await WaitUtils.delay(this.page);
  }


  async addProductToCart(productName: string) {

    console.log(
      `[CLICK] Add "${productName}" to cart`
    );

    await this.addToCartButton(productName).click();

    await WaitUtils.delay(this.page);

    console.log(
      `[PASS] "${productName}" added to cart`
    );
  }


  // ============================================================
  // CART
  // ============================================================

  async openCart() {

    console.log('\n[CLICK] Cart button');

    await this.cartButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Cart page opened');
  }


  async verifyProductInCart(productName: string) {

    console.log(
      `[VALIDATION] Verifying "${productName}" in cart`
    );

    await expect(
      this.cartProduct(productName)
    ).toBeVisible();

    console.log(
      `[PASS] "${productName}" is present in cart`
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // CHECKOUT
  // ============================================================

  async clickCheckout() {

    console.log('[CLICK] Checkout button');

    await this.checkoutButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Checkout page opened');
  }


  // ============================================================
  // NEGATIVE PAYMENT TEST
  // ============================================================

  async clickPlaceOrderWithoutPaymentDetails() {

    console.log(
      '[ACTION] Leaving all payment details empty'
    );

    console.log(
      '[ACTION] Expiry, CVV, card name and country are not entered'
    );

    console.log('[CLICK] PLACE ORDER button');

    await this.placeOrderButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] PLACE ORDER clicked with empty payment details'
    );
  }


}