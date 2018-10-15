const resolvers = require('../resolvers');

const mockMission = {
  name: 'foo',
  missionPatchLarge: 'LG',
  missionPatchSmall: 'SM',
};

describe('[Mission.missionPatch]', () => {
  it('chooses the right sized patch', () => {
    const { missionPatch } = resolvers.Mission;

    // default -- no arg passed
    const resDefault = missionPatch(mockMission);
    const resSmall = missionPatch(mockMission, { size: 'SMALL' });
    const resLarge = missionPatch(mockMission, { size: 'LARGE' });

    expect(resDefault).toEqual('LG');
    expect(resSmall).toEqual('SM');
    expect(resLarge).toEqual('LG');
  });
});
