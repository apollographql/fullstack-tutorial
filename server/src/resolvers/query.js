module.exports = {
  Query: {
    launches: async (
      root,
      { pageSize = 20, after: cursor },
      { dataSources },
    ) => {
      if (pageSize < 1) return [];
      const allLaunches = await dataSources.launchAPI.getAllLaunches();

      if (!cursor) return allLaunches.slice(0, pageSize);
      const cursorIndex = allLaunches.findIndex(l => cursor === l.cursor);

      return cursorIndex >= 0
        ? cursorIndex === allLaunches.length - 1 // don't let us overflow
          ? []
          : allLaunches.slice(
              cursorIndex + 1,
              Math.min(allLaunches.length, cursorIndex + 1 + pageSize),
            )
        : allLaunches.slice(0, pageSize);

      allLaunches.slice(
        cursorIndex >= 0 ? cursorIndex + 1 : 0,
        cursorIndex >= 0,
      );
    },
    launch: (root, { id }, { dataSources, user }) => {
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },
    me: async (_, __, { dataSources, user: { email } }) => {
      if (!email) return null;
      return dataSources.userAPI.findOrCreateUser({ email });
    },
  },
};
