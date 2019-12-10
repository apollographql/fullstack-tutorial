/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLaunch
// ====================================================

export interface GetLaunch_launch_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface GetLaunch_launch_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface GetLaunch_launch {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: GetLaunch_launch_rocket | null;
  mission: GetLaunch_launch_mission | null;
}

export interface GetLaunch {
  launch: GetLaunch_launch | null;
}

export interface GetLaunchVariables {
  launchId: string;
}
