import {test, expect} from "@playwright/test"

test.describe("Test search function", async () => {
    test.beforeEach("Load URL", async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
        expect(page).toHaveURL("https://rahulshettyacademy.com/seleniumPractise/#/")
    })

    test("Search for broc", async ({page}) => {
        await page.locator(".search-keyword").fill("broc");
        await page.locator(".search-button").click()
        expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' }))
    })

    test("Search for pot", async ({page}) => {
        await page.locator(".search-keyword").fill("pot");
        await page.locator(".search-button").click()
        expect(page.getByRole('heading', { name: 'Potato - 1 Kg' }))
    })

    test("Search for pumpkin", async ({page}) => {
        await page.locator(".search-keyword").fill("pumpkin");
        await page.locator(".search-button").click()
        expect(page.getByRole('heading', { name: 'Pumpkin - 1 Kg' }))
    })

    test("Search for nut", async ({page}) => {
        await page.locator(".search-keyword").fill("pumpkin");
        await page.locator(".search-button").click()
        expect(page.getByRole('heading', { name: 'Nuts Mixture - 1 Kg' }))
        expect(page.getByRole('heading', { name: 'Walnuts - 1/4 Kg' }))
    })
})

test.describe("Test cart function", async () => {
    test.beforeEach("Load URL", async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
        expect(page).toHaveURL("https://rahulshettyacademy.com/seleniumPractise/#/")
    })

    test("Add mango to cart", async ({page}) => {
        await page.locator('div').filter({ hasText: /^Mango - 1 Kg75–\+ADD TO CART$/ }).getByRole('button').click()
        await page.locator('div').filter({ hasText: /^Apple - 1 Kg72–\+ADD TO CART$/ }).getByRole('button').click()
        await page.waitForTimeout(1000)
        await expect(page.getByRole('row', { name: 'Items :' }).getByRole('strong')).toContainText("2")
        await expect(page.getByRole('row', { name: 'Price :' }).getByRole('strong')).toContainText("147")
    })
})