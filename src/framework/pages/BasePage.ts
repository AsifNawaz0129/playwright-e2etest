import { Locator, Page, expect, test } from '@playwright/test';

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
        await test.step(`Navigating to: ${path}`, async () => {
            await this.page.goto(path);
        });
    }

    /**
     * Generic wrapper for waiting for an element to be visible
     */
    async waitForElement(locator: Locator) {
        await test.step('Waiting for element visibility', async () => {
            await expect(locator).toBeVisible();
        });
    }

    /**
     * Protected helper to wrap actions in test steps for better reporting
     */
    protected async step<T>(name: string, body: () => Promise<T>): Promise<T> {
        return await test.step(name, body);
    }
}
