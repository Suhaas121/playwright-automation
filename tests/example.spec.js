// @ts-check
import { test, expect } from '@playwright/test';
import { PlaywrightUtils } from '../Utility/utility';
import * as dotenv from 'dotenv';

dotenv.config();

const selectors = {
  usernameInput: "//input[@placeholder='Username']",
  passwordInput: "//input[@placeholder='Password']",
  submitButton: "//input[@type='submit']",
  swagLabsTitle: "//div[text()='Swag Labs']",
  productsLabel: "//span[text()='Products']",
  sortDropdown: "//select[@class='product_sort_container']",
  cartLink: "//a[@class='shopping_cart_link']",
  inventoryImages: "//img[@class='inventory_item_img']",
  nameAtoZOption: "//option[text()='Name (A to Z)']",
  secondaryHeader: "//div[@class='header_secondary_container']"
};

test('has title', async ({ page }) => {
  const utils = new PlaywrightUtils(page, expect);

  await utils.goto(process.env.URL);
  await utils.waitForSelector(selectors.submitButton);

  // 👇 values from .env
  console.log("URL from env:", process.env.URL);
  await utils.fill(selectors.usernameInput, process.env.USERNAMES);
  await utils.toHaveValue(selectors.usernameInput, process.env.USERNAMES);

  await utils.toHaveValue(selectors.passwordInput, "");
  await utils.fill(selectors.passwordInput, process.env.PASSWORD);

  await utils.toBeVisible(selectors.submitButton);
  await utils.keyboardPress('Enter');

  await utils.toHaveTitle('Swag Labs');
  await utils.toContainText(selectors.swagLabsTitle, 'Swag Labs');
  await utils.toHaveURL(process.env.URL + "inventory.html");
  
  await utils.reload();
  await utils.waitForTimeout(3000);
});

test('get started link', async ({ page }) => {
  const utils = new PlaywrightUtils(page, expect);

  await utils.goto(process.env.URL);
  await utils.fill(selectors.usernameInput, process.env.USERNAMES);
  await utils.fill(selectors.passwordInput, process.env.PASSWORD);

  await utils.click(selectors.submitButton);

  await utils.toHaveText(selectors.productsLabel, "Products");
  await utils.toBeHidden(selectors.nameAtoZOption);
  await utils.toBeEnabled(selectors.cartLink);

  await utils.click(selectors.cartLink);
  await utils.goBack();
  await utils.waitForLoadState('networkidle');

  await utils.toHaveCount(selectors.inventoryImages, 6);
  await utils.toHaveAttribute(selectors.secondaryHeader, 'data-test', 'secondary-header');

  await utils.scrollIntoView("(//img[@class='inventory_item_img'])[6]");
  await utils.selectOption(selectors.sortDropdown, "Price (low to high)");

  await utils.goForward();
});
