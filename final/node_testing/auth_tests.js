require('chromedriver');
const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const assert = require('assert');
const testEmail = 'SeleniumTest@Gmail.Test'
let driver = new Builder().forBrowser('chrome').build();

runTests();

async function runTests(){
    await openApp();
    await verifyNoPermissionRedirectTest();
    await login();
    await loginTest();
    await userVerificationTest();
    await navigateToCart();
    await verifiesCartIsempty();
    await userVerificationTest();
    await naviageToProfile();
    await naviageToHome();
    await userVerificationTest();
    await cartTests();
    await userVerificationTest();
    await naviageToLogout();
    await verifyNoPermissionRedirectTest();
    await closeApp();
}

async function cartTests() {
    await accessLaunchTile();
    await addStarlinkToCart();
    await navigateToCart();
    await verifystartLinkAddedInTheCart();
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

async function loginTest() {
    //Verify the user got past the login screen
    var actualHeading = await driver.wait(until.elementLocated(By.tagName('h2')), 5000).getText();

    assert.equal(actualHeading, 'Space Explorer');
    console.log('Pass: Testing user was successfully able to pass the login screen.')
}

async function userVerificationTest() {
    await driver.wait(until.elementLocated(By.tagName('h5')), 5000).then(async() => {
        //Verify that the SeleniumTest user is logged in.
        var actualUsername = await driver.findElement(By.tagName('h5')).getText();

        //the css puts this in upper case.
        assert.equal(actualUsername, testEmail.toUpperCase());
        console.log('Pass: User authenticated on page.')
    });
}

async function navigateToCart() {
    await driver.findElement(By.id('cart')).click();
}

async function naviageToProfile() {
    await driver.findElement(By.id('profile')).click();
}

async function naviageToHome() {
    await driver.findElement(By.id('home')).click();
}

async function accessLaunchTile() {
    await driver.wait(until.elementLocated(By.id('109')), 5000).click();
}

async function addStarlinkToCart() {
    await driver.wait(until.elementLocated(By.id('add-to-cart')), 5000).click();
    console.log('Pass: 1 item added to the cart');
}

async function verifiesCartIsempty() {
    var message = await driver.findElement(By.id('empty-cart')).getText();
    assert.equal(message, 'No items in your cart');
    console.log('Pass: No item added in the cart');
}

async function verifystartLinkAddedInTheCart() {
   await driver.wait(until.elementLocated(By.id('109')), 5000).then(async() => {
        var url = await driver.findElement(By.id('109')).getAttribute('href');
        assert.equal(url, 'http://localhost:3000/launch/109');
        console.log('Pass: 1 item available in cart');
    });
}

async function naviageToLogout() {
    await driver.findElement(By.id('logout-button')).click();
}

async function closeApp() {
    await driver.quit();
}
