const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches(pageSize: Int, cursor: String): [Launch]!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(tripId: [ID!]): Boolean!

    # if false, cancellation failed -- check errors
    cancelTrip(tripId: ID!): Boolean!

    login(email: String): String # login token
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
