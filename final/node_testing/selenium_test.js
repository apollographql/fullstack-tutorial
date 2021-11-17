const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const assert = require('assert');
const testEmail = 'SeleniumTest@Gmail.Test'
let driver = new Builder().forBrowser('chrome').build();

openApp();
login();
loginTest();

function openApp() {
    //Make sure both client and server are running prior to exectuing this script.
    driver.get('http://localhost:3000/');
    driver.manage().setTimeouts({ implicit: 5000});

}

async function login() {
    await driver.findElement(By.name('email')).sendKeys(testEmail, Key.ENTER);
}

async function loginTest() {
    //Verify that the SeleniumTest user is logged in.
    //driver.findElement(By.tagName('h2')).isDisplayed();
    var cat = await driver.wait(until.elementLocated(By.id('username')), 10000);
    //the css puts this in upper case.
    assert.equal(await cat.getText(), testEmail.toUpperCase());
}
