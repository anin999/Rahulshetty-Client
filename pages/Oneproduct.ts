import { Page, expect, Download } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';
import fs from 'fs';
import path from 'path';

export class CheckoutPage {

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

  private productCard = (productName: string) =>
    this.page
      .locator('.card')
      .filter({ hasText: productName });

  private viewProductButton = (productName: string) =>
    this.productCard(productName)
      .getByRole('button', { name: /View/i });

  private addToCartButton = (productName: string) =>
    this.productCard(productName)
      .getByRole('button', { name: /Add To Cart/i });

  // Product detail page
  private productDetailHeading = (productName: string) =>
    this.page.getByRole('heading', {
      name: productName
    });

  private detailAddToCartButton = () =>
    this.page.getByRole('button', {
      name: /Add To Cart/i
    });


  // ============================================================
  // CART LOCATORS
  // ============================================================

  private cartButton = () =>
    this.page.getByRole('button', {
      name: '   Cart'
    });

  private cartProduct = (productName: string) =>
    this.page.getByRole('heading', {
      name: productName
    });

  private checkoutButton = () =>
    this.page.getByRole('button', {
      name: /Checkout/i
    });


  // ============================================================
  // CHECKOUT LOCATORS
  // ============================================================

  private expiryMonth = () =>
    this.page.getByRole('combobox').first();

  private expiryYear = () =>
    this.page.getByRole('combobox').nth(1);

  private cvvInput = () =>
    this.page.getByRole('textbox').nth(1);

  private nameOnCardInput = () =>
    this.page.getByRole('textbox').nth(2);

  private countryInput = () =>
    this.page.getByRole('textbox', {
      name: 'Select Country'
    });

  private placeOrderButton = () =>
    this.page.getByText('Place Order', {
      exact: true
    });


  // ============================================================
  // ORDER CONFIRMATION
  // ============================================================

  private orderConfirmationHeading = () =>
    this.page.getByText(
      'Thankyou for the order.',
      { exact: false }
    );


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

    console.log(
      `[URL] Current URL: ${this.page.url()}`
    );

    await WaitUtils.delay(this.page);

    console.log('[PASS] Login page loaded');
  }


  // ============================================================
  // LOGIN
  // ============================================================

  async verifyLoginHeading() {

    console.log(
      '[HEADING] Verifying "Log in" heading'
    );

    await expect(
      this.loginHeading()
    ).toBeVisible();

    console.log(
      '[PASS] "Log in" heading is visible'
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

    const product =
      this.page.getByText(productName).first();

    await expect(product).toBeVisible();

    console.log(
      `[PASS] Product visible: ${productName}`
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // VIEW PRODUCT
  // ============================================================

  async clickViewProduct(
    productName: string
  ) {

    console.log(
      `[CLICK] View "${productName}"`
    );

    await this.viewProductButton(
      productName
    ).click();

    await WaitUtils.delay(this.page);

    console.log(
      `[PASS] "${productName}" product details opened`
    );
  }


  async verifyProductDetails(
    productName: string
  ) {

    console.log(
      `[VALIDATION] Verifying product details: ${productName}`
    );

    await expect(
      this.productDetailHeading(productName)
    ).toBeVisible();

    console.log(
      `[PASS] Product details displayed: ${productName}`
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // ADD PRODUCT FROM DETAIL PAGE
  // ============================================================

  async addProductToCartFromDetails(
    productName: string
  ) {

    console.log(
      `[CLICK] Add "${productName}" to cart from details page`
    );

    await this.detailAddToCartButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      `[PASS] "${productName}" added to cart from details page`
    );
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
  // VALIDATE CART
  // ============================================================

  async verifyProductInCart(
    productName: string
  ) {

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

    console.log(
      '[CLICK] Checkout button'
    );

    await this.checkoutButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Checkout page opened'
    );
  }


  // ============================================================
  // PAYMENT DETAILS
  // ============================================================

  async enterExpiryDate(
    month: string,
    year: string
  ) {

    console.log(
      `[ACTION] Selecting expiry date: ${month}/${year}`
    );

    await this.expiryMonth().selectOption(month);

    await WaitUtils.delay(this.page);

    await this.expiryYear().selectOption(year);

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Expiry date entered'
    );
  }


  async enterCVV(
    cvv: string
  ) {

    console.log(
      '[ACTION] Entering CVV'
    );

    await this.cvvInput().fill(cvv);

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] CVV entered'
    );
  }


  async enterNameOnCard(
    name: string
  ) {

    console.log(
      `[ACTION] Entering name on card: ${name}`
    );

    await this.nameOnCardInput().fill(name);

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Name on card entered'
    );
  }


  // ============================================================
  // SHIPPING INFORMATION
  // ============================================================

  async selectCountry(
    countryPrefix: string
  ) {

    console.log(
      `[ACTION] Selecting country using prefix: ${countryPrefix}`
    );

    console.log(
      '[CLICK] Select Country field'
    );

    await this.countryInput().click();

    await WaitUtils.delay(this.page);

    console.log(
      `[TYPE] Typing country prefix: ${countryPrefix}`
    );

    await this.countryInput().pressSequentially(
      countryPrefix,
      { delay: 150 }
    );

    await WaitUtils.delay(this.page);

    console.log(
      '[VALIDATION] Waiting for Australia suggestion'
    );

    const countrySuggestion =
      this.page.getByRole('button', {
        name: /Australia/i
      }).first();

    await expect(
      countrySuggestion
    ).toBeVisible({
      timeout: 10000
    });

    console.log(
      '[CLICK] Australia country suggestion'
    );

    await countrySuggestion.click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Australia selected successfully'
    );
  }


  // ============================================================
  // PLACE ORDER
  // ============================================================

  async clickPlaceOrder() {

    console.log(
      '[CLICK] PLACE ORDER button'
    );

    await this.placeOrderButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] PLACE ORDER clicked'
    );
  }


  // ============================================================
  // VERIFY ORDER COMPLETED
  // ============================================================

  async verifyOrderCompleted() {

    console.log(
      '[VALIDATION] Verifying order confirmation'
    );

    await expect(
      this.orderConfirmationHeading()
    ).toBeVisible();

    console.log(
      '[PASS] Order placed successfully'
    );

    await WaitUtils.delay(this.page);
  }

}