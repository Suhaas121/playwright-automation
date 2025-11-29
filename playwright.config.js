// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.ENV || 'dev'}`) });

console.log(`\n============================================`);
console.log(`🚀 Running Playwright Tests`);
console.log(`🌐 Environment : ${process.env.ENV || 'DEV'}`);
console.log(`🔗 Base URL    : ${process.env.URL}`);
console.log(`============================================\n`);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    // ['list'], // optional, you can enable list reporter
  ],

  use: {
    baseURL: process.env.URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
