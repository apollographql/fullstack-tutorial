import { InMemoryCache, Reference } from '@apollo/client';

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
        launches: {
          merge(existing, incoming) {
            let launches: Reference[] = [];
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          }
        }
      }
    }
  }
});

export const isLoggedInVar =
  cache.makeLocalVar<boolean>(!!localStorage.getItem('token'));
export const cartItemsVar = cache.makeLocalVar<string[]>([]);
