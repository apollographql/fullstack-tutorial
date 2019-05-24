const { gql } = require('apollo-server');

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
  email: String!
  trips: [Launch]
}

type Mission {
  name: String
  missionPatch(size: PatchSize): String
}
enum PatchSize {
  SMALL
  LARGE
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}
type Query {
  launches(pageSize: Int, after: String): LaunchConnection!
  launch(id: ID!): Launch
  #Queries for the current user
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

`;

module.exports = typeDefs;
