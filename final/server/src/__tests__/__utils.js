const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { execute, toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
} = require('../');
const { startStandaloneServer } = require('@apollo/server/dist/esm/standalone');

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new UserAPI({ store });
  const launchAPI = new LaunchAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  return { server, userAPI, launchAPI };
};

module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

const startTestServer = async server => {
  // if using `expressMiddleware`...
  // const app = express();
  // const httpServer = http.createServer(app);
  // await server.start();
  // app.use(
  //   cors(),
  //   json(),
  //   expressMiddleware(server, {
  //     context: testOptions?.context,
  //   }),
  // );
  // await new Promise((resolve) => {
  //   httpServer.listen({ port: 0 }, resolve);
  // });
  const { url } = await startStandaloneServer(server, { listen: { port: 0 } });

  const link = new HttpLink({
    uri: url,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    // TODO: server.stop() ?
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};

module.exports.startTestServer = startTestServer;
