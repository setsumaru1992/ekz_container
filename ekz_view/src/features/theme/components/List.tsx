import React from 'react';
import Link from 'next/link';
import ErrorBoundary from '../../common/components/ErrorBoundary'
import { useThemesQuery } from '../models/graphql';
import authCookieManager from '../../../features/auth/authCookieManager';
import { Theme } from "../models/graphql";
import {useTheme} from "../models/useTheme";

type Props = {
  themes?: Theme[];
};

export default (props: Props) => {
  const { themes: themesFromProps } = props;
  let themes;
  if(themesFromProps){
    themes = themesFromProps;
  } else {
    const { data, loading } = useTheme();
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
