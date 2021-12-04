const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 
const assert = require('assert');
const testEmail = 'ProfileTest@Gmail.Test'
const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches("enable-logging");
let driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

runProfileTests();

async function runProfileTests(){
    // Open app and login
    await openApp();
    await verifyNoPermissionRedirectTest();
    await login();
    await refreshPage();
    await userVerificationTest();
    
    // Check profile with no booked trips
    await navigateToProfile();
    await verifyProfileIsEmpty();

    // Book a trip
    await navigateToHome();    
    await selectFirstTrip();
    await clickActionButton();
    await navigateToCart();
    await clickBookButton();
    await verifyTripIsBooked();

    // Check profile with booked trip    
    await navigateToProfile();
    await verifyTripAddedToProfile();
    
    // Verify removal of trip on profile
    await selectFirstTrip();
    await cancelTrip();
    await navigateToProfile();
    await verifyProfileIsEmpty();

    // Logout and exit app
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
    console.log('Pass: User is not logged in.')
}

async function login() {
    await driver.findElement(By.name('email')).sendKeys(testEmail, Key.ENTER);
}

async function refreshPage() {
    await driver.navigate().refresh();
}

async function userVerificationTest() {
    await driver.wait(until.elementLocated(By.id('username')), 5000).then(async() => {
        //Verify that the SeleniumTest user is logged in.
        var actualUsername = await driver.wait(until.elementLocated(By.id('username'), 5000)).getText();

        //the css puts this in upper case.
        assert.equal(actualUsername, testEmail.toUpperCase());
        console.log('Pass: User authenticated on page.')
    });
}

async function navigateToHome() {
    await driver.findElement(By.id('home')).click();
}

async function selectFirstTrip() {
    await driver.wait(until.elementLocated(By.id('109')), 5000).click();
}

async function clickActionButton() {
    await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='action-button']")), 5000).click();
}

async function cancelTrip() {
    await driver.wait(until.elementLocated(By.id('cancel-this-trip')), 5000).click();
    console.log('Pass: User cancels trip.');
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

async function verifyProfileIsEmpty() {
    var message = await driver.wait(until.elementLocated(By.id('empty-profile'), 5000)).getText();
    assert.equal(message, 'You haven\'t booked any trips');
    console.log('Pass: Profile shows no trips booked.');
}

async function verifyTripIsBooked() {
    var message = await driver.wait(until.elementLocated(By.id('empty-cart'), 5000)).getText();
    assert.equal(message, 'No items in your cart');
    console.log('Pass: User books a trip.');
}

async function verifyTripAddedToProfile() {
   await driver.wait(until.elementLocated(By.id('109')), 5000).then(async() => {
        var url = await driver.findElement(By.id('109')).getAttribute('href');
        assert.equal(url, 'http://localhost:3000/launch/109');
        console.log('Pass: Profile shows 1 booked trip.');
    });
}

async function navigateToLogout() {
    await driver.wait(until.elementLocated(By.id('logout-button')), 5000).click();
}

async function closeApp() {
    await driver.quit();
}
