import { test } from '@playwright/test';
import { LoginNegativePage } from '../pages/RSLoginNegative1';

test.describe('Login Negative Test Cases', () => {

  test('Verify login without entering email and password', async ({ page }) => {

    const loginNegativePage = new LoginNegativePage(page);

    // --------------------------------
    // STEP 1 - Navigate to Login
    // --------------------------------

    await loginNegativePage.navigateToLoginPage();

    // --------------------------------
    // STEP 2 - Verify Login page
    // --------------------------------

    await loginNegativePage.verifyLoginPage();

    // --------------------------------
    // STEP 3 - Click Login without entering details
    // --------------------------------

    await loginNegativePage.clickLogin();

    // --------------------------------
    // STEP 4 - Verify validation messages
    // --------------------------------

    await loginNegativePage.verifyRequiredFieldValidation();

    console.log(
      '[PASS] Login validation verified for empty email and password'
    );
  });

});