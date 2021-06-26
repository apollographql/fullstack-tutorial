module.exports = {
  Query: {
    artworks: (_, __, { dataSources }) => dataSources.artworkAPI.getArtworks(),
    artwork: (_, { id }, { dataSources }) =>
      dataSources.artworkAPI.getSingleArtwork(id),
    //   dog: (_, __, { dataSources }) => dataSources.dogAPI.getRandomDog(),
  },
};
