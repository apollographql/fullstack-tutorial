import os
import sys
sys.path += ['../../']
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from views import login_view, home_page_view, cart_view, product_view, profile_view
import logging

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class User:

    def __init__(self):

        super(User, self).__init__()

        self.chrome_driver = None
        self.setup_browser()
        self.login_view = login_view.LoginView()
        self.home_page_view = home_page_view.HomePageView()
        self.cart_view = cart_view.CartView()
        self.product_view = product_view.ProductView()
        self.profile_view = profile_view.ProfileView()

    @staticmethod
    def _get_chrome_driver():
        """ Returns Chrome driver """
        return webdriver.Chrome(ChromeDriverManager().install())

    def setup_browser(self):
        """ Gets a browser instance and maximizes the window """
        logger.info("Acquiring Chrome browser instance")
        self.chrome_driver = self._get_chrome_driver()
        self.chrome_driver.maximize_window()
        logger.info("Chrome browser started")
        return self.chrome_driver

    def teardown(self):
        """ Closes browser session """
        logger.info("Closing browser session")
        self.chrome_driver.close()
        logger.info("Browser session was successfully closed")
