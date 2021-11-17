import string
import random

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.remote.remote_connection import LOGGER
import logging
import enum
from io import StringIO
import sys
import unittest

BASE_URL = 'http://localhost:3000/'
NAVIGATION_BAR_HOME = "//a[text()='Home']"
NAVIGATION_BAR_PROFILE = "//a[text()='Profile']"
NAVIGATION_BAR_CART = "//a[text()='Cart']"
NAVIGATION_BAR_SIGN_OUT = "//button[@data-testid='logout-button']"


def random_string(length=5):
    """ Generates a random string of fixed lenght """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))
