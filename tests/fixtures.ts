import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
} as const;

// Public demo credentials published on the Sauce Demo login page
export const PASSWORD = 'secret_sauce';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Inventory page after logging in as standard_user. */
  loggedIn: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  loggedIn: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard, PASSWORD);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
