import { GET_CART_ITEMS } from './pages/cart';

const resolvers = {
  Query: {
    isLoggedIn: async () => {
      return await !!localStorage.getItem('token');
    },
  },
  Launch: {
    isInCart: (launch, _, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      return cartItems.includes(launch.id);
    },
  },
  Mutation: {
    addOrRemoveFromCart: (_, { id }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      const data = {
        cartItems: cartItems.includes(id)
          ? cartItems.filter(i => !i)
          : [...cartItems, id],
      };
      cache.writeQuery({ query: GET_CART_ITEMS, data });
      return data.cartItems;
    },
  },
};

export default resolvers;
