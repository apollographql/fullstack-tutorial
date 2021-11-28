require("chromedriver");
let assert = require("assert");
const {Builder, By, Key, util, Browser, until} = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();

async function logoutTest(){
    try{
            await driver.get("http://localhost:3000");
            // Logging in wiht email
            await driver.findElement(By.name("email")).sendKeys('test@email.com');
            await driver.findElement(By.xpath("/html/body/div/div/form/button")).click();

            // Testing Log Out Button
            await driver.wait(until.elementLocated(By.xpath("/html/body/div/footer/div/button")), 300000);
            let logoutPage = await driver.findElement(By.xpath("/html/body/div/footer/div/button"))
                .getText()
                .then(async function(value){
                return value;

            })
            if(logoutPage == "LOGOUT"){
                console.log("Test Passed");
            }
            
            // Logging out 
            await driver.findElement(By.xpath("/html/body/div/footer/div/button")).click();

            // Checking suscessfully Logout or not
            await driver.findElement(By.xpath("/html/body/div/div/form/button"));
            let loginPage = await driver.findElement(By.xpath("/html/body/div/div/form/button"))
                .getText()
                .then(async function(value){
                return value;
            
            });
            if(loginPage == "LOG IN"){
                    console.log("Test Passed");
            }
        }catch(e){

            console.log('Test Failed', e);
                
        }finally{
               
            await driver.quit();
        }
}
logoutTest();
