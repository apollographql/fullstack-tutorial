const {Builder, By, Key, util} = require("selenium-webdriver");
require("chromedriver")

async function emailTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/")
    await driver.findElement(By.name("email")).sendKeys("emal@email.com");
}
emailTest();