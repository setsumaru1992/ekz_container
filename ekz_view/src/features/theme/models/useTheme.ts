import { useThemesQuery, ThemesDocument } from "./graphql";
import authCookieManager from "../../auth/authCookieManager";
import apolloClient from "../../../../apolloClient";

export const useTheme = () => {
  return useThemesQuery({
    variables: {
      // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
      accessKey: authCookieManager.getAccessKey(),
    },
  });
}

export const useThemeByServerside = async (nextJsContext) => {
  return apolloClient.query({
    query: ThemesDocument,
    variables: {
      // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
      accessKey: authCookieManager.getAccessKey(nextJsContext),
    },
  })
}