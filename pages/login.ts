import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private email_textbox;
  private password_textbox;
  private login_button;

  constructor(page: Page) {
    this.page = page;
    this.email_textbox = page.locator('input[name="email"]');
    this.password_textbox = page.locator('input[name="password"]');
    this.login_button = page.getByRole('button', { name: 'Login' });
  }

  async gotoLoginPage(): Promise<void> {
    await this.page.goto('https://xtime-5f7.xminds.in/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.email_textbox.fill(email);
    await this.password_textbox.fill(password);
    await this.login_button.click();
  }
}
