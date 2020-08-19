/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LaunchTile
// ====================================================

export interface LaunchTile_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface LaunchTile_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface LaunchTile {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: LaunchTile_rocket | null;
  mission: LaunchTile_mission | null;
}
