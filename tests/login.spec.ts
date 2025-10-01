import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';  

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await page.waitForTimeout(1000); 
  await loginPage.login('akhilr@xminds.com', '@Dm!n**4455');
});