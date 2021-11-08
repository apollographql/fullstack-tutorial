require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { graphqlUploadExpress } = require('graphql-upload');
const isEmail = require('isemail');
const express = require('express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const internalEngineDemo = require('./engine-demo');

// creates a sequelize connection once. NOT for every request
const store = createStore();

const app = express();
app.use(graphqlUploadExpress());

const httpServer = createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req, connection }) => {
  if (connection) {
    return connection.context;
  }

  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || '';
  const email = new Buffer(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  dataSources,
  context,
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  }],
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo,
  },
});

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  onConnect() {
    // lookup userId by token, etc.
    return { userId };
  },
}, {
  server: httpServer,
  path: server.graphqlPath,
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  (async () => {
    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    httpServer.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  })();
}

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
  server,
};
