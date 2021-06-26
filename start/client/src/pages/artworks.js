import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import { ArtworkTile, Button } from "../components";
// import * as GetLaunchListTypes from "./__generated__/GetArtworkList";

export const GET_ARTWORKS = gql`
  query getArtworks {
    artworks {
      id
      title
      date_display
      artist_display
      imageUrl
      place_of_origin
    }
  }
`;

// interface ArtworksProps extends RouteComponentProps {}

const Artworks = () => {
  const { data, loading, error } = useQuery(GET_ARTWORKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(data);

  return (
    <div>
      <h3>WELCOME TO FLASHCART</h3>
      <p>Explore our gallery, play games, and learn fun art history facts.</p>
      {data.artworks.map((artwork) => {
        return (
          <div key={artwork.id}>
            <img src={artwork.imageUrl} />
            <h3>{artwork.title}</h3>
            {artwork.artist_display === "" ? (
              <p>Artist: Unknown</p>
            ) : (
              <p>Artist: {artwork.artist_display}</p>
            )}
            {artwork.date_display === "" ? (
              <p>Date: Unknown</p>
            ) : (
              <p>Circa: {artwork.date_display}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Artworks;

///COMMENT OUT
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
