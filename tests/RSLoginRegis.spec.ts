import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/RSLoginRegis';
import { RegisterPage } from '../pages/RSLoginRegis2';

test.describe('Registration and Login Workflow', () => {

  test('Register a new user and login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const uniqueEmail = `dell${Date.now()}@xminds.com`;

    // --------------------------------
    // STEP 1 - Navigate to Login
    // --------------------------------

    await loginPage.navigateToLoginPage();

    await loginPage.verifyLoginPage();

    // --------------------------------
    // STEP 2 - Open Registration
    // --------------------------------

    await loginPage.clickRegisterHere();

    await registerPage.verifyRegisterPage();

    // --------------------------------
    // STEP 3 - Register User
    // --------------------------------

    await registerPage.registerUser(
      'Uday',
      'Abraham',
      uniqueEmail,
      '8891753553',
      '1: Doctor',
      'Xminds@123'
    );

    // --------------------------------
    // STEP 4 - Verify Account Creation
    // --------------------------------

    await registerPage.verifyAccountCreated();

    // --------------------------------
    // STEP 5 - Go to Login
    // --------------------------------

    await registerPage.clickLogin();

    await loginPage.verifyLoginPage();

    // --------------------------------
    // STEP 6 - Login
    // --------------------------------

    await loginPage.login(
      uniqueEmail,
      'Xminds@123'
    );
    
    console.log('[PASS] Registration and Login workflow completed successfully');
  });
});