import * as SQL from "sequelize";

export const paginateResults = <T extends { cursor?: any }>({
  after: cursor,
  pageSize,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null
}: {
  after?: any;
  pageSize: number;
  results: T[];
  getCursor?: (item: T) => any;
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
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

export const createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "username", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
    operatorsAliases,
    logging: false
  });

  const users = db.define("user", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
    token: SQL.STRING
  });

  const trips = db.define("trip", {
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

  return { users, trips };
};

export type StoreTrip = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  launchId?: number;
  userId?: number;
};

export type StoreUser = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  token?: string;
};

export type SQLOne<T> = { get(): T };
export type SQLMany<T> = Array<{ dataValues: T }>;
