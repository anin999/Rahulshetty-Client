import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    browserName: 'chromium',
    headless: false,

    // Use the full browser window
    viewport: null,

    launchOptions: {
      args: ['--start-maximized'],
    },
  },
});