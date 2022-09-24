import React, { useEffect } from 'react';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { GraphQLError } from 'graphql';
import 'bootstrap/dist/css/bootstrap.min.css';
import buildApolloClient from '../graphql/buildApolloClient';
import { apiErrors } from '../graphql/globalVars';
import ErrorBoundary from '../features/pageHelper/components/ErrorBoundary';
import { includeUnauthenticatedError } from '../features/auth/errors/authErrorJudgeMethods';

const useErrorHandling = () => {
  const router = useRouter();
  const apiErrs = useReactiveVar(apiErrors);
  useEffect(() => {
    if (includeUnauthenticatedError(apiErrs)) {
      router.push('/mypage/login');
    }
  }, [apiErrs]);
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
