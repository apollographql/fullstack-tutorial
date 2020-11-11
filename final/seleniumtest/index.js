const webdriver = require("selenium-webdriver");
const { elementIsNotSelected } = require("selenium-webdriver/lib/until");
const driver = new webdriver.Builder().forBrowser("chrome").build();
const By = webdriver.By;


 function LoginButton(){
      driver.findElement(By.xpath('/html/body/div/div/form/button')).then(element => 
        element.click(), 
        function(err){ console.log(err)});
}
function inputEmail(element, email){
    element.sendKeys('Email@site.com').then(()=>
    LoginButton(),
    function(err){ console.log(err)});
}
function findLoginElement(email){
    driver.findElement(By.name('email')).then(element => 
        inputEmail(element, email), 
        function(err){ console.log(err)});
}
// function Login(email="address@server.com"){
//     element = findLoginElement(email);
// }

async function navigate(driver){
    await driver.navigate().to("http://localhost:3000");
    var element= driver.findElement(By.name('email'));
    await element.sendKeys('Email@site.com');
    var clickElement = driver.findElement(By.xpath('/html/body/div/div/form/button'))
    clickElement.click();

}
navigate(driver);


//Driver into the Client
// driver.navigate()
//     .to("http://localhost:3000")
//     .then(() => Login())
//     .catch(error => console.log(error))

// console.log("In Selenium Test")