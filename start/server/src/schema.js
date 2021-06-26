const { gql } = require("apollo-server");

const typeDefs = gql`
  type Artwork {
    id: ID!
    title: String
    date_display: String
    artist_display: String
    image_id: String!
    image: Image
    place_of_origin: String
  }
  type Image {
    imageUrl: String
  }
  type Query {
    artworks: [Artwork]
    artwork(id: ID!): Artwork
    image: Image
  }
`;

module.exports = typeDefs;
