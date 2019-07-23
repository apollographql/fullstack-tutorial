import { DataSource } from "apollo-datasource";
import * as isEmail from "isemail";
import { Context, Store } from "..";
import { StoreTrip, SQLMany, SQLOne, StoreUser } from "../utils";

function nonNill<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export class UserAPI extends DataSource {
  private context: Context | undefined;
  private store: Store;
  constructor({ store }: { store: Store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: any) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser(
    { email: emailArg }: { email?: string | null } = {
      email: null
    }
  ) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = (await this.store.users.findOrCreate({
      where: { email }
    })) as [StoreUser, boolean];
    return users && users[0] ? users[0] : null;
  }

  async bookTrips({ launchIds }) {
    const userId = this.context && this.context.user.id;
    if (!userId) return [];

    let results: any[] = [];

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  async bookTrip({ launchId }) {
    if (!this.context) return false;
    const userId = this.context.user.id;
    const res = (await this.store.trips.findOrCreate({
      where: { userId, launchId }
    })) as [SQLOne<StoreTrip>, boolean];
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    if (!this.context) return false;
    const userId = this.context.user.id;
    return !!this.store.trips.destroy({ where: { userId, launchId } });
  }

  async getLaunchIdsByUser() {
    if (!this.context) return false;
    const userId = this.context.user.id;
    const found = (await this.store.trips.findAll({
      where: { userId }
    })) as SQLMany<StoreTrip>;
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(nonNill)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId, launchId }
    });
    return found && found.length > 0;
  }
}
