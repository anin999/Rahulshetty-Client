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
    this.page.getByRole('textbox', { name: 'email@example.com' });

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
    this.page.getByText('Place Order', { exact: true });


  // ============================================================
  // ORDER CONFIRMATION LOCATORS
  // ============================================================

  private downloadOrderButton = () =>
    this.page.getByRole('button', {
      name: 'Click To Download Order'
    });


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

    await expect(this.loginHeading()).toBeVisible();

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

  console.log(`[VALIDATION] Verifying product: ${productName}`);

  const product = this.page.getByText(productName).first();

  await expect(product).toBeVisible();

  console.log(`[PASS] Product visible: ${productName}`);

  await WaitUtils.delay(this.page);
}


  async addProductToCart(productName: string) {

    console.log(`[CLICK] Add "${productName}" to cart`);

    await this.addToCartButton(productName).click();

    await WaitUtils.delay(this.page);

    console.log(`[PASS] "${productName}" added to cart`);
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
  // VALIDATE CART
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

    console.log('\n========== CART VALIDATION ==========\n');

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

    console.log('[PASS] Expiry date entered');
  }


  async enterCVV(cvv: string) {

    console.log('[ACTION] Entering CVV');

    await this.cvvInput().fill(cvv);

    await WaitUtils.delay(this.page);

    console.log('[PASS] CVV entered');
  }


  async enterNameOnCard(name: string) {

    console.log(`[ACTION] Entering name on card: ${name}`);

    await this.nameOnCardInput().fill(name);

    await WaitUtils.delay(this.page);

    console.log('[PASS] Name on card entered');
  }


  // ============================================================
  // SHIPPING INFORMATION
  // ============================================================
async selectCountry(countryPrefix: string) {
  console.log(`[ACTION] Selecting country using prefix: ${countryPrefix}`);

  const countryInput = this.page.getByRole('textbox', {
    name: 'Select Country'
  });

  console.log('[CLICK] Select Country field');
  await countryInput.click();
  await WaitUtils.delay(this.page);

  console.log(`[TYPE] Typing country prefix: ${countryPrefix}`);
  await countryInput.pressSequentially(countryPrefix, { delay: 150 });
  await WaitUtils.delay(this.page);

  console.log('[VALIDATION] Waiting for Australia suggestion');

  const countrySuggestion = this.page.getByRole('button', {
    name: /Australia/i
  }).first();

  await expect(countrySuggestion).toBeVisible({
    timeout: 10000
  });

  console.log('[CLICK] Australia country suggestion');
  await countrySuggestion.click();
  await WaitUtils.delay(this.page);

  console.log('[PASS] Australia selected successfully');
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
  // DOWNLOAD ORDER DETAILS
  // ============================================================
async downloadOrderDetails(): Promise<Download> {
  console.log('[ACTION] Preparing to download order details');

  const downloadPromise = this.page.waitForEvent('download');

  console.log('[CLICK] Click To Download Order button');
  await this.downloadOrderButton().click();

  const download = await downloadPromise;

  console.log(`[DOWNLOAD] File name: ${download.suggestedFilename()}`);

  await download.saveAs(
    `test-results/${download.suggestedFilename()}`
  );

  console.log(
    `[PASS] Order details downloaded: ${download.suggestedFilename()}`
  );

  await WaitUtils.delay(this.page);

  return download;
}

  // ============================================================
  // VALIDATE DOWNLOAD
  // ============================================================

 // ============================================================
  // VALIDATE DOWNLOAD
  // ============================================================

  async validateDownloadedOrder(download: Download) {

    console.log('[VALIDATION] Validating downloaded order details');

    const fileName = download.suggestedFilename();

    const filePath = path.join(
      process.cwd(),
      'test-results',
      fileName
    );

    console.log(`[FILE] Reading downloaded file: ${filePath}`);

    // Validate file exists
    expect(fs.existsSync(filePath)).toBeTruthy();

    console.log('[PASS] Downloaded file exists');

    // Read CSV file
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    console.log('[FILE] CSV content read successfully');

    // Validate headers
    expect(fileContent).toContain('S.No');
    expect(fileContent).toContain('Invoice Number');
    expect(fileContent).toContain('Product Name');
    expect(fileContent).toContain('Product Description');
    expect(fileContent).toContain('Product Price');
    expect(fileContent).toContain('Address');
    expect(fileContent).toContain('Ordered By');

    console.log('[PASS] CSV headers validated');

    // Validate products
    expect(fileContent).toContain('ADIDAS ORIGINAL');
    console.log('[PASS] ADIDAS ORIGINAL found');

    expect(fileContent).toContain('iphone 13 pro');
    console.log('[PASS] iphone 13 pro found');

    expect(fileContent).toContain('ZARA COAT 3');
    console.log('[PASS] ZARA COAT 3 found');

    // Validate country
    expect(fileContent).toContain('Australia');
    console.log('[PASS] Country validated: Australia');

    // Validate ordered by email
    expect(fileContent).toContain(
      'dell1788704725771@xminds.com'
    );

    console.log(
      '[PASS] Ordered By email validated: dell1788704725771@xminds.com'
    );

    // Validate product prices
    expect(fileContent).toContain('11500');
    expect(fileContent).toContain('55000');

    console.log('[PASS] Product prices validated');

    console.log(
      '[PASS] Downloaded order details validated successfully'
    );

    await WaitUtils.delay(this.page);
  }

}