import os
import sys
sys.path += ['../../']
import utils.helper as helper
from views import home_page_view
import logging
from selenium.webdriver.common.by import By

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))


class LoginView:
    LOGIN_PAGE_XPATH = "//title['Launches']"
    LOGIN_PAGE_TITLE = "Launches"
    EMAIL_INPUT_XPATH = "//input[@name='email']"
    LOGIN_BUTTON = "//button[@type='submit']"

    def __init__(self):

        super(LoginView, self).__init__()

        self.current_page = None

    def login(self, driver, email, success=True):
        """ Navigates to the base URL and enters login credentials """
        try:
            logger.info("Navigating to Base URL")
            driver.get(helper.BASE_URL)
            self.current_page = self.LOGIN_PAGE_TITLE
            logger.info(f"Signing in as {email}")
            helper.wait_for_element(driver=driver, locate_by=By.XPATH, locator=self.EMAIL_INPUT_XPATH)
            driver.find_element_by_xpath(self.EMAIL_INPUT_XPATH).send_keys(email)
            driver.find_element_by_xpath(self.LOGIN_BUTTON).click()
            if success:
                logger.info("Verifying sign in was successful")
                helper.wait_for_element(driver=driver, locate_by=By.XPATH,
                                        locator=home_page_view.HomePageView.HOME_PAGE_TITLE)
                helper.wait_for_element(driver=driver, locate_by=By.XPATH,
                                        locator=home_page_view.HomePageView.HOME_PAGE_USERNAME.format(email))
                self.current_page = home_page_view.HomePageView.HOME_PAGE_NAME
                logger.info(f"Successfully signed in as {email}")
            else:
                logger.info("Verifying sign in was unsuccessful")
                assert self.current_page == self.LOGIN_PAGE_TITLE
                logger.info("Sign in was unsuccessful")
        except Exception as e:
            logger.error(f"Login failed: {e}")
            raise
