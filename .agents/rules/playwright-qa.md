---
title: Playwright QA Automation Architecture & Guidelines
description: Best practices for writing Playwright tests, Page Object Models, and canvas automation.
trigger: always_on
---

# Playwright QA Automation Guidelines

When writing or maintaining tests in this repository, follow these standards:

### 1. Page Object Model (POM) Design
- All Page Objects must inherit from `BasePage` (`src/framework/pages/BasePage.ts`).
- Wrap meaningful business actions inside `this.step('Action Name', async () => { ... })` for detailed Playwright HTML report traces.
- Keep locators as private or public readonly class properties initialized in the constructor.

### 2. Semantic & Accessible Locators
- **Primary choice:** `page.getByRole()`, `page.getByLabel()`, `page.getByTestId()`.
- **Avoid:** Brittle full XPaths, deep CSS tag chains (e.g. `div > div > span`), or unstable class hashes.
- For design apps (like TLDraw), distinguish toolbar buttons from contextual style dropdowns using regex anchors (e.g. `getByRole('button', { name: /^Rectangle/i })`).

### 3. The Hybrid Canvas Pattern (Kittl / Canva / Figma Style)
- For infinite canvas or drawing apps:
  1. Use accessible DOM locators (`getByRole`) for toolbar, palette, and menu controls.
  2. Use low-level coordinate mouse actions (`page.mouse.move()`, `down()`, `up()`) with interpolation steps (`{ steps: 10 }`) strictly within the canvas surface.
  3. Validate canvas outcomes by querying rendered SVG/HTML DOM nodes (`.tl-shape`, `[data-shape-type]`) instead of fragile pixel-matching.

### 4. Zero Flakiness Standards
- **No arbitrary sleeps:** Never use `page.waitForTimeout()`.
- Rely on Playwright's auto-waiting locators and explicit state assertions (`toBeVisible()`, `toHaveCount()`).
- Use `waitForLoadState('networkidle')` prior to capturing visual regression screenshots.
