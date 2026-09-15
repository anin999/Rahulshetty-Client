import { test } from '@playwright/test';
import { LoginWrongPasswordPage } from '../pages/RSLoginWrongPassword';

test.describe('Login Negative Test Cases', () => {

  test('Verify login fails with incorrect password', async ({ page }) => {

    const loginPage = new LoginWrongPasswordPage(page);

    const uniqueEmail = `dell${Date.now()}@xminds.com`;

    const correctPassword = 'Xminds@123';
    const incorrectPassword = 'WrongPassword@123';

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
      uniqueEmail,
      '8891753553',
      '1: Doctor',
      correctPassword
    );

    // --------------------------------
    // STEP 4 - Verify Account Creation
    // --------------------------------

    await loginPage.verifyAccountCreated();

    // --------------------------------
    // STEP 5 - Go Back to Login
    // --------------------------------

    await loginPage.clickLoginAfterRegistration();

    await loginPage.verifyLoginPage();

    // --------------------------------
    // STEP 6 - Enter New Email
    // --------------------------------

    await loginPage.enterEmail(uniqueEmail);

    // --------------------------------
    // STEP 7 - Enter Incorrect Password
    // --------------------------------

    await loginPage.enterPassword(incorrectPassword);

    // --------------------------------
    // STEP 8 - Click Login
    // --------------------------------

    await loginPage.clickLogin();
  
  });

});