import { test, expect } from './fixtures';

test.describe('Inventory', () => {
  test('lists six products', async ({ loggedIn }) => {
    await expect(loggedIn.names).toHaveCount(6);
  });

  test('sorts by price, low to high', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.priceValues();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts by price, high to low', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.priceValues();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts by name, Z to A', async ({ loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await loggedIn.names.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });
});
