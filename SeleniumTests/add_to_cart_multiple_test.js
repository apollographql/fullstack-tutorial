const {Builder, By, Key, until, WebElement} = require("selenium-webdriver");
require("chromedriver");
let assert = require("assert");

async function addToCartMultiple() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("http://localhost:3000/")
        // Check page title
        let title = await driver.getTitle();
        assert.equal(title, "Launches");
        // Login with email
        await driver.findElement(By.name("email")).sendKeys("test@email.com");
        await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();
        // Wait until page is loaded then go to Starlink-15
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/a[1]")), 300000);
        await driver.findElement(By.xpath("/html/body/div/div[2]/a[1]")).click();
        // Wait until page is loaded then add to cart
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div[3]/button")), 300000);
        await driver.findElement(By.xpath("/html/body/div/div[2]/div[3]/button")).click();
        let addToCart = await driver.findElement(By.xpath("/html/body/div/div[2]/div[3]/button"));
        assert.equal(await addToCart.getText(), "REMOVE FROM CART");
        // Go back home
        await driver.findElement(By.xpath("/html/body/div/footer/div/a[1]")).click();
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/a[2]")), 300000);
        await driver.findElement(By.xpath("/html/body/div/div[2]/a[2]")).click();
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div[3]/button")), 300000);
        await driver.findElement(By.xpath("/html/body/div/div[2]/div[3]/button")).click();
        addToCart = await driver.findElement(By.xpath("/html/body/div/div[2]/div[3]/button"));
        assert.equal(await addToCart.getText(), "REMOVE FROM CART");
        // Go to the cart page
        await driver.findElement(By.xpath("/html/body/div/footer/div/a[2]")).click();
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/button")), 300000);
        let starlink = await driver.findElement(By.xpath("/html/body/div/div[2]/a[1]"));
        assert(starlink != null)
        let sentinel = await driver.findElement(By.xpath("/html/body/div/div[2]/a[2]"));
        assert(sentinel != null)
        assert.notEqual(starlink, sentinel);
        let bookAllButton = await driver.findElement(By.xpath("/html/body/div/div[2]/button"));
        assert.equal(await bookAllButton.getText(), "BOOK ALL");
    }
    finally {
        await driver.quit();
    }   
}
addToCartMultiple()
