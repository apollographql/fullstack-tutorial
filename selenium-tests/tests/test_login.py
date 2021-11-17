import utils.helper as helper
import utils.setup as setup


class TestLogInLogOut:

    def __init__(self):
        self.username = helper.random_string()
        self.user = setup.User(email=self.username)

    def test_log_in_log_out(self):
        try:
            self.user.login()
            self.user.logout()
        except:
            raise Exception("Failed to login")


if __name__ == "__main__":
    test = TestLogInLogOut()
    test.test_log_in_log_out()
    test.user.teardown()
