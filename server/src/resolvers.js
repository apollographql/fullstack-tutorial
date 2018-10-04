const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    launches: async (root, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      return paginateResults({ after, pageSize, results: allLaunches });
    },
    launch: (root, { id }, { dataSources, user }) => {
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },
    me: async (_, __, { dataSources, user: { email } }) => {
      if (!email) return null;
      return dataSources.userAPI.findOrCreateUser({ email });
    },
  },
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
  Launch: {
    passengers: async (launch, _, { dataSources }) => {
      const res = await dataSources.userAPI.getUsersByLaunch({
        launchId: launch.id,
      });
      return res && res.length ? res : [];
    },
  },
  User: {
    trips: async (_, __, { dataSources, user: { id } }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser({
        userId: id,
      });

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};
