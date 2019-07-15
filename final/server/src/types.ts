type PromiseOrValue<T> = Promise<T> | T;

export type Resolvers<TContext> = Partial<{
  Query: QueryResolver<TContext>;
  Mutation: MutationResolver<TContext>;
  TripUpdateResponse: TripUpdateResponseResolver<TContext>;
  LaunchConnection: LaunchConnectionResolver<TContext>;
  Launch: LaunchResolver<TContext>;
  Rocket: RocketResolver<TContext>;
  User: UserResolver<TContext>;
  Mission: MissionResolver<TContext>;
}>;

export type QueryResolver<TContext> = Partial<{
  launches: (
    parent: any,
    args: { pageSize: number | null; after: number | null },
    context: TContext,
    info: any
  ) => PromiseOrValue<LaunchConnection>;
  launch: (
    parent: any,
    args: { id: number },
    context: TContext,
    info: any
  ) => PromiseOrValue<Launch | null>;
  me: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<User | null>;
}>;

export type MutationResolver<TContext> = Partial<{
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
    args: { email: string | null },
    context: TContext,
    info: any
  ) => PromiseOrValue<string | null>;
}>;

export type TripUpdateResponseResolver<TContext> = Partial<{
  success: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<boolean>;
  message: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | null>;
  launches: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Array<Launch | null> | null>;
}>;

export type LaunchConnectionResolver<TContext> = Partial<{
  cursor: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  hasMore: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<boolean>;
  launches: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Array<Launch | null>>;
}>;

export type LaunchResolver<TContext> = Partial<{
  id: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  site: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | null>;
  mission: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Mission | null>;
  rocket: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Rocket | null>;
  isBooked: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<boolean>;
}>;

export type RocketResolver<TContext> = Partial<{
  id: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  name: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | null>;
  type: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string | null>;
}>;

export type UserResolver<TContext> = Partial<{
  id: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  email: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<string>;
  trips: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<Array<Launch | null>>;
}>;

export type MissionResolver<TContext> = Partial<{
  name: (
    parent: any,
    args: {},
    context: TContext,
    info: any
  ) => PromiseOrValue<String | null>;
  missionPatch: (
    parent: any,
    args: { size: PatchSize },
    context: TContext,
    info: any
  ) => PromiseOrValue<String | null>;
}>;

export type Query = Partial<{
  launches: LaunchConnection;
  launch: Launch | null;
  me: User | null;
}>;

export type Mutation = Partial<{
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login: string | null;
}>;

export type TripUpdateResponse = Partial<{
  success: boolean;
  message: string | null;
  launches: Array<Launch | null> | null;
}>;

export type LaunchConnection = Partial<{
  cursor: string;
  hasMore: boolean;
  launches: Array<Launch | null>;
}>;

export type Launch = Partial<{
  id: string;
  site: string | null;
  mission: Mission | null;
  rocket: Rocket | null;
  isBooked: boolean;
}>;

export type Rocket = Partial<{
  id: string;
  name: string | null;
  type: string | null;
}>;

export type User = Partial<{
  id: string;
  email: string;
  trips: Array<Launch> | null;
}>;

export type Mission = Partial<{
  name: String | null;
  missionPatch: String | null;
}>;

export type PatchSize = "SMALL" | "LARGE";
