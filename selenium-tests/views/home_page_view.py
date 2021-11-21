import os
import sys

sys.path += ['../../']

import logging

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
