import utils.helper as helper
import utils.setup as setup


class TripsInCartDisappearAfterLogout:

    def __init__(self):
        self.email = helper.get_random_email()
        self.user = None
        self.num_products = 3

    def setup(self):
        try:
            self.user = setup.User()
            self.user.login_view.login(driver=self.user.chrome_driver, email=self.email, success=True)
            self.user.product_view.add_to_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            self.user.cart_view.verify_products_in_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            return True
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Booking trips test failed during setup step: {e}")

    def logout_check_trips_in_cart(self):
        try:
            helper.logout(driver=self.user.chrome_driver)
            self.user.login_view.login(driver=self.user.chrome_driver, email=self.email, success=True)
            helper.navigate_to_cart(driver=self.user.chrome_driver)
            self.user.chrome_driver.refresh()
            self.user.cart_view.verify_products_in_cart(driver=self.user.chrome_driver, num_items=0)
            self.user.teardown()
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Test failed while booking trips: {e}")


if __name__ == "__main__":
    test = TripsInCartDisappearAfterLogout()
    if test.setup():
        test.logout_check_trips_in_cart()
