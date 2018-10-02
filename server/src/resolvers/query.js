module.exports = {
  Query: {
    launches: (root, { user }, { dataSources }) => {
      if (user) return dataSources.launchAPI.getLaunchesByUser();
      return dataSources.launchAPI.getAllLaunches();
    },
    launch: (root, { id }, { dataSources, user }) => {
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },
    me: async (root, {}, { dataSources, user: { email } }) => {
      if (!email) return null;
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      return user;
    },
  },
};
