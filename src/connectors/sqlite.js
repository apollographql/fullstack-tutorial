const SQL = require('sequelize');
const Op = SQL.Op;
const operatorsAliases = {
  $in: Op.in
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
    autoIncrement: true
  },
  createdAt: SQL.DATE,
  updatedAt: SQL.DATE,
  email: SQL.STRING
});

const trips = db.define('trip', {
  id: {
    type: SQL.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: SQL.DATE,
  updatedAt: SQL.DATE,
  launchId: SQL.INTEGER,
  userId: SQL.INTEGER
});

// users.create({ email: 'a@a.a'});
// trips.create({ launchId: 1, userId: 1})

// XXX run these to generate tables
// users.sync({ alter: true, force: true });
// trips.sync({ alter: true, force: true });

module.exports = { users, trips };

