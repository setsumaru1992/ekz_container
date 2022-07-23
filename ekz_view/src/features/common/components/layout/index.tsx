import React from 'react';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import apolloClient from '../../../../graphql/apolloClient';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  const { children } = props;
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
