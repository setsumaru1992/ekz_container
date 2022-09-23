import React, { useEffect } from 'react';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { GraphQLError } from 'graphql';
import 'bootstrap/dist/css/bootstrap.min.css';
import buildApolloClient from '../graphql/buildApolloClient';
import { apiErrors } from '../graphql/globalVars';
import ErrorBoundary from '../features/common/components/ErrorBoundary';

const useErrorHandling = () => {
  const router = useRouter();
  const apiErr = useReactiveVar(apiErrors);
  useEffect(() => {
    const isUnauthorized = apiErr.some((error) => {
      const e = error as GraphQLError;
      return e?.extensions?.code === 'UNAUTHENTICATED';
    });
    if (isUnauthorized) {
      router.push('/mypage/login');
    }
  }, [apiErr]);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  useErrorHandling();

  const apolloClient = buildApolloClient(null);
  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ErrorBoundary>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
