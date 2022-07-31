import React from 'react';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import buildApolloClient from '../graphql/buildApolloClient';

const App = ({ Component, pageProps }) => {
  const apolloClient = buildApolloClient(null);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
