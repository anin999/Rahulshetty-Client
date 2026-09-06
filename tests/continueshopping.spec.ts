import { test } from '@playwright/test';
import { ContinueShoppingPage } from '../pages/continueshopping';

test.describe('E-Commerce Continue Shopping Workflow', () => {

  test(
    'Login, add 3 products, checkout, go to home, add 3 more products and continue shopping',
    async ({ page }) => {

      const continueShopping =
        new ContinueShoppingPage(page);


      // ============================================================
      // LOGIN
      // ============================================================

      await continueShopping.navigateToLoginPage();

      await continueShopping.login(
        'dell1788704725771@xminds.com',
        'Xminds@123'
      );


      // ============================================================
      // ADD FIRST 3 PRODUCTS
      // ============================================================

      await continueShopping.addFirstThreeProducts();


      // ============================================================
      // OPEN CART
      // ============================================================

      await continueShopping.openCart();


      // ============================================================
      // VALIDATE CART
      // ============================================================

      await continueShopping.verifyAllProductsInCart([
        'ADIDAS ORIGINAL',
        'ZARA COAT',
        'iphone 13 pro'
      ]);


      // ============================================================
      // CHECKOUT
      // ============================================================

      await continueShopping.clickCheckout();


      // ============================================================
      // PAYMENT DETAILS
      // ============================================================

      await continueShopping.enterCVV('312');

      await continueShopping.enterExpiryYear('29');

      await continueShopping.enterNameOnCard('Peter');


      // ============================================================
      // COUNTRY
      // ============================================================

      await continueShopping.selectCountry('Aus');


      // ============================================================
      // PLACE ORDER
      // ============================================================

      await continueShopping.clickPlaceOrder();


      // ============================================================
      // GO TO HOME
      // ============================================================

      await continueShopping.clickHome();


      // ============================================================
      // ADD 3 MORE PRODUCTS
      // ============================================================

      await continueShopping.addFirstThreeProducts();


      // ============================================================
      // OPEN CART AGAIN
      // ============================================================

      await continueShopping.openCart();


      // ============================================================
      // CLICK CONTINUE SHOPPING
      // ============================================================

      await continueShopping.clickContinueShopping();

    }
  );

});