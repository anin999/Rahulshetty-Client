import { test } from '@playwright/test';
import { AddToCartNegativePage } from '../pages/AddToCartNegative';

test.describe(
  'Add To Cart Negative Test Cases',
  () => {

    test(
      'Verify same product is added only once when Add To Cart is clicked multiple times',
      async ({ page }) => {

        const addToCartPage =
          new AddToCartNegativePage(page);

        const email =
          'dell1788704725771@xminds.com';

        const password =
          'Xminds@123';

        const product =
          'ADIDAS ORIGINAL';


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

        await addToCartPage.navigateToLoginPage();

        await addToCartPage.login(
          email,
          password
        );


        // ========================================================
        // STEP 2 - VERIFY ADIDAS
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 2 - VERIFY ADIDAS PRODUCT'
        );

        console.log(
          '=========================================='
        );

        await addToCartPage.verifyProduct(
          product
        );


        // ========================================================
        // STEP 3 - CLICK ADD TO CART MULTIPLE TIMES
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 3 - ADD ADIDAS MULTIPLE TIMES'
        );

        console.log(
          '=========================================='
        );

        await addToCartPage.clickAddToCartMultipleTimes(
          product,
          3
        );


        // ========================================================
        // STEP 4 - OPEN CART
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 4 - OPEN CART'
        );

        console.log(
          '=========================================='
        );

        await addToCartPage.openCart();


        // ========================================================
        // STEP 5 - VERIFY PRODUCT ADDED ONLY ONCE
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 5 - VERIFY PRODUCT COUNT'
        );

        console.log(
          '=========================================='
        );

        await addToCartPage.verifyProductAddedOnlyOnce(
          product
        );


        // ========================================================
        // FINAL RESULT
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          '[PASS] ADD TO CART NEGATIVE TEST COMPLETED'
        );

        console.log(
          '[PASS] Add To Cart clicked 3 times'
        );

        console.log(
          '[PASS] ADIDAS ORIGINAL appears only once in cart'
        );

        console.log(
          '==========================================\n'
        );
      }
    );

  }
);