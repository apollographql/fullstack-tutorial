require("chromedriver");
let assert = require("assert");
const {Builder, By, Key, util, Browser, until} = require("selenium-webdriver");
const { threadId } = require("worker_threads");
let driver = new Builder().forBrowser("chrome").build();

async function homePagetest(){
    try{

            await driver.get("http://localhost:3000");
            // Logging in wiht email
            await driver.findElement(By.name("email")).sendKeys('test@email.com');
            await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();

            // Testing Home Button
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/a[1]")), 300000);
            let logoutPage = await driver.findElement(By.xpath("/html/body/div/footer/div/a[1]"))
                .getText()
                .then(async function(value){
                return value;

            })
            assert.equal(logoutPage,"HOME")
            console.log("Test Passed!!Home button is working");

            // Testing "LoadMore" Button
            await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div[2]/button"), 500000));
            let element = await driver.findElement(By.xpath("/html/body/div/div[2]/button"));

           //  Wait unitl page is loaded, then click "LOAD MORE"
            assert.equal(await element.getText(),"LOAD MORE");
            console.log("Click on ",await element.getText()," Button");
            
            // Loading more lists of upcoming lunches
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/a[28]")), 300000);
            let loadPass= await driver.findElement(By.xpath("/html/body/div/div[2]/a[28]"));
            console.log(await loadPass.getText());
            console.log("Loaded correctly,Test Passed!!");
                
        }finally{ 

            await driver.quit();
        }
}
homePagetest();
