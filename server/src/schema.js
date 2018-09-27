const { gql } = require('apollo-server');

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
    mission: Mission!
    rocket: Rocket!
    launch_success: Boolean
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
    trips: [Launch]
  }

  type Mission {
    name: String!
    missionPatch: String
  }
`;

module.exports = typeDefs;