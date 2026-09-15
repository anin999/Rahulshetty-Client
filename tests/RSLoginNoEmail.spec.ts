import { test } from '@playwright/test';
import { LoginNoEmailPage } from '../pages/RSLoginNoEmail';

test.describe('Login Negative Test Cases', () => {

  test('Verify login with no email and valid password', async ({ page }) => {

    const loginPage = new LoginNoEmailPage(page);

    const validEmail = `dell${Date.now()}@xminds.com`;
    const validPassword = 'Xminds@123';

    // --------------------------------
    // STEP 1 - Navigate to Login
    // --------------------------------

    await loginPage.navigateToLoginPage();

    // --------------------------------
    // STEP 2 - Open Registration
    // --------------------------------

    await loginPage.verifyLoginPage();

    await loginPage.clickRegisterHere();

    // --------------------------------
    // STEP 3 - Create New Account
    // --------------------------------

    await loginPage.verifyRegisterPage();

    await loginPage.registerNewUser(
      'Uday',
      'Abraham',
      validEmail,
      '8891753553',
      '1: Doctor',
      validPassword
    );

    // --------------------------------
    // STEP 4 - Verify Account Creation
    // --------------------------------

    await loginPage.verifyAccountCreated();

    // --------------------------------
    // STEP 5 - Go to Login
    // --------------------------------

    await loginPage.clickLoginAfterRegistration();

    await loginPage.verifyLoginPage();

    // --------------------------------
    // STEP 6 - Leave Email Empty
    // --------------------------------

    // Email is intentionally not entered

    // --------------------------------
    // STEP 7 - Enter Valid Password
    // --------------------------------

    await loginPage.enterValidPassword(validPassword);

    // --------------------------------
    // STEP 8 - Click Login
    // --------------------------------

    await loginPage.clickLogin();

    // --------------------------------
    // STEP 9 - Verify Email Validation
    // --------------------------------

    await loginPage.verifyEmailRequiredMessage();

    console.log(
      '[PASS] Email required message displayed for empty email'
    );
  });

});