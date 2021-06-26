import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import { ArtworkTile, Header, Button, Loading } from "../components";
import * as GetLaunchListTypes from "./__generated__/GetLaunchList";

export const GET_ARTWORKS = gql`
  query getArtworks {
    artworks {
      hasMore
      artworks {
        ...ArtworkTile
      }
    }
  }
`;

interface ArtworksProps extends RouteComponentProps {}

const Artworks: React.FC<ArtworksProps> = () => {
  const { data, loading, error } = useQuery<
    GetArtworkListTypes.GetArtworkList,
    GetArtworkListTypes.GetArtworkListVariables
  >(GET_ARTWORKS);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any) => (
          <ArtworkTile key={launch.id} launch={launch} />
        ))}
    </Fragment>
  );
};

export default Launches;

// export const ARTWORK_TILE_DATA = gql`
//   fragment ArtworkTile on Artwork {
//     __typename
//     id
//     title
//   }
// `;

// export const GET_ARTWORKS = gql`
//   query getArtworks {
//     artworks {
//       hasMore
//       artworks {
//         ...ArtworkTile
//       }
//     }
//   }
// `;

// interface ArtworksProps extends RouteComponentProps {}

// const Artworks: React.FC<ArtworksProps> = () => {
//   const {
//     data,
//     loading,
//     error
//   } = useQuery<
//     GetArtworkListTypes.GetArtworkList,
//     GetArtworkListTypes.GetArtworkListVariables
//   >(GET_ARTWORKS);

//   if (loading) return <Loading />;
//   if (error) return <p>ERROR</p>;
//   if (!data) return <p>Not found</p>;

//   return (
//     <Fragment>
//       <Header />
//       {data.launches &&
//         data.launches.launches &&
//         data.launches.launches.map((launch: any) => (
//           <ArtworkTile key={launch.id} launch={launch} />
//         ))}
//     </Fragment>
//   );
// }

// export default Launches;
