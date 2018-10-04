const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // leaving this inside the class to make the class easier to test
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.flight_number || 0}-${launch.mission_name}`,
      mission: {
        name: launch.mission_name,
        patch: launch.links.mission_patch_small,
      },
      year: launch.launch_year,
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
      launchSuccess: launch.launch_success,
    };
  }

  async getAllLaunches() {
    const res = await this.get('launches');

    // transform the raw launches to a more friendly
    return res && res.length ? res.map(l => this.launchReducer(l)) : [];
  }

  async getLaunchById({ launchId }) {
    const res = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(res[0]);
  }

  async getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  }
}

module.exports = LaunchAPI;
