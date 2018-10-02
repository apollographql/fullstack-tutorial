const { DataSource } = require('apollo-datasource');
const SQL = require('sequelize');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor() {
    super();
    this.store = createStore();
  }

  async findOrCreateUser({ email }) {
    if (!isEmail.validate(email)) return null;
    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0]
      ? { id: users[0].id, email: users[0].email, avatar: users[0].avatar }
      : null;
  }

  async bookTrip({ userId, launchId }) {
    return this.store.trips.findOrCreate({ where: { userId, launchId } });
  }

  async cancelTrip({ userId, launchId }) {
    return this.store.trips.destroy({ where: { userId, launchId } });
  }

  async getLaunchIdsByUser({ userId }) {
    const found = await this.store.trips.findAll({
      where: { userId: +userId },
    });
    return found && found.length ? found.map(l => l.dataValues.launchId) : [];
  }

  async getUsersByLaunch({ launchId }) {
    const found = await this.store.trips.findAll({
      where: { launchId: +launchId },
    });
    const userIds =
      found && found.length ? found.map(l => l.dataValues.userId) : [];
    if (!userIds || !userIds.length) return [];

    const foundUsers = await this.store.users.findAll({
      where: { id: { $in: userIds } },
    });
    if (!foundUsers || !foundUsers.length) return [];

    return foundUsers;
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

  // const CREATE_USERS_QUERY = `CREATE TABLE IF NOT EXISTS users(
  //   id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   createdAt DATETIME,
  //   updatedAt DATETIME,
  //   email TEXT
  // )`;

  // db.query(CREATE_USERS_QUERY);

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

  // const CREATE_TRIPS_QUERY = `CREATE TABLE IF NOT EXISTS trips(
  //   id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   createdAt DATETIME,
  //   updatedAt DATETIME,
  //   launchId INTEGER,
  //   userId INTEGER
  // )`;

  // db.query(CREATE_TRIPS_QUERY);

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

  // users.create({ email: 'a@a.a'});
  // trips.create({ launchId: 1, userId: 1})

  // XXX run these to generate tables
  // users.sync({ alter: true, force: true });
  // trips.sync({ alter: true, force: true });

  return { users, trips };
};
