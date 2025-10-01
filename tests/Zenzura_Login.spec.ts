import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages/zencuralogin';

test.setTimeout(300_000);

test('Login and navigate to Technicians', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await page.waitForTimeout(3000); 

  await loginPage.login('anin.fletcher@xminds.com', 'Xminds@123');
  await page.waitForTimeout(3000);

  await dashboardPage.navigateToTechnicians();
  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/.*technicians/);
  await page.waitForTimeout(3000);
});
