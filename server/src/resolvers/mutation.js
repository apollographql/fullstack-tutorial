module.exports = {
  Mutation: {
    bookTrip: async (root, { launchId }, { dataSources, user = { id: 3 } }) => {
      const res = await dataSources.userAPI.bookTrip({
        userId: user.id,
        launchId: launchId,
      });

      return true;
    },
    cancelTrip: async (
      root,
      { launchId },
      { dataSources, user = { id: 3 } },
    ) => {
      return dataSources.userAPI.cancelTrip({
        launchId: launchId,
        userId: user.id,
      });
    },
    login: async (root, { email }, { dataSources, user: cUser }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString('base64');
    },
  },
};
