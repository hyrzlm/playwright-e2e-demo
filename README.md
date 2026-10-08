# playwright-e2e-demo

[![Playwright tests](https://github.com/hyrzlm/playwright-e2e-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/hyrzlm/playwright-e2e-demo/actions/workflows/playwright.yml)

End-to-end UI tests for [Sauce Demo](https://www.saucedemo.com), a public practice store, written with Playwright and TypeScript.

## What's covered

| Area | Checks |
|---|---|
| Login | valid login, locked-out user, wrong password, empty fields, direct URL access without a session |
| Inventory | product count, sorting by price (both ways) and by name |
| Cart | badge count on add/remove, cart contents |
| Checkout | full order, total = subtotal + tax, required-field validation |

17 tests in total.

## How it's built

- **Page objects** in [`pages/`](pages) keep selectors out of the tests.
- **Fixtures** in [`tests/fixtures.ts`](tests/fixtures.ts) hand each test its page objects, plus a `loggedIn` fixture that starts on the inventory page.
- **`data-test` selectors** via `testIdAttribute`, so tests don't break when styling changes.
- **Data-driven cases** for the validation messages, so each field gets its own named test.
- **CI** runs on every push and once a week, type-checks first, and uploads the HTML report as an artifact.

## Run it

```bash
npm ci
npx playwright install chromium
npm test            # headless
npm run test:headed # watch it run
npm run report      # open the last HTML report
```
