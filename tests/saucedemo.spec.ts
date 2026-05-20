import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo tests', () => {

  test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Task 1 - Login happy path', async ({ page }) => {

    await page.locator('#user-name').fill(USERNAME);

    await page.locator('#password').fill(PASSWORD);

    await page.locator('#login-button').click();

    await expect(page,
    'User should be redirected to inventory page after successful login'
  ).toHaveURL(/inventory/);
  });

test('Task 2 — Negative login', async ({ page }) => {
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(
  page.locator('[data-test="error"]'),
  'Error should appear for wrong credentials'
).toBeVisible();
});

test('Task 3 — Add product to cart', async ({ page }) => {
  // login
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();

  // add product
  await page.locator('#add-to-cart-sauce-labs-backpack').click();

  // verify cart badge
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 1 after adding product'
  ).toHaveText('1');
});

test('Task 4 — Remove product from cart', async ({ page }) => {

  // login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // add product
  await page.locator('#add-to-cart-sauce-labs-backpack').click();

  // remove product
  await page.locator('#remove-sauce-labs-backpack').click();

  // verify cart badge disappears
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should disappear after removing product'
  ).not.toBeVisible();

});
test('Task 5 — Empty form validation', async ({ page }) => {

  await page.locator('#login-button').click();

  await expect(
    page.locator('[data-test="error"]'),
    'Error should appear when login form is empty'
  ).toBeVisible();
  await expect(page.locator('[data-test="error"]'),
'Error message should say username is required when form is empty'
).toContainText('Username is required')
});

test('Task 5.1 — Empty form validation, username only', async ({ page }) => {


  await page.locator('#user-name').fill('standard_user');
  await page.locator('#login-button').click();

  await expect(
  page.locator('[data-test="error"]'),
  'Error should appear for wrong credentials'
).toBeVisible();
});

test('Task 5.2 — Empty form validation, username only', async ({ page }) => {
  

  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(
  page.locator('[data-test="error"]'),
  'Error should appear for wrong credentials'
).toBeVisible();
});

test('Task 7 — Multiple rapid clicks should not duplicate cart item', async ({ page }) => {


  // login
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();

  const addButton = page.locator('#add-to-cart-sauce-labs-backpack');
  const removeButton = page.locator('#remove-sauce-labs-backpack');

  // rapid clicks
  await addButton.click();
  removeButton.click();
  await addButton.click();
 await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 1 after adding one product'
  ).toHaveText('1');
});


test('Bonus — Multiple products', async ({ page }) => {

  // login
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();

  // add 3 products
  await page.locator('#add-to-cart-sauce-labs-backpack').click();

  await page.locator('#add-to-cart-sauce-labs-bike-light').click();

  await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();

  // verify cart shows 3
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 3 after adding three products'
  ).toHaveText('3');

  // remove 1 product
  await page.locator('#remove-sauce-labs-bike-light').click();

  // verify cart shows 2
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 2 after removing one product'
  ).toHaveText('2');
});

test('Bonus — Sorting products Z to A', async ({ page }) => {

  // login
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();

  // sort Z to A
  await page.locator('[data-test="product-sort-container"]').selectOption('za');

  // verify first product
  await expect(
    page.locator('.inventory_item_name').first(),
    'First product should be Test.allTheThings() T-Shirt (Red) after sorting Z to A'
  ).toHaveText('Test.allTheThings() T-Shirt (Red)');
});


test('Bonus — Cart keeps item after refresh', async ({ page }) => {

  // login
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();

  // add product
  await page.locator('#add-to-cart-sauce-labs-backpack').click();

  // refresh page
  await page.reload();

  // verify cart still has 1 item
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should still show 1 after page refresh'
  ).toHaveText('1');
});

test('Locked out user should see error message', async ({ page }) => {

  await page.locator('#user-name').fill('locked_out_user');

  await page.locator('#password').fill(PASSWORD);

  await page.locator('#login-button').click();

  await expect(
    page.locator('[data-test="error"]'),
    'Locked out user should see lockout error message'
  ).toContainText(
    'Epic sadface: Sorry, this user has been locked out.'
  );

});


});
