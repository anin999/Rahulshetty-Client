import { Page } from '@playwright/test';

export class WaitUtils {

  static async delay(page: Page, milliseconds = 2000) {
    await page.waitForTimeout(milliseconds);
  }

  static async waitForPageLoad(page: Page) {
    await page.waitForLoadState('domcontentloaded');
  }
}


