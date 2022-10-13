// @ts-check
const { HttpLink } = require('@apollo/client/link/http');
const fetch = require('node-fetch');
const { execute } = require('@apollo/client/link/core');
const { toPromise } = require('@apollo/client/link/utils');
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');
const {
  ApolloServerPluginInlineTraceDisabled,
} = require("@apollo/server/plugin/disabled");

module.exports.toPromise = toPromise;

const {
  context,
  typeDefs,
  resolvers,
  LaunchAPI,
  UserAPI,
  store,
} = require("../");

/**
 * Integration testing utils
 */
const constructTestServer = () => {
  const userAPI = new UserAPI({ store });
  const launchAPI = new LaunchAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
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
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: 0 },
  });

  const link = new HttpLink({
    uri: url,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => server.stop(),
    graphql: executeOperation,
  };
};

module.exports.startTestServer = startTestServer;
