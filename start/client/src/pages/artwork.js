import React from "react";
import { gql, useQuery } from "@apollo/client";
import ArtworkDetail from "../components/artwork-detail";

export const GET_ARTWORK = gql`
  query getSingleArtwork($artworkId: ID!) {
    artwork(id: $artworkId) {
      id
      title
      imageUrl
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Artwork = ({ id }) => {
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: { id },
  });
  console.log("this ran", data);
  // console.log("err message", error.message);

  return (
    <div>
      {/* <QueryResult error={error} loading={loading} data={data}> */}
      Test
      {/* <ArtworkDetail artwork={data} /> */}
      {/* </QueryResult> */}
    </div>
  );
};

export default Artwork;
