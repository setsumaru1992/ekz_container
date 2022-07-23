import { useThemesQuery, ThemesDocument } from './queries/fetchThemes';
import authCookieManager from '../../auth/authCookieManager';
import apolloClient from '../../../graphql/apolloClient';

export const useTheme = (requireOnlyUpdateMethod = false) => {
  let themes = null;
  let dataFetchLoading = false;
  let dataFetchError = null;
  if (!requireOnlyUpdateMethod) {
    const themesQuery = useThemesQuery({
      variables: {
        // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
        accessKey: authCookieManager.getAccessKey(),
      },
    });

    themes = themesQuery.data?.themes;
    dataFetchLoading = themesQuery.loading;
    dataFetchError = themesQuery.error;
  }

  const addLoading = false; // useMutationで得られたものを使用

  const loading = dataFetchLoading || addLoading;
  const error = dataFetchError;
  return {
    themes,
    loading,
    error,
  };
};

export const useThemeByServerside = async (nextJsContext) => {
  return apolloClient.query({
    query: ThemesDocument,
    variables: {
      // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
      accessKey: authCookieManager.getAccessKey(nextJsContext),
    },
  });
};
