require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const { createStore } = require('./utils')
const resolvers = require(`./resolvers`)

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
      })
})

server.listen().then(({ url })=>{
    console.log(`🚀 Server is ready at ${url}`)
})