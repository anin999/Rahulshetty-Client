import { test } from '@playwright/test';
import { CartTotalValidationPage } from '../pages/CartTotalValidation';

test.describe(
  'Cart Total Validation',
  () => {

    test(
      'Verify cart total after adding 3 products',
      async ({ page }) => {

        const cartPage =
          new CartTotalValidationPage(page);

        const email =
          'dell1788704725771@xminds.com';

        const password =
          'Xminds@123';

        const products = [
          'ADIDAS ORIGINAL',
          'ZARA COAT 3',
          'IPHONE 13 PRO'
        ];


        // ========================================================
        // STEP 1 - LOGIN
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 1 - LOGIN'
        );

        console.log(
          '=========================================='
        );

        await cartPage.navigateToLoginPage();

        await cartPage.login(
          email,
          password
        );


        // ========================================================
        // STEP 2 - VERIFY PRODUCTS
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 2 - VERIFY PRODUCTS'
        );

        console.log(
          '=========================================='
        );

        for (const product of products) {

          await cartPage.verifyProduct(
            product
          );
        }


        // ========================================================
        // STEP 3 - GET PRODUCT PRICES
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 3 - GET PRODUCT PRICES'
        );

        console.log(
          '=========================================='
        );

        const prices: number[] = [];

        for (const product of products) {

          const price =
            await cartPage.getProductPrice(
              product
            );

          prices.push(price);
        }


        // ========================================================
        // STEP 4 - ADD ALL 3 PRODUCTS
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 4 - ADD 3 PRODUCTS TO CART'
        );

        console.log(
          '=========================================='
        );

        for (const product of products) {

          await cartPage.addProductToCart(
            product
          );
        }


        // ========================================================
        // STEP 5 - CALCULATE EXPECTED TOTAL
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 5 - CALCULATE EXPECTED TOTAL'
        );

        console.log(
          '=========================================='
        );

        const expectedTotal =
          cartPage.calculateExpectedTotal(
            prices
          );


        // ========================================================
        // STEP 6 - OPEN CART
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 6 - OPEN CART'
        );

        console.log(
          '=========================================='
        );

        await cartPage.openCart();


        // ========================================================
        // STEP 7 - VERIFY PRODUCTS IN CART
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 7 - VERIFY PRODUCTS IN CART'
        );

        console.log(
          '=========================================='
        );

        await cartPage.verifyProductsInCart(
          products
        );


        // ========================================================
        // STEP 8 - VERIFY CART TOTAL
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 8 - VERIFY CART TOTAL'
        );

        console.log(
          '=========================================='
        );

        await cartPage.verifyCartTotal(
          expectedTotal
        );


        // ========================================================
        // FINAL RESULT
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          '[PASS] CART TOTAL VALIDATION COMPLETED'
        );

        console.log(
          `[PASS] ${products.join(' + ')}`
        );

        console.log(
          `[PASS] Expected Total = $${expectedTotal}`
        );

        console.log(
          '[PASS] Displayed cart total matches calculated total'
        );

        console.log(
          '==========================================\n'
        );
      }
    );

  }
);