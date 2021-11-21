import os
import sys
import time

sys.path += ['../../']

from selenium.webdriver.common.keys import Keys
import utils.helper as helper
import logging

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class CartView:
    CART_PAGE_NAME = "Cart"
    CART_PAGE_TITLE = "//div[@class='css-14estru']/div/h2[text()='My Cart']"
    BOOK_ALL_BUTTON = "//button[@data-testid='book-button']"
    EMPTY_CART_MESSAGE = "//p[@data-testid='empty-message' and text()='No items in your cart']"

    def __init__(self):

        super(CartView, self).__init__()

        self.current_page = None

    def verify_products_in_cart(self, driver, num_items):
        """ Verifies the given number of products in the cart """
        logger.info("Navigating to the cart")
        helper.navigate_to_cart(driver)
        self.current_page = self.CART_PAGE_NAME
        logger.info(f"Verifying there is {num_items} product(s) in the cart")
        products = driver.find_elements_by_xpath(helper.PRODUCTS)
        logger.info(f"There are {len(products)} product(s) in the cart")
        assert len(products) == num_items

    def book_all_trips(self, driver):
        """ Books all existing trips in the cart """
        logger.info("Navigating to the cart")
        helper.navigate_to_cart(driver)
        self.current_page = self.CART_PAGE_NAME
        driver.find_element_by_xpath(helper.BODY).send_keys(Keys.END)
        time.sleep(1)
        logger.info("Clicking on Book All")
        driver.find_element_by_xpath(self.BOOK_ALL_BUTTON).click()
        logger.info("Verifying all trips were booked and cart is empty")
        driver.find_element_by_xpath(self.EMPTY_CART_MESSAGE)
