import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
// import injectStyles from './styles';

// Initialize ApolloClient
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// injectStyles();

// const ARTWORKS = gql`
//   query getArtworks {
//     artworks {
//       id
//       title
//     }
//   }
// `;

// client
//   .query({
//     query: gql`
//       query TestQuery {
//         artwork(id: 12267) {
//           id
//           title
//           artist_display
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);
