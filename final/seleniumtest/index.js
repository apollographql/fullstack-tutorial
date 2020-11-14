const webdriver = require("selenium-webdriver");
const { elementIsNotSelected } = require("selenium-webdriver/lib/until");
const driver = new webdriver.Builder().forBrowser("chrome").build();
const By = webdriver.By;

const defaultTimeout=1000;
const sleeptime = 3000; //how long to wait after each command to make tests visually percievable 


/*To Do:
Catching Timeout errors
*/
/*
Issues: 
No clear, clean way to tell if logged in or out with the html
Cart, Profile, and Home buttons aren't of button type
*/

var Locators = {
    Cart: By.xpath("//*[contains(@href, 'cart')]"),
    Profile: By.xpath("//*[@href='/profile']"),
    Home: By.xpath("//*[@href='/']"),
    LogOut: By.xpath("//*[@data-testid='logout-button']"),
    UserName: By.xpath("//*[@class='css-1sykydy']"),
}
async function elementExists(locator,timeout=defaultTimeout, webdriver=driver){
    await webdriver.wait(function(){
        return webdriver.findElement(locator).then(element=>{
            elem=element;
            return true;
            },function(err){
                return false;
            }       
        )
    },timeout, 'Timeout waiting for ' + locator.value).then(()=>{return true}, ()=>{return false});
  }
async function elementDoesNotExist(locator,timeout=defaultTimeout, webdriver=driver){
    return !elementExists(locator,timeout=defaultTimeout, webdriver=driver);
}
async function clickWhenClickable(locator,timeout=defaultTimeout, webdriver=driver){
    return await webdriver.wait(function(){
        return webdriver.findElement(locator).then(function(element){        
            return element.click().then(function(){
            return true;
            }, function(err){
            return false;
            })
        }, function(err){
            return false;
        });
    }, timeout, 'Timeout waiting for ' + locator.value).then(()=>{return true}, ()=>{return false} );
  }

 async function sendKeysWhenSendable(locator,keys, timeout=defaultTimeout, webdriver=driver){
    return await webdriver.wait(async function(){
      return webdriver.findElement(locator).then(async function(element){        
        return element.sendKeys(keys).then(async function(){
          return true;
        }, function(err){
          return false;
        })
      }, function(err){
        return false;
      });
    }, timeout, 'Timeout waiting for ' + locator.value).then(()=>{return true}, ()=>{return false} );    
  }
  class DriverWrapper{
    constructor(driver){
        this.driver=driver; 
        this.ActionList=[];
        this.url;
    }
    navigate(url){
        var that=this;
        this.ActionList.push(
            function() {
                that.driver.navigate().to("http://localhost:3000");
                return true;
            }
        );
    }
    noteUrl(){
        var that=this;
        this.ActionList.push(
            function() { that.url=that.driver.getCurrentUrl(); return true;}
        );       
    }
    checkUrl(url=None){ //checks if current URL matches the provided. If none provided, uses last stored url (from noteUrl)
        if (url==None)
            url=this.url;
        var that=this;
        this.ActionList.push(
            function() {
                console.log(!(url==that.driver.getCurrentUrl()));
                return !(url==that.driver.getCurrentUrl());
            }
        );   
    }
    checkElementExists(locator, timeout=defaultTimeout){
        var that = this;
        this.ActionList.push(
            function() {return elementExists(locator, timeout, that.driver);}
        );
    }
    click(locator, timeout=defaultTimeout){
        var that=this;
        this.ActionList.push(
            async function() {return clickWhenClickable(locator, timeout, that.driver);}
        );
    }
    sendKeys(locator, keys, timeout=defaultTimeout){
        var that=this;
        this.ActionList.push(
            function() {return sendKeysWhenSendable(locator, keys, timeout, that.driver);}
        );
    }
    async execute(failOnError=true){
        while(this.ActionList.length>0) {
            var success =  this.ActionList.shift()();
            if(success)
                await this.driver.sleep(sleeptime)
            else{
                if(failOnError){
                    console.log("Assert Failure");
                }
            }
        }

    }
}
async function login(testDriver, email){
    testDriver.navigate("http://localhost:3000");
    testDriver.sendKeys(By.name('email'),email); //type in your email
    testDriver.click(By.xpath("//*[contains(@type, 'submit')]")); //press submit button
    await testDriver.execute();
}
async function logout(testDriver, failOnError=false){
    testDriver.click(Locators.LogOut);
    await testDriver.execute(failOnError);
}
async function testDriver(){
    var testDriver = new DriverWrapper(driver);
    //Test Bad Login
    await login(testDriver, "a" );
    await logout(testDriver, false );
    //Test Bad Login
    await login(testDriver, "a@" );
    await logout(testDriver, false );
    //Test Successful Login
    await login(testDriver, "a@b" );
    testDriver.click(Locators.Cart);
    testDriver.click(Locators.Profile);
    testDriver.click(Locators.Home);
    await logout(testDriver, false );
    // testDriver.navigate("http://localhost:3000");
    // testDriver.noteUrl();
    // testDriver.checkElementExists(By.name('email'));
    // testDriver.sendKeys(By.name('email'),"Email@site.com");
    // testDriver.click(By.xpath('/html/body/div/div/form/button'));
    // testDriver.didUrlChange();
    // testDriver.click(By.xpath("//*[contains(@data-testid, 'logout')]"));
    // await testDriver.execute();
    // testDriver.sendKeys(By.name('email'),"Email@site.com");
    // testDriver.click(By.xpath('/html/body/div/div/form/button'));
    // testDriver.click(By.xpath("//*[contains(@data-testid, 'logout')]"));
    // await testDriver.execute();
}

testDriver();


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
        await clickWhenClickable(By.xpath('/html/body/div/div/form/button'), defaultTimeout)
        await driver.sleep(sleeptime)
        await clickWhenClickable(By.xpath("//*[contains(@data-testid, 'logout')]"), defaultTimeout);      
    }
    catch(e){
        console.log(e);
    }

}
// LogInLogOutTestAsync(driver);