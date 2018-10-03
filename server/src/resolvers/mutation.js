module.exports = {
  Mutation: {
    bookTrip: async (root, { launchId }, { dataSources, user }) => {
      return dataSources.userAPI.bookTrip({
        userId: user.id,
        launchId: launchId,
      });
    },
    cancelTrip: async (root, { launchId }, { dataSources, user }) => {
      return dataSources.userAPI.cancelTrip({
        launchId: launchId,
        userId: user.id,
      });
    },
    login: async (root, { email }, { dataSources, user: cUser }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString('base64');
      return false;
    },
  },
};
