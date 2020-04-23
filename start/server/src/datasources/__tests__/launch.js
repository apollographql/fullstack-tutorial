const LaunchAPI = require('../launch');

/**
 * There are mock Launches at the bottom of this file.
 * 1 mock for the RAW API response, and another
 * for the shape of launch after it would have been
 * transformed by the launch reducer.
 */

const mocks = {
  get: jest.fn(),
};

const ds = new LaunchAPI();
ds.get = mocks.get;

describe('[LaunchAPI.launchReducer]', () => {
  it('properly transforms launch', () => {
    expect(ds.launchReducer(mockLaunchResponse)).toEqual(mockLaunch);
  });
});

describe('[LaunchAPI.getAllLaunches]', () => {
  it('looks up launches from api', async () => {
    // if api response is list of raw launches,
    // res should be list of transformed launches
    mocks.get.mockReturnValueOnce([mockLaunchResponse]);
    const res = await ds.getAllLaunches();

    expect(res).toEqual([mockLaunch]);
    expect(mocks.get).toBeCalledWith('launches');
  });
});

describe('[LaunchAPI.getLaunchById]', () => {
  it('should look up single launch from api', async () => {
    // if api response is list of raw launches,
    // res should be single transformed launch
    mocks.get.mockReturnValueOnce([mockLaunchResponse]);
    const res = await ds.getLaunchById({ launchId: 1 });

    expect(res).toEqual(mockLaunch);
    expect(mocks.get).toBeCalledWith('launches', { flight_number: 1 });
  });
});

describe('[LaunchAPI.getLaunchesByIds]', () => {
  it('should call getLaunchById for each id', async () => {
    // temporarily overwrite getLaunchById to test
    const getLaunchById = ds.getLaunchById;
    ds.getLaunchById = jest.fn(() => ({ id: 1 }));

    const res = await ds.getLaunchesByIds({ launchIds: [1, 2] });

    expect(res).toEqual([{ id: 1 }, { id: 1 }]);
    expect(ds.getLaunchById).toHaveBeenCalledTimes(2);

    // set getLaunchById back to default
    ds.getLaunchById = getLaunchById;
  });
});

/**
 * MOCK DATA BELOW
 */

// properly transformed launch
const mockLaunch = {
  id: 1,
  cursor: '1143239400',
  mission: {
    name: 'FalconSat',
    missionPatchSmall: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
    missionPatchLarge: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
  },
  site: 'Kwajalein Atoll',
  rocket: {
    id: 'falcon1',
    name: 'Falcon 1',
    type: 'Merlin A',
  },
};

// raw launch response from API
const mockLaunchResponse = {
  flight_number: 1,
  mission_name: 'FalconSat',
  mission_id: [],
  upcoming: false,
  launch_year: '2006',
  launch_date_unix: 1143239400,
  launch_date_utc: '2006-03-24T22:30:00.000Z',
  launch_date_local: '2006-03-25T10:30:00+12:00',
  is_tentative: false,
  tentative_max_precision: 'hour',
  rocket: {
    rocket_id: 'falcon1',
    rocket_name: 'Falcon 1',
    rocket_type: 'Merlin A',
    first_stage: {
      cores: [
        {
          core_serial: 'Merlin1A',
          flight: 1,
          block: null,
          reused: false,
          land_success: null,
          landing_intent: false,
          landing_type: null,
          landing_vehicle: null,
        },
      ],
    },
    second_stage: {
      block: 1,
      payloads: [
        {
          payload_id: 'FalconSAT-2',
          norad_id: [],
          reused: false,
          customers: ['DARPA'],
          nationality: 'United States',
          manufacturer: 'SSTL',
          payload_type: 'Satellite',
          payload_mass_kg: 20,
          payload_mass_lbs: 43,
          orbit: 'LEO',
          orbit_params: {
            reference_system: 'geocentric',
            regime: 'low-earth',
            longitude: null,
            semi_major_axis_km: null,
            eccentricity: null,
            periapsis_km: 400,
            apoapsis_km: 500,
            inclination_deg: 39,
            period_min: null,
            lifespan_years: null,
            epoch: null,
            mean_motion: null,
            raan: null,
            arg_of_pericenter: null,
            mean_anomaly: null,
          },
        },
      ],
    },
    fairings: {
      reused: false,
      recovery_attempt: false,
      recovered: false,
      ship: null,
    },
  },
  ships: [],
  telemetry: {
    flight_club: null,
  },
  reuse: {
    core: false,
    side_core1: false,
    side_core2: false,
    fairings: false,
    capsule: false,
  },
  launch_site: {
    site_id: 'kwajalein_atoll',
    site_name: 'Kwajalein Atoll',
    site_name_long: 'Kwajalein Atoll Omelek Island',
  },
  launch_success: false,
  links: {
    mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
    mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
    article_link:
      'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
    wikipedia: 'https://en.wikipedia.org/wiki/DemoSat',
    video_link: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
    flickr_images: [],
  },
  details: 'Engine failure at 33 seconds and loss of vehicle',
  static_fire_date_utc: '2006-03-17T00:00:00.000Z',
  static_fire_date_unix: 1142553600,
};

module.exports.mockLaunchResponse = mockLaunchResponse;
