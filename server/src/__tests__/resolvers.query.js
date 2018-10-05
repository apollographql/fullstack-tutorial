const resolvers = require('../resolvers');

describe('[Query.launches]', () => {
  const mockContext = {
    dataSources: {
      launchAPI: { getAllLaunches: jest.fn() },
    },
  };
  const { getAllLaunches } = mockContext.dataSources.launchAPI;

  it('calls lookup from launch api', async () => {
    getAllLaunches.mockReturnValueOnce([{ id: 999, cursor: 'foo' }]);

    // check the resolver response
    const res = await resolvers.Query.launches(null, {}, mockContext);
    expect(res).toEqual({
      cursor: 'foo',
      launches: [{ id: 999, cursor: 'foo' }],
    });
  });

  it('respects pageSize arg', async () => {
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
    const res2 = await resolvers.Query.launches(
      null,
      { pageSize: 2 },
      mockContext,
    );
    expect(res).toEqual({
      cursor: 'foo',
      launches: [{ id: 1, cursor: 'foo' }],
    });
    expect(res2).toEqual({
      cursor: 'bar',
      launches: [{ id: 1, cursor: 'foo' }, { id: 999, cursor: 'bar' }],
    });
  });

  fit('respects cursor arg', async () => {
    getAllLaunches.mockReturnValue([
      { id: 1, cursor: 'a' },
      { id: 999, cursor: 'b' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { after: 'a' },
      mockContext,
    );
    const res2 = await resolvers.Query.launches(
      null,
      { after: 'b' },
      mockContext,
    );
    expect(res).toEqual({
      hasMore: false,
      cursor: 'b',
      launches: [{ id: 999, cursor: 'b' }],
    });
    expect(res2).toEqual({ hasMore: false, cursor: null, launches: [] });
  });

  it('respects both pageSize and cursor', async () => {
    getAllLaunches.mockReturnValue([
      { id: 1, cursor: 'a' },
      { id: 999, cursor: 'b' },
      { id: 123, cursor: 'c' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { after: 'a', pageSize: 2 },
      mockContext,
    );

    expect(res).toEqual([{ id: 999, cursor: 'b' }, { id: 123, cursor: 'c' }]);
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
    expect(await resolvers.Query.me(null, null, mockContext)).toEqual(null);
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

    // make sure dataSource is called with the email
    expect(findOrCreateUser).toBeCalledWith({ email: mockContext.user.email });
  });
});
