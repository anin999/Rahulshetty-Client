import { test, expect } from '@playwright/test';

import { Logger } from '../utils/Logger';
import { TestUtils } from '../utils/TestUtils';
import { WaitUtils } from '../utils/WaitUtils';

test('Utils Demo - Verify Utility Functions', async ({ page }) => {

  Logger.info('Utils demo test started');

  Logger.info('Opening Flipkart website');

  await page.goto('https://www.flipkart.com/');

  Logger.pass('Flipkart website opened successfully');

  await WaitUtils.waitForPageLoad(page);

  Logger.info('Page load completed');

  const title = await TestUtils.getPageTitle(page);

  Logger.info(`Page Title : ${title}`);

  expect(title).toContain('Online Shopping Site');

  const currentUrl = TestUtils.getCurrentUrl(page);

  Logger.info(`Current URL : ${currentUrl}`);

  expect(currentUrl).toContain('flipkart');

  Logger.info('Refreshing page');

  await TestUtils.refreshPage(page);

  await WaitUtils.waitForPageLoad(page);

  Logger.pass('Page refreshed successfully');

  Logger.info('Testing delay utility');

  await WaitUtils.delay(page, 2000);

  Logger.pass('Delay completed successfully');

  Logger.pass('Utils demo test completed successfully');
});