import { Page, expect } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';

export class CartTotalValidationPage {

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

  private productPrice = (productName: string) =>
    this.productCard(productName)
      .locator('text=/\\$\\s*[0-9]+/i')
      .first();

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
      name: new RegExp(
        `^${productName}$`,
        'i'
      )
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

  async login(
    email: string,
    password: string
  ) {

    console.log(
      '\n========== LOGIN ==========\n'
    );

    await expect(
      this.loginHeading()
    ).toBeVisible();

    console.log(
      '[ACTION] Entering email'
    );

    await this.emailInput().fill(email);

    await WaitUtils.delay(this.page);

    console.log(
      '[ACTION] Entering password'
    );

    await this.passwordInput().fill(password);

    await WaitUtils.delay(this.page);

    console.log(
      '[CLICK] Login button'
    );

    await this.loginButton().click();

    await WaitUtils.delay(this.page);

    console.log(
      '[PASS] User logged in successfully'
    );
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
      this.productCard(productName)
    ).toBeVisible();

    console.log(
      `[PASS] ${productName} is visible`
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // GET PRODUCT PRICE
  // ============================================================

  async getProductPrice(
    productName: string
  ): Promise<number> {

    console.log(
      `[ACTION] Getting price for: ${productName}`
    );

    const priceText =
      await this.productPrice(
        productName
      ).innerText();

    console.log(
      `[PRICE TEXT] ${productName}: ${priceText}`
    );

    const price =
      Number(
        priceText
          .replace('$', '')
          .replace(/,/g, '')
          .trim()
      );

    console.log(
      `[PRICE] ${productName}: $${price}`
    );

    return price;
  }


  // ============================================================
  // ADD PRODUCT TO CART
  // ============================================================

  async addProductToCart(
    productName: string
  ) {

    console.log(
      `[CLICK] Add "${productName}" to cart`
    );

    await this.addToCartButton(
      productName
    ).click();

    await WaitUtils.delay(this.page);

    console.log(
      `[PASS] "${productName}" added to cart`
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
      `[URL] Current URL: ${this.page.url()}`
    );

    console.log(
      '[PASS] Cart page opened'
    );
  }


  // ============================================================
  // VERIFY PRODUCTS IN CART
  // ============================================================

  async verifyProductsInCart(
    products: string[]
  ) {

    console.log(
      '\n========== CART VALIDATION ==========\n'
    );

    for (const product of products) {

      console.log(
        `[VALIDATION] Checking ${product} in cart`
      );

      await expect(
        this.cartProduct(product)
      ).toBeVisible();

      console.log(
        `[PASS] ${product} is present in cart`
      );
    }

    console.log(
      `[PASS] All ${products.length} products are present in cart`
    );

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // CALCULATE EXPECTED TOTAL
  // ============================================================

  calculateExpectedTotal(
    prices: number[]
  ): number {

    console.log(
      '\n========== TOTAL CALCULATION =========='
    );

    let total = 0;

    for (const price of prices) {

      total += price;

      console.log(
        `[CALCULATION] Added $${price} → Running total: $${total}`
      );
    }

    console.log(
      `[EXPECTED TOTAL] $${total}`
    );

    return total;
  }


  // ============================================================
  // GET CART TOTAL
  // ============================================================

  async getCartTotal(): Promise<number> {

    console.log(
      '[ACTION] Reading cart TOTAL'
    );

    // Wait for the cart page to load
    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    await WaitUtils.delay(this.page);

    // Get complete visible text from the cart page
    const pageText =
      await this.page.locator('body').innerText();

    console.log(
      '\n[CART PAGE TEXT]'
    );

    console.log(
      pageText
    );

    // Find TOTAL followed by the amount
    //
    // Example:
    // TOTAL
    // $78000
    //
    // Also handles:
    // TOTAL $78000
    // TOTAL
    // 78000
    const totalMatch =
      pageText.match(
        /TOTAL\s*\$?\s*([\d,]+)/i
      );

    expect(
      totalMatch,
      'Cart TOTAL amount should be displayed'
    ).not.toBeNull();

    const total =
      Number(
        totalMatch![1]
          .replace(/,/g, '')
      );

    console.log(
      `[CART TOTAL] $${total}`
    );

    return total;
  }


  // ============================================================
  // VERIFY CART TOTAL
  // ============================================================

  async verifyCartTotal(
    expectedTotal: number
  ) {

    console.log(
      '\n========== TOTAL VALIDATION =========='
    );

    const actualTotal =
      await this.getCartTotal();

    console.log(
      `[EXPECTED TOTAL] $${expectedTotal}`
    );

    console.log(
      `[ACTUAL TOTAL] $${actualTotal}`
    );

    expect(
      actualTotal
    ).toBe(
      expectedTotal
    );

    console.log(
      `[PASS] Cart total matches expected total: $${actualTotal}`
    );

    await WaitUtils.delay(this.page);
  }

}