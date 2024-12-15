const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000; // Timeout to account for delays

(async function removeFromCartTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Step 1: Navigate to the login page and log in
    await driver.get("http://localhost:3000");
    console.log("Login page loaded.");
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    console.log("Login submitted.");

    // Step 2: Navigate to the homepage
    await driver.wait(
      until.urlContains("localhost:3000"),
      TIMEOUT,
      "Failed to load homepage after login."
    );
    console.log("Homepage loaded.");

    // Step 3: Navigate to the first available item details page
    const firstItem = await driver.wait(
      until.elementLocated(By.css('a[href^="/launch/"]')), // Selects the first item link
      TIMEOUT
    );
    await firstItem.click();
    console.log("Navigated to the item details page.");

    // Step 4: Automatically Add to Cart
    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="action-button"]')),
      TIMEOUT,
      "Failed to find the Add to Cart button."
    );

    // Scroll the button into view and click
    await driver.executeScript("arguments[0].scrollIntoView(true);", addToCartButton);
    await driver.wait(until.elementIsVisible(addToCartButton), TIMEOUT);
    await addToCartButton.click();
    console.log("Clicked 'Add to Cart' button.");

    // Step 5: Verify the button text changes to "Remove from Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "remove from cart";
    }, TIMEOUT);
    console.log("Item successfully added to the cart.");

    // Step 6: Automatically Remove from Cart
    await addToCartButton.click(); // Click the same button to remove the item
    console.log("Clicked 'Remove from Cart' button.");

    // Step 7: Verify the button text changes back to "Add to Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "add to cart";
    }, TIMEOUT);
    console.log("Item successfully removed from the cart.");

    // Test passed
    console.log("Test Passed: Remove from Cart functionality verified.");
  } catch (error) {
    console.error("Test Failed:", error);

    // Log the page source for debugging
    const pageSource = await driver.getPageSource();
    console.log("Page Source at failure:\n", pageSource);
  } finally {
    console.log("Test completed. Closing the browser...");
    await driver.quit();
  }
})();
