// @ts-check
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// ---------------------------
// ⭐ Environment Handling
// ---------------------------

// Default environment → dev
const ENV = process.env.ENV || "dev";

// Load the correct .env file
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${ENV}`)
});

console.log(`\n============================================`);
console.log(`🚀 Running Playwright Tests`);
console.log(`🌐 Environment : ${ENV.toUpperCase()}`);
console.log(`🔗 Base URL    : ${process.env.URL}`);
console.log(`============================================\n`);


// ---------------------------
// ⭐ Playwright Configuration
// ---------------------------
export default defineConfig({
  testDir: './tests',

  // Parallel / Retry logic
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reports
  reporter: 'html',

 use: {
  baseURL: process.env.URL,
  headless: false,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry'
},

  // ---------------------------
  // ⭐ Projects → Always run in Chrome
  // ---------------------------
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    }
  ],
});
