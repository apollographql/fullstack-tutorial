import React, { }  from 'react';
import { BrowserRouterProps} from 'react-router-dom';
import { gql } from '@apollo/client'

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

interface LaunchesProps extends BrowserRouterProps {}

const Launches: React.FC<LaunchesProps> = () => {
  return <div />;
}

export default Launches;
