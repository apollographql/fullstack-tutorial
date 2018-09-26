const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor(){
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }
  
  // leaving this inside the class to make the class easier to test
  launchReducer(launch){
    return {
      id: launch.flight_number || 0,
      mission: launch.mission_name,
      year: launch.launch_year,
      date: launch.launch_date_unix,
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type
      },
      success: launch.launch_success,
    }
  }
 
  async getAllLaunches() {
    const res = await this.get('launches');
    
    // transform the raw launches to a more friendly
    return res && res.length ? res.map(l => this.launchReducer(l)) : [];    
  }
  
  async getLaunchById({ launchId }) {
    // todo: use actual id, not flight number
    const res = await this.get('launches', { flight_number: launchId });
    
    return this.launchReducer(res[0])
  }

  async getLaunchesByIds({ launchIds }){
    return Promise.all(launchIds.map(launchId => this.getLaunchById({ launchId })));
  }
  
}

module.exports = LaunchAPI
