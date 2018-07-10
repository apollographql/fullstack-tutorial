require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    launches: [Launch]!
    launch: Launch
    getAllTrips: [Trip]!
    getTrip(user: ID!): Trip!
  }

  type Mutation {
    signUpForTrip: String!
    cancelTrip: String!
  }

  type Launch {
    id: ID
    year: String
    date: String
    mission: String
    rocket: Rocket
    launch_success: Boolean
  }

  type Rocket {
    id: ID
    name: String!
    type: String!
  }

  type Trip {
    id: ID
    launch: Launch
    reservedBy: [User]
  }

  type User {
    id: ID
    email: String!
    avatar: String!
    trips: [Trip]
  }
`;

const resolvers = {
  Query: {
    launches: (root, args, context) => {
      return "Get all launches";
    },
    launch: (root, args, context) => {
      return "Get one launch";
    },
    getAllTrips: (root, args, context) => {
      return "Get all trips for all launches";
    },
    getTrip: (root, args, context) => {
      return "Get trip for a particular user";
    }
  },
  Mutation: {
    signUpForTrip: (root, args, context) => {
      return "Mutation bruuuh";
    },
    cancelTrip: (root, args, context) => {
      return "Cancel trip bruuuh";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});