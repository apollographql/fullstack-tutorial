import utils.helper as helper
import utils.setup as setup


class AddManyTripsToCart:

    def __init__(self):
        self.email = helper.get_random_email()
        self.user = None
        self.num_products = 30

    def setup(self):
        try:
            self.user = setup.User()
            self.user.login_view.login(driver=self.user.chrome_driver, email=self.email, success=True)
            return True
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Adding many trips to cart test failed during setup step: {e}")

    def add_many_trips_to_cart(self):
        try:
            self.user.product_view.add_to_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            self.user.cart_view.verify_products_in_cart(driver=self.user.chrome_driver, num_items=self.num_products)
            self.user.teardown()
        except Exception as e:
            self.user.teardown()
            raise Exception(f"Test failed while adding trips to cart: {e}")


if __name__ == "__main__":
    test = AddManyTripsToCart()
    if test.setup():
        test.add_many_trips_to_cart()
