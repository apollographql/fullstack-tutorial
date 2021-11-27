import utils.helper as helper
import utils.setup as setup


class LogInLogOut:

    def __init__(self):
        self.incorrect_email = helper.get_random_string()
        self.user = None

    def login_incorrect_email(self):
        try:
            self.user = setup.User()
            self.user.login_view.login(driver=self.user.chrome_driver, email=self.incorrect_email, success=False)
            self.user.teardown()
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Login with incorrect email test failed: {e}")


if __name__ == "__main__":
    test = LogInLogOut()
    test.login_incorrect_email()
