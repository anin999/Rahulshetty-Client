import { test, expect, Page } from '@playwright/test';

// ---------------------- Page Objects ----------------------

class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://manage.forever699.in/v2/');
    await this.page.waitForTimeout(2000); // 2s delay
  }

  async login(mobile: string, password: string) {
    const mobileInput = this.page.getByRole('textbox', { name: /mobile number/i });
    await expect(mobileInput).toBeVisible({ timeout: 10000 });
    await mobileInput.fill(mobile);
    await this.page.waitForTimeout(2000);

    const passwordInput = this.page.getByRole('textbox', { name: /password/i });
    await expect(passwordInput).toBeVisible({ timeout: 10000 });
    await passwordInput.fill(password);
    await this.page.waitForTimeout(2000);

    const loginBtn = this.page.getByRole('button', { name: /Quick Login/i });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await loginBtn.click();
    await this.page.waitForTimeout(2000);

    const dashboardReady = this.page.getByText(/Welcome Back/i);
    await expect(dashboardReady).toBeVisible({ timeout: 20000 });
    await this.page.waitForTimeout(2000);
  }
}

class DashboardPage {
  constructor(private page: Page) {}

  async goToWithdraw() {
    const withdrawBtn = this.page.getByText('Withdraw', { exact: true });
    await expect(withdrawBtn).toBeVisible({ timeout: 20000 });
    await withdrawBtn.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await withdrawBtn.click();
    await this.page.waitForTimeout(2000);
  }
}

class WithdrawPage {
  constructor(private page: Page) {}

  async withdraw(account: string, ifsc: string) {
    const accountInput = this.page.getByPlaceholder('Enter Account Number');
    await expect(accountInput).toBeVisible({ timeout: 10000 });
    await accountInput.fill(account);
    await this.page.waitForTimeout(2000);

    const ifscInput = this.page.getByRole('textbox', { name: /IFSC Code/i });
    await expect(ifscInput).toBeVisible({ timeout: 10000 });
    await ifscInput.fill(ifsc);
    await this.page.waitForTimeout(2000);

    const withdrawBtn = this.page.getByRole('button', { name: /Instant Withdraw/i });
    await expect(withdrawBtn).toBeVisible({ timeout: 10000 });
    await this.page.waitForTimeout(2000);
    await withdrawBtn.click();

    // Handle only relevant modals
    await this.handleModal('Withdrawal successful, check your bank account.');
    await this.handleModal('Withdrawal limit exceeded.');
    await this.handleModal('Too many requests. Please refresh the application.');
  }

  async handleModal(message: string): Promise<boolean> {
    const modal = this.page.locator('div').filter({ hasText: message }).first();

    try {
      await modal.waitFor({ state: 'visible', timeout: 7000 });
      console.log(`⚠️ Modal popup detected: "${message}"`);

      const closeBtn = modal.locator('button', { hasText: 'Close' }).first();

      await closeBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(2000);
      await closeBtn.click({ force: true });
      console.log(`✅ Modal "${message}" closed`);
      await this.page.waitForTimeout(2000);

      return true;
    } catch {
      console.log(`ℹ️ Modal "${message}" did not appear within 8 seconds`);
      return false;
    }
  }

  async withdrawMultipleTimes(account: string, ifsc: string, times: number) {
    for (let i = 0; i < times; i++) {
      console.log(`🔁 Withdraw attempt ${i + 1} of ${times} for ${account}/${ifsc}`);
      await this.withdraw(account, ifsc);

      if (i < times - 1) {
        console.log('⏳ Waiting 8 seconds before next attempt...');
        await this.page.waitForTimeout(7000);
      }
    }
  }
}

// ---------------------- Tests ----------------------

test.describe('Withdraw Flows', () => {
  test.describe.configure({ timeout: 10000_0000 }); // extended timeout

  let loginPage: LoginPage;
  let dashboard: DashboardPage;
  let withdrawPage: WithdrawPage;

  // ✅ Configurable accounts list
  const accounts = [
   { account: '0396053000074605', ifsc: 'SIBL0000503' },
   { account: '35170315325', ifsc: 'SBIN0004360' },
   { account: '42097721574', ifsc: 'SBIN0004360' },
   { account: '10300100443771', ifsc: 'FDRL0001030' },
   { account: '42181263095', ifsc: 'SBIN0070737' },
    { account: '42729103326', ifsc: 'SBIN0070737' },
    { account: '40446081611', ifsc: 'SBIN0008628' },
    { account: '184901000004595', ifsc: 'IOBA0001849' },
    { account: '119601547083', ifsc: 'ICIC0001196' },
    { account: '74860100008486', ifsc: 'BARB0VJTHKE' },
    { account: '147210018000079', ifsc: 'UBIN0814725' }
  ];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    withdrawPage = new WithdrawPage(page);

    await loginPage.goto();
    await loginPage.login('8891753553', 'anin1993');
    await dashboard.goToWithdraw();
  });

  test('Instant Withdraw for multiple accounts with modals and 8s delay', async ({ page }) => {
    for (let i = 0; i < accounts.length; i++) {
      const { account, ifsc } = accounts[i];
      console.log(`🟢 Starting 5 withdraw attempts for account ${account}...`);
      await withdrawPage.withdrawMultipleTimes(account, ifsc, 5);

      if (i < accounts.length - 1) {
        console.log('🔄 Hard refreshing the page before next account...');
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(5000);
        await dashboard.goToWithdraw();
      }
    }
  });
});
