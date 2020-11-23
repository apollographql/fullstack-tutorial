const webdriver = require("selenium-webdriver");
const { elementIsNotSelected } = require("selenium-webdriver/lib/until");

const driver = new webdriver.Builder().forBrowser("chrome").build();
const By = webdriver.By;

const defaultTimeout=5000;
const sleeptime = 2000; //how long to wait after each command to make tests visually percievable 

/*To Do:
Catching Timeout errors
*/
/*
Issues: 
No clear, clean way to tell if logged in or out with the html
Cart, Profile, and Home buttons aren't of button type
*/

var Locators = {
    LogOut: By.xpath("//*[@data-testid='logout-button']"),
    UserName: By.xpath("//*[@class='css-1sykydy']"),
    Email: By.name('email'),
    Submit: By.xpath("//*[contains(@type, 'submit')]"),

    Cart: By.xpath("//*[contains(@href, 'cart')]"),
    BookAll: By.xpath("//*[@data-testid='book-button']"),

    AddToCart: By.xpath("//*[@data-testid='action-button']"),
    RemoveFromCart: By.xpath("//*[@data-testid='action-button']"),
    
    Profile: By.xpath("//*[@href='/profile']"),
    CancelTrip: By.xpath("//*[@data-testid='action-button']"),

    Home: By.xpath("//*[@href='/']"),
    LoadMore: By.xpath("//*[text()='Load More']"),
    Sacagawea: By.xpath("//*[@href='/launch/106']"),
    StarLink14: By.xpath("//*[@href='/launch/105']"),
    GenericLaunch: By.xpath("//*[contains(@href,'/launch/')]"),
}
async function checkAmountOfElementsWithLocator(locator, numberExpected, webdriver=driver){
    var elements = (await webdriver.findElements(locator)).length;
    console.log(elements);
    return elements==numberExpected;
  }
async function checkElementHasText(locator, text, timeout=defaultTimeout, webdriver=driver){
    var elemHasText;
    return await webdriver.wait(function(){
        return webdriver.findElement(locator).then(
            function(element){       
                return  element.getText().then((elemText)=>
                {             
                    elemHasText=(elemText.toUpperCase()==text.toUpperCase());
                    console.log("ELement has Text " + text + "? : " +elemHasText);
                    return true;
                }, 
                ()=>{return false;}
                )}, 
            function(err){
                return false;
            });
    }, timeout, 'Timeout waiting for ' + locator.value).then(()=>{return elemHasText}, ()=>{return false} );
  }
async function elementExists(locator,timeout=defaultTimeout, webdriver=driver){
    await webdriver.wait(function(){
        return webdriver.findElement(locator).then(element=>{
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
    try{
    return await webdriver.wait(function(){
        return webdriver.findElement(locator).then(
            function(element){                   
                webdriver.executeScript("arguments[0].scrollIntoView()", element).catch((e)=>console.log("Ignore this Error :/"));
                return  element.click().then(()=>{return true;}, ()=>{return false;})}, 
            function(err){
                return false;
            });
    }, timeout, 'Timeout waiting for ' + locator.value).then(()=>{return true}, ()=>{return false} );
    }
    catch(e){
        console.log(e);
    }
  }

 async function sendKeysWhenSendable(locator,keys, timeout=defaultTimeout, webdriver=driver){
    return await webdriver.wait(function(){
        return webdriver.findElement(locator).then(
            function(element){     
                return element.sendKeys(keys).then(()=>{return true;}, ()=>{return false;})}, 
            function(err){
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
    checkUrl(url=null){ //checks if current URL matches the provided. If none provided, uses last stored url (from noteUrl)
        if (url==null)
            url=this.url;
        var that=this;
        this.ActionList.push(
            function() {
                console.log("Assert: Check URL " + url+ ": " + !(url==that.driver.getCurrentUrl()));
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
            function() {return clickWhenClickable(locator, timeout, that.driver);}
        );
    }
    sendKeys(locator, keys, timeout=defaultTimeout){
        var that=this;
        this.ActionList.push(
            function() {return sendKeysWhenSendable(locator, keys, timeout, that.driver);}
        );
    }
    checkText(locator, text, timeout=defaultTimeout){
        var that=this;
        this.ActionList.push(
            function() {return checkElementHasText(locator, text, timeout, that.driver);}
        );
    }
    async execute(failOnError=true){
        while(this.ActionList.length>0) {
            try{
                var success =  this.ActionList.shift()();
                if(success)
                    await this.driver.sleep(sleeptime).catch((e)=>console.log(e));
                else{
                    if(failOnError){
                        console.log("Assert Failure");
                    }
                }
            }
            catch(e){
                console.log("Assert Error");
            }
        }

    }
}
async function login(testDriver, email){
    testDriver.navigate("http://localhost:3000");
    testDriver.sendKeys(Locators.Email,email); //type in your email
    testDriver.click(By.xpath("//*[contains(@type, 'submit')]")); //press submit button
    await testDriver.execute();
}
async function logout(testDriver, failOnError=false){
    testDriver.click(Locators.LogOut);
    await testDriver.execute(failOnError);
}
async function urlChecks(testDriver, failOnError=false){
    testDriver.click(Locators.Cart);
    testDriver.checkUrl("http://localhost:3000/cart")
    testDriver.click("Locators.Profile");
    testDriver.checkUrl("http://localhost:3000/profile")
    testDriver.click(Locators.Home);
    testDriver.checkUrl("http://localhost:3000/")
    await testDriver.execute();
}
async function loadChecks(testDriver, failOnError=false){
    //check that there are 20 launches and that "Load More" loads 20 more
    console.log("Assert: " + await checkAmountOfElementsWithLocator(Locators.GenericLaunch, 20));
    testDriver.click(Locators.LoadMore);
    await testDriver.execute();
    await driver.sleep(2000);
    console.log("Assert: " + await checkAmountOfElementsWithLocator(Locators.GenericLaunch, 40));
    //check that it displays the right email
    testDriver.checkText(Locators.UserName,"ValidEmail@ValidWebsite" );
}

async function testDriver(){
    var testDriver = new DriverWrapper(driver);
    //Test Bad Login
    await login(testDriver, "ThisEmailAddressHasNoAt" );
    await logout(testDriver, false );
    //Test Bad Login
    await login(testDriver, "ThisEmailHasAnAtButNoAddress@" );
    await logout(testDriver, false );
    
    //Test Successful Login
    await login(testDriver, "ValidEmail@ValidWebsite" );
    await driver.navigate().refresh();
    //Click to navigate to each page and confirm Urls
    await urlChecks(testDriver);

    await loadChecks(testDriver);

    
    testDriver.click(Locators.Sacagawea);
    testDriver.click(Locators.AddToCart);
    testDriver.click(Locators.Home);
    testDriver.click(Locators.StarLink14);
    testDriver.click(Locators.AddToCart);
    testDriver.click(Locators.Cart);
    testDriver.click(Locators.BookAll);
    testDriver.click(Locators.Profile);
    testDriver.click(Locators.Sacagawea);
    testDriver.click(Locators.CancelTrip);
    testDriver.click(Locators.Profile);
    testDriver.click(Locators.StarLink14);
    testDriver.click(Locators.CancelTrip);
    // await testDriver.execute();
    await logout(testDriver, false );
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