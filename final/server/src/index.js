// @ts-check
require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {
  ApolloServerPluginInlineTraceDisabled,
} = require("@apollo/server/plugin/disabled");

const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

// creates a sequelize connection once. NOT for every request
const store = createStore();

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');

  const users = isEmail.validate(email)
    ? await store.users.findOrCreate({ where: { email } })
    : [];
  
  const user = users && users[0] ? users[0] : null;

  const dataSources = {
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store, user }),
  };

  return { dataSources };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  apollo: {
    key: process.env.APOLLO_KEY,
  },
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  startStandaloneServer(server, {
    context,
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server is running at ${url}`);
  });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  context,
  typeDefs,
  resolvers,
  LaunchAPI,
  UserAPI,
  store,
  server,
};
