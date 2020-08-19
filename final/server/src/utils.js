const {Sequelize} = require('sequelize');
const SequelizeDynamo = require('dynamo-sequelize').default;

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const db = new SequelizeDynamo(
    {
      dialect: 'dynamo',
    }
  );

  const users = db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    profileImage: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    }
  });

  const trips = db.define('trip', {
    launchId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return { db, users, trips };
};
