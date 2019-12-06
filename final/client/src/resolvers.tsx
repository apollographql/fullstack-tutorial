import gql from 'graphql-tag';
import { GET_CART_ITEMS } from './pages/cart';
import { LaunchTile } from './pages/__generated__/LaunchTile';
import { ApolloCache } from 'apollo-cache';
import { GetCartItems } from './pages/__generated__/GetCartItems';
import { Resolvers } from 'apollo-client'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

type ResolverFn = (parent: any, args: any, { cache } : { cache: ApolloCache<any> }) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Launch: ResolverMap;
  Mutation: ResolverMap;
}

export const resolvers: AppResolvers = {
  Launch: {
    isInCart: (launch: LaunchTile, _, { cache }): boolean => {
      const queryResult = cache.readQuery<GetCartItems, any>({ query: GET_CART_ITEMS });
      if (queryResult) {
        return queryResult.cartItems.includes(launch.id)
      } 
      return false;
    }
  },
  Mutation: {
    addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
      const queryResult = cache.readQuery<GetCartItems, any>({ query: GET_CART_ITEMS });
      if (queryResult) {
        const { cartItems } = queryResult;
        const data = {
          cartItems: cartItems.includes(id)
            ? cartItems.filter((i) => i !== id)
            : [...cartItems, id],
        };
        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
      return [];
    },
  },
};
