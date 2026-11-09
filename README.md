# ⚡ Playwright Enterprise E2E Automation Framework

[![CI Passing](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)](#)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%230074c1.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

### 🎯 Overview
This repository contains a high-grade, scalable End-to-End (E2E) automation framework built with **Playwright** and **TypeScript**. Designed for real-world enterprise architectures, it demonstrates multi-application testing across both standard e-commerce flows (**SauceDemo**) and modern infinite-canvas graphic applications (**TLDraw**).

---

### 🎨 Featured Showcase: The Hybrid Draw (DOM to Canvas Interaction)

#### Why Design & Canvas Tech Companies (e.g. Kittl, Canva, Figma) Care:
Modern design tools present unique automation challenges: they feature standard HTML DOM toolbars, menus, and sidebars wrapped around a complex graphic canvas.

A naive automation script often attempts to drive everything via fragile raw coordinates `(x, y)`, which instantly break across viewport changes. This framework demonstrates the **Hybrid Draw Pattern**:
1. **Accessible DOM Locators:** Uses `page.getByRole()` and semantic locators for tool selection in the DOM toolbar.
2. **Precision Canvas Gestures:** Transitions to coordinate-based native mouse events (`page.mouse.move()`, `page.mouse.down()`, `page.mouse.up()`) exclusively within the active drawing area.
3. **DOM-Level Shape Verification:** Asserts newly created canvas elements by querying TLDraw's rendered SVG/HTML nodes (`.tl-shape`, `data-shape-type="geo"`) instead of relying on brittle pixel-matching.

---

### 🚀 Core Features & Architecture

* **Multi-Domain Architecture:** Single scalable framework cleanly housing test suites across multiple web applications without locator or route collisions.
* **Page Object Model (POM):** Strict inheritance with `BasePage` providing reusable step logging, auto-waiting abstractions, and error handling.
* **Dependency Injection via Fixtures:** Extensible Playwright fixtures (`base.fixture.ts`) inject pre-configured page objects (`loginPage`, `inventoryPage`, `tlDrawPage`) and pre-authenticated sessions (`authenticatedPage`).
* **Visual Regression Testing:** Snapshot-based visual regression across browser rendering engines (`Chromium`, `Firefox`, `WebKit`).
* **Continuous Integration (CI/CD):** Integrated with **GitHub Actions** with parallel matrix sharding and HTML report artifact generation.

---

### 📂 Framework Structure

```text
playwright-framework/
├── .github/workflows/
│   └── playwright.yml              # CI/CD pipeline with sharded test execution
├── src/
│   ├── framework/
│   │   ├── fixtures/
│   │   │   └── base.fixture.ts     # Dependency injection for all page objects
│   │   ├── pages/
│   │   │   ├── BasePage.ts         # Core POM abstraction layer
│   │   │   ├── LoginPage.ts        # SauceDemo Authentication POM
│   │   │   ├── InventoryPage.ts    # SauceDemo Product Catalog POM
│   │   │   └── TLDrawPage.ts       # TLDraw Canvas & Hybrid Draw POM
│   │   └── tests/
│   │       └── e2e/
│   │           ├── checkout.spec.ts        # SauceDemo E2E & visual validation
│   │           └── tldraw-canvas.spec.ts   # DOM-to-Canvas hybrid drawing tests
├── playwright.config.ts            # Playwright cross-browser configuration
├── tsconfig.json                   # TypeScript compiler configuration
└── package.json                    # Dependencies and scripts
```

---

### 💻 Local Execution

To run the framework locally, ensure you have Node.js 20+ installed.

1. **Install Dependencies & Browsers:**
   ```bash
   npm ci
   npx playwright install chromium
   ```

2. **Run All E2E Tests:**
   ```bash
   npx playwright test --project=chromium
   ```

3. **Run Specifically the TLDraw Canvas Test Suite:**
   ```bash
   npx playwright test src/framework/tests/e2e/tldraw-canvas.spec.ts --project=chromium
   ```

4. **Run in UI / Interactive Debug Mode:**
   ```bash
   npx playwright test --ui
   ```

5. **Type Checking & Linting:**
   ```bash
   npm run lint
   ```

---

### ⏱️ Advanced Synchronization Patterns

* **Auto-waiting Locators:** Relies on Playwright's actionability checks with `getByRole()` and `locator()` to eliminate arbitrary sleeps.
* **Network & DOM Idle Waits:** Waits for canvas initialization and network asset loading before capturing snapshots or initiating gestures.
* **Resilient Drag-and-Drop Interpolation:** Simulates human-like drawing using segmented mouse interpolation steps (`{ steps: 10 }`) to ensure canvas event listeners capture drag trajectories.
