const {Builder, By, Key, until, WebElement} = require("selenium-webdriver");
require("chromedriver");
let assert = require("assert");

async function addToCartSingle() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("http://localhost:3000/")
        // Check page title
        let title = await driver.getTitle();
        assert.equal(title, "Launches");
        // Login with email
        await driver.findElement(By.name("email")).sendKeys("test_email@email.com");
        await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div/div/h5")), 300000);
        assert.equal(await driver.findElement(By.xpath("/html/body/div/div[2]/div/div/h5")).getText(), 'TEST_EMAIL@EMAIL.COM');
    }
    finally {
        await driver.quit();
    }   
}
addToCartSingle();

