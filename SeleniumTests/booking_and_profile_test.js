require("chromedriver");
let assert = require("assert");
const {Builder, By, Key, util, Browser, until, Actions} = require("selenium-webdriver");
const { WebDriver } = require("selenium-webdriver/lib/webdriver");
let driver = new Builder().forBrowser("chrome").build();

async function profilePagetest(){
    try{
            
            await driver.get("http://localhost:3000");
            // Logging in wiht email
            await driver.findElement(By.name("email")).sendKeys('test@email.com');
            await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();

            // Testing Profile Button
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/a[3]")));
            await driver.findElement(By.xpath("/html/body/div/footer/div/a[3]")).click();
            let profilePage = await driver.findElement(By.xpath("/html/body/div/footer/div/a[3]")).getText();
            assert.equal(profilePage,"PROFILE")
            console.log("Test Passed!!PROFILE button works correctly.");
           
            // Go back to Home page
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/a[1]")));
            await driver.findElement(By.xpath("/html/body/div/footer/div/a[1]")).click();
            console.log(await driver.getCurrentUrl());
            // Wait until page is loaded, then click Starlink-15 (v1.0) to book the trip
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/a[1]")), 30000);
            await driver.findElement(By.xpath("/html/body/div/div[2]/a[1]")).click();
           

            // Wait until page is loaded then add to cart
            await driver.wait(until.elementLocated(By.xpath("//button[@class='css-wwcn44']")), 30000);
            await driver.executeScript("window.scrollBy(0,1000)");
            await driver.findElement(By.xpath("//button[@class='css-wwcn44']")).click();

            // Go to the cart page
            await driver.wait(until.elementsLocated(By.xpath("/html/body/div/footer/div/a[2]")), 60000);
            await driver.findElement(By.xpath("/html/body/div/footer/div/a[2]")).click();
            // Book the trip
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/button")), 60000);
            let starlink = await driver.findElement(By.xpath("/html/body/div/div[2]/a"));
            assert(starlink != null)
            let bookAllButton = await driver.findElement(By.xpath("/html/body/div/div[2]/button"));
            assert.equal(await bookAllButton.getText(), "BOOK ALL");
            await driver.findElement(By.xpath("/html/body/div/div[2]/button")).click();

            // Go back to Profile Page and check your trip
            await driver.navigate().refresh();
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/a[3]")), 1000000);
            await driver.findElement(By.xpath("/html/body/div/footer/div/a[3]")).click();
           
            await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div[2]/a")),60000);
            let bookedTrip= await driver.findElement(By.xpath("/html/body/div/div[2]/a"));
            console.log(await bookedTrip.getText());
            console.log("Your trip is booked successfully,Test Passed!!");
            await driver.navigate().refresh();
            
                
        }finally{ 

            await driver.quit();
        }
}
profilePagetest();
