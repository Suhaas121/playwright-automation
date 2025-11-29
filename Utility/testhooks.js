// testHooks.js
import fs from 'fs';
import path from 'path';

/**
 * Clear all files in a folder
 * @param {string} folderPath
 */
function clearFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const filePath = path.join(folderPath, file);
      fs.unlinkSync(filePath);
    });
    console.log(`🗑️ Cleared folder: ${folderPath}`);
  }
}

/**
 * Register Playwright hooks
 * @param {import('@playwright/test').TestType} test
 */
export function registerHooks(test) {
  const results = [];

  test.beforeAll(async () => {
    console.log('🚀 Before All: Clearing old screenshots and videos');
    clearFolder('playwright-report/screenshots');
    clearFolder('playwright-report/videos');
  });

  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`🔹 Starting test: ${testInfo.title}`);

    // Navigate to base URL
    await page.goto(process.env.URL || 'https://www.saucedemo.com/');

    // Set consistent viewport
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`🔸 Finished test: ${testInfo.title} -> ${testInfo.status}`);

    // Screenshot on failure
    if (testInfo.status !== 'passed') {
      const screenshotPath = `playwright-report/screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    }

    // Save result
    results.push({
      test: testInfo.title,
      status: testInfo.status,
      duration: `${(testInfo.duration / 1000).toFixed(2)}s`,
    });
  });

  test.afterAll(() => {
    console.log('✅ After All Tests: Final Summary');

    // Table summary
    const Table = require('cli-table3');
    const table = new Table({
      head: ['Test', 'Status', 'Duration'],
      colWidths: [50, 15, 10],
    });

    results.forEach(r => table.push([r.test, r.status, r.duration]));
    console.log('\n🎯 Playwright Test Summary:\n');
    console.log(table.toString());

    fs.writeFileSync('test-summary.txt', table.toString());
    console.log('💾 Test summary saved to test-summary.txt');
  });
}
