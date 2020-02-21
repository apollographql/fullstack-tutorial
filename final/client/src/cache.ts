import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        cartItems() {
          return cartItemsVar();
        },
      }
    }
  }
});

export const isLoggedInVar =
  cache.makeLocalVar<boolean>(!!localStorage.getItem('token'));
export const cartItemsVar = cache.makeLocalVar<string[]>([]);

