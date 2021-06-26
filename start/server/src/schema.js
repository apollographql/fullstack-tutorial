const { gql } = require("apollo-server");

const typeDefs = gql`
  type Artwork {
    id: ID!
    title: String
    date_display: String
    artist_display: String
    image_id: String!
    imageUrl: String
    place_of_origin: String
  }
  type Query {
    artworks: [Artwork]
    artwork(id: ID!): Artwork
  }
`;

module.exports = typeDefs;
