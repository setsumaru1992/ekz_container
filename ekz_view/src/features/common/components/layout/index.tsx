import React from 'react';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import apolloClient from '../../../../../apolloClient';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  const { children } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      {children}
      <script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossOrigin
      />
    </ApolloProvider>
  );
};
