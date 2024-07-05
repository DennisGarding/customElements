import { test, expect } from '@playwright/test';

test('Multiselect test', async ({ page }) => {
    await test.step('Value attribute sets badges and highlights selected in list', async () => {
        await page.goto('/html/multiselect.html');

        const multiSelect = await page.locator('multi-select[name="multiSelect"]');
        await expect(multiSelect).toBeVisible();

        const badgeTwo = await page.locator('.cs-multi-select-badge-container > multi-select-badge[value="2"]');
        await expect(badgeTwo).toBeVisible();

        const badgeFour = await page.locator('.cs-multi-select-badge-container > multi-select-badge[value="4"]');
        await expect(badgeFour).toBeVisible();

        const input = await page.locator('input[class="cs-multi-select-search-field-input"]');
        await expect(input).toBeVisible();
        await input.click();

        const selectionList = await page.locator('.cs-multi-select-selection-list');
        await expect(selectionList).toBeVisible();

        const selectionOne = await page.locator('multi-select-option[value="2"]');
        await expect(selectionOne).toBeVisible();
        await expect(selectionOne).toHaveAttribute('selected');

        const selectionFour = await page.locator('multi-select-option[value="4"]');
        await expect(selectionFour).toBeVisible();
        await expect(selectionFour).toHaveAttribute('selected');
    });

    await test.step('Removes badge and selected class on click current selected element', async () => {
        // check current state
        const selectedContainer = await page.locator('.cs-multi-select-badge-container');
        await expect(selectedContainer).toHaveText(/Bar 2/);
        await expect(selectedContainer).toHaveText(/Foo 4/);

        const badgeTwo = await page.locator('.cs-multi-select-badge-container > multi-select-badge[value="2"]');
        await expect(badgeTwo).toBeVisible();

        const selectionOne = await page.locator('multi-select-option[value="2"]');
        await expect(selectionOne).toHaveAttribute('selected');

        // Unselect a value
        await selectionOne.click();

        await expect(selectedContainer).not.toHaveText(/Bar 2/);
        await expect(selectedContainer).toHaveText(/Foo 4/);
        await expect(badgeTwo).not.toBeVisible();
        await expect(selectionOne).not.toHaveAttribute('selected');
    });

    await test.step('adds badge and selected class on click on not selected element', async () => {
        const selectionThree = await page.locator('multi-select-option[value="3"]');
        await expect(selectionThree).not.toHaveAttribute('selected');
        await selectionThree.click();
        await expect(selectionThree).toHaveAttribute('selected');

        const badgeThree = await page.locator('multi-select-badge[value="3"]');
        await expect(badgeThree).toBeVisible();
        await expect(badgeThree).toHaveText(/Foo 3/);

        const selectionFour = await page.locator('multi-select-option[value="12"]');
        await expect(selectionFour).not.toHaveAttribute('selected');
        await selectionFour.click();
        await expect(selectionFour).toHaveAttribute('selected');

        const badgeFour = await page.locator('multi-select-badge[value="12"]');
        await expect(badgeFour).toBeVisible();
        await expect(badgeFour).toHaveText(/Foo 12/);
    });

    await test.step('removes badge and selection by click on badge x', async () => {
        const badgeFour = await page.locator('multi-select-badge[value="12"]');
        await expect(badgeFour).toBeVisible();
        await expect(badgeFour).toHaveText(/Foo 12/);

        const input = await page.locator('input[class="cs-multi-select-search-field-input"]');
        await input.click();

        // check selection has selected attribute
        const selectionFour = await page.locator('multi-select-option[value="12"]');
        await expect(selectionFour).toHaveAttribute('selected');

        // Remove selection by badge
        const removeButtonFour = await badgeFour.locator('.cs-multi-select-badge-cross');
        await expect(removeButtonFour).toBeVisible();
        await removeButtonFour.click();
        await expect(badgeFour).not.toBeVisible();

        await input.click();
        // check selection does not have selected attribute
        await expect(selectionFour).not.toHaveAttribute('selected');
    });
});