import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface Point {
    x: number;
    y: number;
}

/**
 * Page Object Model for tldraw (https://www.tldraw.com)
 * 
 * Demonstrates the "Hybrid Draw" pattern:
 * Interacting with DOM-based controls (toolbars, buttons) using role-based locators,
 * then executing precise coordinate-based mouse gestures on the canvas surface.
 */
export class TLDrawPage extends BasePage {
    readonly canvas: Locator;
    readonly shapes: Locator;
    readonly rectangleTool: Locator;
    readonly dismissBannerButton: Locator;

    constructor(page: Page) {
        super(page);
        this.canvas = page.locator('.tl-canvas');
        this.shapes = page.locator('.tl-shape');
        // DOM toolbar button identified via accessible name matching the tool ("Rectangle — R")
        // Anchoring to /^Rectangle/i distinguishes it from style panel buttons ("Shape — Rectangle")
        this.rectangleTool = page.getByRole('button', { name: /^Rectangle/i });
        this.dismissBannerButton = page.getByRole('button', { name: 'Dismiss' });
    }

    /**
     * Navigates to tldraw and waits for the canvas surface to initialize.
     */
    async navigateToTLDraw(url: string = 'https://www.tldraw.com') {
        await this.step(`Navigating to tldraw: ${url}`, async () => {
            await this.page.goto(url, { waitUntil: 'domcontentloaded' });
            await this.canvas.waitFor({ state: 'visible', timeout: 15000 });
            await this.dismissBannerIfPresent();
        });
    }

    /**
     * Dismisses any informational banner or toast if displayed
     */
    async dismissBannerIfPresent() {
        try {
            if (await this.dismissBannerButton.isVisible({ timeout: 2000 })) {
                await this.dismissBannerButton.click();
            }
        } catch {
            // Non-critical if banner is absent
        }
    }

    /**
     * Selects the Rectangle tool from the DOM toolbar using Playwright's role locator
     */
    async selectRectangleTool() {
        await this.step('Select Rectangle tool from toolbar', async () => {
            await this.rectangleTool.click();
        });
    }

    /**
     * Draws a shape on the canvas by moving to starting coordinates,
     * pressing mouse down, dragging across the canvas, and releasing.
     *
     * @param from Starting coordinate { x, y }
     * @param to Ending coordinate { x, y }
     * @param steps Interpolation steps for realistic mouse trajectory
     */
    async drawOnCanvas(from: Point, to: Point, steps: number = 10) {
        await this.step(`Draw on canvas from (${from.x}, ${from.y}) to (${to.x}, ${to.y})`, async () => {
            await this.page.mouse.move(from.x, from.y);
            await this.page.mouse.down();
            await this.page.mouse.move(to.x, to.y, { steps });
            await this.page.mouse.up();
        });
    }

    /**
     * Double clicks inside a shape to enter text editing mode,
     * types the given text string, and commits via Escape.
     */
    async addTextToShape(center: Point, text: string) {
        await this.step(`Add text "${text}" to shape at (${center.x}, ${center.y})`, async () => {
            await this.page.mouse.dblclick(center.x, center.y);
            await this.page.keyboard.type(text, { delay: 20 });
            await this.page.keyboard.press('Escape');
        });
    }

    /**
     * Deletes the currently selected shape using keyboard shortcut
     */
    async deleteSelectedShape() {
        await this.step('Delete selected shape via Backspace', async () => {
            await this.page.keyboard.press('Backspace');
        });
    }

    /**
     * Performs an Undo operation using OS-appropriate keyboard shortcut
     */
    async undo() {
        await this.step('Perform Undo via keyboard shortcut', async () => {
            const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
            await this.page.keyboard.press(`${modifier}+z`);
        });
    }

    /**
     * Returns the inner text content of a shape at the specified index
     */
    async getShapeText(index: number = 0): Promise<string> {
        return (await this.shapes.nth(index).innerText()).trim();
    }

    /**
     * Returns the current number of rendered shapes on the canvas
     */
    async getShapeCount(): Promise<number> {
        return await this.shapes.count();
    }

    /**
     * Returns the locator for all shape elements (.tl-shape)
     */
    getShapesLocator(): Locator {
        return this.shapes;
    }
}
