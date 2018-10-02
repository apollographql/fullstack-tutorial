module.exports = {
  User: {
    trips: async (user, _, { dataSources, user: { id } }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser({
        userId: id,
      });

      if (!launchIds.length) return null;

      // look up those launches by their ids
      return dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });
    },
  },
};
