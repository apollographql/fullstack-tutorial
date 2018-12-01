const {createTestClient} = require('apollo-server-testing');
const gql = require('graphql-tag');
const nock = require('nock');

const {constructTestServer} = require('./__utils');

// the mocked REST API data
const {mockLaunchResponse} = require('../datasources/__tests__/launch');
// the mocked SQL DataSource store
const {mockStore} = require('../datasources/__tests__/user');

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;

const GET_LAUNCH = gql`
  query launch($id: ID!) {
    launch(id: $id) {
      id
      isBooked
      rocket {
        type
      }
      mission {
        name
      }
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

describe('Queries', () => {
  it('fetches list of launches', async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    // This function returns the server instance as well as our dataSource
    // instances, so we can overwrite the underlying fetchers
    const {server, launchAPI, userAPI} = constructTestServer({
      context: () => ({user: {id: 1, email: 'a@a.a'}}),
    });

    // mock the datasources' underlying fetch methods, whether that's a REST
    // lookup in the RESTDataSource or the store query in the Sequelize datasource
    launchAPI.get = jest.fn(() => [mockLaunchResponse]);
    userAPI.store = mockStore;
    userAPI.store.trips.findAll.mockReturnValueOnce([
      {dataValues: {launchId: 1}},
    ]);

    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const {query} = createTestClient(server);
    const res = await query({query: GET_LAUNCHES});
    expect(res).toMatchSnapshot();
  });

  it('fetches single launch', async () => {
    const {server, launchAPI, userAPI} = constructTestServer({
      context: () => ({user: {id: 1, email: 'a@a.a'}}),
    });

    launchAPI.get = jest.fn(() => [mockLaunchResponse]);
    userAPI.store = mockStore;
    userAPI.store.trips.findAll.mockReturnValueOnce([
      {dataValues: {launchId: 1}},
    ]);

    const {query} = createTestClient(server);
    const res = await query({query: GET_LAUNCH, variables: {id: 1}});
    expect(res).toMatchSnapshot();
  });
});

describe('Mutations', () => {
  it('returns login token', async () => {
    const {server, launchAPI, userAPI} = constructTestServer({
      context: () => {},
    });

    userAPI.store = mockStore;
    userAPI.store.users.findOrCreate.mockReturnValueOnce([
      {id: 1, email: 'a@a.a'},
    ]);

    const {mutate} = createTestClient(server);
    const res = await mutate({
      mutation: LOGIN,
      variables: {email: 'a@a.a'},
    });
    expect(res.data.login).toEqual('YUBhLmE=');
  });

  it('books trips', async () => {
    const {server, launchAPI, userAPI} = constructTestServer({
      context: () => ({user: {id: 1, email: 'a@a.a'}}),
    });

    // mock the underlying fetches
    launchAPI.get = jest.fn();

    // look up the launches from the launch API
    launchAPI.get
      .mockReturnValueOnce([mockLaunchResponse])
      .mockReturnValueOnce([{...mockLaunchResponse, flight_number: 2}]);

    // book the trip in the store
    userAPI.store = mockStore;
    userAPI.store.trips.findOrCreate
      .mockReturnValueOnce([{get: () => ({launchId: 1})}])
      .mockReturnValueOnce([{get: () => ({launchId: 2})}]);

    // check if user is booked
    userAPI.store.trips.findAll.mockReturnValue([{}]);

    const {mutate} = createTestClient(server);
    const res = await mutate({
      mutation: BOOK_TRIPS,
      variables: {launchIds: ['1', '2']},
    });
    expect(res).toMatchSnapshot();
  });
});
