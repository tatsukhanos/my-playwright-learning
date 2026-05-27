import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';

test.describe('Checkout flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });

  test('Test 3.1 -User can enter checkout information', async ({ page }) => {
    await inventoryPage.addBackpackToCart();

    await inventoryPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCheckoutInfo(
      'Tatsiana',
      'Sukhanos',
      '90038'
    );

    await expect(
      page,
      'User should be redirected to checkout overview page'
    ).toHaveURL(/checkout-step-two/);
  });

  test('Test 3.2 -Overview page shows the selected product', async () => {
  await inventoryPage.addBackpackToCart();

  await inventoryPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo(
    'Tatsiana',
    'Sukhanos',
    '90038'
  );

  await expect(
    checkoutPage.overviewItemName,
    'Checkout overview should display selected product'
  ).toContainText('Sauce Labs Backpack');
});


test('Test 3.3 - Finish button completes the order', async () => {
  await inventoryPage.addBackpackToCart();

  await inventoryPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo(
    'Tatsiana',
    'Sukhanos',
    '90038'
  );

  await checkoutPage.finishOrder();

  await expect(
    checkoutPage.backHomeButton,
    'Back Home button should appear after successful checkout'
  ).toBeVisible();
});

test('Test 3.4 -User can complete checkout and see success message', async () => {
  await test.step('Add product to cart', async () => {
    await inventoryPage.addBackpackToCart();

    await expect(
      inventoryPage.cartBadge,
      'Cart badge should show 1 after adding product'
    ).toHaveText('1');
  });

  await test.step('Open cart and start checkout', async () => {
    await inventoryPage.openCart();

    await expect(
      cartPage.backpackItem,
      'Cart should show selected product before checkout'
    ).toContainText('Sauce Labs Backpack');

    await cartPage.checkout();
  });

  await test.step('Enter checkout information', async () => {
    await checkoutPage.fillCheckoutInfo(
      'Tatsiana',
      'Sukhanos',
      '90038'
    );
  });

  await test.step('Review overview and finish order', async () => {
    await expect(
      checkoutPage.overviewItemName,
      'Checkout overview should show selected product'
    ).toContainText('Sauce Labs Backpack');

    await checkoutPage.finishOrder();

    await expect(
      checkoutPage.successMessage,
      'Success message should appear after completing checkout'
    ).toContainText('Thank you for your order!');
  });
});

});