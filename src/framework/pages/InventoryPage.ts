import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly title: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly inventoryItems: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.inventoryItems = page.locator('.inventory_item');
    }

    async addItemToCart(itemName: string) {
        await this.step(`Adding item to cart: ${itemName}`, async () => {
            const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
            // Use a more specific selector for the "Add to cart" button
            await item.locator('button[id^="add-to-cart"]').click();
        });
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            const count = await badge.innerText();
            return parseInt(count, 10);
        }
        return 0;
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
}
