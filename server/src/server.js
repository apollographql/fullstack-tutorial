require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: { apiKey: process.env.ENGINE_API_KEY },
});

// Start our server
server
  .listen({ port: 3000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));