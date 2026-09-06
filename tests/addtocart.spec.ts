import { test } from '@playwright/test';
import { AddToCartPage } from '../pages/addtocart';

test.describe('Login, Add To Cart, Remove From Cart and Home Workflow', () => {

  test('Login and add/remove products from cart', async ({ page }) => {

    const addToCartPage = new AddToCartPage(page);

    const email = 'dell1788704725771@xminds.com';
    const password = 'Xminds@123';

    // ============================================================
    // STEP 1 - Navigate to Login
    // ============================================================

    console.log('\n========== STEP 1 - LOGIN ==========\n');

    await addToCartPage.navigateToLoginPage();

    // ============================================================
    // STEP 2 - Login
    // ============================================================

    await addToCartPage.login(email, password);

    // ============================================================
    // STEP 3 - Add ADIDAS ORIGINAL
    // ============================================================

    console.log('\n========== STEP 2 - ADD ADIDAS ==========\n');

    await addToCartPage.verifyAdidasProduct();

    await addToCartPage.addAdidasToCart();

    // ============================================================
    // STEP 4 - Add ZARA COAT
    // ============================================================

    console.log('\n========== STEP 3 - ADD ZARA COAT ==========\n');

    await addToCartPage.verifyZaraProduct();

    await addToCartPage.addZaraToCart();

    // ============================================================
    // STEP 5 - Add IPHONE 13 PRO
    // ============================================================

    console.log('\n========== STEP 4 - ADD IPHONE ==========\n');

    await addToCartPage.verifyIphoneProduct();

    await addToCartPage.addIphoneToCart();

    // ============================================================
    // STEP 6 - Open Cart
    // ============================================================

    console.log('\n========== STEP 5 - OPEN CART ==========\n');

    await addToCartPage.openCart();

    // ============================================================
    // STEP 7 - Validate Products In Cart
    // ============================================================

    console.log('\n========== STEP 6 - VALIDATE CART ==========\n');

    await addToCartPage.verifyAdidasInCart();

    await addToCartPage.verifyZaraInCart();

    await addToCartPage.verifyIphoneInCart();

    console.log('[PASS] All 3 selected products are present in cart');

    // ============================================================
    // STEP 8 - Remove ADIDAS
    // ============================================================

    console.log('\n========== STEP 7 - REMOVE ADIDAS ==========\n');

    await addToCartPage.removeAdidasFromCart();

    // ============================================================
    // STEP 9 - Remove ZARA
    // ============================================================

    console.log('\n========== STEP 8 - REMOVE ZARA ==========\n');

    await addToCartPage.removeZaraFromCart();

    // ============================================================
    // STEP 10 - Remove IPHONE
    // ============================================================

    console.log('\n========== STEP 9 - REMOVE IPHONE ==========\n');

    await addToCartPage.removeIphoneFromCart();

    // ============================================================
    // STEP 11 - Return Home
    // ============================================================

    console.log('\n========== STEP 10 - RETURN HOME ==========\n');

    await addToCartPage.clickHome();

    console.log('\n==============================================');
    console.log('[PASS] COMPLETE ADD/REMOVE CART WORKFLOW');
    console.log('==============================================\n');
  });

});