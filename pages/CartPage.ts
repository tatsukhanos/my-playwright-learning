import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly backpackItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.backpackItem = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}