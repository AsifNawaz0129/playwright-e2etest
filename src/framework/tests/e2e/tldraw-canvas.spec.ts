import { test, expect } from '../../fixtures/base.fixture';

/**
 * 🎨 TLDraw - Canvas & Graphic Surface Automation
 * 
 * Target Application: https://www.tldraw.com/
 * 
 * Why Graphic Design & Canvas Tech Companies (e.g. Kittl, Canva, Figma) Care:
 * Modern design applications render complex visual work on an infinite canvas,
 * surrounded by standard HTML/DOM toolbars, panels, and menus.
 * 
 * A naive automation approach relies entirely on brittle (x, y) coordinates for everything.
 * The "Hybrid Draw" pattern demonstrates architectural maturity by:
 * 1. Using resilient, accessible DOM locators (`getByRole`) for toolbar controls.
 * 2. Dropping to low-level coordinate mouse actions (`mouse.move`, `down`, `up`)
 *    strictly within the bounded drawing viewport.
 * 3. Leveraging TLDraw's SVG/HTML-in-DOM architecture to assert shape creation
 *    via standard DOM locators (`.tl-shape`) instead of flaky visual comparisons.
 */
test.describe('TLDraw - Hybrid Canvas Automation', () => {

    test('The Hybrid Draw: should select Rectangle tool via DOM and draw shape onto canvas', async ({ tlDrawPage, page }, testInfo) => {
        // Step 1: Navigate to TLDraw and wait for canvas surface readiness
        await tlDrawPage.navigateToTLDraw();

        // Step 2: Verify the initial canvas has no shapes
        const initialCount = await tlDrawPage.getShapeCount();
        expect(initialCount).toBe(0);

        // Step 3: Action - Click the "Rectangle" tool in the DOM toolbar
        // Using accessible getByRole locator rather than brittle coordinates
        await tlDrawPage.selectRectangleTool();

        // Step 4: Action - Draw a box on the canvas surface using native mouse events
        // (400, 300) -> (600, 500)
        await tlDrawPage.drawOnCanvas({ x: 400, y: 300 }, { x: 600, y: 500 });

        // Step 5: Assertion - Verify a new shape exists in the DOM (.tl-shape)
        const shapes = tlDrawPage.getShapesLocator();
        await expect(shapes).toHaveCount(1);
        await expect(shapes.first()).toBeVisible();

        // Validate shape type attribute rendered by TLDraw
        const shapeType = await shapes.first().getAttribute('data-shape-type');
        expect(shapeType).toBe('geo');

        // Attach a full-fidelity visual screenshot to the Playwright report and UI mode
        await testInfo.attach('tldraw-canvas-with-rectangle', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });
    });

    test('should insert and verify text inside a drawn shape (In-Place Canvas Text Editing)', async ({ tlDrawPage, page }, testInfo) => {
        await tlDrawPage.navigateToTLDraw();

        // Draw a rectangle
        await tlDrawPage.selectRectangleTool();
        await tlDrawPage.drawOnCanvas({ x: 400, y: 300 }, { x: 650, y: 500 });
        await expect(tlDrawPage.getShapesLocator()).toHaveCount(1);

        // Double-click center of shape (525, 400) to activate inline text editor
        const sampleText = 'Automated with Playwright';
        await tlDrawPage.addTextToShape({ x: 525, y: 400 }, sampleText);

        // Assert that the text content rendered inside the SVG/DOM node matches
        const renderedText = await tlDrawPage.getShapeText(0);
        expect(renderedText).toBe(sampleText);

        await testInfo.attach('canvas-with-text-shape', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });
    });

    test('should support canvas state operations: shape deletion and undo', async ({ tlDrawPage, page }, testInfo) => {
        await tlDrawPage.navigateToTLDraw();

        // Draw a shape
        await tlDrawPage.selectRectangleTool();
        await tlDrawPage.drawOnCanvas({ x: 350, y: 250 }, { x: 550, y: 450 });
        await expect(tlDrawPage.getShapesLocator()).toHaveCount(1);

        // Delete active shape using Backspace
        await tlDrawPage.deleteSelectedShape();
        await expect(tlDrawPage.getShapesLocator()).toHaveCount(0);

        // Restore shape using keyboard Undo
        await tlDrawPage.undo();
        await expect(tlDrawPage.getShapesLocator()).toHaveCount(1);

        await testInfo.attach('canvas-restored-shape-after-undo', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });
    });
});
