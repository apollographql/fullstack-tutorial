from selenium import webdriver
import helper
from setup import User


class TestLogin:

    def __init__(self):
        self.email = helper.random_string()

    def test_wrong_format(self):
        User.login(email=self.email)

