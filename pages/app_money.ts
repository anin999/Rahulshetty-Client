import { test, expect, Page } from '@playwright/test';

// ---------------------- Page Objects ----------------------

class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://manage.forever699.in/');
    await this.page.waitForLoadState('networkidle'); // ensure page fully loaded
  }

  async login(mobile: string, password: string) {
    const mobileInput = this.page.getByRole('textbox', { name: /mobile number/i });
    await expect(mobileInput).toBeVisible({ timeout: 10000 });
    await mobileInput.fill(mobile);

    const passwordInput = this.page.getByRole('textbox', { name: /password/i });
    await expect(passwordInput).toBeVisible({ timeout: 10000 });
    await passwordInput.fill(password);

    const loginBtn = this.page.getByRole('button', { name: /Quick Login/i });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      loginBtn.click(),
    ]);

    const dashboardReady = this.page.getByText(/Welcome Back/i);
    await expect(dashboardReady).toBeVisible({ timeout: 20000 });
  }
}

class DashboardPage {
  constructor(private page: Page) {}

  async handlePopups() {
    const possiblePopups = [
      this.page.getByText('×'),
      this.page.getByRole('button', { name: '✖' }),
      this.page.locator('button:has-text("✖")'),
      this.page.getByRole('button', { name: /Got it/i }),
    ];

    for (const popup of possiblePopups) {
      try {
        if (await popup.isVisible({ timeout: 2000 })) {
          await popup.click();
          await this.page.waitForTimeout(500);
        }
      } catch {}
    }
  }

  async goToWithdraw() {
    const withdrawBtn = this.page.getByText('Withdraw', { exact: true });
    await expect(withdrawBtn).toBeVisible({ timeout: 20000 });
    await withdrawBtn.scrollIntoViewIfNeeded();

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      withdrawBtn.click(),
    ]);
  }
}

class WithdrawPage {
  constructor(private page: Page) {}

  async withdraw(account: string, ifsc: string) {
    const accountInput = this.page.getByPlaceholder('Enter Account Number');
    await expect(accountInput).toBeVisible({ timeout: 10000 });
    await accountInput.fill(account);

    const ifscInput = this.page.getByRole('textbox', { name: /IFSC Code/i });
    await expect(ifscInput).toBeVisible({ timeout: 10000 });
    await ifscInput.fill(ifsc);

    const withdrawBtn = this.page.getByRole('button', { name: /Instant Withdraw/i });
    await expect(withdrawBtn).toBeVisible({ timeout: 10000 });
    await withdrawBtn.scrollIntoViewIfNeeded();

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      withdrawBtn.click(),
    ]);

    // ---- Handle "Withdrawal limit exceeded" popup ----
    const maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const popupDiv = this.page.locator('div').filter({ hasText: 'Withdrawal limit exceeded.' }).nth(1);
        if (await popupDiv.isVisible({ timeout: 2000 }).catch(() => false)) {
          await popupDiv.click({ force: true });
        }

        const closeBtn = this.page.getByRole('button', { name: 'Close' });
        if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await closeBtn.click({ force: true });
          console.log('✅ Popup closed successfully');
          break; // exit loop after successful close
        }
      } catch {
        await this.page.waitForTimeout(1000); // wait before retry
      }
    }
  }

  async withdrawWithRetries(account: string, ifsc: string, totalAttempts: number, delayMs: number) {
    for (let i = 0; i < totalAttempts; i++) {
      console.log(`🔁 Attempt ${i + 1} of ${totalAttempts}`);
      await this.withdraw(account, ifsc);
      if (i < totalAttempts - 1) await this.page.waitForTimeout(delayMs);
    }
  }
}

// ---------------------- Tests ----------------------

test.describe('Withdraw Flows', () => {
  let loginPage: LoginPage;
  let dashboard: DashboardPage;
  let withdrawPage: WithdrawPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    withdrawPage = new WithdrawPage(page);

    await loginPage.goto();
    await loginPage.login('8891753553', 'anin1993');
    await dashboard.handlePopups();
    await dashboard.goToWithdraw();
  });

  test('Withdraw using South Indian Bank account (4 attempts, 7s delay)', async () => {
    await withdrawPage.withdrawWithRetries(
      '0396053000074605',
      'SIBL0000503',
      4,
      7000
    );
  });

  test('Withdraw using SBI account (35170315325)', async () => {
    await withdrawPage.withdraw('35170315325', 'SBIN0004360');
  });

  test('Withdraw using SBI account (42097721574)', async () => {
    await withdrawPage.withdraw('42097721574', 'SBIN0004360');
  });
});
