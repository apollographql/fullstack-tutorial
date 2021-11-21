import os
import sys
import time

sys.path += ['../../']
from views import home_page_view, cart_view
import utils.helper as helper
import logging
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class ProductView:
    PRODUCT_PAGE_NAME = "Product Page"
    PRODUCT_TITLE = "//div[@class='css-14estru']/div/h2[text()='{}']"
    ADD_TO_CART_BUTTON = "//button[contains(@data-testid,'action-button') and contains(text(), 'Add to Cart')]"
    REMOVE_FROM_CART_BUTTON = "//button[contains(@data-testid,'action-button') and contains(text(), 'Remove from Cart')]"

    def __init__(self):

        super(ProductView, self).__init__()

        self.current_page = None

    def add_to_cart(self, driver, num_items=1):
        """ Locates items on the home page and adds them to cart """
        helper.navigate_to_home_page(driver)
        self.current_page = home_page_view.HomePageView.HOME_PAGE_NAME
        helper.wait_for_element(driver=driver, locate_by=By.XPATH, locator=home_page_view.HomePageView.HOME_PAGE_TITLE)
        logger.info(f"Adding {num_items} products to the cart")
        self.add_or_remove_from_cart(driver=driver, add=True, num_items=num_items)

    def remove_from_cart(self, driver, num_items):
        """ Removes items from cart """
        helper.navigate_to_cart(driver)
        self.current_page = cart_view.CartView.CART_PAGE_NAME
        helper.wait_for_element(driver=driver, locate_by=By.XPATH, locator=cart_view.CartView.CART_PAGE_TITLE)
        logger.info(f"Removing {num_items} items from the cart")
        self.add_or_remove_from_cart(driver=driver, add=False, num_items=num_items)

    def add_or_remove_from_cart(self, driver, num_items, add=False):
        """ Generic function to add or remove specific number of products to/from the cart """
        times_click_load_more = 0
        if num_items > 20:
            times_click_load_more = num_items//20
        if add:
            action_button_one = self.ADD_TO_CART_BUTTON
            action_button_two = self.REMOVE_FROM_CART_BUTTON
            start_page = helper.NAVIGATION_BAR_HOME
        else:
            action_button_one = self.REMOVE_FROM_CART_BUTTON
            action_button_two = self.ADD_TO_CART_BUTTON
            start_page = helper.NAVIGATION_BAR_CART
        while num_items > 0:
            if times_click_load_more > 0:
                home_page_view.HomePageView.click_load_more(driver)
                times_click_load_more -= 1
            products = driver.find_elements_by_xpath(helper.PRODUCTS)
            product_name = products[num_items - 1].text
            logger.info(f"Clicking on product {product_name}")
            driver.execute_script("arguments[0].scrollIntoView();", products[num_items - 1])
            products[num_items - 1].click()
            try:
                helper.wait_for_element(driver=driver, locate_by=By.XPATH,
                                        locator=self.PRODUCT_TITLE.format(product_name))
                self.current_page = self.PRODUCT_PAGE_NAME
                logger.info(f"Clicking on {'Add to' if add else 'Remove from'} Cart button")
                driver.find_element_by_xpath(helper.BODY).send_keys(Keys.END)
                time.sleep(1)
                driver.find_element_by_xpath(action_button_one).click()
            except Exception as e:
                logger.error(f"Product page did not open: {e}")
                raise
            logger.info(f"Verifying product was {'added to' if add else 'removed from'} the cart")
            if not driver.find_element_by_xpath(action_button_two):
                logger.error(f"Item was not {'added to' if add else 'removed from'} cart")
                raise
            else:
                logger.info("Navigating back to the Home Page")
                driver.find_element_by_xpath(start_page).click()
                num_items -= 1
