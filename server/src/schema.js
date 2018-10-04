const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches(
      """
      the number of results to show. Must be >= 1
      """
      pageSize: Int
      """
      cursor - if you add a cursor id here, it will only return results _after_ this cursor
      """
      after: String
    ): [Launch]!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrip(launchId: ID!): Boolean!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): Boolean!

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
    trips: [Launch]!
  }

  type Mission {
    name: String!
    missionPatch: String
  }
`;

module.exports = typeDefs;
