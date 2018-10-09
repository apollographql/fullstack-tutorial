const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrip(launchId: ID!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token
  }

  interface MutationResponse {
    success: Boolean!
    message: String
  }

  type TripUpdateResponse implements MutationResponse {
    success: Boolean!
    message: String
    launch: Launch
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    year: String!
    mission: Mission!
    rocket: Rocket!
    launchSuccess: Boolean
    isBooked: Boolean!
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
