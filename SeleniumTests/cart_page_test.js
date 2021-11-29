require("chromedriver");
let assert = require("assert");
const { watch } = require("fs");
const {Builder, By, Key, util, Browser, until} = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();

async function cartPagetest(){
    try{
            await driver.get("http://localhost:3000");
            // Logging in wiht email
            await driver.findElement(By.name("email")).sendKeys('test@email.com');
            await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();

            // Testing Cart Button
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/a[2]")), 300000);
            let shoppingcartPage = await driver.findElement(By.xpath("/html/body/div/footer/div/a[2]")).getText();
            assert.equal(shoppingcartPage,"CART")
            console.log("Cart Page is working. Test Passed!");

            // Checking if the Cart button leads to the correct page 
            await driver.findElement(By.xpath("/html/body/div/footer/div/a[2]")).click();
            assert.equal(await driver.getCurrentUrl(),'http://localhost:3000/cart');
            console.log("Test Passed", await driver.getCurrentUrl());
                
        }finally{ 

            await driver.quit();
        }
}
cartPagetest();
