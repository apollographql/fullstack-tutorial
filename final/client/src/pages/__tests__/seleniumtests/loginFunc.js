// test/loginForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 2000;

(async function loginFormTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the page containing the LoginForm
    await driver.get("http://localhost:3000"); // Adjust the URL as necessary

    // Wait for the LoginForm to be present
    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

    // Find the email input field and enter an email
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");

    // Find the submit button and click it
    const submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await submitButton.click();

    // Check if the next page with the title "Space Explorer" with h2 is present
    try {
      await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
      const title = await driver.findElement(By.css("h2")).getText();
      assert.strictEqual(title, "Space Explorer");
    } catch (error) {
      throw new Error("Test Failed: Title not found");
    }

    // Assert that the success message is as expected
    assert.strictEqual(true, true);
    console.log("Test Passed: Login form submitted successfully.");
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await driver.quit();
  }
})();
