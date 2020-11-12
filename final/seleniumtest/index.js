const webdriver = require("selenium-webdriver");
const { elementIsNotSelected } = require("selenium-webdriver/lib/until");
const driver = new webdriver.Builder().forBrowser("chrome").build();
const By = webdriver.By;

const sleeptime = 1000; //how long to wait after each command to make tests visually percievable 

async function clickWhenClickable(locator,timeout=2000){
    driver.wait(function(){
      return driver.findElement(locator).then(function(element){        
        return element.click().then(function(){
          return true;
        }, function(err){
          return false;
        })
      }, function(err){
        return false;
      });
    }, timeout, 'Timeout waiting for ' + locator.value);    ;
  }

 async function sendKeysWhenSendable(locator,keys, timeout=2000){
    driver.wait(function(){
      return driver.findElement(locator).then(function(element){        
        return element.sendKeys(keys).then(async function(){
          return true;
        }, function(err){
          return false;
        })
      }, function(err){
        return false;
      });
    }, timeout, 'Timeout waiting for ' + locator.value);    ;
  }
// function LogInLogOutTest(driver){
//     try{
//         driver.navigate().to("http://localhost:3000");
//         driver.sleep(sleeptime).then(()=> {
//             sendKeysWhenSendable(By.name('email'),"Email@site.com" ).then(()=>{ 
//                 driver.sleep(sleeptime).then(()=> {
//                     clickWhenClickable(By.xpath('/html/body/div/div/form/button'), 10*1000).then(()=>{
//                         driver.sleep(sleeptime).then(()=> {
//                             clickWhenClickable(By.xpath("//*[contains(@data-testid, 'logout')]"), 10*1000); 
//                         }); 
//                     }); 
//                 });
//             });
//         });
        
//     }
//     catch(e){
//         console.log(e);
//     }

// }
async function LogInLogOutTestAsync(driver){
    try{
        await driver.navigate().to("http://localhost:3000");
        await driver.sleep(sleeptime)
        await sendKeysWhenSendable(By.name('email'),"Email@site.com" )
        await driver.sleep(sleeptime)
        await clickWhenClickable(By.xpath('/html/body/div/div/form/button'), 10*1000)
        await driver.sleep(sleeptime)
        await clickWhenClickable(By.xpath("//*[contains(@data-testid, 'logout')]"), 10*1000);      
    }
    catch(e){
        console.log(e);
    }

}
LogInLogOutTestAsync(driver);
// LogInLogOutTest(driver);

