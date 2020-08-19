require('dotenv').config();

const { ApolloServer } = require('apollo-server-lambda');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const internalEngineDemo = require('./engine-demo');

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo,
  },
  context: async ({ event, context }) => {
    const auth = (event.headers && event.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };

    // find a user by their email
    const existingUsers = await store.users.find({ where: { email } });
    const users = existingUsers && existingUsers[0] ? existingUsers : [store.users.create({
      id: new Date().getTime(),
      email,
      updatedAt: new Date(),
      createdAt: new Date()
    })];

    const user = users && users[0] ? users[0] : null;
    return { user };
  }
});

const graphqlHandler = server.createHandler();

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
  server,
  graphqlHandler,
};
