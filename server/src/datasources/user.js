const { DataSource } = require('apollo-datasource');
const SQL = require('sequelize');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor() {
    super();
    this.store = createStore();
  }

  // leaving this inside the class to make the class easier to test
  userReducer(user) {
    return {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async findOrCreateUser({ email }) {
    if (!isEmail.validate(email)) return null;
    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? this.userReducer(users[0]) : null;
  }

  async bookTrip({ userId, launchId }) {
    return this.store.trips.findOrCreate({ where: { userId, launchId } });
  }

  async cancelTrip({ userId, launchId }) {
    return this.store.trips.destroy({ where: { userId, launchId } });
  }

  async getLaunchIdsByUser({ userId }) {
    const found = await this.store.trips.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }

  async getUsersByLaunch({ launchId }) {
    const found = await this.store.trips.findAll({
      where: { launchId: launchId },
    });
    const userIds =
      found && found.length ? found.map(l => l.dataValues.userId) : [];
    if (!userIds || !userIds.length) return [];

    const foundUsers = await this.store.users.findAll({
      where: { id: { $in: userIds } },
    });
    if (!foundUsers || !foundUsers.length) return [];

    return foundUsers.map(u => this.userReducer(u));
  }
}

module.exports = UserAPI;

const createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
    token: SQL.STRING,
  });

  const trips = db.define('trip', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    launchId: SQL.INTEGER,
    userId: SQL.INTEGER,
  });

  // XXX run these to generate tables
  // users.sync({ alter: true, force: true });
  // trips.sync({ alter: true, force: true });

  return { users, trips };
};
