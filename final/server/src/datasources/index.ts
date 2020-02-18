import { ILaunchAPIDataSource } from "./launch";
import { IUserAPIDataSource } from './user'

export interface IDataSources {
  launchAPI: ILaunchAPIDataSource;
  userAPI: IUserAPIDataSource
}
