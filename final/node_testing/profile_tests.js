const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const assert = require('assert');
const testEmail = 'SeleniumTest@Gmail.Test'
let driver = new Builder().forBrowser('chrome').build();


runTests();
//checks to see if the profile successfully displays a booked trip
//then checks to see if the profile successfully shows no booked trips

async function runTests(){
    await openApp();
    await verifyNoPermissionRedirectTest();
    await login();
    await refreshPage();
    await userVerificationTest();
    await selectFirstTile();
    await clickActionButton();
    await navigateToCart();
    await userVerificationTest();
    await clickBookButton();
    await navigateToProfile();
    await userVerificationTest();
    await selectFirstTile();
    await clickActionButton();
    await navigateToProfile();
    await userVerificationTest();
    await navigateToLogout();
    await verifyNoPermissionRedirectTest();
    await closeApp();
}

async function openApp() {
    //Make sure both client and server are running prior to exectuing this script.
    await driver.get('http://localhost:3000/');
    //driver.manage().setTimeouts({ implicit: 1000});
}

async function verifyNoPermissionRedirectTest() {
    var userFormField = await driver.findElement(By.name('email'));
    assert.ok(userFormField)
    console.log('Pass: user is not logged in.')
}

async function login() {
    await driver.findElement(By.name('email')).sendKeys(testEmail, Key.ENTER);
}

async function refreshPage() {
    await driver.navigate().refresh();
}

async function userVerificationTest() {
    //Verify that the SeleniumTest user is logged in.
    let actualUsername = await driver.wait(until.elementLocated(By.id('username')), 5000).getText();

    //the css puts this in upper case.
    assert.equal(actualUsername, testEmail.toUpperCase());
    console.log('Pass: User authenticated on page.')
}

async function selectFirstTile() {
    await driver.wait(until.elementLocated(By.id('tile109')), 5000).click();
}

async function clickActionButton() {
    await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='action-button']")), 5000).click();
}

async function navigateToCart() {
    await driver.wait(until.elementLocated(By.id('cart')), 5000).click();
}

async function clickBookButton() {
    await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='book-button']")), 5000).click();
}

async function navigateToProfile() {
    await driver.wait(until.elementLocated(By.id('profile'), 5000)).click();
}

async function navigateToLogout() {
    await driver.wait(until.elementLocated(By.id('logout-button')), 5000).click();
}

async function closeApp() {
    await driver.quit();
}
