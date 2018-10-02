module.exports = {
  Mutation: {
    bookTrips: async (root, { launch }, { dataSources, user = { id: 3 } }) => {
      const res = await dataSources.userAPI.bookTrip({
        userId: user.id,
        launchId: launch,
      });
      console.log(res);
      return true;
    },
    cancelTrip: async (root, { launch }, { dataSources, user = { id: 3 } }) => {
      return dataSources.userAPI.cancelTrip({
        launchId: launch,
        userId: user.id,
      });
    },
    login: async (root, { email }, { dataSources, user: cUser }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      console.log({ cUser });
      if (user) return new Buffer(email).toString('base64');
    },
  },
};
