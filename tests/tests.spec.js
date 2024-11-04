import {test, expect} from "@playwright/test"

test.beforeEach("Load URL", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
    expect(page).toHaveURL("https://rahulshettyacademy.com/seleniumPractise/#/")
})

test.describe("Test search function", async () => {

    test("Search for broc", async ({page}) => {
        await page.pause()
        await page.locator(".search-keyword").fill("broc");
        await page.locator(".search-button").click()
        await page.waitForTimeout(1000)
        expect(page.locator("h4.product-name")).toContainText("Brocolli - 1 Kg")
    })

    test("Search for pot", async ({page}) => {
        await page.locator(".search-keyword").fill("pot");
        await page.locator(".search-button").click()
        await page.waitForTimeout(1000)
        expect(page.locator("h4.product-name")).toContainText("Potato - 1 Kg")
    })

    test("Search for pumpkin", async ({page}) => {
        await page.locator(".search-keyword").fill("pumpkin");
        await page.locator(".search-button").click()
        await page.waitForTimeout(2000)
        expect(page.getByRole('heading', { name: 'Pumpkin - 1 Kg' })).toBeVisible()
    })

    test("Search for nut", async ({page}) => {
        await page.pause()
        await page.locator(".search-keyword").fill("nut");
        await page.locator(".search-button").click()
        await page.pause()
        await page.waitForTimeout(2000)
        expect(page.getByRole('heading', { name: 'Nuts Mixture - 1 Kg' })).toBeVisible()
        expect(page.getByRole('heading', { name: 'Walnuts - 1/4 Kg' })).toBeVisible()
    })
})

test.describe("Test cart function", async () => {
    // test.beforeEach("Load URL", async ({page}) => {
    //     await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
    //     expect(page).toHaveURL("https://rahulshettyacademy.com/seleniumPractise/#/")
    // })

    test("Add mango and apple to cart", async ({page}) => {
        await page.locator('div').filter({ hasText: /^Mango - 1 Kg75–\+ADD TO CART$/ }).getByRole('button').click()
        await page.locator('div').filter({ hasText: /^Apple - 1 Kg72–\+ADD TO CART$/ }).getByRole('button').click()
        await page.waitForTimeout(2000)
        await expect(page.getByRole('row', { name: 'Items :' }).getByRole('strong')).toContainText("2")
        await expect(page.getByRole('row', { name: 'Price :' }).getByRole('strong')).toContainText("147")
    })

    test("Add fruits to cart", async ({page}) => {
        await page.pause()
        await page.locator('div').filter({ hasText: /^Apple - 1 Kg72–\+ADD TO CART$/ }).getByRole('link').nth(1).click()
        await page.locator('div').filter({ hasText: /^Apple - 1 Kg72–\+ADD TO CART$/ }).getByRole('button').click()
        await page.locator('div').filter({ hasText: /^Banana - 1 Kg45–\+ADD TO CART$/ }).getByRole('button').click()
        await page.locator('div').filter({ hasText: /^Grapes - 1 Kg60–\+ADD TO CART$/ }).getByRole('button').click()
        await page.locator('div').filter({ hasText: /^Strawberry - 1\/4 Kg180–\+ADD TO CART$/ }).getByRole('link').nth(1).dblclick()
        await page.locator('div').filter({ hasText: /^Strawberry - 1\/4 Kg180–\+ADD TO CART$/ }).getByRole('link').nth(1).dblclick()
        await page.locator('div').filter({ hasText: /^Strawberry - 1\/4 Kg180–\+ADD TO CART$/ }).getByRole('link').first().click()
        await page.locator('div').filter({ hasText: /^Strawberry - 1\/4 Kg180–\+ADD TO CART$/ }).getByRole('button').click()
        await page.pause()
        await page.waitForTimeout(2000)
        await expect(page.getByRole('row', { name: 'Items :' }).getByRole('strong')).toContainText("4")
        await expect(page.getByRole('row', { name: 'Price :' }).getByRole('strong')).toContainText("969")
    })
})