import React, { Fragment }  from 'react';
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  return <div />;
}

export const LAUNCH_TILE_DATA = gql`
`;

export default Launches;
