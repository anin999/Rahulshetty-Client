import { test } from '@playwright/test';
import { LoginWrongEmailPage } from '../pages/RSLoginWrongEmail';

test.describe('Login Negative Test Cases', () => {

  test('Login with incorrect email and correct password', async ({ page }) => {

    const loginPage = new LoginWrongEmailPage(page);

    const correctEmail = `dell${Date.now()}@xminds.com`;
    const incorrectEmail = `wrong${Date.now()}@xminds.com`;
    const correctPassword = 'Xminds@123';

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
      correctEmail,
      '8891753553',
      '1: Doctor',
      correctPassword
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
    // STEP 6 - Enter Incorrect Email
    // --------------------------------

    await loginPage.enterIncorrectEmail(incorrectEmail);

    // --------------------------------
    // STEP 7 - Enter Correct Password
    // --------------------------------

    await loginPage.enterCorrectPassword(correctPassword);

    // --------------------------------
    // STEP 8 - Click Login
    // --------------------------------

    await loginPage.clickLogin();

    console.log(
      '[PASS] Login attempted with incorrect email and correct password'
    );
  });

});