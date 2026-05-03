import { Locator, Page, expect } from '@playwright/test';

/**
 * Abstract BasePage to provide common functionality and logging
 * for all Page Objects.
 */
export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to a specific path under the baseURL
     */
    async navigate(path: string = '') {
        await this.page.goto(path);
    }

    /**
     * Generic wrapper for waiting for an element to be visible
     */
    async waitForElement(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    /**
     * Simple console logger for test steps
     */
    protected logStep(message: string) {
        console.log(`[PAGE STEP]: ${message}`);
    }
}
