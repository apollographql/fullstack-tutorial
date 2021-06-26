require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const ArtworkAPI = require("./datasources/artwork");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    artworkAPI: new ArtworkAPI(),
  }),
});

server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
