import { test } from '@playwright/test';
import { CheckoutPaymentNegative } from '../pages/CheckoutPaymentNegative';

test.describe('E-Commerce Checkout Negative Test Cases', () => {

  test(
    'Verify validation when Place Order is clicked without payment details',
    async ({ page }) => {

      const checkoutPage =
        new CheckoutPaymentNegative(page);

      const email =
        'dell1788704725771@xminds.com';

      const password =
        'Xminds@123';

      const product =
        'ADIDAS ORIGINAL';


      // ============================================================
      // STEP 1 - LOGIN
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 1 - LOGIN');
      console.log('==========================================');

      await checkoutPage.navigateToLoginPage();

      await checkoutPage.login(
        email,
        password
      );


      // ============================================================
      // STEP 2 - VERIFY PRODUCT
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 2 - VERIFY PRODUCT');
      console.log('==========================================');

      await checkoutPage.verifyProduct(
        product
      );


      // ============================================================
      // STEP 3 - ADD PRODUCT TO CART
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 3 - ADD PRODUCT TO CART');
      console.log('==========================================');

      await checkoutPage.addProductToCart(
        product
      );


      // ============================================================
      // STEP 4 - OPEN CART
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 4 - OPEN CART');
      console.log('==========================================');

      await checkoutPage.openCart();


      // ============================================================
      // STEP 5 - VERIFY PRODUCT IN CART
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 5 - VERIFY PRODUCT IN CART');
      console.log('==========================================');

      await checkoutPage.verifyProductInCart(
        product
      );


      // ============================================================
      // STEP 6 - CHECKOUT
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 6 - CHECKOUT');
      console.log('==========================================');

      await checkoutPage.clickCheckout();


      // ============================================================
      // STEP 7 - LEAVE PAYMENT DETAILS EMPTY
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 7 - PAYMENT DETAILS');
      console.log('==========================================');

      console.log(
        '[ACTION] No expiry date entered'
      );

      console.log(
        '[ACTION] No CVV entered'
      );

      console.log(
        '[ACTION] No name on card entered'
      );

      console.log(
        '[ACTION] No country selected'
      );


      // ============================================================
      // STEP 8 - CLICK PLACE ORDER
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 8 - PLACE ORDER');
      console.log('==========================================');

      await checkoutPage.clickPlaceOrderWithoutPaymentDetails();



      // ============================================================
      // FINAL RESULT
      // ============================================================

      console.log('\n==========================================');
      console.log('[PASS] PAYMENT NEGATIVE TEST COMPLETED');
      console.log(
        '[PASS] Place Order clicked without payment details'
      );
      console.log(
        '[PASS] Validation message displayed'
      );
      console.log('==========================================\n');
    }
  );

});