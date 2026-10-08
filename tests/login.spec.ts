import { test, expect, USERS, PASSWORD } from './fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user lands on the inventory page', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error and stays on login', async ({ page, loginPage }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await loginPage.expectError('Sorry, this user has been locked out.');
    await expect(page).not.toHaveURL(/inventory/);
  });

  test('wrong password is rejected', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, 'not-the-password');
    await loginPage.expectError('Username and password do not match');
  });

  const missing = [
    { case: 'username', user: '', pass: PASSWORD, message: 'Username is required' },
    { case: 'password', user: USERS.standard, pass: '', message: 'Password is required' },
  ];
  for (const m of missing) {
    test(`empty ${m.case} shows "${m.message}"`, async ({ loginPage }) => {
      await loginPage.login(m.user, m.pass);
      await loginPage.expectError(m.message);
    });
  }

  test('inventory page is not reachable without logging in', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });
});
