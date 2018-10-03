const resolvers = require('../launch');

describe('[Launch.passengers]', () => {
  const mockLaunch = { id: 1 };
  const mockContext = {
    dataSources: {
      userAPI: { getUsersByLaunch: jest.fn() },
    },
  };

  it('uses launch id from parent to lookup users', async () => {
    mockContext.dataSources.userAPI.getUsersByLaunch.mockReturnValueOnce([{}]);

    // check the resolver response
    const res = await resolvers.Launch.passengers(
      mockLaunch,
      null,
      mockContext,
    );
    expect(res).toEqual([{}]);

    // make sure the dataSources were called properly
    expect(mockContext.dataSources.userAPI.getUsersByLaunch).toBeCalledWith({
      launchId: 1,
    });
  });

  it('returns empty array if no results', async () => {
    mockContext.dataSources.userAPI.getUsersByLaunch.mockReturnValueOnce([]);

    // check the resolver response
    const res = await resolvers.Launch.passengers(
      mockLaunch,
      null,
      mockContext,
    );
    expect(res).toEqual([]);
  });
});
