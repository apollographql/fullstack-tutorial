const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000; // Adjusted timeout for waiting operations

(async function logoutTest() {
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

  try {
    console.log("Navigating to application...");
    await driver.get("http://localhost:3000"); // Adjust the URL if necessary

    // Verify login form is present
    console.log("Waiting for login form...");
    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);
    console.log("Login form detected.");

    //Perform login
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    console.log("Login submitted. Waiting for homepage...");

    // Verify user is logged in
    await driver.wait(until.elementLocated(By.css('[data-testid="logout-button"]')), TIMEOUT);
    console.log("Logout button detected. User is logged in.");

    // Perform logout
    console.log("Clicking on the Logout button...");
    const logoutButton = await driver.findElement(By.css('[data-testid="logout-button"]'));
    await logoutButton.click();

    // Verify user is logged out
    console.log("Waiting for login form to reappear...");
    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);
    const loginForm = await driver.findElement(By.css("form"));
    assert.ok(loginForm, "Login form should be visible after logout.");
    console.log("Logout successful. Login form is visible again.");

    console.log("Test Passed: Logout functionality verified.");
  } catch (error) {
    console.error("Test Failed:", error);

    // Capture the page source and URL for debugging
    const pageSource = await driver.getPageSource();
    console.log("Page Source at failure:\n", pageSource);

    const currentUrl = await driver.getCurrentUrl();
    console.log("Current URL at failure:", currentUrl);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
//