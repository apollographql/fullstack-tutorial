import os
import sys
import time

sys.path += ['../../']

import utils.helper as helper
import logging
from views import product_view

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class ProfileView:
    PROFILE_PAGE_NAME = "Profile Page"
    PROFILE_PAGE_TITLE = "//div[@class='css-14estru']/div/h2[text()='My Trips']"
    NO_TRIPS_MESSAGE = '//p[text()="You haven\'t booked any trips"]'

    def __init__(self):

        super(ProfileView, self).__init__()

        self.current_page = None

    def verify_trips_booked(self, driver, num_items):
        """ Verifies the given number of trips in the profile """
        logger.info("Navigating to the profile page")
        helper.navigate_to_profile_page(driver)
        self.current_page = self.PROFILE_PAGE_NAME
        logger.info(f"Verifying there is/are {num_items} trip(s) in the profile")
        time.sleep(2)
        products = driver.find_elements_by_xpath(helper.PRODUCTS)
        logger.info(f"There is/are {len(products)} trip(s) in the profile")
        assert len(products) == num_items

    def cancel_trips_from_profile(self, driver, num_items, start_page=PROFILE_PAGE_NAME):
        """ Cancels booked trips from profile page"""
        product = product_view.ProductView()
        logger.info("Navigating to the profile page")
        helper.navigate_to_profile_page(driver)
        self.current_page = self.PROFILE_PAGE_NAME
        logger.info("Verify there is enough trips to cancel in the profile")
        products = driver.find_elements_by_xpath(helper.PRODUCTS)
        if len(products) != num_items:
            logger.error("Not enough trips to cancel")
            raise
        product.cancel_trips(driver=driver, num_items=num_items, start_page=start_page)

    def verify_no_trips_booked(self, driver):
        """ Checks for No Trips Booked message """
        helper.navigate_to_profile_page(driver)
        time.sleep(2)
        logger.info("Verifying there are no trips in the profile")
        try:
            driver.find_element_by_xpath(self.NO_TRIPS_MESSAGE)
        except Exception as e:
            logger.error(f"Could not cancel the trip: {e}")
            raise
