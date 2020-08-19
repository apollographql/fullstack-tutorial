const resolvers = require('../resolvers');

describe('[Query.launches]', () => {
  const mockContext = {
    dataSources: {
      launchAPI: { getAllLaunches: jest.fn() },
    },
  };
  // just for easy access
  const { getAllLaunches } = mockContext.dataSources.launchAPI;

  it('calls lookup from launch api', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValueOnce([{ id: 999, cursor: 'foo' }]);

    // check the resolver response
    const res = await resolvers.Query.launches(null, {}, mockContext);
    expect(res).toEqual({
      cursor: 'foo',
      hasMore: false,
      launches: [{ id: 999, cursor: 'foo' }],
    });
  });

  it('respects pageSize arg', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValue([
      { id: 1, cursor: 'foo' },
      { id: 999, cursor: 'bar' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { pageSize: 1 },
      mockContext,
    );
    expect(res).toEqual({
      cursor: 'bar',
      hasMore: true,
      launches: [{ id: 999, cursor: 'bar' }],
    });
  });

  it('respects cursor arg', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValueOnce([
      { id: 1, cursor: 'a' },
      { id: 999, cursor: 'b' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { after: 'b' },
      mockContext,
    );

    expect(res).toEqual({
      hasMore: false,
      cursor: 'a',
      launches: [{ id: 1, cursor: 'a' }],
    });
  });

  it('respects both pageSize and cursor', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValue([
      { id: 1, cursor: 'a' },
      { id: 999, cursor: 'b' },
      { id: 123, cursor: 'c' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { after: 'c', pageSize: 1 },
      mockContext,
    );

    expect(res).toEqual({
      cursor: 'b',
      hasMore: true,
      launches: [{ id: 999, cursor: 'b' }],
    });
  });
});

describe('[Query.launch]', () => {
  const mockContext = {
    dataSources: {
      launchAPI: { getLaunchById: jest.fn() },
    },
  };

  it('calls lookup from launch api', async () => {
    const getLaunchById = mockContext.dataSources.launchAPI.getLaunchById;
    getLaunchById.mockReturnValueOnce({
      id: 999,
    });

    // check the resolver response
    const res = await resolvers.Query.launch(null, { id: 999 }, mockContext);
    expect(res).toEqual({ id: 999 });

    // make sure the dataSources were called properly
    expect(getLaunchById).toBeCalledWith({ launchId: 999 });
  });
});

describe('[Query.me]', () => {
  const mockContext = {
    dataSources: {
      userAPI: { findOrCreateUser: jest.fn() },
    },
    user: {},
  };

  it('returns null if no user in context', async () => {
    expect(await resolvers.Query.me(null, null, mockContext)).toBeFalsy();
  });

  it('returns user from userAPI', async () => {
    mockContext.user.email = 'a@a.a';
    const findOrCreateUser = mockContext.dataSources.userAPI.findOrCreateUser;
    findOrCreateUser.mockReturnValueOnce({ id: 999 });

    // check return value of resolver
    const res = await resolvers.Query.me(null, null, mockContext);
    expect(res).toEqual({
      id: 999,
    });
  });
});
