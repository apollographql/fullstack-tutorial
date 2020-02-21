import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems() {
          return cartItemsVar();
        }
      }
    }
  }
});

export const cartItemsVar = cache.makeLocalVar<string[]>([]);