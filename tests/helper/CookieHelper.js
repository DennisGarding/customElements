class CookieHelper {
    static async getCookie(context, name) {
        const cookies = await context.cookies();

        return cookies.find((c) => c.name === name);
    }

    static async deleteCookie(context, name) {
        const cookieToDelete = await this.getCookie(context, name);
        await context.addCookies([
            {
                ...cookieToDelete,
                expires: 0,
            },
        ]);

        return true;
    }
}

export { CookieHelper };