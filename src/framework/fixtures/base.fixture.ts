import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    // Custom fixture to handle pre-authenticated state
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/');
        await loginPage.login(
            process.env.SAUCE_USERNAME || 'standard_user', 
            process.env.SAUCE_PASSWORD || 'secret_sauce'
        );
        // Wait for the inventory container to be visible to ensure login is complete
        await page.waitForSelector('.inventory_list');
        await use(page);
    },
});

export { expect } from '@playwright/test';
