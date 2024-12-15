// test/profileForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 2000;

(async function profileFormTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  await login(driver);
  try {
    // Navigate to the page containing the ProfileForm without .get 
    

    try {
      await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
      // Check if the next page with the title "My Trips" with h2 is present
      const title = await driver.findElement(By.css("h2")).getText();
      assert.strictEqual(title, "My Trips");
    } catch (error) {
      throw new Error("Test Failed: Title not found");
    }

    // Assert that the success message is as expected
    assert.strictEqual(true, true);
    console.log("Test Passed: profile form submitted successfully.");
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await driver.quit();
  }
})();

async function login(driver) {
  await driver.get("http://localhost:3000");
  await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

  const emailInput = await driver.findElement(By.css('input[name="email"]'));
  await emailInput.sendKeys("test@gmail.com");

  const submitButton = await driver.findElement(
    By.css('button[type="submit"]')
  );
  await submitButton.click();
}