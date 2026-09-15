import { test } from '@playwright/test';
import { LoginNoPasswordPage } from '../pages/RSLoginNoPassword';

test.describe('Login Negative Test Cases', () => {

  test('Verify login with valid email and no password', async ({ page }) => {

    const loginPage = new LoginNoPasswordPage(page);

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
    // STEP 6 - Enter Valid Email
    // --------------------------------

    await loginPage.enterValidEmail(validEmail);

    // --------------------------------
    // STEP 7 - Leave Password Empty
    // --------------------------------

    // Password is intentionally not entered

    // --------------------------------
    // STEP 8 - Click Login
    // --------------------------------

    await loginPage.clickLogin();

    // --------------------------------
    // STEP 9 - Verify Password Validation
    // --------------------------------

    await loginPage.verifyPasswordRequiredMessage();

    console.log(
      '[PASS] Password required message displayed for empty password'
    );
  });

});