import React from 'react';
import Link from 'next/link';
import ErrorBoundary from '../../common/components/ErrorBoundary'
import { useQuery } from '@apollo/client';
import { THEMES_QUERY } from '../models/queries';
// import { useThemesQuery } from '../models/graphql';
import authCookieManager from '../../../features/auth/authCookieManager';
import { Theme } from "../models/graphql";

type Props = {
  themes?: Theme[];
};

export default (props: Props) => {
  // const { themes: initialThemes } = props;
  // // const { data, loading } = useThemesQuery({
  // const { data, loading } = useQuery(THEMES_QUERY,{
  //     variables: {
  //       // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
  //       accessKey: authCookieManager.getAccessKey(),
  //     },
  //   });
  //
  // const themes = data?.themes || initialThemes || [];
  // if (!initialThemes && loading) return <div>Loading...</div>;

  const { themes: themesFromProps } = props;
  let themes;
  if(themesFromProps){
    themes = themesFromProps;
  } else {
    // const { data, loading } = useThemesQuery({
    const { data, loading } = useQuery(THEMES_QUERY,{
      variables: {
        // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
        accessKey: authCookieManager.getAccessKey(),
      },
    });
    themes = data?.themes || themesFromProps || [];
    if(loading) return <div>Loading...</div>;
  }

  return(
    <ErrorBoundary>
      {/* profileは複数のクエリをさばく練習として使用 */}
      {/*ユーザ名：{data.profile && data.profile.email}*/}
      {themes.map((theme) => {return (
        <div key={theme.id}>
          <Link
            href={{
              pathname: '/mypage/themes/[themeId]'
            }}
            as={`/mypage/themes/${theme.id}`}
          >
            <a>{theme.name}</a>
          </Link>
        </div>
      )})}
    </ErrorBoundary>
  )
}
