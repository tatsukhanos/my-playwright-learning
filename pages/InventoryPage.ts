import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async addBackpackToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async addBikeLightToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  }

  async removeBackpackFromCart() {
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.cartLink.click();
  }
  async sortByPriceLowToHigh() {
  await this.sortDropdown.selectOption('lohi');
}

async getProductPrices() {
  const pricesText = await this.productPrices.allTextContents();

  return pricesText.map((price) =>
    Number(price.replace('$', ''))
  );
}

}