import { Page, expect } from '@playwright/test';
import { TestUtils2 } from '../utils/TestUtils2';

export class LoginWrongPasswordPage {
  readonly page: Page;
  readonly utils: TestUtils2;

  constructor(page: Page) {
    this.page = page;
    this.utils = new TestUtils2(page);
  }

  // Locators
  private loginHeading = () =>
    this.page.getByRole('heading', { name: 'Log in' });

  private emailInput = () =>
    this.page.getByRole('textbox', { name: 'email@example.com' });

  private passwordInput = () =>
    this.page.getByRole('textbox', { name: 'enter your passsword' });

  private loginButton = () =>
    this.page.getByRole('button', { name: 'Login' });

  private registerHereLink = () =>
    this.page.getByText('Register here');

  private registerHeading = () =>
    this.page.getByRole('heading', { name: 'Register' });

  private firstNameInput = () =>
    this.page.getByRole('textbox', { name: 'First Name' });

  private lastNameInput = () =>
    this.page.getByRole('textbox', { name: 'Last Name' });

  private phoneInput = () =>
    this.page.getByRole('textbox', { name: 'enter your number' });

  private occupationDropdown = () =>
    this.page.getByRole('combobox');

  private maleRadio = () =>
    this.page.getByText('Male', { exact: true });

  private registerPasswordInput = () =>
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

  private loginAfterRegistrationButton = () =>
    this.page.getByRole('button', { name: 'Login' });

  private loginErrorMessage = () =>
    this.page.getByText('Incorrect email or password.', {
      exact: true
    });


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


  async verifyRegisterPage() {
    await this.utils.logAction('Verify Register page');

    await expect(this.registerHeading()).toBeVisible();

    await this.utils.delay();
  }


  async registerNewUser(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    occupation: string,
    password: string
  ) {
    await this.utils.logAction('Register new user');

    await this.firstNameInput().fill(firstName);
    await this.utils.delay();

    await this.lastNameInput().fill(lastName);
    await this.utils.delay();

    await this.page
      .getByRole('textbox', { name: 'email@example.com' })
      .fill(email);
    await this.utils.delay();

    await this.phoneInput().fill(phone);
    await this.utils.delay();

    await this.occupationDropdown().selectOption(occupation);
    await this.utils.delay();

    await this.maleRadio().click();
    await this.utils.delay();

    await this.registerPasswordInput().fill(password);
    await this.utils.delay();

    await this.confirmPasswordInput().fill(password);
    await this.utils.delay();

    await this.ageCheckbox().check();
    await this.utils.delay();

    await this.registerButton().click();
    await this.utils.delay();
  }


  async verifyAccountCreated() {
    await this.utils.logAction(
      'Verify Account Created Successfully'
    );

    await expect(this.accountCreatedHeading()).toBeVisible();

    await this.utils.delay();
  }


  async clickLoginAfterRegistration() {
    await this.utils.logClick(
      'Login button after registration'
    );

    await this.loginAfterRegistrationButton().click();

    await this.utils.delay();
  }


  async enterEmail(email: string) {
    await this.utils.logAction(`Enter email: ${email}`);

    await this.emailInput().fill(email);

    await this.utils.delay();
  }


  async enterPassword(password: string) {
    await this.utils.logAction('Enter incorrect password');

    await this.passwordInput().fill(password);

    await this.utils.delay();
  }


  async clickLogin() {
    await this.utils.logClick('Login button');

    await this.loginButton().click();

    await this.utils.delay();
  }



  }
