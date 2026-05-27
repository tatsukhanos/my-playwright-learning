import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';


test.describe('Login behavior', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Test 1.1 - Valid user can log in and see inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
  users.standard.username,
  users.standard.password
);

    await expect(
      page,
      'User should be redirected to inventory page after successful login'
    ).toHaveURL(/inventory/);
  });

  test('Test 1.2 - Locked out user cannot log in and sees error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

   await loginPage.login(
  users.lockedOut.username,
  users.standard.password
);

    await expect(
      loginPage.errorMessage,
      'Locked out user should see lockout error message'
    ).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

test('Test 1.3 - Wrong password shows error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    users.standard.username,
    'wrong_password'
  );

  await expect(
    loginPage.errorMessage,
    'User should see error message when password is wrong'
  ).toContainText('Username and password do not match');
});

test('Test 1.4 - Empty username shows validation error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    '',
    users.standard.password
  );

  await expect(
    loginPage.errorMessage,
    'User should see validation error when username is empty'
  ).toContainText('Username is required');
});

});