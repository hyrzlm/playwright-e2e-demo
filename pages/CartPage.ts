import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
