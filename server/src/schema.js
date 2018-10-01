const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches(pageSize: Int, cursor: String): [Launch]!
    launch(id: ID!): Launch
    user(id: ID!): User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(userId: ID!, tripId: [ID!]): Boolean!

    # if false, cancellation failed -- check errors
    cancelTrip(userId: ID!, tripId: ID!): Boolean!

    login(email: String): String
  }

  type Launch {
    id: ID!
    cursor: String
    year: String!
    date: String!
    mission: Mission!
    rocket: Rocket!
    launchSuccess: Boolean
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