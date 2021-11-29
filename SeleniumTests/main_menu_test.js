require("chromedriver");
let assert = require("assert");
const {Builder, By, Key, util, Browser, until} = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();

async function homePagetest(){
    try{
            await driver.get("http://localhost:3000");
            // Logging in wiht email
            await driver.findElement(By.name("email")).sendKeys('test@email.com');
            await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();

            // Testing Home Button
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/a[1]")), 300000);
            let homePage = await driver.findElement(By.xpath("/html/body/div/footer/div/a[1]")).getText();
    
            assert.equal(homePage,"HOME")
            console.log("Test Passed!!Home button works correctly.");

            // Testing "LoadMore" Button
            await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div[2]/button"), 300000));
            
           // await driver.findElement(By.xpath("/html/body/div/div[2]/button")).click();
            let element = await driver.findElement(By.xpath("/html/body/div/div[2]/button"));

           //  Wait unitl page is loaded, then click "LOAD MORE"
            assert.equal(await element.getText(),"LOAD MORE");
            console.log("Click on ",await element.getText()," Button");
            
            // Loading more lists of upcoming lunches
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/a[28]")), 300000);
            let loadPass= await driver.findElement(By.xpath("/html/body/div/div[2]/a[28]"));
            console.log(await loadPass.getText());
            console.log("Home page loaded correctly,Test Passed!!");
                
        }finally{ 

            await driver.quit();
        }
}
homePagetest();
