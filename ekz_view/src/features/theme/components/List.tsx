import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import { withApollo } from '../../../lib/apollo';
import { useThemesQuery } from '../models/graphql';
import authCookieManager from '../../../features/auth/authCookieManager';

const ThemesDocument = gql`
    query themes($accessKey: String!) {
  themes(accessKey: $accessKey) {
    id
    name
    description
  }
  profile(accessKey: $accessKey) {
    dispName
    email
  }
}
    `;

type Props = {};

const Themes : React.FC<Props> = (props: {}) => {
  const { themes } = props;
  const { data, loading, error } = useQuery(ThemesDocument,{
      variables: {
        // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
        accessKey: authCookieManager.getAccessKey(),
      },
    });
  if (error) return <h1>Error</h1>;
  if (loading) return <div>Loading...</div>;
  return(
    <div>
    {/* profileは複数のクエリをさばく練習として使用 */}
    ユーザ名：{data.profile && data.profile.email}
      {data.themes && data.themes.map((theme) => {return (
        <div key={theme.id}>
          <Link
            href="/mypage/themes/[themeName]"
            as={`/mypage/themes/${theme.name}`}
          >
            <a>{theme.name}</a>
          </Link>
        </div>
      )})}
    </div>
  )
}

export default withApollo()(Themes)
