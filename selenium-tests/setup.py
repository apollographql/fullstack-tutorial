from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import helper
from views import login_view, home_page_view
from selenium.webdriver.remote.remote_connection import LOGGER as logger


class User(webdriver.Chrome):
    def __init__(self, email):

        super(User, self).__init__()

        self.email = email
        self.current_page = None

    def login(self):
        """ Navigates to the base URL and enters """
        try:
            logger.info(msg="Navigating to Base URL")
            self.get(helper.BASE_URL)
            self.current_page = login_view.LOGIN_PAGE_TITLE
            logger.info(msg=f"Signing in as {self.email}")
            self.find_element_by_xpath(login_view.EMAIL_INPUT_XPATH).send_keys(self.email)
            self.find_element_by_xpath(login_view.LOGIN_BUTTON).click()
            logger.info(msg="Verifying sign in was successful")
            self.find_element_by_xpath(home_page_view.HOME_PAGE_TITLE)
            self.find_element_by_xpath(home_page_view.HOME_PAGE_USERNAME.format(self.email))
            logger.info(msg=f"Successfully signed in as {self.email}")
        except NoSuchElementException:
            raise Exception("Login failed")

    def logout(self):
        try:
            logger.info(msg="Signing out")
            self.find_element_by_xpath(helper.NAVIGATION_BAR_SIGN_OUT).click()
            self.find_element_by_xpath(login_view.LOGIN_PAGE_XPATH)
            logger.info(msg="Successfully signed out")
        except NoSuchElementException:
            raise Exception("Sign out failed")
