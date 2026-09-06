import { Page, expect } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';

export class AddToCartPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================
  // LOGIN PAGE LOCATORS
  // ============================================================

  private loginHeading = () =>
    this.page.getByRole('heading', { name: 'Log in' });

  private emailInput = () =>
    this.page.getByRole('textbox', { name: 'email@example.com' });

  private passwordInput = () =>
    this.page.getByRole('textbox', { name: 'enter your passsword' });

  private loginButton = () =>
    this.page.getByRole('button', { name: 'Login' });


  // ============================================================
  // PRODUCT PAGE LOCATORS
  // ============================================================

  private adidasProduct = () =>
    this.page.getByText('ADIDAS ORIGINAL');

  private zaraProduct = () =>
    this.page.getByText('ZARA COAT');

  private iphoneProduct = () =>
    this.page.getByText('iphone 13 pro');

  private addToCartButtons = () =>
    this.page.getByRole('button', { name: ' Add To Cart' });


  // ============================================================
  // CART LOCATORS
  // ============================================================

  private cartButton = () =>
    this.page.getByRole('button', { name: '   Cart' });

  private adidasCartHeading = () =>
    this.page.getByRole('heading', { name: 'ADIDAS ORIGINAL' });

  private zaraCartHeading = () =>
    this.page.getByRole('heading', { name: 'ZARA COAT' });

  private iphoneCartHeading = () =>
    this.page.getByRole('heading', { name: 'iphone 13 pro' });


  // ============================================================
  // HOME LOCATOR
  // ============================================================

  private homeButton = () =>
    this.page.getByRole('button', { name: ' HOME' });


  // ============================================================
  // NAVIGATION
  // ============================================================

async navigateToLoginPage() {
  console.log('[ACTION] Navigating to Login page');

  await this.page.goto('#/auth/login');

  await WaitUtils.delay(this.page);
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
  }


  async login(email: string, password: string) {

    await this.verifyLoginHeading();

    await this.enterEmail(email);

    await this.enterPassword(password);

    await this.clickLogin();

    console.log('[PASS] Login completed successfully');
  }


  // ============================================================
  // PRODUCTS
  // ============================================================

  async verifyAdidasProduct() {

    console.log('[HEADING] Verifying "ADIDAS ORIGINAL" product');

    await expect(this.adidasProduct()).toBeVisible();

    console.log('[PASS] "ADIDAS ORIGINAL" is visible');

    await WaitUtils.delay(this.page);
  }


  async addAdidasToCart() {

    console.log('[CLICK] ADIDAS ORIGINAL - Add To Cart');

    await this.addToCartButtons().first().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] ADIDAS ORIGINAL added to cart');
  }


  async verifyZaraProduct() {

    console.log('[HEADING] Verifying "ZARA COAT" product');

    await expect(this.zaraProduct()).toBeVisible();

    console.log('[PASS] "ZARA COAT" is visible');

    await WaitUtils.delay(this.page);
  }


  async addZaraToCart() {

    console.log('[CLICK] ZARA COAT - Add To Cart');

    await this.addToCartButtons().nth(1).click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] ZARA COAT added to cart');
  }


  async verifyIphoneProduct() {

    console.log('[HEADING] Verifying "iphone 13 pro" product');

    await expect(this.iphoneProduct()).toBeVisible();

    console.log('[PASS] "iphone 13 pro" is visible');

    await WaitUtils.delay(this.page);
  }


  async addIphoneToCart() {

    console.log('[CLICK] iphone 13 pro - Add To Cart');

    await this.addToCartButtons().nth(2).click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] iphone 13 pro added to cart');
  }


  // ============================================================
  // CART
  // ============================================================

  async openCart() {

    console.log('[CLICK] Cart button');

    await this.cartButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Cart page opened');
  }


  async verifyAdidasInCart() {

    console.log('[HEADING] Verifying "ADIDAS ORIGINAL" in cart');

    await expect(this.adidasCartHeading()).toBeVisible();

    console.log('[PASS] ADIDAS ORIGINAL is present in cart');

    await WaitUtils.delay(this.page);
  }


  async verifyZaraInCart() {

    console.log('[HEADING] Verifying "ZARA COAT" in cart');

    await expect(this.zaraCartHeading()).toBeVisible();

    console.log('[PASS] ZARA COAT is present in cart');

    await WaitUtils.delay(this.page);
  }


  async verifyIphoneInCart() {

    console.log('[HEADING] Verifying "iphone 13 pro" in cart');

    await expect(this.iphoneCartHeading()).toBeVisible();

    console.log('[PASS] iphone 13 pro is present in cart');

    await WaitUtils.delay(this.page);
  }


  // ============================================================
  // REMOVE PRODUCTS FROM CART
  // ============================================================

  async removeAdidasFromCart() {

    console.log('[CLICK] Remove ADIDAS ORIGINAL from cart');

    await this.page.getByRole('button', { name: '❯' }).nth(2).click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] ADIDAS ORIGINAL removed from cart');
  }


  async removeZaraFromCart() {

    console.log('[CLICK] Remove ZARA COAT from cart');

    await this.page.getByRole('button', { name: '❯' }).nth(2).click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] ZARA COAT removed from cart');
  }


  async removeIphoneFromCart() {

    console.log('[CLICK] Remove iphone 13 pro from cart');

    await this.page.getByRole('button', { name: '❯', exact: true }).click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] iphone 13 pro removed from cart');
  }


  // ============================================================
  // HOME
  // ============================================================

  async clickHome() {

    console.log('[CLICK] HOME button');

    await this.homeButton().click();

    await WaitUtils.delay(this.page);

    console.log('[PASS] Returned to Home page');
  }
}