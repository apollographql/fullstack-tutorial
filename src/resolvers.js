const resolvers = {
  Query: {
    launches: (root, { user, limit = 10, offset = 0}, { models, dataSources }) => {
      if(user) return dataSources.launchAPI.getLaunchesByUser();
      return dataSources.launch.getAllLaunches();
    },
    launch: (root, { id }, { models, dataSources }) => {
      return dataSources.launch.getAllLaunches();
    },
  },
  Mutation: {
    bookTrip: async (root, { launch }, { models, dataSources, user = {id: 3} }) => {
      const res = await models.user.bookTrip({ userId: user.id, launchId: launch });
      console.log(res);
      return true;
    },
    cancelTrip: async (root, { launch }, { models, dataSources, user = {id: 3} }) => {
      return models.user.cancelTrip({ launchId: launch, userId: user.id });
    },
    login: async (root, { email }, { models, dataSources }) => {
      models.user.create({ email });
      return "hai";
      /*
      > try to login
        > if details don't exist, create a new user and return token
        > if details do exist, login and return token
        */
    }
  },
  Launch: {
    passengers: async(launch, _, { models }) => {
      return models.user.getUsersByLaunch({ launchId: launch.id });
    },
    rocket: (launch) => {
      return launch.rocket
    }
  },
  User: {
    avatar: () => {},
    trips: async ({ id }, _, { dataSources, models }) => {
      const launchIds = await models.user.getLaunchIdsByUser({ userId: id });
      return launchIds && launchIds.length ? dataSources.launch.getLaunchesByIds({ launchIds }): [];
    }
  },
};

module.exports = resolvers;