require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    launches(limit: Int, offset: Int): [Launch]!
    launch(id: ID!): Launch
    trips(user: ID): [Launch]!
    user(id: ID!): User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrip(user: ID!, trip: ID!): Boolean! 

    # if false, cancellation failed -- check errors
    cancelTrip(user: ID!, trip: ID!): Boolean!
    
    login(email: String): String
  }

  type Launch {
    id: ID!
    year: String!
    date: String!
    mission: String
    rocket: Rocket!
    launch_success: Boolean
    passengers: [User]!
  }

  type Rocket {
    id: ID!
    name: String!
    type: String!
  }

  type User {
    id: ID!
    email: String!
    avatar: String
    trips: [Launch]!
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
    trips: (root, args, context) => {
      return "Get all trips for all launches";
    },
  },
  Mutation: {
    bookTrip: (root, args, context) => {
      return "Mutation bruuuh";
    },
    cancelTrip: (root, args, context) => {
      return "Cancel trip bruuuh";
    },
    login: () => {
      /*
      > try to login
        > if details don't exist, create a new user and return token
        > if details do exist, login and return token
        */
    }
  },
  User: {
    avatar: () => {},
    trips: () => {}
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
