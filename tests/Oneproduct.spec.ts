import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/Oneproduct';

test.describe(
  'Product View and Checkout Workflow',
  () => {

    test(
      'View Adidas, add to cart and complete checkout',
      async ({ page }) => {

        const checkoutPage =
          new CheckoutPage(page);

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

        await checkoutPage.navigateToLoginPage();

        await checkoutPage.login(
          email,
          password
        );


        // ========================================================
        // STEP 2 - VERIFY ADIDAS PRODUCT
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

        await checkoutPage.verifyProduct(
          product
        );


        // ========================================================
        // STEP 3 - CLICK VIEW BUTTON
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 3 - VIEW ADIDAS PRODUCT'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.clickViewProduct(
          product
        );


        // ========================================================
        // STEP 4 - VERIFY PRODUCT DETAILS
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 4 - VERIFY PRODUCT DETAILS'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.verifyProductDetails(
          product
        );


        // ========================================================
        // STEP 5 - ADD TO CART FROM DETAILS PAGE
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 5 - ADD ADIDAS TO CART'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.addProductToCartFromDetails(
          product
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

        await checkoutPage.openCart();


        // ========================================================
        // STEP 7 - VERIFY PRODUCT IN CART
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 7 - VERIFY ADIDAS IN CART'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.verifyProductInCart(
          product
        );


        // ========================================================
        // STEP 8 - CHECKOUT
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 8 - CHECKOUT'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.clickCheckout();


        // ========================================================
        // STEP 9 - PAYMENT DETAILS
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 9 - PAYMENT DETAILS'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.enterExpiryDate(
          '08',
          '28'
        );

        await checkoutPage.enterCVV(
          '666'
        );

        await checkoutPage.enterNameOnCard(
          'Anin'
        );


        // ========================================================
        // STEP 10 - SHIPPING INFORMATION
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 10 - SHIPPING INFORMATION'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.selectCountry(
          'Aus'
        );


        // ========================================================
        // STEP 11 - PLACE ORDER
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 11 - PLACE ORDER'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.clickPlaceOrder();


        // ========================================================
        // STEP 12 - VERIFY ORDER COMPLETED
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          'STEP 12 - VERIFY ORDER COMPLETED'
        );

        console.log(
          '=========================================='
        );

        await checkoutPage.verifyOrderCompleted();


        // ========================================================
        // FINAL RESULT
        // ========================================================

        console.log(
          '\n=========================================='
        );

        console.log(
          '[PASS] COMPLETE CHECKOUT WORKFLOW'
        );

        console.log(
          '[PASS] Login → View Adidas → Add To Cart → Cart → Checkout → Place Order'
        );

        console.log(
          '==========================================\n'
        );
      }
    );

  }
);