import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout';

test.describe('E-Commerce Checkout Workflow', () => {

  test(
    'Login, add 3 products, checkout, place order and download order details',
    async ({ page }) => {

      const checkoutPage = new CheckoutPage(page);

      const email = 'dell1788704725771@xminds.com';
      const password = 'Xminds@123';

      const products = [
        'ADIDAS ORIGINAL',
        'ZARA COAT',
        'iphone 13 pro'
      ];

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
      // STEP 2 - ADD ADIDAS
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 2 - ADD ADIDAS ORIGINAL');
      console.log('==========================================');

      await checkoutPage.verifyProduct(
        'ADIDAS ORIGINAL'
      );

      await checkoutPage.addProductToCart(
        'ADIDAS ORIGINAL'
      );


      // ============================================================
      // STEP 3 - ADD ZARA COAT
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 3 - ADD ZARA COAT');
      console.log('==========================================');

      await checkoutPage.verifyProduct(
        'ZARA COAT'
      );

      await checkoutPage.addProductToCart(
        'ZARA COAT'
      );


      // ============================================================
      // STEP 4 - ADD IPHONE
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 4 - ADD IPHONE 13 PRO');
      console.log('==========================================');

      await checkoutPage.verifyProduct(
        'iphone 13 pro'
      );

      await checkoutPage.addProductToCart(
        'iphone 13 pro'
      );


      // ============================================================
      // STEP 5 - OPEN CART
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 5 - OPEN CART');
      console.log('==========================================');

      await checkoutPage.openCart();


      // ============================================================
      // STEP 6 - VALIDATE CART
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 6 - VALIDATE CART');
      console.log('==========================================');

      await checkoutPage.verifyAllProductsInCart(
        products
      );


      // ============================================================
      // STEP 7 - CHECKOUT
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 7 - CHECKOUT');
      console.log('==========================================');

      await checkoutPage.clickCheckout();


      // ============================================================
      // STEP 8 - PAYMENT DETAILS
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 8 - PAYMENT DETAILS');
      console.log('==========================================');

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


      // ============================================================
      // STEP 9 - SHIPPING INFORMATION
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 9 - SHIPPING INFORMATION');
      console.log('==========================================');

      await checkoutPage.selectCountry(
        'Aus'
      );


      // ============================================================
      // STEP 10 - PLACE ORDER
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 10 - PLACE ORDER');
      console.log('==========================================');

      await checkoutPage.clickPlaceOrder();


      // ============================================================
      // STEP 11 - DOWNLOAD ORDER DETAILS
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 11 - DOWNLOAD ORDER DETAILS');
      console.log('==========================================');

      const download =
        await checkoutPage.downloadOrderDetails();


      // ============================================================
      // STEP 12 - VALIDATE DOWNLOAD
      // ============================================================

      console.log('\n==========================================');
      console.log('STEP 12 - VALIDATE DOWNLOAD');
      console.log('==========================================');

      await checkoutPage.validateDownloadedOrder(
        download
      );


      // ============================================================
      // FINAL RESULT
      // ============================================================

      console.log('\n==========================================');
      console.log(
        '[PASS] COMPLETE CHECKOUT WORKFLOW'
      );
      console.log(
        '[PASS] Login → Add Products → Cart → Checkout → Place Order → Download'
      );
      console.log('==========================================\n');
    }
  );

});