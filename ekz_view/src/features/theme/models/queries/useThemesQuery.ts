import {
  useThemesQuery,
  useThemesLazyQuery,
  ThemesDocument,
} from './fetchThemes';
import buildApolloClient from '../../../../graphql/buildApolloClient';

export default (requireFetchedData = true) => {
  const variables = {};
  let themesQuery;
  if (requireFetchedData) {
    themesQuery = useThemesQuery({ variables });
  } else {
    const themesLazyQuery = useThemesLazyQuery({ variables });
    // eslint-disable-next-line prefer-destructuring
    themesQuery = themesLazyQuery[1];
  }

  return {
    themes: themesQuery.data?.themes,
    fetchLoading: themesQuery.loading,
    fetchError: themesQuery.error,
    refetch: themesQuery.refetch,
  };
};

export const prefetchThemesByServerside = async (nextJsContext) => {
  const apolloClient = buildApolloClient(nextJsContext);
  return apolloClient.query({
    query: ThemesDocument,
    variables: {},
  });
};
