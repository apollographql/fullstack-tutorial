const webdriver = require("selenium-webdriver");
const { elementIsNotSelected } = require("selenium-webdriver/lib/until");
const driver = new webdriver.Builder().forBrowser("chrome").build();
const By = webdriver.By;
const sleeptime = 3000; //how long to wait after each command to make tests visually percievable 

/*To Do:
Find element function with time out


*/


async function clickWhenClickable(locator,timeout=2000, webdriver=driver){
    webdriver.wait(function(){
      return webdriver.findElement(locator).then(function(element){        
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

 async function sendKeysWhenSendable(locator,keys, timeout=2000, webdriver=driver){
    webdriver.wait(function(){
      return webdriver.findElement(locator).then(function(element){        
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
  class DriverWrapper{
    constructor(driver){
        this.driver=driver; 
        this.ActionList=[];
    }
    navigate(url){
        var that=this;
        this.ActionList.push(
            function() {that.driver.navigate().to("http://localhost:3000");}
        );
    }
    click(locator, timeout=2*1000){
        var that=this;
        this.ActionList.push(
            function() {clickWhenClickable(locator, timeout);}
        );
    }
    sendKeys(locator, keys, timeout=2*1000){
        var that=this;
        this.ActionList.push(
            function() {sendKeysWhenSendable(locator, keys, timeout);}
        );
    }
    async execute(){
        while(this.ActionList.length>0) {
            await this.ActionList.shift()();
            await this.driver.sleep(sleeptime)
        }
    }
}


var driverTest = new DriverWrapper(driver);
driverTest.navigate("http://localhost:3000");
driverTest.sendKeys(By.name('email'),"Email@site.com");
driverTest.click(By.xpath('/html/body/div/div/form/button'));
driverTest.click(By.xpath("//*[contains(@data-testid, 'logout')]"));
driverTest.execute();



//Old ways (for reference only)
function LogInLogOutTest(driver){
    try{
        driver.navigate().to("http://localhost:3000");
        driver.sleep(sleeptime).then(()=> {
            sendKeysWhenSendable(By.name('email'),"Email@site.com" ).then(()=>{ 
                driver.sleep(sleeptime).then(()=> {
                    clickWhenClickable(By.xpath('/html/body/div/div/form/button'), 10*1000).then(()=>{
                        driver.sleep(sleeptime).then(()=> {
                            clickWhenClickable(By.xpath("//*[contains(@data-testid, 'logout')]"), 10*1000); 
                        }); 
                    }); 
                });
            });
        });
        
    }
    catch(e){
        console.log(e);
    }

}
async function LogInLogOutTestAsync(driver){
    try{
        await driver.navigate().to("http://localhost:3000");
        await driver.sleep(sleeptime)
        await sendKeysWhenSendable(By.name('email'),"Email@site.com" )
        await driver.sleep(sleeptime)
        await clickWhenClickable(By.xpath('/html/body/div/div/form/button'), 2*1000)
        await driver.sleep(sleeptime)
        await clickWhenClickable(By.xpath("//*[contains(@data-testid, 'logout')]"), 2*1000);      
    }
    catch(e){
        console.log(e);
    }

}
// LogInLogOutTestAsync(driver);