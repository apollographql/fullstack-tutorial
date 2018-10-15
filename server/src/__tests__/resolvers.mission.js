const resolvers = require('../resolvers');

// Mission: {
//   missionPatch: (mission, { size }) => {
//     return size === 'SMALL'
//       ? mission.missionPatchSmall
//       : mission.missionPatchLarge;
//   },
// },

const mockMission = {
  name: 'foo',
  missionPatchLarge: 'LG',
  missionPatchSmall: 'SM',
};

describe('[Mission.missionPatch]', () => {
  it('chooses the right sized patch', () => {
    const { missionPatch } = resolvers.Mission;
    const resDefault = missionPatch(mockMission);
    const resSmall = missionPatch(mockMission, { size: 'SMALL' });
    const resLarge = missionPatch(mockMission, { size: 'LARGE' });

    expect(resDefault).toEqual('LG');
    expect(resSmall).toEqual('SM');
    expect(resLarge).toEqual('LG');
  });
});
