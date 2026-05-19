import { test, expect } from "@playwright/test";

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
// Root cause:
// Placeholder text was incorrect. Test used "User Name"
// but actual placeholder is "Username".

// Fix:
// Changed getByPlaceholder("User Name")
// to getByPlaceholder("Username").

// How I verified:
// Ran:
// npx playwright test tests/broken-tests.spec.ts
// and confirmed the test passed.


test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();
await expect(
  page.locator('[data-test="error"]')
).toContainText("Username and password do not match any user");

});

// REPORT FOR TEST #2
// Root cause:
// Assertion expected incorrect error text.

// Fix:
// Updated expected text to match actual error message.

// How I verified:
// Ran:
// npx playwright test tests/broken-tests.spec.ts
// and confirmed the test passed.


test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// REPORT FOR TEST #3
// Root cause:
// The click action was missing "await", so Playwright did not wait
// for the product to be added before checking the cart badge.

// Fix:
// Added "await" before:
// page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

// How I verified:
// Ran:
// npx playwright test tests/broken-tests.spec.ts
// and confirmed the cart badge showed "1" and the test passed.