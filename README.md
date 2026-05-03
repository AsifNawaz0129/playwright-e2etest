# Swag Labs - Professional Playwright Framework

This project is a high-grade automation framework built with **Playwright** and **TypeScript**, targeting the [SauceDemo](https://www.saucedemo.com/) e-commerce platform.

**Lead Engineer:** Asif Nawaz (Senior SQA Engineer)

## 🏗️ Architecture

- **Language:** TypeScript
- **Pattern:** Page Object Model (POM) with a `BasePage` abstraction.
- **Dependency Injection:** Custom Playwright Fixtures (`base.fixture.ts`) for clean test setup and authentication handling.
- **Infrastructure:**
  - Parallel execution enabled.
  - Multi-browser support (Chromium, Firefox, WebKit).
  - Native Playwright reporting (HTML/List).
  - Snapshot-based visual regression testing.

## 🚀 Getting Started

### Prerequisites
- Node.js LTS
- NPM or Yarn

### Installation
```bash
npm install
npx playwright install
```

### Running Tests
```bash
# Run all tests in headless mode
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in UI mode
npx playwright test --ui

# Debugging mode
npx playwright test --debug

# Visual testing update
npx playwright test --update-snapshots
```

## 📋 Reporting
After running tests, view the comprehensive HTML report:
```bash
npx playwright show-report
```

## 🛠️ CI/CD
Integrated with **GitHub Actions**. The pipeline handles:
- Browser binary installation.
- Parallel test execution.
- Artifact upload for HTML reports on failure.
- Environment secret management.

---
*Created as a demonstration of Senior SDET capabilities for the Sauce Labs ecosystem.*
