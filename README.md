# ⚡  Playwright E2E Automation Framework

[![CI Passing](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)](#)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%230074c1.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

### 🎯 Overview
This repository contains a high-grade, scalable End-to-End (E2E) automation framework built with **Playwright** and **TypeScript**, targeting the SauceDemo (Swag Labs) e-commerce platform. It is designed to demonstrate senior-level SDET architecture, focusing on type safety, custom fixture injection, visual regression, and seamless CI/CD integration.

---

### 🚀 Core Features & Architecture

* **Design Pattern:** Implements a strict **Page Object Model (POM)** with a `BasePage` abstraction to handle common page interactions, ensuring maximum code reusability.
* **Dependency Injection:** Utilizes Custom Playwright Fixtures (`base.fixture.ts`) to cleanly manage test setup, teardown, and authentication states without cluttering test files.
* **Visual Regression Testing:** Integrated snapshot-based testing to detect unintended visual changes across multiple browsers (`Chromium`, `Firefox`, `WebKit`).
* **Robust Infrastructure:** Configured for parallel execution and cross-browser testing natively through `playwright.config.ts`.
* **Continuous Integration (CI/CD):** Fully integrated with **GitHub Actions**. The pipeline automatically handles browser binary installation, parallel test execution, and HTML report artifact uploads upon failure.
* **Environment Management:** Uses `.env` configuration to securely manage test data and environment secrets.

---

### 📂 Framework Structure

```text
playwright-e2etest/
├── .github/workflows/
│   └── playwright.yml          # CI/CD pipeline configuration (GitHub Actions)
├── src/
│   ├── framework/
│   │   ├── fixtures/
│   │   │   └── base.fixture.ts # Custom Playwright Fixtures for Dependency Injection
│   │   └── pages/
│   │       ├── BasePage.ts     # POM abstraction layer
│   │       ├── InventoryPage.ts
│   │       └── LoginPage.ts
│   └── tests/e2e/
│       ├── checkout.spec.ts-snapshots/ # Visual regression baseline images
│       └── checkout.spec.ts            # Core test specifications
├── .env.example                # Template for environment variables
├── playwright.config.ts        # Core Playwright and browser configurations
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # Node dependencies and execution scripts
```

---

### 💻 Local Execution

To run the framework locally, ensure you have Node.js 20+ installed.

1. **Install Dependencies:**
   ```bash
   npm ci
   npx playwright install --with-deps
   ```
2. **Run Tests in Headless Mode:**
   ```bash
   npx playwright test
   ```
3. **Run Tests with UI Mode:**
   ```bash
   npx playwright test --ui
   ```
4. **Debug Tests:**
   ```bash
   npx playwright test --debug
   ```

---

### ⏱️ Advanced Synchronization Patterns

To combat flakiness effectively, this framework utilizes advanced synchronization instead of hardcoded `waitForTimeout` sleeps:
* **`waitForLoadState('networkidle')`**: Used prior to capturing visual snapshots to ensure all dynamically loaded assets (e.g., images) are fully rendered.
* **Auto-waiting Locators**: By leaning on `getByRole` and `getByTestId`, Playwright inherently waits for elements to be attached, visible, and actionable before executing actions.
* **State Verification**: Post-login assertions wait on definitive DOM state changes (`waitForSelector`) to guarantee the application state before proceeding.

---

### 🤖 AI-Assisted Test Engineering Integration

This framework incorporates early support for AI-assisted workflows using `@google/genai` (as provisioned in dependencies). Moving towards autonomous test generation, GenAI can be hooked into Playwright fixtures to automatically map DOM changes to POM updates or dynamically heal broken locators based on test traces.