import { test, expect } from './fixtures';

test.describe('Cart', () => {
  test('badge counts items as they are added and removed', async ({ loggedIn }) => {
    await expect(loggedIn.cartBadge).toBeHidden();

    await loggedIn.addToCart('sauce-labs-backpack');
    await expect(loggedIn.cartBadge).toHaveText('1');

    await loggedIn.addToCart('sauce-labs-bike-light');
    await expect(loggedIn.cartBadge).toHaveText('2');

    await loggedIn.removeFromCart('sauce-labs-backpack');
    await expect(loggedIn.cartBadge).toHaveText('1');
  });

  test('cart shows the items that were added', async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart('sauce-labs-backpack');
    await loggedIn.addToCart('sauce-labs-onesie');
    await loggedIn.openCart();

    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.items.getByTestId('inventory-item-name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Onesie',
    ]);
  });
});
