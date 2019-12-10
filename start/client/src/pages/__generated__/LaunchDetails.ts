/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LaunchDetails
// ====================================================

export interface LaunchDetails_launch_rocket {
  __typename: "Rocket";
  type: string | null;
  id: string;
  name: string | null;
}

export interface LaunchDetails_launch_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface LaunchDetails_launch {
  __typename: "Launch";
  isInCart: boolean;
  site: string | null;
  rocket: LaunchDetails_launch_rocket | null;
  id: string;
  isBooked: boolean;
  mission: LaunchDetails_launch_mission | null;
}

export interface LaunchDetails {
  launch: LaunchDetails_launch | null;
}

export interface LaunchDetailsVariables {
  launchId: string;
}
