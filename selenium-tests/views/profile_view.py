import os
import sys

sys.path += ['../../']

import utils.helper as helper
import logging

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class ProfileView:
    PROFILE_PAGE_NAME = "Profile Page"
    PROFILE_PAGE_TITLE = "//div[@class='css-14estru']/div/h2[text()='My Trips']"

    def __init__(self):

        super(ProfileView, self).__init__()

        self.current_page = None

    def verify_trips_booked(self, driver, num_items):
        """ Verifies the given number of trips in the profile """
        logger.info("Navigating to the profile page")
        helper.navigate_to_profile_page(driver)
        self.current_page = self.PROFILE_PAGE_NAME
        logger.info(f"Verifying there is/are {num_items} trip(s) in the profile")
        products = driver.find_elements_by_xpath(helper.PRODUCTS)
        logger.info(f"There is/are {len(products)} trip(s) in the profile")
        assert len(products) == num_items
