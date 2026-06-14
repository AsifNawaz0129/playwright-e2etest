import { test, expect } from '../../fixtures/base.fixture';

test.describe('Swag Labs - E2E User Journeys', () => {

    test('should allow a user to log in and add products to the cart', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate('/');
        
        await loginPage.login('standard_user', 'secret_sauce');
        
        expect(await inventoryPage.getCartBadgeCount()).toBe(0);
        
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        
        const count = await inventoryPage.getCartBadgeCount();
        expect(count).toBe(2);
    });

    test('should show error for locked out user', async ({ loginPage }) => {
        await loginPage.navigate('/');
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

    test('visual validation of the inventory page', async ({ authenticatedPage }) => {
        // Wait for all network requests (e.g. images) to finish to ensure a stable screenshot
        await authenticatedPage.waitForLoadState('networkidle');

        // This uses the custom authenticatedPage fixture to skip login steps
        await expect(authenticatedPage).toHaveScreenshot('inventory-page.png', {
            // Mask the footer as it contains dynamic copyright years
            mask: [authenticatedPage.getByRole('contentinfo')],
            // Allow for slight rendering differences (0.2% threshold)
            maxDiffPixelRatio: 0.02,
        });
    });
});
