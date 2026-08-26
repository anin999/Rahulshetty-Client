import { Page } from '@playwright/test';

export class TestUtils {

  static async getPageTitle(page: Page): Promise<string> {
    return await page.title();
  }

  static getCurrentUrl(page: Page): string {
    return page.url();
  }

  static async refreshPage(page: Page) {
    await page.reload();
  }
}