const { ApolloServer, gql } = require('apollo-server');

const resolvers = require('./resolvers');
const types = require('./types');

// import connectors
const sqlite = require('./connectors/sqlite');

// import models
const makeUserModel = require('./models/user');

// import dataSources
const LaunchAPI = require('./models/launch');

const server = new ApolloServer({ 
  typeDefs: types, 
  resolvers, 
  dataSources: () => ({
    launch: new LaunchAPI(),  
  }),
  context: {
    models: {
      user: makeUserModel({ sqlite })
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});