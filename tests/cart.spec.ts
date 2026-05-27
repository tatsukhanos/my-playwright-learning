import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';


test.describe('Cart behavior', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });

test('Test 2.1 - Cart badge shows correct count after adding a product', async () => {
    await inventoryPage.addBackpackToCart();

    await expect(
      inventoryPage.cartBadge,
      'Cart badge should show 1 after adding one product'
    ).toHaveText('1');
  });


test('Test 2.2 - Cart page shows the name of the selected product', async () => {

  await inventoryPage.addBackpackToCart();

  await inventoryPage.openCart();

  await expect(
    cartPage.backpackItem,
    'Cart should display selected product name'
  ).toContainText('Sauce Labs Backpack');
});


test('Test 2.3.1 - Removing a product updates the cart badge', async () => {
  await inventoryPage.addBackpackToCart();

  await expect(
    inventoryPage.cartBadge,
    'Cart badge should show 1 after adding product'
  ).toHaveText('1');

  await inventoryPage.removeBackpackFromCart();

  await expect(
    inventoryPage.cartBadge,
    'Cart badge should disappear after removing product'
  ).toBeHidden();
});

test('Test 2.3.2 - Removing one product decrements cart badge count', async () => {
  await inventoryPage.addBackpackToCart();

  await inventoryPage.addBikeLightToCart();

  await expect(
    inventoryPage.cartBadge,
    'Cart badge should show 2 after adding two products'
  ).toHaveText('2');

  await inventoryPage.removeBackpackFromCart();

  await expect(
    inventoryPage.cartBadge,
    'Cart badge should show 1 after removing one of two products'
  ).toHaveText('1');
});

test('Test 2.4 - Adding multiple products shows correct badge count', async () => {
  await inventoryPage.addBackpackToCart();

  await inventoryPage.addBikeLightToCart();

  await expect(
    inventoryPage.cartBadge,
    'Cart badge should show 2 after adding two products'
  ).toHaveText('2');
});


    });