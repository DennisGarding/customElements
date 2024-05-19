import { test, expect } from '@playwright/test';

test('Multiselect test', async ({ page }) => {
    await test.step('Value attribute sets badges and highlights selected in list', async () => {
        await page.goto('/html/multiselect.html');

        const multiSelect = await page.locator('multi-select[name="multiSelect"]');
        await expect(multiSelect).toBeVisible();

        const badgeOne = await page.locator('.multi-select-selected-container > span[data-value="1"]');
        await expect(badgeOne).toBeVisible();

        const badgeFour = await page.locator('.multi-select-selected-container > span[data-value="4"]');
        await expect(badgeFour).toBeVisible();

        const input = await page.locator('input[class="multi-select-search-field-input"]');
        await expect(input).toBeVisible();
        await input.click();

        const selectionList = await page.locator('.multi-select-select-list');
        await expect(selectionList).toBeVisible();

        const selectionOne = await page.locator('.multi-select-select-list > div[data-value="1"]');
        await expect(selectionOne).toBeVisible();
        await expect(selectionOne).toHaveClass(/selected/);

        const selectionFour = await page.locator('.multi-select-select-list > div[data-value="4"]');
        await expect(selectionFour).toBeVisible();
        await expect(selectionFour).toHaveClass(/selected/);
    });

    await test.step('Removes badge and selected class on click current selected element', async () => {
        // check current state
        const selectedContainer = await page.locator('.multi-select-selected-container');
        await expect(selectedContainer).toHaveText(/hallo/);

        const badgeOne = await page.locator('.multi-select-selected-container > span[data-value="1"]');
        await expect(badgeOne).toBeVisible();

        const selectionOne = await page.locator('.multi-select-select-list > div[data-value="1"]');
        await expect(selectionOne).toHaveClass(/selected/);

        // Unselect a value
        await selectionOne.click();

        await expect(selectedContainer).not.toHaveText(/hallo/);
        await expect(badgeOne).not.toBeVisible();
        await expect(selectionOne).not.toHaveClass(/selected/);
    });

    await test.step('adds badge and selected class on click on not selected element', async () => {
        const selectionTwo = await page.locator('.multi-select-select-list > div[data-value="2"]');
        await selectionTwo.click();
        await expect(selectionTwo).toHaveClass(/selected/);

        const badgeTwo = await page.locator('.multi-select-selected-container > span[data-value="2"]');
        await expect(badgeTwo).toBeVisible();
        await expect(badgeTwo).toHaveText(/foo/);

        const selectionThree = await page.locator('.multi-select-select-list > div[data-value="3"]');
        await selectionThree.click();
        await expect(selectionThree).toHaveClass(/selected/);

        const badgeThree = await page.locator('.multi-select-selected-container > span[data-value="3"]');
        await expect(badgeThree).toBeVisible();
        await expect(badgeThree).toHaveText(/bar/);
    });
});