import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('Product sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);

    await loginPage.open();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });

  test('Test 4.1 - User can select "Price (low to high)" sorting option', async () => {
  await inventoryPage.sortByPriceLowToHigh();

  await expect(
    inventoryPage.sortDropdown,
    'Selected sorting option should be Price (low to high)'
  ).toHaveValue('lohi');
});

  test('Test 4.2 - Products are sorted by price from low to high', async () => {
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(
          prices,
          'Product prices should be sorted from low to high'
      ).toEqual(sortedPrices);
  });


});