const makeModel = ({ sqlite }) => {
  return {
    create: async ({ email }) => {
      return sqlite.users.findOrCreate({ where: { email } });
    },
    bookTrip: async ({ userId, launchId }) => {
      return sqlite.trips.findOrCreate({ where: { userId, launchId } });
    },
    cancelTrip: async ({ userId, launchId }) => {
      return sqlite.trips.destroy({ where: { userId, launchId }});
    },
    getLaunchIdsByUser: async ({ userId }) => {
      const found = await sqlite.trips.findAll({ where: { userId: +userId } });
      return found && found.length ? found.map(l => l.dataValues.launchId): [];
    },
    getUsersByLaunch: async ({ launchId }) => {
      const found = await sqlite.trips.findAll({ where: { launchId: +launchId } });
      const userIds = found && found.length ? found.map(l => l.dataValues.userId): [];
      if(!userIds || !userIds.length) return [];
            
      const foundUsers = await sqlite.users.findAll({ where: {id: {$in: userIds}} });
      if(!foundUsers || !foundUsers.length) return [];
      
      return foundUsers;
    }
  };
};

module.exports = makeModel;