import React, { Fragment } from "react";
import gql from "graphql-tag";
import { RouteComponentProps } from "@reach/router";

export const LAUNCH_TILE_DATA = gql``;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  return <div />;
};

export default Launches;
