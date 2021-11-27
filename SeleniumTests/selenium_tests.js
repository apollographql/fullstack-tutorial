const {Builder, By, Key, util, WebElement} = require("selenium-webdriver");
require("chromedriver");
let assert = require("assert");

async function cartTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("http://localhost:3000/")
        // Check page title
        let title = await driver.getTitle();
        assert.equal(title, "Launches");
        // Login with email
        await driver.findElement(By.name("email")).sendKeys("test@email.com");
        await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();
        await driver.navigate().refresh();
        // Go to Starlink-15
        await driver.get("http://localhost:3000/launch/109");
        await driver.navigate().refresh();
        // Add to cart this part doesnt work yet
        // await driver.findElement(By.xpath("//*[contains(text(),'Add to Cart')]")).click();
    }
    finally {
        // await driver.quit();
    }   
}
cartTest();