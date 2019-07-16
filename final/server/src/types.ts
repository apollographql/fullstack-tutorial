type PromiseOrValue<T> = Promise<T> | T;

export type Resolvers<TContext> = {
  Query: QueryResolver<TContext>;
  Mutation: MutationResolver<TContext>;
  TripUpdateResponse?: TripUpdateResponseResolver<TContext>;
  LaunchConnection?: LaunchConnectionResolver<TContext>;
  Launch?: LaunchResolver<TContext>;
  Rocket?: RocketResolver<TContext>;
  User?: UserResolver<TContext>;
  Mission?: MissionResolver<TContext>;
};

export type QueryResolver<TContext> = {
  launches: (
    parent: any,
    args: { pageSize: number | undefined; after: number | undefined },
    context: TContext,
    info: any
  ) => PromiseOrValue<LaunchConnection>;
  launch: (
    parent: any,
    args: { id: number },
    context: TContext,
    info: any
  ) => PromiseOrValue<Launch | undefined>;
  me: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<User>;
};

export type MutationResolver<TContext> = {
  bookTrips: (
    parent: any,
    args: { launchIds: string[] },
    context: TContext,
    info: any
  ) => PromiseOrValue<TripUpdateResponse>;
  cancelTrip: (
    parent: any,
    args: { launchId: string },
    context: TContext,
    info: any
  ) => PromiseOrValue<TripUpdateResponse>;
  login: (
    parent: any,
    args: { email: string | undefined },
    context: TContext,
    info: any
  ) => PromiseOrValue<string | undefined>;
};

export type TripUpdateResponseResolver<TContext> = {
  success?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<boolean>;
  message?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | undefined>;
  launches?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Array<Launch | undefined> | undefined>;
};

export type LaunchConnectionResolver<TContext> = {
  cursor?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  hasMore?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<boolean>;
  launches?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Array<Launch | undefined>>;
};

export type LaunchResolver<TContext> = {
  id?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  site?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | undefined>;
  mission?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Mission | undefined>;
  rocket?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Rocket | undefined>;
  isBooked?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<boolean>;
};

export type RocketResolver<TContext> = {
  id?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  name?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | undefined>;
  type?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | undefined>;
};

export type UserResolver<TContext> = {
  id?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  email?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  trips?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Array<Launch | undefined>>;
};

export type MissionResolver<TContext> = {
  name?: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<String | undefined>;
  missionPatch?: (
    parent: any,
    args: { size: PatchSize },
    context: TContext,
    info: any
  ) => PromiseOrValue<String | undefined>;
};

export type TripUpdateResponse = {
  success?: boolean;
  message?: string | null;
  launches?: Array<Launch | null> | null;
};

export type LaunchConnection = {
  cursor?: string;
  hasMore?: boolean;
  launches?: Array<Launch | null>;
};

export type Launch = {
  id?: string;
  site?: string | null;
  mission?: Mission | null;
  rocket?: Rocket | null;
  isBooked?: boolean;
};

export type Rocket = {
  id?: string;
  name?: string | null;
  type?: string | null;
};

export type User = {
  id?: string;
  email?: string;
  trips?: Array<Launch> | null;
};

export type Mission = {
  name?: String | null;
  missionPatch?: String | null;
};

export type PatchSize = "SMALL" | "LARGE";
