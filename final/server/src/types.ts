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

type ResolverFunction<TContext, TReturn, TArgs = {}> = (
  parent: any,
  args: TArgs,
  context: TContext,
  info: any
) => PromiseOrValue<TReturn>;

export type QueryResolver<TContext> = {
  launches: ResolverFunction<
    TContext,
    LaunchConnection,
    {
      /** The number of results to show. Must be >= 1. Default = 20 */
      pageSize: number | undefined;
      /** If you add a cursor here, it will only return results _after_ this cursor */
      after: number | undefined;
    }
  >;
  launch: ResolverFunction<TContext, Launch | undefined, { id: number }>;
  me: ResolverFunction<TContext, User>;
};

export type MutationResolver<TContext> = {
  bookTrips: ResolverFunction<
    TContext,
    TripUpdateResponse,
    { launchIds: string[] }
  >;
  cancelTrip: ResolverFunction<
    TContext,
    TripUpdateResponse,
    { launchId: string }
  >;
  login: ResolverFunction<
    TContext,
    string | undefined,
    { email: string | undefined }
  >;
};

export type TripUpdateResponseResolver<TContext> = {
  success?: ResolverFunction<TContext, boolean>;
  message?: ResolverFunction<TContext, string | undefined>;
  launches?: ResolverFunction<
    TContext,
    Array<Launch | undefined> | undefined,
    {}
  >;
};

export type LaunchConnectionResolver<TContext> = {
  cursor?: ResolverFunction<TContext, string>;
  hasMore?: ResolverFunction<TContext, boolean>;
  launches?: ResolverFunction<TContext, Array<Launch | undefined>>;
};

export type LaunchResolver<TContext> = {
  id?: ResolverFunction<TContext, string>;
  site?: ResolverFunction<TContext, string | undefined>;
  mission?: ResolverFunction<TContext, Mission | undefined>;
  rocket?: ResolverFunction<TContext, Rocket | undefined>;
  isBooked?: ResolverFunction<TContext, boolean>;
};

export type RocketResolver<TContext> = {
  id?: ResolverFunction<TContext, string>;
  name?: ResolverFunction<TContext, string | undefined>;
  type?: ResolverFunction<TContext, string | undefined>;
};

export type UserResolver<TContext> = {
  id?: ResolverFunction<TContext, string>;
  email?: ResolverFunction<TContext, string>;
  trips?: ResolverFunction<TContext, Array<Launch | undefined>>;
};

export type MissionResolver<TContext> = {
  name?: ResolverFunction<TContext, String | undefined>;
  missionPatch?: ResolverFunction<
    TContext,
    String | undefined,
    { size: PatchSize }
  >;
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
  trips?: Array<Launch | null>;
};

export type Mission = {
  name?: String | null;
  missionPatch?: String | null;
};

export type PatchSize = "SMALL" | "LARGE";
