const webdriver = require("selenium-webdriver");
const { elementIsNotSelected } = require("selenium-webdriver/lib/until");
const driver = new webdriver.Builder().forBrowser("chrome").build();
const By = webdriver.By;

function inputEmail(element, email){
    element.sendKeys('Email@site.com')
}
function findLoginElement(email){
    driver.findElement(By.name('email')).then(element => inputEmail(element, email), function(err){ console.log(err)});
}
function Login(email="address@server.com"){
    element = findLoginElement(email);
}
//Driver into the Client
driver
    .navigate()
    .to("http://localhost:3000")
    .then(() => Login())
    .catch(error => console.log(error))

console.log("In Selenium Test")