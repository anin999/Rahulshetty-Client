import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

console.log('BASE_URL:', process.env.BASE_URL);

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,
    viewport: null,

    launchOptions: {
      args: ['--start-maximized'],
    },
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },

    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },

    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
  ],
});