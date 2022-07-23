import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../graphql/apolloClient';

const IndexPage = () => (
  <ApolloProvider client={apolloClient}>aa</ApolloProvider>
);

export default IndexPage;
