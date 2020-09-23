import {
  ApolloClient,
  InMemoryCache,
  gql,
  NormalizedCacheObject,
} from "@apollo/client";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  
});
client
  .query({
    query: gql`
      query TestQuery {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));