import {
  useThemesQuery,
  useThemesLazyQuery,
  ThemesDocument,
} from './fetchThemes';
import authCookieManager from '../../../auth/authCookieManager';
import apolloClient from '../../../../graphql/apolloClient';

export default (requireFetchedData = true) => {
  const variables = {
    // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
    accessKey: authCookieManager.getAccessKey(),
  };

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
  return apolloClient.query({
    query: ThemesDocument,
    variables: {
      // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
      accessKey: authCookieManager.getAccessKey(nextJsContext),
    },
  });
};
