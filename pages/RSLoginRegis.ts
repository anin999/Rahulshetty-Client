import { Page, expect } from '@playwright/test';
import { TestUtils2 } from '../utils/TestUtils2';

export class LoginPage {
  readonly page: Page;
  readonly utils: TestUtils2;

  constructor(page: Page) {
    this.page = page;
    this.utils = new TestUtils2(page);
  }

  // Locators
  private emailInput = () =>
    this.page.getByRole('textbox', { name: 'email@example.com' });

  private passwordInput = () =>
    this.page.getByRole('textbox', { name: 'enter your passsword' });

  private loginButton = () =>
    this.page.getByRole('button', { name: 'Login' });

  private registerHereLink = () =>
    this.page.getByText('Register here');

  private loginHeading = () =>
    this.page.getByRole('heading', { name: 'Log in' });

  async navigateToLoginPage() {
    await this.utils.logAction('Navigate to Login page');

    await this.page.goto(
      'https://rahulshettyacademy.com/client/#/auth/login'
    );

    await this.utils.delay();
  }

  async verifyLoginPage() {
    await this.utils.logAction('Verify Login page');

    await expect(this.loginHeading()).toBeVisible();

    await this.utils.delay();
  }

  async clickRegisterHere() {
    await this.utils.logClick('Register here');

    await this.registerHereLink().click();

    await this.utils.delay();
  }

  async enterEmail(email: string) {
    await this.utils.logAction(`Enter email: ${email}`);

    await this.emailInput().fill(email);

    await this.utils.delay();
  }

  async enterPassword(password: string) {
    await this.utils.logAction('Enter password');

    await this.passwordInput().fill(password);

    await this.utils.delay();
  }

  async clickLogin() {
    await this.utils.logClick('Login button');

    await this.loginButton().click();

    await this.utils.delay();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();

    
  }
}