module.exports = {
  Launch: {
    passengers: async (launch, _, { dataSources }) => {
      const res = await dataSources.userAPI.getUsersByLaunch({
        launchId: launch.id,
      });
      return res && res.length ? res : [];
    },
  },
};
