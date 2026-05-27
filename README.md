# Final Project — Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Project overview
This project contains automated UI tests for the SauceDemo web application using Playwright and TypeScript.

The automation framework follows the Page Object Model (POM) design pattern to keep tests clean, reusable, and maintainable.

Covered user flows include:
- Login validation
- Cart behavior
- Checkout flow
- Product sorting

---

## Technologies used
- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

## Test coverage

### Login behavior
- Valid user can log in and see inventory page
- Locked out user sees error message
- Wrong password shows validation error
- Empty username shows validation error

### Cart behavior
- Cart badge updates after adding products
- Cart page displays selected product
- Removing products updates cart badge correctly
- Multiple products show correct cart count

### Checkout flow
- User can enter checkout information
- Overview page shows selected product
- User can complete checkout successfully
- Back Home button appears after successful order

### Product sorting
- User can select "Price (low to high)"
- Product prices are displayed in ascending order

---

## Project structure

```txt
my-playwright-learning/
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── broken-tests.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── example.spec.ts
│   ├── final-project.spec.ts
│   ├── login.spec.ts
│   ├── my-first.spec.ts
│   ├── saucedemo.spec.ts
│   ├── sorting.spec.ts
│   └── UA.spec.ts
│
├── test-data/
│   └── users.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Automation design decisions
- Page Objects are separated by application pages
- Test data is stored separately from test logic
- Semantic locators are used (`getByRole`, `getByPlaceholder`, `data-test`)
- Web-first assertions are used throughout the suite
- No hard waits (`waitForTimeout`) are used
- Tests are independent and do not share state

---

## How to install dependencies

```bash
npm install
```

---

## Install Playwright browsers

```bash
npx playwright install
```

---

## Run all tests

```bash
npx playwright test
```

---

## Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

Example:

```bash
npx playwright test tests/cart.spec.ts
```

---

## Open Playwright HTML report

```bash
npx playwright show-report
```

---

## Reproducibility
A new team member should be able to:
1. Clone the repository
2. Run `npm install`
3. Run `npx playwright install`
4. Run `npx playwright test`

and execute the full test suite successfully.

---

## Known limitations
- The suite covers selected UI flows only
- API testing is not included
- Cross-browser edge cases are not deeply covered
- Some additional practice spec files remain in the repository from earlier learning exercises
```