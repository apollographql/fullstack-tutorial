import { ApolloServer } from "apollo-server";
import * as isEmail from "isemail";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createStore } from "./utils";

import { LaunchAPI } from "./datasources/launch";
import { UserAPI } from "./datasources/user";

// creates a sequelize connection once. NOT for every request
const store = createStore();
export type Store = typeof store;

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store })
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = new Buffer(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user: any = users && users[0] ? users[0] : null;

  return { user: { ...user.dataValues } };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test")
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
  server
};

export type Context = {
  dataSources: {
    launchAPI: LaunchAPI;
    userAPI: UserAPI;
  };
  user: any;
};
