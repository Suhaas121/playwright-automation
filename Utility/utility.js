// @ts-check

export class PlaywrightUtils {
  /**
     * @param {any} page
     * @param {any} expect
     */
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }

  // Navigation Methods
  /**
     * @param {any} url
     */
  async goto(url) {
    await this.page.goto(url);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  // Wait Methods
  /**
     * @param {any} selector
     */
  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async waitForLoadState(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
     * @param {any} timeout
     */
  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  // Action Methods
  /**
     * @param {any} selector
     * @param {any} value
     */
  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  /**
     * @param {any} selector
     */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /**
     * @param {any} selector
     */
  async dblClick(selector) {
    await this.page.locator(selector).dblclick();
  }

  /**
     * @param {any} selector
     */
  async check(selector) {
    await this.page.locator(selector).check();
  }

  /**
     * @param {any} selector
     */
  async uncheck(selector) {
    await this.page.locator(selector).uncheck();
  }

  /**
     * @param {any} selector
     * @param {any} value
     */
  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
     * @param {any} selector
     */
  async scrollIntoView(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
     * @param {any} selector
     * @param {any} filePath
     */
  async setInputFiles(selector, filePath) {
    await this.page.locator(selector).setInputFiles(filePath);
  }

  // Keyboard Methods
  /**
     * @param {any} key
     */
  async keyboardPress(key) {
    await this.page.keyboard.press(key);
  }

  /**
     * @param {any} text
     */
  async keyboardType(text) {
    await this.page.keyboard.type(text);
  }

  // Assertion Methods
  /**
     * @param {any} pattern
     */
  async toHaveTitle(pattern) {
    await this.expect(this.page).toHaveTitle(pattern);
  }

  /**
     * @param {any} url
     */
  async toHaveURL(url) {
    await this.expect(this.page).toHaveURL(url);
  }

  /**
     * @param {any} selector
     * @param {any} value
     */
  async toHaveValue(selector, value) {
    await this.expect(this.page.locator(selector)).toHaveValue(value);
  }

  /**
     * @param {any} selector
     */
  async toBeVisible(selector) {
    await this.expect(this.page.locator(selector)).toBeVisible();
  }

  /**
     * @param {any} selector
     * @param {any} text
     */
  async toContainText(selector, text) {
    await this.expect(this.page.locator(selector)).toContainText(text);
  }

  /**
     * @param {any} selector
     * @param {any} text
     */
  async toHaveText(selector, text) {
    await this.expect(this.page.locator(selector)).toHaveText(text);
  }

  /**
     * @param {any} selector
     */
  async toBeHidden(selector) {
    await this.expect(this.page.locator(selector)).toBeHidden();
  }

  /**
     * @param {any} selector
     */
  async toBeEnabled(selector) {
    await this.expect(this.page.locator(selector)).toBeEnabled();
  }

  /**
     * @param {any} selector
     */
  async toBeDisabled(selector) {
    await this.expect(this.page.locator(selector)).toBeDisabled();
  }

  /**
     * @param {any} selector
     * @param {any} count
     */
  async toHaveCount(selector, count) {
    await this.expect(this.page.locator(selector)).toHaveCount(count);
  }

  /**
     * @param {any} selector
     * @param {any} attribute
     * @param {any} value
     */
  async toHaveAttribute(selector, attribute, value) {
    await this.expect(this.page.locator(selector)).toHaveAttribute(attribute, value);
  }

  async toHaveScreenshot() {
    await this.expect(this.page).toHaveScreenshot();
  }
}