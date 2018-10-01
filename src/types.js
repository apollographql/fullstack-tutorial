const { gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    launches(limit: Int, offset: Int): [Launch]!
    launch(id: ID!): Launch
    user(id: ID!): User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrip(launch: ID!): Boolean! 

    # if false, cancellation failed -- check errors
    cancelTrip(launch: ID!): Boolean!

    # returns a string token
    login(email: String): String
  }

  type Launch {
    id: ID!
    year: String!
    date: String!
    mission: String
    rocket: Rocket!
    success: Boolean
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

module.exports = typeDefs;