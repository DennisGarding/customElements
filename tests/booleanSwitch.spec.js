import { expect, test } from "@playwright/test";

test('BooleanSwitch test', async ({ page }) => {
    await test.step('check initialized checked and disabled ', async () => {
        await page.goto('/html/boolean_switch.html');

        const switch1 = page.locator('boolean-switch[name="bs-1"]'),
            switch2 = page.locator('boolean-switch[name="bs-2"]'),
            switch3 = page.locator('boolean-switch[name="bs-3"]'),
            switch4 = page.locator('boolean-switch[name="bs-4"]');

        await expect(switch1).toBeVisible();
        await expect(switch2).toBeVisible();
        await expect(switch3).toBeVisible();
        await expect(switch4).toBeVisible();

        await expect(switch1).not.toHaveAttribute('checked');
        await expect(switch2).toHaveAttribute('checked');

        await expect(switch3).not.toHaveAttribute('checked');
        await expect(switch3).toHaveAttribute('disabled');

        await expect(switch4).toHaveAttribute('disabled');
        await expect(switch4).toHaveAttribute('checked');
    });

    await test.step('test click on each element', async () => {
        const switch1 = page.locator('boolean-switch[name="bs-1"]'),
            switch2 = page.locator('boolean-switch[name="bs-2"]'),
            switch3 = page.locator('boolean-switch[name="bs-3"]'),
            switch4 = page.locator('boolean-switch[name="bs-4"]');

        await expect(switch1).not.toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-1"] > .boolean-switch-container > .boolean-switch').click();
        await expect(switch1).toHaveAttribute('checked');

        await expect(switch2).toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-2"] > .boolean-switch-container > .boolean-switch').click();
        await expect(switch2).not.toHaveAttribute('checked');

        await expect(switch3).not.toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-3"] > .boolean-switch-container > .boolean-switch').click();
        await expect(switch3).not.toHaveAttribute('checked');

        await expect(switch4).toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-4"] > .boolean-switch-container > .boolean-switch').click();
        await expect(switch4).toHaveAttribute('checked');
    });

    await test.step('test click on each element label', async () => {
        const switch1 = page.locator('boolean-switch[name="bs-1"]'),
            switch2 = page.locator('boolean-switch[name="bs-2"]'),
            switch3 = page.locator('boolean-switch[name="bs-3"]'),
            switch4 = page.locator('boolean-switch[name="bs-4"]');

        await expect(switch1).toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-1"] > .boolean-switch-container > label[for="bs-1"]').click();
        await expect(switch1).not.toHaveAttribute('checked');

        await expect(switch2).not.toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-2"] > .boolean-switch-container > label[for="bs-2"]').click();
        await expect(switch2).toHaveAttribute('checked');

        await expect(switch3).not.toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-3"] > .boolean-switch-container > label[for="bs-3"]').click();
        await expect(switch3).not.toHaveAttribute('checked');

        await expect(switch4).toHaveAttribute('checked');
        await page.locator('boolean-switch[name="bs-4"] > .boolean-switch-container > label[for="bs-4"]').click();
        await expect(switch4).toHaveAttribute('checked');
    });
});