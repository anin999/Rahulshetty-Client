import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Enter your email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter password' });
    this.signInBtn = page.getByRole('button', { name: 'Sign in' });
  }

  async goto() {
    await this.page.goto('https://zencurahms-stag-fe.xminds.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInBtn.click();
  }
}

export class DashboardPage {
  readonly page: Page;
  readonly masterBtn: Locator;
  readonly hospitalLink: Locator;
  readonly techniciansLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.masterBtn = page.getByRole('button', { name: 'Master' });
    this.hospitalLink = page.getByRole('link', { name: 'Hospital' });
    this.techniciansLink = page.getByRole('link', { name: 'Technicians' });
  }

  async navigateToTechnicians() {
    await this.masterBtn.click();
    await this.hospitalLink.click();
    await this.techniciansLink.click();
  }
}
