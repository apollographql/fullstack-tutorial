import os
import sys

sys.path += ['../../']

from views import login_view
import string
import random
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import logging

logger = logging.getLogger()
logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))

BODY = "//body"
BASE_URL = 'http://localhost:3000/'
NAVIGATION_BAR_HOME = "//a[text()='Home']"
NAVIGATION_BAR_PROFILE = "//a[text()='Profile']"
NAVIGATION_BAR_CART = "//a[text()='Cart']"
NAVIGATION_BAR_SIGN_OUT = "//button[@data-testid='logout-button']"
PRODUCTS = "//a[@class='css-10q0vj5']/h3"


def get_random_string(length=5):
    """ Generates a random string of fixed lenght """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))


def get_random_email():
    username = get_random_string()
    return username + "@gmail.com"


def wait_for_element(driver, locate_by, locator, timeout=5):
    """ Waits for a specific element """
    if locate_by == By.CLASS_NAME:
        WebDriverWait(driver, timeout).until(EC.presence_of_element_located((By.CLASS_NAME, locator)))
    if locate_by == By.XPATH:
        WebDriverWait(driver, timeout).until(EC.presence_of_element_located((By.XPATH, locator)))


def navigate_to_cart(driver):
    """ Navigates to Cart Page """
    driver.find_element_by_xpath(NAVIGATION_BAR_CART).click()


def navigate_to_home_page(driver):
    """ Navigates to Home Page """
    driver.find_element_by_xpath(NAVIGATION_BAR_HOME).click()


def navigate_to_profile_page(driver):
    """ Navigates to Profile Page """
    driver.find_element_by_xpath(NAVIGATION_BAR_PROFILE).click()


def logout(driver):
    """ Signs out of the website """
    try:
        logger.info("Signing out")
        wait_for_element(driver=driver, locate_by=By.XPATH, locator=NAVIGATION_BAR_SIGN_OUT)
        driver.find_element_by_xpath(NAVIGATION_BAR_SIGN_OUT).click()
        logger.info("Verifying sign out was successful")
        wait_for_element(driver=driver, locate_by=By.XPATH, locator=login_view.LoginView.LOGIN_PAGE_XPATH)
        logger.info("Successfully signed out")
    except Exception as e:
        logger.error(f"Sign out failed: {e}")
