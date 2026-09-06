import { Page } from '@playwright/test';

export class TestUtils2 {
  constructor(private page: Page) {}

  async delay(seconds: number = 3) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async logClick(description: string) {
    console.log(`[CLICK] ${description}`);
  }

  async logAction(description: string) {
    console.log(`[ACTION] ${description}`);
  }
}