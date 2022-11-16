import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';

import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';
import { useParams } from 'react-router-dom';
import * as LaunchDetailsTypes from './__generated__/LaunchDetails';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface LaunchProps {}

const Launch: React.FC<LaunchProps> = () => {
  let { launchId } = useParams();
  // This ensures we pass a string, even if useParams returns `undefined`
  launchId ??= '';
  const { data, loading, error } = useQuery<LaunchDetailsTypes.LaunchDetails, LaunchDetailsTypes.LaunchDetailsVariables>(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header image={data.launch && data.launch.mission && data.launch.mission.missionPatch}>{data && data.launch && data.launch.mission && data.launch.mission.name}</Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default Launch;
