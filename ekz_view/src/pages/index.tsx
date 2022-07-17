import React from 'react';
import apolloClient from '../../apolloClient';
import { ApolloProvider } from '@apollo/client';

const IndexPage = () => (
  <ApolloProvider client={apolloClient}>aa</ApolloProvider>
);

export default IndexPage;
