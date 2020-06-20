/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyTrips
// ====================================================

export interface GetMyTrips_me_trips_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface GetMyTrips_me_trips_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface GetMyTrips_me_trips {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: GetMyTrips_me_trips_rocket | null;
  mission: GetMyTrips_me_trips_mission | null;
}

export interface GetMyTrips_me {
  __typename: "User";
  id: string;
  email: string;
  trips: (GetMyTrips_me_trips | null)[];
}

export interface GetMyTrips {
  me: GetMyTrips_me | null;
}
