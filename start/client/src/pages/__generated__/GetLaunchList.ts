/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLaunchList
// ====================================================

export interface GetLaunchList_launches_launches_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface GetLaunchList_launches_launches_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface GetLaunchList_launches_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: GetLaunchList_launches_launches_rocket | null;
  mission: GetLaunchList_launches_launches_mission | null;
}

export interface GetLaunchList_launches {
  __typename: "LaunchConnection";
  cursor: string;
  hasMore: boolean;
  launches: (GetLaunchList_launches_launches | null)[];
}

export interface GetLaunchList {
  launches: GetLaunchList_launches;
}

export interface GetLaunchListVariables {
  after?: string | null;
}
