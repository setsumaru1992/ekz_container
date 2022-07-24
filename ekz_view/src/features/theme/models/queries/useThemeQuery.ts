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
  const useQueryParameter = {
    variables,
    nextFetchPolicy: 'no-cache',
    // Lazyの方で上手くいったら反映
  };

  let themesQuery;
  let themes;
  if (requireFetchedData) {
    themesQuery = useThemesQuery({ variables });
    themes = themesQuery.data?.themes;
  } else {
    const themesLazyQuery = useThemesLazyQuery({
      variables,
      // 更新後のrefetchが成功しないから実験的に記入
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
    });
    // eslint-disable-next-line prefer-destructuring
    themesQuery = themesLazyQuery[1];
  }

  return {
    themes,
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
