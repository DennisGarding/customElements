import { test, expect } from '@playwright/test';
import { CookieHelper } from "./helper/CookieHelper";

test('CookieConsent test', async ({ page, context, baseURL }) => {
    await test.step('initialized state', async () => {
        await page.goto('/html/cookie_consent.html');

        const overlay = await page.locator('.overlay');
        await expect(overlay).not.toHaveClass(/hidden/);
        await expect(overlay).toBeVisible();

        const title = await page.locator('.title');
        await expect(title).toHaveText('We respect your privacy');
        await expect(title).toBeVisible();

        const text = await page.locator('.text');
        await expect(text).toHaveText(/At vero eos et accusam et justo duo dolores et ea rebum. /);
        await expect(text).toBeVisible();

        const link1 = await page.locator('.link-container a[href="https://www.link-to-your-privacy-poilcy.com"]');
        await expect(link1).toHaveText('Privacy policy')
        await expect(link1).toBeVisible();

        const link2 = await page.locator('.link-container a[href="https://www.ink-to-your-cookie-poilcy.com"]');
        await expect(link2).toHaveText('Cookie policy')
        await expect(link2).toBeVisible();

        const booleanSwitch1 = await page.locator('boolean-switch[name="technicalRequired"]');
        await expect(booleanSwitch1).toHaveText(/Technical required/);
        await expect(booleanSwitch1).toHaveAttribute('disabled');
        await expect(booleanSwitch1).toHaveAttribute('checked');
        await expect(booleanSwitch1).toBeVisible();

        const booleanSwitch2 = await page.locator('boolean-switch[name="comfort"]');
        await expect(booleanSwitch2).toHaveText(/Comfort/);
        await expect(booleanSwitch2).not.toHaveAttribute('disabled');
        await expect(booleanSwitch2).not.toHaveAttribute('checked');
        await expect(booleanSwitch2).toBeVisible();

        const booleanSwitch3 = await page.locator('boolean-switch[name="statisticAndTracking"]');
        await expect(booleanSwitch3).toHaveText(/Statistic and Tracking/);
        await expect(booleanSwitch3).not.toHaveAttribute('disabled');
        await expect(booleanSwitch3).not.toHaveAttribute('checked');
        await expect(booleanSwitch3).toBeVisible();

        const acceptButton = await page.locator('.accept-all-button');
        await expect(acceptButton).toHaveText(/Accept all/);
        await expect(acceptButton).toBeVisible();

        const acceptSelectedButton = await page.locator('.default-button-container :text("Accept selection")');
        await expect(acceptSelectedButton).toBeVisible();

        const leavePageButton = await page.locator('.default-button-container :text("Leave page")');
        await expect(leavePageButton).toBeVisible();
    });

    await test.step('change selection click on disabled boolean switch', async () => {
        const booleanSwitch = await page.locator('boolean-switch[name="technicalRequired"]');
        await expect(booleanSwitch).toHaveAttribute('disabled');
        await expect(booleanSwitch).toHaveAttribute('checked');

        // click on it
        await page.locator('boolean-switch[name="technicalRequired"] > .boolean-switch-container > .boolean-switch').click();

        // check state have not changed
        await expect(booleanSwitch).toHaveAttribute('disabled');
        await expect(booleanSwitch).toHaveAttribute('checked');
    });

    await test.step('change selection click on boolean switch comfort', async () => {
        const booleanSwitch = await page.locator('boolean-switch[name="comfort"]');
        await expect(booleanSwitch).not.toHaveAttribute('disabled');
        await expect(booleanSwitch).not.toHaveAttribute('checked');

        // click on it
        await page.locator('boolean-switch[name="comfort"] > .boolean-switch-container > .boolean-switch').click();

        // check state have changed
        await expect(booleanSwitch).not.toHaveAttribute('disabled');
        await expect(booleanSwitch).toHaveAttribute('checked');
    });

    await test.step('change selection click on boolean switch statisticAndTracking', async () => {
        const booleanSwitch = await page.locator('boolean-switch[name="statisticAndTracking"]');
        await expect(booleanSwitch).not.toHaveAttribute('disabled');
        await expect(booleanSwitch).not.toHaveAttribute('checked');

        // click on it
        await page.locator('boolean-switch[name="statisticAndTracking"] > .boolean-switch-container > .boolean-switch').click();

        // check state have changed
        await expect(booleanSwitch).not.toHaveAttribute('disabled');
        await expect(booleanSwitch).toHaveAttribute('checked');
    });

    await test.step('use leave page button', async () => {
        await page.goto('https://google.com');
        await page.goto('/html/cookie_consent.html');

        await page.locator('.default-button-container :text("Leave page")').click();

        await expect(page).toHaveTitle('Google');
    });

    await test.step('use accept selected button', async () => {
        await page.goto('/html/cookie_consent.html');

        const overlay = await page.locator('.overlay');

        await expect(overlay).not.toHaveClass(/hidden/);
        await expect(overlay).toBeVisible();

        // accept selection
        await page.locator('.default-button-container :text("Accept selection")').click();

        await expect(overlay).toHaveClass(/hidden/);
        await expect(overlay).not.toBeVisible();

        const consentCookie = await CookieHelper.getCookie(context, 'consent')
        await expect(consentCookie.value).toBe('["technicalRequired"]');
    });

    await test.step('use accept selected button with extra selection', async () => {
        // Delete the cookie
        await CookieHelper.deleteCookie(context, 'consent');

        await page.goto('/html/cookie_consent.html');

        const overlay = await page.locator('.overlay');

        await expect(overlay).not.toHaveClass(/hidden/);
        await expect(overlay).toBeVisible();

        // set extra selection
        await page.locator('boolean-switch[name="comfort"] > .boolean-switch-container > .boolean-switch').click();
        // accept selection
        await page.locator('.default-button-container :text("Accept selection")').click();

        await expect(overlay).toHaveClass(/hidden/);
        await expect(overlay).not.toBeVisible();

        const consentCookie = await CookieHelper.getCookie(context, 'consent');
        await expect(consentCookie.value).toBe('["technicalRequired","comfort"]');
    });

    await test.step('use accept all', async () => {
        // Delete the cookie
        await CookieHelper.deleteCookie(context, 'consent');

        await page.goto('/html/cookie_consent.html');

        const overlay = await page.locator('.overlay');

        await expect(overlay).not.toHaveClass(/hidden/);
        await expect(overlay).toBeVisible();

        // accept all
        await page.locator('.accept-all-button').click();

        await expect(overlay).toHaveClass(/hidden/);
        await expect(overlay).not.toBeVisible();

        const consentCookie = await CookieHelper.getCookie(context, 'consent');
        await expect(consentCookie.value).toBe('["technicalRequired","comfort","statisticAndTracking"]');
    });
});