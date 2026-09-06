import { Page, expect } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';

export class ContinueShoppingPage {

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
    this.page.getByRole('button', {
      name: 'Login'
    });


  // ============================================================
  // PRODUCT LOCATORS
  // ============================================================

  private productCard = (productName: string) =>
    this.page
      .locator('.card')
      .filter({ hasText: productName });

  private addToCartButton = (productName: string) =>
    this.productCard(productName)
      .getByRole('button', {
        name: /Add To Cart/i
      });


  // ============================================================
  // CART LOCATORS
  // ============================================================

  private cartButton = () =>
    this.page.locator(
      'button[routerlink="/dashboard/cart"]'
    );

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

  private cvvInput = () =>
    this.page.getByRole('textbox').nth(1);

  private nameOnCardInput = () =>
    this.page.getByRole('textbox').nth(2);

  private expiryYear = () =>
    this.page.getByRole('combobox').nth(1);

  private countryInput = () =>
    this.page.getByRole('textbox', {
      name: 'Select Country'
    });

  private countrySuggestion = () =>
    this.page.getByRole('button', {
      name: ' Australia'
    });

  private placeOrderButton = () =>
    this.page.getByText('Place Order', {
      exact: true
    });


  // ============================================================
  // ORDER CONFIRMATION LOCATORS
  // ============================================================

  private homeButton = () =>
    this.page.getByRole('button', {
      name: ' HOME'
    });


  // ============================================================
  // CONTINUE SHOPPING LOCATORS
  // ============================================================

  private continueShoppingButton = () =>
    this.page.getByRole('button', {
      name: 'Continue Shopping❯'
    });


  // ============================================================
  // NAVIGATION
  // ============================================================

  async navigateToLoginPage() {

    console.log('\n========== NAVIGATION ==========\n');

    const loginUrl =
      'https://rahulshettyacademy.com/client/#/auth/login';

    console.log(`[ACTION] Navigating to Login page`);
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
  // ADD PRODUCTS
  // ============================================================

  async verifyProduct(productName: string) {

    console.log(
      `[HEADING] Verifying product: ${productName}`
    );

    const product = this.page.getByText(productName).first();

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


  async addFirstThreeProducts() {

    console.log(
      '\n========== ADD FIRST 3 PRODUCTS ==========\n'
    );

    const products = [
      'ADIDAS ORIGINAL',
      'ZARA COAT',
      'iphone 13 pro'
    ];

    for (const product of products) {

      await this.verifyProduct(product);

      await this.addProductToCart(product);
    }

    console.log(
      '[PASS] First 3 products added successfully'
    );
  }


  // ============================================================
  // OPEN CART
  // ============================================================

  async openCart() {

    console.log('\n[CLICK] Cart button');

    await this.cartButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Cart page opened');
  }


  // ============================================================
  // CART VALIDATION
  // ============================================================

  async verifyProductInCart(productName: string) {

    console.log(
      `[HEADING] Verifying "${productName}" in cart`
    );

    await expect(
      this.cartProduct(productName)
    ).toBeVisible();

    console.log(
      `[PASS] "${productName}" is present in cart`
    );

    await WaitUtils.delay(this.page);
  }


  async verifyAllProductsInCart(products: string[]) {

    console.log(
      '\n========== CART VALIDATION ==========\n'
    );

    for (const product of products) {

      await this.verifyProductInCart(product);
    }

    console.log(
      `[PASS] All ${products.length} products are present in cart`
    );
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
  // PAYMENT DETAILS
  // ============================================================

  async enterCVV(cvv: string) {

    console.log('[ACTION] Entering CVV');

    await this.cvvInput().fill(cvv);

    await WaitUtils.delay(this.page);

    console.log('[PASS] CVV entered');
  }


  async enterExpiryYear(year: string) {

    console.log(
      `[ACTION] Selecting expiry year: ${year}`
    );

    await this.expiryYear().selectOption(year);

    await WaitUtils.delay(this.page);

    console.log('[PASS] Expiry year entered');
  }


  async enterNameOnCard(name: string) {

    console.log(
      `[ACTION] Entering name on card: ${name}`
    );

    await this.nameOnCardInput().fill(name);

    await WaitUtils.delay(this.page);

    console.log('[PASS] Name on card entered');
  }


  // ============================================================
  // SHIPPING INFORMATION
  // ============================================================

  async selectCountry(countryPrefix: string) {

    console.log(
      `[ACTION] Selecting country using prefix: ${countryPrefix}`
    );

    const countryInput = this.countryInput();

    console.log('[CLICK] Select Country field');

    await countryInput.click();

    await WaitUtils.delay(this.page);

    console.log(
      `[TYPE] Typing country prefix: ${countryPrefix}`
    );

    await countryInput.pressSequentially(
      countryPrefix,
      { delay: 150 }
    );

    await WaitUtils.delay(this.page);

    console.log(
      '[HEADING] Verifying Australia country suggestion'
    );

    await expect(
      this.countrySuggestion()
    ).toBeVisible({
      timeout: 10000
    });

    console.log('[CLICK] Australia country suggestion');

    await this.countrySuggestion().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Australia selected successfully'
    );
  }


  // ============================================================
  // PLACE ORDER
  // ============================================================

  async clickPlaceOrder() {

    console.log('[CLICK] PLACE ORDER button');

    await this.placeOrderButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] PLACE ORDER clicked');
  }


  // ============================================================
  // GO TO HOME
  // ============================================================

  async clickHome() {

    console.log('[CLICK] HOME button');

    await this.homeButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Navigated back to HOME');
  }


  // ============================================================
  // CONTINUE SHOPPING
  // ============================================================

  async clickContinueShopping() {

    console.log(
      '[CLICK] Continue Shopping button'
    );

    await this.continueShoppingButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] Continue Shopping clicked'
    );
  }
}