import { Page, expect } from '@playwright/test';
import { TestUtils2 } from '../utils/TestUtils2';

export class RegisterPage {
  readonly page: Page;
  readonly utils: TestUtils2;

  constructor(page: Page) {
    this.page = page;
    this.utils = new TestUtils2(page);
  }

  // Locators
  private registerHeading = () =>
    this.page.getByRole('heading', { name: 'Register' });

  private firstNameInput = () =>
    this.page.getByRole('textbox', { name: 'First Name' });

  private lastNameInput = () =>
    this.page.getByRole('textbox', { name: 'Last Name' });

  private emailInput = () =>
    this.page.getByRole('textbox', { name: 'email@example.com' });

  private phoneInput = () =>
    this.page.getByRole('textbox', { name: 'enter your number' });

  private occupationDropdown = () =>
    this.page.getByRole('combobox');

  private maleRadio = () =>
    this.page.getByText('Male', { exact: true });

  private passwordInput = () =>
    this.page.getByRole('textbox', { name: 'Passsword' });

  private confirmPasswordInput = () =>
    this.page.getByRole('textbox', { name: 'Confirm Password' });

  private ageCheckbox = () =>
    this.page.getByRole('checkbox');

  private registerButton = () =>
    this.page.getByRole('button', { name: 'Register' });

  private accountCreatedHeading = () =>
    this.page.getByRole('heading', {
      name: 'Account Created Successfully'
    });

  private loginButton = () =>
    this.page.getByRole('button', { name: 'Login' });

  async verifyRegisterPage() {
    await this.utils.logAction('Verify Register page');

    await expect(this.registerHeading()).toBeVisible();

    await this.utils.delay();
  }

  async enterFirstName(firstName: string) {
    await this.utils.logAction(`Enter first name: ${firstName}`);

    await this.firstNameInput().fill(firstName);

    await this.utils.delay();
  }

  async enterLastName(lastName: string) {
    await this.utils.logAction(`Enter last name: ${lastName}`);

    await this.lastNameInput().fill(lastName);

    await this.utils.delay();
  }

  async enterEmail(email: string) {
    await this.utils.logAction(`Enter registration email: ${email}`);

    await this.emailInput().fill(email);

    await this.utils.delay();
  }

  async enterPhone(phone: string) {
    await this.utils.logAction(`Enter phone number: ${phone}`);

    await this.phoneInput().fill(phone);

    await this.utils.delay();
  }

  async selectOccupation(occupation: string) {
    await this.utils.logAction(`Select occupation: ${occupation}`);

    await this.occupationDropdown().selectOption(occupation);

    await this.utils.delay();
  }

  async selectGender() {
    await this.utils.logClick('Male gender');

    await this.maleRadio().click();

    await this.utils.delay();
  }

  async enterPassword(password: string) {
    await this.utils.logAction('Enter password');

    await this.passwordInput().fill(password);

    await this.utils.delay();
  }

  async confirmPassword(password: string) {
    await this.utils.logAction('Enter confirm password');

    await this.confirmPasswordInput().fill(password);

    await this.utils.delay();
  }

  async acceptAgeConfirmation() {
    await this.utils.logClick('I am 18 year or Older');

    await this.ageCheckbox().check();

    await this.utils.delay();
  }

  async clickRegister() {
    await this.utils.logClick('Register button');

    await this.registerButton().click();

    await this.utils.delay();
  }

  async verifyAccountCreated() {
    await this.utils.logAction('Verify Account Created Successfully');

    await expect(this.accountCreatedHeading()).toBeVisible();

    await this.utils.delay();
  }

  async clickLogin() {
    await this.utils.logClick('Login button after registration');

    await this.loginButton().click();

    await this.utils.delay();
  }

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    occupation: string,
    password: string
  ) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPhone(phone);
    await this.selectOccupation(occupation);
    await this.selectGender();
    await this.enterPassword(password);
    await this.confirmPassword(password);
    await this.acceptAgeConfirmation();
    await this.clickRegister();
  }
}