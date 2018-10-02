// require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI(),
  }),
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };

    // find a user by their email
    const userAPI = new UserAPI();
    const user = await userAPI.findOrCreateUser({ email });

    // if return user's email and id
    return { user: user ? { email, id: user.id } : null };
  },
  engine: process.env.ENGINE_API_KEY
    ? { apiKey: process.env.ENGINE_API_KEY }
    : undefined,
});

// Start our server
server
  .listen({ port: 3000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
