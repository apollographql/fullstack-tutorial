const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { execute, toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  dataSources,
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
} = require('../');

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new UserAPI({ store });
  const launchAPI = new LaunchAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI, launchAPI }),
    context,
  });

  return { server, userAPI, launchAPI };
};

module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

const startTestServer = async server => {
  // if using apollo-server-express...
  // const app = express();
  // server.applyMiddleware({ app });
  // const httpServer = await app.listen(0);

  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};

module.exports.startTestServer = startTestServer;
