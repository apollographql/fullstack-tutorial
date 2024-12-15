const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000;

(async function countCartItemsTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the login page
    await driver.get("http://localhost:3000");
    console.log("Login page loaded.");
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    console.log("Login submitted.");

    // Add specific items to the cart by navigating directly to their details pages
    const itemIds = [1, 2, 3]; // Example item IDs to add to the cart
    for (const itemId of itemIds) {
      console.log(`Navigating to item ${itemId} details page...`);
      await driver.get(`http://localhost:3000/launch/${itemId}`);
      await driver.wait(until.urlContains(`/launch/${itemId}`), TIMEOUT);
      console.log(`Current URL: ${await driver.getCurrentUrl()}`);

      console.log("Locating 'Add to Cart' button...");
      const addToCartButton = await driver.wait(
        until.elementLocated(By.css('[data-testid="action-button"]')),
        TIMEOUT
      );

      // Scroll to the button to ensure visibility
      await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", addToCartButton);
      await driver.wait(until.elementIsVisible(addToCartButton), TIMEOUT);

      console.log("Clicking 'Add to Cart' button...");
      await addToCartButton.click();

      // Verify the button text changes to "Remove from Cart"
      await driver.wait(async () => {
        const buttonText = await addToCartButton.getText();
        return buttonText.toLowerCase() === "remove from cart";
      }, TIMEOUT);
      console.log(`Item ${itemId} successfully added to the cart.`);
    }

    // Navigate to the cart page
    await driver.get("http://localhost:3000/cart");
    console.log("Navigated to the cart page.");

    // Count and verify the number of items in the cart
    const cartItems = await driver.findElements(By.css('[data-testid^="cart-item-"]'));
    console.log(`Number of items in the cart: ${cartItems.length}`);
    if (cartItems.length === itemIds.length) {
      console.log("Test Passed: Correct number of items in the cart.");
    } else {
      console.log("Test Failed: Item count mismatch.");
    }
  } catch (error) {
    console.error("Test Failed:", error);

    // Log the page source for debugging
    const pageSource = await driver.getPageSource();
    console.log("Page Source at failure:\n", pageSource);
  } finally {
    console.log("Test complete. Closing browser...");
    await driver.quit();
  }
})();
