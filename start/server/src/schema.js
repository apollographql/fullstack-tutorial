const { gql } = require("apollo-server");

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String
    trips: [Launch]
  }
  type Mission {
    name: String
    missionPatch(Size: PatchSize): String
  }
  enum PatchSize {
    SMALL
    LARGE
  }

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

  type LaunchConnection { 
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launcher: [Launch]
  }
`;

module.exports = typeDefs;
