import { Page, expect } from '@playwright/test';
import { TestUtils2 } from '../utils/TestUtils2';

export class LoginNegativePage {
  readonly page: Page;
  readonly utils: TestUtils2;

  constructor(page: Page) {
    this.page = page;
    this.utils = new TestUtils2(page);
  }

  // Locators
  private loginHeading = () =>
    this.page.getByRole('heading', { name: 'Log in' });

  private loginButton = () =>
    this.page.getByRole('button', { name: 'Login' });

  private emailRequiredMessage = () =>
    this.page.getByText('*Email is required', { exact: true });

  private passwordRequiredMessage = () =>
    this.page.getByText('*Password is required', { exact: true });


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


  async clickLogin() {
    await this.utils.logClick('Login button');

    await this.loginButton().click();

    await this.utils.delay();
  }


  async verifyRequiredFieldValidation() {
    await this.utils.logAction(
      'Verify required field validation messages'
    );

    await expect(this.emailRequiredMessage()).toBeVisible();

    await expect(this.passwordRequiredMessage()).toBeVisible();

    await this.utils.delay();
  }
}