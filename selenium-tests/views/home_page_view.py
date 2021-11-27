import os
import sys

sys.path += ['../../']

import logging
from views import product_view
import utils.helper as helper

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class HomePageView:
    HOME_PAGE_TITLE = "//h2[text()='Space Explorer']"
    HOME_PAGE_USERNAME = "//h5[text()='{}']"
    HOME_PAGE_NAME = "Space Explorer"
    LOAD_MORE_BUTTON = "//button[text()='Load More']"

    def __init__(self):

        super(HomePageView, self).__init__()

        self.current_page = None

    @staticmethod
    def click_load_more(driver):
        """ Clicks on Load More button """
        load_more_button = driver.find_element_by_xpath(HomePageView.LOAD_MORE_BUTTON)
        driver.execute_script("arguments[0].scrollIntoView();", load_more_button)
        load_more_button.click()

    def cancel_trips_from_home(self, driver, num_items, start_page=HOME_PAGE_NAME):
        """ Cancels booked trips from home page """
        product = product_view.ProductView()
        logger.info("Navigating to the profile page")
        helper.navigate_to_home_page(driver)
        self.current_page = self.HOME_PAGE_NAME
        product.cancel_trips(driver=driver, num_items=num_items, start_page=start_page)
