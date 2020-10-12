const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

driver.navigate().to("http://google.com/");
console.log("In Selenium Test")