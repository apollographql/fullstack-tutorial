// This is a machine generated file.
// Use "apollo service:codegen" to regenerate.
type PromiseOrValue<T> = Promise<T> | T
type Nullable<T> = T | null | undefined
type Index<Map extends Record<string, any>, Key extends string, IfMissing> = Map[Key] extends object ? Map[Key] : IfMissing

export interface Resolvers<TContext = {}, TInternalReps = {}> {
  Query: QueryResolver<TContext, TInternalReps>
  Mutation?: MutationResolver<TContext, TInternalReps>
  TripUpdateResponse?: TripUpdateResponseResolver<TContext, TInternalReps>
  LaunchConnection?: LaunchConnectionResolver<TContext, TInternalReps>
  Launch?: LaunchResolver<TContext, TInternalReps>
  Rocket?: RocketResolver<TContext, TInternalReps>
  User?: UserResolver<TContext, TInternalReps>
  Mission?: MissionResolver<TContext, TInternalReps>
}

export interface QueryResolver<TContext = {}, TInternalReps = {}> {
  launches: (parent: any, args: {
    /**
     * The number of results to show. Must be >= 1. Default = 20
     */
    pageSize?: number
    /**
     * If you add a cursor here, it will only return results \`_after_\` this cursor
     */
    after?: string
  }, context: TContext, info: any) => PromiseOrValue<LaunchConnection>
  launch: (parent: any, args: {
    id: string
  }, context: TContext, info: any) => PromiseOrValue<Nullable<Launch>>
  me: (parent: any, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<User>>
}

export interface MutationResolver<TContext = {}, TInternalReps = {}> {
  bookTrips: (parent: any, args: {
    launchIds: Array<string>
  }, context: TContext, info: any) => PromiseOrValue<TripUpdateResponse>
  cancelTrip: (parent: any, args: {
    launchId: string
  }, context: TContext, info: any) => PromiseOrValue<TripUpdateResponse>
  login: (parent: any, args: {
    email?: string
  }, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
}

type TripUpdateResponseRepresentation<TInternalReps extends Record<string, any>> = Index<TInternalReps, "TripUpdateResponse", any>
export interface TripUpdateResponse {
  success?: boolean
  message?: Nullable<string>
  launches?: Nullable<Array<Nullable<Launch>>>
}
export interface TripUpdateResponseResolver<TContext = {}, TInternalReps = {}> {
  success?: (parent: TripUpdateResponseRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<boolean>
  message?: (parent: TripUpdateResponseRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
  launches?: (parent: TripUpdateResponseRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<Array<Nullable<Launch>>>>
}

type LaunchConnectionRepresentation<TInternalReps extends Record<string, any>> = Index<TInternalReps, "LaunchConnection", any>
/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export interface LaunchConnection {
  cursor?: string
  hasMore?: boolean
  launches?: Array<Nullable<Launch>>
}
/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export interface LaunchConnectionResolver<TContext = {}, TInternalReps = {}> {
  cursor?: (parent: LaunchConnectionRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<string>
  hasMore?: (parent: LaunchConnectionRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<boolean>
  launches?: (parent: LaunchConnectionRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Array<Nullable<Launch>>>
}

type LaunchRepresentation<TInternalReps extends Record<string, any>> = Index<TInternalReps, "Launch", any>
export interface Launch {
  id?: string
  site?: Nullable<string>
  mission?: Nullable<Mission>
  rocket?: Nullable<Rocket>
  isBooked?: boolean
}
export interface LaunchResolver<TContext = {}, TInternalReps = {}> {
  id?: (parent: LaunchRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<string>
  site?: (parent: LaunchRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
  mission?: (parent: LaunchRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<Mission>>
  rocket?: (parent: LaunchRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<Rocket>>
  isBooked?: (parent: LaunchRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<boolean>
}

type RocketRepresentation<TInternalReps extends Record<string, any>> = Index<TInternalReps, "Rocket", any>
export interface Rocket {
  id?: string
  name?: Nullable<string>
  type?: Nullable<string>
}
export interface RocketResolver<TContext = {}, TInternalReps = {}> {
  id?: (parent: RocketRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<string>
  name?: (parent: RocketRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
  type?: (parent: RocketRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
}

type UserRepresentation<TInternalReps extends Record<string, any>> = Index<TInternalReps, "User", any>
export interface User {
  id?: string
  email?: string
  trips?: Array<Nullable<Launch>>
}
export interface UserResolver<TContext = {}, TInternalReps = {}> {
  id?: (parent: UserRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<string>
  email?: (parent: UserRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<string>
  trips?: (parent: UserRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Array<Nullable<Launch>>>
}

type MissionRepresentation<TInternalReps extends Record<string, any>> = Index<TInternalReps, "Mission", any>
export interface Mission {
  name?: Nullable<string>
  missionPatch?: Nullable<string>
}
export interface MissionResolver<TContext = {}, TInternalReps = {}> {
  name?: (parent: MissionRepresentation<TInternalReps>, args: {}, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
  missionPatch?: (parent: MissionRepresentation<TInternalReps>, args: {
    size?: PatchSize
  }, context: TContext, info: any) => PromiseOrValue<Nullable<string>>
}

export type PatchSize = "SMALL" | "LARGE"
