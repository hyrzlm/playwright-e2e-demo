import { test, expect } from './fixtures';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart('sauce-labs-backpack');
    await loggedIn.addToCart('sauce-labs-bolt-t-shirt');
    await loggedIn.openCart();
    await cartPage.checkout();
  });

  test('completes an order end to end', async ({ checkoutPage, inventoryPage }) => {
    await checkoutPage.fillInformation('Ada', 'Lovelace', '6014');
    await checkoutPage.finishButton.click();
    await checkoutPage.expectComplete();
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('order total equals subtotal plus tax', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('Ada', 'Lovelace', '6014');

    const subtotal = CheckoutPage.amount(await checkoutPage.subtotal.textContent());
    const tax = CheckoutPage.amount(await checkoutPage.tax.textContent());
    const total = CheckoutPage.amount(await checkoutPage.total.textContent());

    expect(subtotal).toBeCloseTo(29.99 + 15.99, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  const required = [
    { field: 'first name', first: '', last: 'Lovelace', postal: '6014', message: 'First Name is required' },
    { field: 'last name', first: 'Ada', last: '', postal: '6014', message: 'Last Name is required' },
    { field: 'postal code', first: 'Ada', last: 'Lovelace', postal: '', message: 'Postal Code is required' },
  ];
  for (const r of required) {
    test(`blocks checkout without a ${r.field}`, async ({ checkoutPage }) => {
      await checkoutPage.fillInformation(r.first, r.last, r.postal);
      await expect(checkoutPage.error).toContainText(r.message);
    });
  }
});
