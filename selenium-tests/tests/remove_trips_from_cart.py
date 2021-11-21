import utils.helper as helper
import utils.setup as setup


class RemoveTripsFromCart:

    def __init__(self):
        self.email = helper.get_random_email()
        self.user = None
        self.num_products = 2

    def setup(self):
        try:
            self.user = setup.User()
            self.user.login_view.login(driver=self.user.chrome_driver, email=self.email, success=True)
            self.user.product_view.add_to_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            self.user.cart_view.verify_products_in_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            return True
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Removing trips from cart test failed during setup step: {e}")

    def remove_trips_from_cart(self):
        try:
            self.user.product_view.remove_from_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            self.user.cart_view.verify_products_in_cart(driver=self.user.chrome_driver, num_items=0)
            self.user.teardown()
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Test failed while removing trips from cart: {e}")


if __name__ == "__main__":
    test = RemoveTripsFromCart()
    if test.setup():
        test.remove_trips_from_cart()
