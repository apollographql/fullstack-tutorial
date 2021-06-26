module.exports = {
  Query: {
    artworks: (_, __, { dataSources }) => dataSources.artworkAPI.getArtworks(),
    artwork: (_, { id }, { dataSources }) =>
      dataSources.artworkAPI.getSingleArtwork(id),
  },
  Artwork: {
    image: ({ id }, _, { dataSources }) => {
      return dataSources.artworkAPI.getImage(id);
    },
  },
};
